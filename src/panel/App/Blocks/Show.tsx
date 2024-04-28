import React from "react";
interface IProps {
  if: boolean | (() => boolean);
  children: React.ReactNode;
}

export const Show = (props: IProps) => {
  const { if: iff, children } = props;

  if (typeof iff === "boolean" && iff) {
    return <>{children}</>;
  }

  if (typeof iff === "function" && iff()) {
    return <>{children}</>;
  }

  return null;
};
