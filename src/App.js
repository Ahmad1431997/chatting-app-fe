//style
import "./App.css";

import { Route, Switch } from "react-router";

//components
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <Switch>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/">
        <Signin />
      </Route>
    </Switch>
  );
}

export default App;
