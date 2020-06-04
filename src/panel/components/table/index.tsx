import styled from "styled-components";
import { ThemeType } from "../../theme";

export const Cell = styled.td<{ width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  text-align: left;
  padding-right: 8px;
  &:first-child {
    padding-left: 8px;
  }
  div {
    padding: 8px 0;
  }
`;

export const HeaderCell = styled.th<{ width?: number }>`
  ${({ width }) => width && `width: ${width}px`};
  text-align: left;
  &:first-child {
    padding-left: 8px;
  }
  div {
    padding: 8px 0;
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

export const TableBody = styled.tbody<{ mouseCursor?: boolean }>`
  ${TableRow} {
    ${({ mouseCursor }) => mouseCursor && `cursor: pointer;`};
    &:hover {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

export const TableHeadWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableHead = styled.thead``;

export const Icon = styled.i.attrs({ className: "material-icons" })<{
  color?: keyof ThemeType["colors"];
}>`
  font-size: 16px;
  vertical-align: middle;
  ${({ theme, color }) => color && `color: ${theme.colors[color]};`};
`;

export const Button = styled.button<{ transparent?: boolean; link?: boolean }>`
  border: none;
  border-radius: 4px;
  line-height: 1;
  padding: 2px 4px;
  ${({ transparent }) => transparent && `background: transparent;`};
  ${({ link, theme }) => link && `color: ${theme.colors.primary};`};
`;
