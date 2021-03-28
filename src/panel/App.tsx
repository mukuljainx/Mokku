import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { debounce, get } from "lodash";

import "./app.scss";
import Logs from "../components/molecules/logs";
import Mock from "./mocks";
import Create from "./mocks/create";
import Header from "./header";
import {
  ILog,
  IStore,
  DBNameType,
  IMockResponse,
  IMockResponseRaw,
} from "../interface/mock";
import theme from "../components/theme";
import {
  getDefaultStore,
  getStore,
  updateStateStore,
  updateStore,
} from "../services/store";
import { Button, Icon } from "../components/atoms";
import PromotionBanner from "./Banner/Promotion";

import Notification from "../components/notification";
import { IEventMessage } from "../interface/message";
import messageService from "../services/message";
import FS from "../components/fs";

const Wrapper = styled("div")<{ alignCenter?: boolean }>`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ alignCenter }) =>
    alignCenter && `justify-content: center; align-items:center;`};

  p,
  table,
  tr,
  td,
  th,
  div,
  span,
  h1,
  h2,
  h3,
  h4 {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ListWrapper = styled("div")`
  flex-grow: 2;
  height: 100%;
`;
const CreateWrapper = styled("div")`
  border-left: ${({ theme }) => `1px solid ${theme.colors.border}`};
  width: 50%;
  min-width: 656px;
`;

const Content = styled("div")`
  overflow: hidden;
  flex-grow: 2;
  display: flex;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    ${CreateWrapper} {
      border-top: ${({ theme }) => `1px solid ${theme.colors.border}`};
      border-left: none;
      width: 100%;
    }
  }
`;

const Text = styled.p<{ large?: boolean }>`
  ${({ large }) => large && `font-size: 16px;`}
`;

interface IState {
  logs: ILog[];
  route: "logs" | "logs.create" | "mock.create" | "mock" | "export-import";
  store: IStore;
  rawMock?: IMockResponseRaw;
  filter: {
    search: string;
  };
  storeLoading: boolean;
  notification: { text?: string; show: boolean };
  host: string;
  active: boolean;
  recording: {
    active: boolean;
    index?: number;
  };
  showBanner: boolean;
}

interface IProps {
  host: string;
  tab: chrome.tabs.Tab;
  active: boolean;
  storeKey: string;
}

type ActionType = "add" | "delete" | "edit" | "clear";

class App extends React.Component<IProps, IState> {
  notificationTimer: number;
  initialStoreId: number = getDefaultStore().id;
  state: IState = {
    showBanner: false,
    logs: [],
    route: "mock",
    store: getDefaultStore(),
    filter: { search: "" },
    storeLoading: true,
    notification: {
      show: false,
    },
    host: this.props.host,
    active: this.props.active,
    recording: { active: false },
  };

  showNotification = (text: string) => {
    if (this.notificationTimer) {
      clearTimeout(this.notificationTimer);
    }
    this.setState({ notification: { text, show: true } });
    this.notificationTimer = setTimeout(() => {
      this.setState((prevState) => ({
        notification: { text: prevState.notification.text, show: false },
      }));
    }, 3000);
  };

  checkIfSameTab = (sender: IProps["tab"]) => {
    const { tab } = this.props;
    return sender.index === tab.index && sender.windowId === tab.windowId;
  };

  changeRoute = (route: IState["route"]) => {
    this.setState({ route });
  };

  handleAction = (
    action: ActionType,
    newMock: IMockResponse | void,
    tooltip?: string
  ) => {
    if (action === "clear") {
      this.setState({ rawMock: undefined });
      this.changeRoute(
        this.state.route.replace(".create", "") as IState["route"]
      );
      return;
    }

    if (!newMock) {
      return;
    }

    const updatedStore = updateStateStore(action, newMock, this.state.store, {
      notify: this.showNotification,
    });
    if (!updatedStore) {
      return;
    }

    const notificationMessage = {
      add: "Mock added Successfully.",
      edit: "Mock edited Successfully.",
      delete: "Mock deleted Successfully.",
    };

    updateStore(updatedStore)
      .then((x) => {
        // Alert the content script
        // so it can refresh store
        this.showNotification(tooltip || notificationMessage[action]);
        this.notifyContent();
        const { store } = x;

        // show banner to the usesr
        if (
          !store.activityInfo.promoted &&
          store.id - this.initialStoreId > 1
        ) {
          this.setState({ showBanner: true });
          updateStore({ ...store, activityInfo: { promoted: true } });
          store.activityInfo.promoted = true;
          this.setState((state) => ({
            ...state,
            store: { ...state.store, activityInfo: { promoted: true } },
          }));
        }

        this.setState((prevState: IState) => {
          let logs = prevState.logs;
          if (action === "add") {
            const mockIndex = store.mocks.findIndex(
              (mock) =>
                mock.url === newMock.url && mock.method === newMock.method
            );
            logs = logs.map((log) => {
              if (
                log.request?.url === newMock.url &&
                log.request?.method === newMock.method
              ) {
                return { ...log, mockPath: `mocks[${mockIndex}]` };
              }
              return log;
            });
          }

          if (action === "delete") {
            logs = logs.map((log) => {
              if (
                log.request?.url === newMock.url &&
                log.request?.method === newMock.method
              ) {
                return { ...log, mockPath: undefined };
              }
              return log;
            });
          }

          return { store, logs };
        });
      })
      .catch((error) => {
        this.showNotification(
          "Something went wrong, please reopen the panel then try."
        );
        console.log(error);
      });
  };

  editMock = (rawMock: IMockResponseRaw) => {
    this.setState({ rawMock }, () => {
      this.changeRoute("mock.create");
    });
  };

  mockNetworkCall = (log: ILog) => {
    this.handleAction("add", this.createMockFromLog(log));
  };

  createMockFromLog = (log: ILog): IMockResponse => ({
    active: true,
    method: log.request?.method || "GET",
    createdOn: new Date().getTime(),
    url: log.request?.url || "/some-url",
    status: log.response?.status || 200,
    response: log.response?.response || "",
    delay: 500,
    id: -1,
  });

  bulkMockLogs = (logs: ILog[]) => {
    let store = this.state.store;
    logs.forEach((log) => {
      if (log.id && log.mockPath) {
        const tempMock: IMockResponse = get(store.mocks, log.mockPath);
        tempMock.response = log.response.response;
        store = updateStateStore("edit", tempMock, store, { bulk: true });
      } else {
        store = updateStateStore("add", this.createMockFromLog(log), store, {
          bulk: true,
        });
      }
    });

    updateStore(store)
      .then((x) => {
        messageService.send({
          message: "UPDATE_STORE",
          from: "PANEL",
          to: "CONTENT",
          type: "NOTIFICATION",
        });

        const updatedStore = x.store as IStore;
        // show banner to the usesr
        debugger;
        if (
          !updatedStore.activityInfo.promoted &&
          updatedStore.id - this.initialStoreId > 1
        ) {
          this.setState({ showBanner: true });
          updateStore({ ...updatedStore, activityInfo: { promoted: true } });
        }

        this.setState((prevState: IState) => {
          let logs = [...prevState.logs];

          logs.forEach((log) => {
            const tempMockIndex = store.mocks.find(
              (mock) =>
                log.request?.url === mock.url &&
                log.request?.method === mock.method
            );
            log.mockPath = `mocks[${tempMockIndex}]`;
          });

          this.showNotification("Mocks updated successfully!");

          return {
            logs,
            store: updatedStore,
          };

          // setState ends here
        });
      })
      .catch(() => {
        this.showNotification(
          "Recording failed, please refresh Panel & try again!"
        );
      });
  };

  onRecordingClick = () => {
    this.setState((prevState: IState) => {
      if (!prevState.recording.active) {
        return {
          recording: {
            active: true,
            index: prevState.logs.length,
          },
        };
      } else {
        this.bulkMockLogs(prevState.logs.slice(prevState.recording.index!));
        return {
          recording: {
            active: false,
          },
        };
      }
    });
  };

  componentDidMount() {
    messageService.listen("PANEL", (message: IEventMessage, sender: any) => {
      if (!this.checkIfSameTab(sender.tab)) {
        return;
      }
      if (message.type === "LOG") {
        this.setState((prevState) => {
          const newLog = message.message as ILog;
          let logs = prevState.logs;
          if (!newLog.response) {
            logs = [...logs, newLog];
          } else if (newLog.id) {
            logs = logs.map((item) => (item.id === newLog.id ? newLog : item));
          }

          return {
            logs,
          };
        });
      } else if (message.type === "INIT") {
        if (message.message !== this.state.host) {
          const host = message.message as string;
          const storeKey = `mokku.extension.active.${host}`;
          const isLocalhost = host.includes("http://localhost");
          chrome.storage.local.get([storeKey], (result) => {
            let active = result[storeKey];
            if (isLocalhost && active === undefined) {
              active = true;
            }
            this.setState({ host, active });
          });
        }
      }
    });

    let store: IStore;
    const DBName: DBNameType = "mokku.extension.main.db";
    chrome.storage.local.get([DBName], (result) => {
      store = { ...getDefaultStore(), ...result["mokku.extension.main.db"] };
      this.initialStoreId = store.id;
      this.setState({ store, storeLoading: false });
    });
  }

  handleSearchChange = debounce((search: string) => {
    this.setState({ filter: { search } });
  }, 700);

  filterStore = (oldStore: IStore, search) => {
    const store = { ...oldStore };
    store.mocks = store.mocks.filter((item) => item.url.includes(search));
    Object.keys(store.collections).forEach((collection) => {
      store[collection].mocks = store[collection].mocks.filter((item) =>
        item.url.includes(search)
      );
    });

    return store;
  };

  editMockFromLog = (path: string) => {
    if (!path) {
      this.showNotification("Can't Edit this mock, try reopening the panel.");
    }
    this.changeRoute("logs.create");
    this.setState({ rawMock: get(this.state.store, path) });
  };

  clearLogs = () => {
    this.setState({ logs: [] });
  };

  toggleMokku = () => {
    const next = !this.state.active;
    chrome.storage.local.set({ [this.props.storeKey]: next }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
        location.reload();
      });
    });
  };

  addMock = () => {
    this.changeRoute("mock.create");
    this.setState({ rawMock: undefined });
  };

  updateStore = () => {
    getStore().then(({ store }) => {
      this.notifyContent();
      const updatedStore = { ...getDefaultStore(), ...store };
      this.initialStoreId = updatedStore.id;
      this.setState({ store: updatedStore });
    });
  };

  notifyContent = () => {
    messageService.send(
      {
        type: "NOTIFICATION",
        from: "PANEL",
        to: "CONTENT",
        message: "UPDATE_STORE",
      },
      this.props.tab.id
    );
  };

  getContent = () => {
    if (this.state.host === "invalid") {
      return (
        <Wrapper alignCenter>
          <Text>Mokku not available on this url.</Text>
        </Wrapper>
      );
    }

    if (!this.state.host || !this.props.tab) {
      return (
        <Wrapper alignCenter>
          <Text>
            Unable to load the Panel. Please focus on the current tab and retry.
          </Text>
          <Button transparent link onClick={() => location.reload()}>
            Refresh
          </Button>
        </Wrapper>
      );
    }

    if (!this.state.active) {
      return (
        <Wrapper alignCenter>
          <Text>
            Mocking is disabled by default on non-localhost urls. Enabling will
            refresh the current page.
          </Text>
          <Button
            style={{ marginTop: 8 }}
            background="primary"
            color="white"
            onClick={this.toggleMokku}
          >
            Enable
          </Button>
        </Wrapper>
      );
    }

    if (this.state.storeLoading) {
      return (
        <Wrapper alignCenter>
          <Icon color="primary" style={{ marginBottom: 16, fontSize: 40 }}>
            system_update_alt
          </Icon>
          <Text large>Getting App Data...</Text>
        </Wrapper>
      );
    }
    const {
      route,
      logs,
      store,
      rawMock,
      filter: { search },
      recording,
    } = this.state;

    const filteredLogs =
      !search || route === "mock"
        ? logs
        : logs.filter((item) => (item.request?.url || "").includes(search));

    const filteredStore =
      !search || route === "logs" ? store : this.filterStore(store, search);

    return (
      <Wrapper>
        <Header
          addMock={this.addMock}
          clearLogs={this.clearLogs}
          onSearchChange={this.handleSearchChange}
          route={route}
          changeRoute={this.changeRoute}
          disableMocking={this.toggleMokku}
          recording={recording.active}
          onRecordingClick={this.onRecordingClick}
        />
        <Content id="content">
          {route.includes("export-import") && (
            <FS onImportSuccess={this.updateStore} />
          )}
          {route.includes("logs") && (
            <ListWrapper>
              <Logs
                mockNetworkCall={this.mockNetworkCall}
                logs={filteredLogs}
                editMock={this.editMockFromLog}
              />
            </ListWrapper>
          )}
          {route.includes("mock") && (
            <ListWrapper>
              <Mock
                onAction={this.handleAction}
                changeRoute={this.changeRoute}
                store={filteredStore}
                route={route}
                editMock={this.editMock}
              />
            </ListWrapper>
          )}
          {route.includes("create") && (
            <CreateWrapper>
              <Create
                mock={rawMock}
                onAction={this.handleAction}
                changeRoute={this.changeRoute}
              />
            </CreateWrapper>
          )}
        </Content>
      </Wrapper>
    );
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        {this.getContent()}
        {this.state.notification && (
          <Notification
            show={this.state.notification.show}
            text={this.state.notification.text}
          ></Notification>
        )}
        {this.state.showBanner && (
          <PromotionBanner
            onClose={() => this.setState({ showBanner: false })}
          />
        )}
      </ThemeProvider>
    );
  }
}

export default App;
