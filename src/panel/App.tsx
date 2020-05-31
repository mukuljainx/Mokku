import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import "./app.scss";
import Logs from "./logs";
import Mock from "./mocks";
import Header from "./header";
import { ILog } from "../interface/mock";
import theme from "./theme";

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
  route: "logs" | "mock.create";
}

interface IProps {
  domain: string;
  tab: chrome.tabs.Tab;
}

class App extends React.Component<IProps, IState> {
  state: IState = {
    logs: [],
    route: "mock.create",
  };

  checkIfSameTab = (sender: IProps["tab"]) => {
    const { tab } = this.props;
    return sender.index === tab.index && sender.windowId === tab.windowId;
  };

  changeRoute = (route: IState["route"]) => {
    this.setState({ route });
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

    chrome.storage.local.get(["key"], function (result) {
      console.log("Value currently is " + result.key);
    });
  }

  render() {
    const { route, logs } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header route={route} changeRoute={this.changeRoute} />
          <Content>
            {route === "logs" && (
              <Logs changeRoute={this.changeRoute} logs={logs} />
            )}
            {route.indexOf("mock") === 0 && <Mock route={route} />}
          </Content>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;
