import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import Logs from "../../../components/molecules/logs";
import { ILog } from "../../../interface/mock";

interface IProps extends RouteComponentProps {}

const DashboardLogs = (props: IProps) => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, response) => {
      // if (message.to !== "PANEL" || !this.checkIfSameTab(sender.tab)) return;
      if (message.to !== "PANEL") {
        return;
      }
      if (message.type === "LOG") {
        const newLog: ILog = message.message;
        setLogs((prevLogs) => {
          if (!newLog.response) {
            return [...prevLogs, newLog];
          } else if (newLog.id) {
            return prevLogs.map((item) =>
              item.id === newLog.id ? newLog : item
            );
          }
        });
      }
    });
  }, []);

  return (
    <div>
      <Logs logs={logs} editMock={() => {}} mockNetworkCall={() => {}} />
    </div>
  );
};

export default DashboardLogs;
