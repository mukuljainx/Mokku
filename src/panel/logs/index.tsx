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
  return (
    <div className="log">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>URL</th>
            <th>Method</th>
            <th>Status</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          {props.logs.map((log) => (
            <tr key={log.id}>
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
