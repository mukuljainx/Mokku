import * as React from "react";
import styled from "styled-components";

import {
  Table,
  Cell,
  HeaderCell,
  TableBody,
  TableHead,
  TableBodyWrapper,
  TableHeadWrapper,
  TableRow,
} from "../../components/table";
import { IStore, IMockResponse } from "../../../interface/mock";

const Wrapper = styled("div")`
  height: 100%;
`;

const EmptyWrapper = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const CellWrapper = styled("div")``;

const getTotalMockCount = (store: IStore) => {
  let total = 0;
  total += store.mocks.length;
  Object.keys(store.collections).forEach((item) => {
    total += store.collections[item].mocks.length;
  });

  return total;
};

interface IProps {
  store: IStore;
  changeRoute: (route: string) => void;
  onAction: (action: "add" | "delete" | "edit", mock: IMockResponse) => void;
  editMock: (mock: IMockResponse) => void;
}

const List = (props: IProps) => {
  const { store } = props;
  if (getTotalMockCount(store) === 0) {
    return (
      <EmptyWrapper>
        <p>No Mocks Yet.</p>
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
      <TableHeadWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell width={80}>
                <div>Id</div>
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
              <HeaderCell width={80}>
                <div>Delay</div>
              </HeaderCell>
              <HeaderCell width={120}></HeaderCell>
              <HeaderCell width={120}></HeaderCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableHeadWrapper>
      <TableBodyWrapper>
        <Table>
          <TableBody>
            {store.mocks.map((mock, index) => (
              <TableRow key={index}>
                <Cell width={80}>
                  <CellWrapper>{mock.id}</CellWrapper>
                </Cell>
                <Cell>
                  <CellWrapper>{mock.url}</CellWrapper>
                </Cell>
                <Cell width={80}>
                  <CellWrapper>{mock.method}</CellWrapper>
                </Cell>
                <Cell width={80}>
                  <CellWrapper>{mock.status}</CellWrapper>
                </Cell>
                <Cell width={80}>
                  <CellWrapper>{mock.delay}</CellWrapper>
                </Cell>
                <Cell width={120}>
                  <CellWrapper>
                    <button
                      onClick={() => {
                        props.editMock(mock);
                      }}
                    >
                      Edit
                    </button>
                  </CellWrapper>
                </Cell>
                <Cell width={120}>
                  <CellWrapper>
                    <button onClick={() => props.onAction("delete", mock)}>
                      Delete
                    </button>
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

export default List;
