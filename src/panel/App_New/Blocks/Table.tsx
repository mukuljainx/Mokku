import React from "react";
import { createStyles, Table } from "@mantine/core";

export type TableSchema<T> = Array<{
  header: string;
  content: (data: T) => React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
}>;

export interface TableWrapperProps<T> {
  schema: TableSchema<T>;
  data: T[];
  onRowClick?: (data: T) => void;
  selectedRowId?: number | string;
}

const useStyles = createStyles((theme) => ({
  selectedRow: {
    background: `${theme.colors[theme.primaryColor][3]} !important`,
    "&:hover": {
      background: `${theme.colors[theme.primaryColor][3]} !important`,
    },
  },
  rows: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export const TableWrapper = <T extends unknown & { id: string | number }>({
  schema,
  data,
  onRowClick,
  selectedRowId,
}: TableWrapperProps<T>) => {
  const { classes } = useStyles();

  const ths = (
    <tr>
      {schema.map(({ header, minWidth, maxWidth, width }, index) => (
        <th style={{ minWidth, maxWidth, width }} key={index}>
          {header}
        </th>
      ))}
    </tr>
  );

  const rows = data.map((row, index) => (
    <tr
      key={`row-${index}`}
      onClick={() => {
        onRowClick(row);
      }}
      className={`${selectedRowId === row.id ? classes.selectedRow : ""} ${
        classes.rows
      }`}
    >
      {schema.map(({ content }, index) => (
        <th key={index}>{content(row)}</th>
      ))}
    </tr>
  ));

  return (
    <Table captionSide="bottom" striped highlightOnHover withColumnBorders>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
