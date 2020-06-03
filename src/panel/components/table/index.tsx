import styled from "styled-components";

export const Cell = styled.td<{ width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  text-align: left;
  padding-right: 8px;
  div {
    padding: 8px 0;
    &:first-child {
      padding-left: 8px;
    }
  }
`;

export const HeaderCell = styled.th<{ width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  text-align: left;
  div {
    padding: 8px 0;
    &:first-child {
      padding-left: 8px;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
  border-spacing: 0;
`;

export const TableRow = styled.tr``;

export const TableBodyWrapper = styled.div`
  overflow: auto;
`;

export const TableBody = styled.tbody`
  ${TableRow} {
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

export const TableHeadWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableHead = styled.thead``;
