import * as React from "react";

import "./app.scss";
import Logs from "./logs";
import Header from "./header";

interface IState {
  logs: any[];
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
          let logs = prevState.logs;
          if (!message.message.status) {
            logs = [...logs, message.message];
          } else if (message.message.id) {
            logs = logs.map((item) =>
              item.id === message.message.id ? message.message : item
            );
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
