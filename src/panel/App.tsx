import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import "./app.scss";
import Logs from "./logs";
import Mock from "./mocks";
import Header from "./header";
import {
  ILog,
  IStore,
  DBNameType,
  IMockResponse,
  IMockResponseRaw,
} from "../interface/mock";
import theme from "./theme";
import { getDefultStore, updateStore } from "../services/collection";

const Wrapper = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled("div")`
  overflow: hidden;
  flex-grow: 2;
`;

interface IState {
  logs: ILog[];
  route: "logs" | "mock.create" | "mock";
  store: IStore;
  rawMock?: IMockResponseRaw;
}

interface IProps {
  host: string;
  tab: chrome.tabs.Tab;
}

class App extends React.Component<IProps, IState> {
  state: IState = {
    logs: [],
    route: "mock",
    store: getDefultStore(),
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
    newMock: IMockResponse | void
  ) => {
    if (action === "clear") {
      this.setState({ rawMock: undefined });
      this.changeRoute("mock");
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
          console.log("Mock already exist");
          // TODO: show alert
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
        // TODO: show alert
        store.mocks = store.mocks.filter((item) => item.id !== newMock.id);
        break;
      }
    }

    updateStore(store)
      .then((store: IStore) => {
        this.setState({ store });
        // Alert the content script
        // so it can refresh store
        chrome.tabs.sendMessage(this.props.tab.id, {
          type: "UPDATE_STORE",
          from: "PANEL",
          to: "CONTENT",
        });
      })
      .catch((error) => {
        console.log("Unable to update store: ");
        console.log(error);
      });
  };

  editMock = (rawMock: IMockResponseRaw) => {
    this.setState({ rawMock }, () => {
      this.changeRoute("mock.create");
    });
  };

  mockNetworkCall = (log: ILog) => {
    this.editMock({
      active: true,
      method: log.request?.method as IMockResponse["method"],
      url: log.request?.url,
      status: log.response?.status,
      response: log.response?.response,
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
    const DBName: DBNameType = "moku.extension.main.db";
    chrome.storage.local.get([DBName], (result) => {
      store = result["moku.extension.main.db"] || getDefultStore();
      console.log(store);
      this.setState({ store });
    });
  }

  render() {
    const { route, logs, store, rawMock } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header route={route} changeRoute={this.changeRoute} />
          <Content>
            {route === "logs" && (
              <Logs
                mockNetworkCall={this.mockNetworkCall}
                changeRoute={this.changeRoute}
                logs={logs}
              />
            )}
            {route.indexOf("mock") === 0 && (
              <Mock
                rawMock={rawMock}
                onAction={this.handleAction}
                changeRoute={this.changeRoute}
                store={store}
                route={route}
                editMock={this.editMock}
              />
            )}
          </Content>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;
