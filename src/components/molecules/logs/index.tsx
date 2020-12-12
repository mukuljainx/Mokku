import * as React from "react";
import styled from "styled-components";

import { ILog } from "../../../interface/mock";
import { Button, Icon } from "../../atoms";
import Tooltip from "../../tooltip";
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
} from "../../table";

interface IProps {
  logs: ILog[];
  mockNetworkCall: (log: ILog) => void;
  editMock: (path: string) => void;
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

const CellWrapper = styled("div")``;

const Logs = (props: IProps) => {
  const containerRef = React.useRef(null);
  const [log, setLog] = React.useState<IProps["logs"][0]>();
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  });

  // if (!props.active) {
  //   return (
  //     <EmptyWrapper>
  //       <p>
  //         Mocking is inactive, network calls can only be logged when mocking is
  //         enabled. Please enable mocking form extension popup & click Refresh.
  //       </p>
  //       <Button transparent link onClick={() => location.reload()}>
  //         Refresh
  //       </Button>
  //     </EmptyWrapper>
  //   );
  // }

  if (props.logs.length === 0) {
    return (
      <EmptyWrapper>
        <p>No Network calls logged yet.</p>
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
              <HeaderCell width={40}>
                <CellWrapper></CellWrapper>
              </HeaderCell>
              <HeaderCell width={80}>
                <CellWrapper>Method</CellWrapper>
              </HeaderCell>
              <HeaderCell>
                <CellWrapper>URL</CellWrapper>
              </HeaderCell>
              <HeaderCell width={80}>
                <CellWrapper>Status</CellWrapper>
              </HeaderCell>
              <HeaderCell width={120}>
                <CellWrapper></CellWrapper>
              </HeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableHeadWrapper>
      <TableBodyWrapper ref={containerRef}>
        <Table>
          <TableBody>
            {props.logs.map((log) => (
              <TableRow
                key={log.id}
                onClick={() => {
                  setLog(log);
                }}
              >
                <Cell width={40}>
                  <CellWrapper>
                    <Tooltip
                      tooltipStyle={{ left: 32, top: -7, width: 132 }}
                      tooltip={
                        log.isMocked ? "Mocked Response" : "Network Response"
                      }
                    >
                      <Icon color="primary">
                        {log.isMocked ? "memory" : "wifi"}
                      </Icon>
                    </Tooltip>
                  </CellWrapper>
                </Cell>
                <Cell width={80}>
                  <CellWrapper>{log.request?.method}</CellWrapper>
                </Cell>
                <Cell>
                  <CellWrapper>
                    <p className="ellipsis">{log.request?.url}</p>
                  </CellWrapper>
                </Cell>
                <Cell width={80}>
                  <CellWrapper>{log.response?.status}</CellWrapper>
                </Cell>
                <Cell width={120}>
                  <CellWrapper>
                    {log.mockPath && (
                      <Button
                        icon
                        transparent
                        link
                        onClick={(event) => {
                          event.stopPropagation();
                          props.editMock(log.mockPath);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    {!log.mockPath && log.response && (
                      <Button
                        icon
                        transparent
                        link
                        onClick={(event) => {
                          event.stopPropagation();
                          props.mockNetworkCall(log);
                        }}
                      >
                        Mock
                      </Button>
                    )}
                  </CellWrapper>
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
