import React from "react";
import { Table } from "@mantine/core";

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
}

export const TableWrapper = <T extends unknown>({
  schema,
  data,
}: TableWrapperProps<T>) => {
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
    <tr key={`row-${index}`}>
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
