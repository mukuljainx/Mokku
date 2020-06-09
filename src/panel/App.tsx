import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { debounce, get } from "lodash";

import "./app.scss";
import Logs from "./logs";
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
import theme from "./theme";
import { getDefaultStore, updateStore } from "../services/collection";
import { Button, Icon } from "./components/table";
import Notification from "./components/notification";

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

const Content = styled("div")`
  overflow: hidden;
  flex-grow: 2;
  display: flex;
`;

const ListWrapper = styled("div")`
  flex-grow: 2;
  height: 100%;
`;
const CreateWrapper = styled("div")`
  width: 50%;
  min-width: 656px;
`;

const Text = styled.p<{ large?: boolean }>`
  ${({ large }) => large && `font-size: 16px;`}
`;

interface IState {
  logs: ILog[];
  route: "logs" | "logs.create" | "mock.create" | "mock";
  store: IStore;
  rawMock?: IMockResponseRaw;
  filter: {
    search: string;
  };
  storeLoading: boolean;
  notification: { text?: string; show: boolean };
}

interface IProps {
  host: string;
  tab: chrome.tabs.Tab;
  active: boolean;
}

class App extends React.Component<IProps, IState> {
  notificationTimer: number;
  state: IState = {
    logs: [],
    route: "mock",
    store: getDefaultStore(),
    filter: { search: "" },
    storeLoading: true,
    notification: {
      show: false,
    },
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
    action: "add" | "delete" | "edit" | "clear",
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

    const store = {
      ...this.state.store,
    };

    switch (action) {
      case "add": {
        const sameMock = !!store.mocks.find(
          (mock) => mock.url === newMock.url && mock.method === newMock.method
        );
        if (sameMock) {
          this.showNotification("Mock already exist");
          return;
        }
        const id = store.id;

        store.mocks = [...store.mocks, { ...newMock, id }];
        store.id++;
        break;
      }

      case "edit": {
        store.mocks = store.mocks.map((item) =>
          item.id === newMock.id
            ? {
                ...item,
                ...newMock,
              }
            : item
        );
        break;
      }

      case "delete": {
        store.mocks = store.mocks.filter((item) => item.id !== newMock.id);
        break;
      }
    }

    const notificationMessage = {
      add: "Mock added Successfully.",
      edit: "Mock edited Successfully.",
      delete: "Mock deleted Successfully.",
    };

    updateStore(store)
      .then((store: IStore) => {
        this.setState((prevState: IState) => {
          let logs = prevState.logs;
          if (action === "add") {
            const mockIndex = store.mocks.findIndex((mock) => mock);
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
        // Alert the content script
        // so it can refresh store
        this.showNotification(tooltip || notificationMessage[action]);
        chrome.tabs.sendMessage(this.props.tab.id, {
          type: "UPDATE_STORE",
          from: "PANEL",
          to: "CONTENT",
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
    this.handleAction("add", {
      active: true,
      method: log.request?.method || "GET",
      createdOn: new Date().getTime(),
      url: log.request?.url || "/some-url",
      status: log.response?.status || 200,
      response: log.response?.response || "",
      delay: 500,
      id: -1,
    });
  };

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message, sender, response) => {
      if (message.to !== "PANEL" || !this.checkIfSameTab(sender.tab)) return;
      if (message.type === "LOG") {
        this.setState((prevState) => {
          const newLog: ILog = message.message;
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
      }
    });

    let store: IStore;
    const DBName: DBNameType = "mokku.extension.main.db";
    chrome.storage.local.get([DBName], (result) => {
      store = result["mokku.extension.main.db"] || getDefaultStore();
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

  getContent = () => {
    if (!this.props.host || !this.props.tab) {
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
          clearLogs={this.clearLogs}
          onSearchChange={this.handleSearchChange}
          route={route}
          changeRoute={this.changeRoute}
        />
        <Content>
          {route.includes("logs") && (
            <ListWrapper>
              <Logs
                active={this.props.active}
                mockNetworkCall={this.mockNetworkCall}
                changeRoute={this.changeRoute}
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
      </ThemeProvider>
    );
  }
}

export default App;
