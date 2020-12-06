import * as React from "react";
import { RouteProps, Redirect } from "react-router-dom";
import firebase from "firebase";

import { IUser } from "../../interface/user";
import { Button } from "../../components/core";
import Nav from "./Nav";
import { IStore } from "../../interface/mock";
import Mocks from "./Mock";

interface IProps extends RouteProps {
  user?: IUser;
  store: IStore;
}

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {});
};

const Dashboard = ({ user, store }: IProps) => {
  return (
    <div>
      <Nav signOut={signOut} />
      <Mocks store={store} />
    </div>
  );
};

export default Dashboard;
