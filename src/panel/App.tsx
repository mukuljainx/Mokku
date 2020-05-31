import * as React from "react";
import styled, { ThemeProvider } from "styled-components";

import "./app.scss";
import Logs from "./logs";
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
`;

interface IState {
  logs: ILog[];
  route: string;
}

interface IProps {
  domain: string;
  tab: chrome.tabs.Tab;
}

class App extends React.Component<IProps, IState> {
  state = {
    logs: [],
    route: "logs",
  };

  checkIfSameTab = (sender: IProps["tab"]) => {
    const { tab } = this.props;
    return sender.index === tab.index && sender.windowId === tab.windowId;
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
  }

  render() {
    const { route, logs } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header />
          <Content>{route === "logs" && <Logs logs={logs} />}</Content>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default App;
