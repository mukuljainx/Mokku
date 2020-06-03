import * as React from "react";
import styled from "styled-components";

import { ILog } from "../../interface/mock";
import Detail from "./detail";
import {
  Table,
  Cell,
  HeaderCell,
  TableBody,
  TableHead,
  TableBodyWrapper,
  TableHeadWrapper,
  TableRow,
} from "../components/table";

interface IProps {
  logs: ILog[];
  changeRoute: (route: string) => void;
}

const Wrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const EmptyWrapper = styled("div")`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logs = (props: IProps) => {
  const [log, setLog] = React.useState<IProps["logs"][0]>();

  if (props.logs.length === 0) {
    return (
      <EmptyWrapper>
        <p>Network Logs will appear here.</p>
        <button
          className="button link"
          onClick={() => props.changeRoute("mock.create")}
        >
          Create a Mock
        </button>
      </EmptyWrapper>
    );
  }

  return (
    <Wrapper>
      {log && <Detail log={log} onClose={() => setLog(undefined)} />}
      <TableHeadWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell width={80}>
                <div></div>
              </HeaderCell>
              <HeaderCell>
                <div>URL</div>
              </HeaderCell>
              <HeaderCell width={80}>
                <div>Method</div>
              </HeaderCell>
              <HeaderCell width={80}>
                <div>Status</div>
              </HeaderCell>
              <HeaderCell width={120}>
                <div></div>
              </HeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableHeadWrapper>
      <TableBodyWrapper>
        <Table>
          <TableBody>
            {props.logs.map((log) => (
              <TableRow
                key={log.id}
                onClick={() => {
                  setLog(log);
                }}
              >
                <Cell width={80}>
                  <div>{log.isMocked ? "M" : "N"}</div>
                </Cell>
                <Cell>
                  <div>
                    <p className="ellipsis">{log.request?.url}</p>
                  </div>
                </Cell>
                <Cell width={80}>
                  <div>{log.request?.method}</div>
                </Cell>
                <Cell width={80}>
                  <div>{log.response?.status}</div>
                </Cell>
                <Cell width={120}>
                  {log.response?.response ? (
                    log.response?.status ? (
                      <button className="link">Mock</button>
                    ) : (
                      "-"
                    )
                  ) : (
                    "Pending..."
                  )}
                </Cell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableBodyWrapper>
    </Wrapper>
  );
};

export default Logs;
