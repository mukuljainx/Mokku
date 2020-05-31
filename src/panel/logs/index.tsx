import * as React from "react";
import styled from "styled-components";

import { ILog } from "../../interface/mock";
import Detail from "./detail";

interface IProps {
  logs: ILog[];
}

const Wrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .table-header {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  .table-body {
    overflow: auto;
    tr {
      cursor: pointer;
      &:hover {
        background: ${({ theme }) => theme.colors.primaryLight};
      }
    }
  }
  table {
    width: 100%;
    table-layout: fixed;
    overflow-wrap: break-word;
    border-spacing: 0;
    th {
      text-align: left;
    }
    td,
    th {
      padding-right: 8px;
      &.small-width {
        width: 80px;
      }
      div {
        padding: 8px 0;
      }
    }
    .table-button {
      width: 160px;
    }
  }
`;

const Logs = (props: IProps) => {
  const [log, setLog] = React.useState<IProps["logs"][0]>();
  return (
    <Wrapper>
      {log && <Detail log={log} onClose={() => setLog(undefined)} />}
      <div className="table-header">
        <table>
          <thead>
            <tr>
              <th className="small-width">
                <div></div>
              </th>
              <th>
                <div>URL</div>
              </th>
              <th className="small-width">
                <div>Method</div>
              </th>
              <th className="small-width">
                <div>Status</div>
              </th>
              <th className="table-button">
                <div></div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="table-body">
        <table>
          <tbody>
            {props.logs.map((log) => (
              <tr
                key={log.id}
                onClick={() => {
                  setLog(log);
                }}
              >
                <td className="small-width">--</td>
                <td>
                  <div>
                    <p className="ellipsis">{log.request?.url}</p>
                  </div>
                </td>
                <td className="small-width">
                  <div>{log.request?.method}</div>
                </td>
                <td className="small-width">
                  <div>{log.response?.status}</div>
                </td>
                <td className="table-button">
                  {log.response?.response ? (
                    log.response?.status ? (
                      <button className="link">Mock</button>
                    ) : (
                      "-"
                    )
                  ) : (
                    "Pending..."
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Logs;
