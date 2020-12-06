import * as React from "react";
import { IStore } from "../../../interface/mock";
import List from "./List";

interface IProps {
  store: IStore;
}

const Mocks = ({ store }: IProps) => {
  return (
    <div>
      <List store={store} />
    </div>
  );
};

export default Mocks;
