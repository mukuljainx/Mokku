import styled from "styled-components";

export const Cell = styled.td<{ width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  text-align: left;
  padding-right: 8px;
  &:first-child {
    padding-left: 8px;
  }
  > div {
    padding: 8px 0;
  }
`;

export const HeaderCell = styled.th<{ width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  text-align: left;
  &:first-child {
    padding-left: 8px;
  }
  > div {
    padding: 8px 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  overflow-wrap: break-word;
  border-spacing: 0;
`;

export const TableRow = styled.tr`
  cursor: pointer;
`;

export const TableBodyWrapper = styled.div`
  overflow: auto;
`;

export const TableBody = styled.tbody<{ mouseCursor?: boolean }>`
  ${TableRow} {
    &:nth-child(2n) {
      background-color: ${({ theme }) => theme.colors.light};
    }
    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

export const TableHeadWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableHead = styled.thead``;
