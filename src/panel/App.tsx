import * as React from "react";

import "./app.scss";
import Logs from "./logs";
import Header from "./header";
import { ILog } from "../interface/mock";

interface IState {
  logs: ILog[];
}

class App extends React.Component<{}, IState> {
  state = {
    logs: [],
  };

  componentDidMount() {
    chrome.runtime.onMessage.addListener((message, sender, response) => {
      if (message.to !== "PANEL") return;
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
    console.log(this.state.logs);
    return (
      <>
        <Header />
        <Logs logs={this.state.logs} />
      </>
    );
  }
}

export default App;
