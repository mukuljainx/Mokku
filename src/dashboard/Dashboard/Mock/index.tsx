import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { IStore } from "../../../interface/mock";
import List from "./List";
import Create from "./Create";

interface IProps {
  store: IStore;
}

const Mocks = ({ store }: IProps) => {
  return (
    <Routes>
      <Route path="list" element={<List store={store} />} />
      <Route path="create" element={<Create />} />
    </Routes>
  );
};

export default Mocks;
