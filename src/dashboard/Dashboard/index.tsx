import * as React from "react";
import { RouteProps, Redirect } from "react-router-dom";
import firebase from "firebase";

import { IUser } from "../../interface/user";
import { Button } from "../../components/core";

interface IProps extends RouteProps {
  user: IUser;
}

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      debugger;
    });
};

const Dashboard = ({ user }: IProps) => {
  if (!user) {
    return <Redirect to="/auth" />;
  }

  return (
    <div>
      current : {user.name} <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
