import * as React from "react";
import { RouteProps, Route, Routes } from "react-router-dom";
import firebase from "firebase";

import { IUser } from "../../interface/user";
import { IStore } from "../../interface/mock";

import SideNav from "./SideNav";
import Nav from "./Nav";
import Mocks from "./Mock";
import Logs from "./Logs";

interface IProps {
  user?: IUser;
  store: IStore;
}

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {});
};

const Dashboard = ({ store }: IProps) => {
  return (
    <div className="h-100 flex flex-column">
      <Nav signOut={signOut} />
      <div className="flex flex-grow">
        <SideNav className="flex-shrink" />
        <div className="h-100 flex-grow">
          <Routes>
            <Route path="/mocks" element={<Mocks store={store} />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
