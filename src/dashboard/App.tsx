import * as React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";

import Registration from "./Auth/Registration";
import Dashboard from "./Dashboard";
import { IUser } from "../interface/user";

const App = () => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(true);

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
  }, []);

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
            render={(props) => <Dashboard {...props} user={user} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
