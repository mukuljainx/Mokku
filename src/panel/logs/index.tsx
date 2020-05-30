import * as React from "react";

import "./index.scss";

interface IProps {
  logs: Array<{
    url: string;
    method: string;
    status: number;
    text: string;
    id: number;
  }>;
}

const Logs = (props: IProps) => {
  const [log, setLog] = React.useState<IProps["logs"][0]>();
  return (
    <div className="log">
      {log && (
        <div className="log-response">
          <button onClick={() => setLog(undefined)}>close</button>
          <pre>{log.text}</pre>
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
              <td>{log.url}</td>
              <td>{log.method}</td>
              <td>{log.status}</td>
              <td>
                {log.text ? <button>View Response</button> : "Pending..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
