import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

import { IStore } from "../../../interface/mock";
import List from "./List";
import Create from "./Create";

interface IProps extends RouteComponentProps {
  store: IStore;
}

const Mocks = ({ store, match }: IProps) => {
  return (
    <Switch>
      <Route
        path={`${match.path}/list`}
        render={(props) => <List {...props} store={store} />}
      />
      <Route path={`${match.path}/create`} component={Create} />
    </Switch>
  );
};

export default Mocks;
