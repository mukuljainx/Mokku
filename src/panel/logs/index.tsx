import * as React from "react";

import "./index.scss";
import { ILog } from "../../interface/mock";

interface IProps {
  logs: ILog[];
}

const Logs = (props: IProps) => {
  const [log, setLog] = React.useState<IProps["logs"][0]>();
  return (
    <div className="log">
      {log && (
        <div className="log-response">
          <button onClick={() => setLog(undefined)}>close</button>
          <pre>{log.response?.response}</pre>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th className="small-width"></th>
            <th>URL</th>
            <th className="small-width">Method</th>
            <th className="small-width">Status</th>
            <th className="table-button">Response</th>
          </tr>
        </thead>
        <tbody>
          {props.logs.map((log) => (
            <tr
              key={log.id}
              onClick={() => {
                setLog(log);
              }}
            >
              <td>--</td>
              <td>{log.request?.url}</td>
              <td>{log.request?.method}</td>
              <td>{log.response?.status}</td>
              <td>
                {log.response?.response ? (
                  <button>View Response</button>
                ) : (
                  "Pending..."
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
