import * as React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";

import Registration from "./Auth/Registration";
import Dashboard from "./Dashboard";
import { IUser } from "../interface/user";
import { Icon } from "../components/core";
import { IStore } from "../interface/mock";
import { getStore } from "../store";

const App = () => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [store, setStore] = React.useState<IStore | undefined>();

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      }
      setLoading(false);
    });
    getStore().then(({ store }) => {
      setStore(store);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-100 flex flex-column align-items-center justify-content-center">
        <Icon color="primary" style={{ marginBottom: 16, fontSize: 40 }}>
          system_update_alt
        </Icon>
        Loading
      </div>
    );
  }

  return (
    <Router>
      <div className="h-100">
        <Switch>
          <Route
            path="/auth"
            render={(props) => <Registration {...props} user={user} />}
          />
          <Route
            path="/"
            render={(props) => (
              <Dashboard {...props} store={store} user={user} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
