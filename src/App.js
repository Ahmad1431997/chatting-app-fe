//style
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch } from "react-router";

//components
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import MainPage from "./components/Main/MainPage";
import Room from "./components/Room/Room";

function App() {
  return (
    <Switch>
    
        <Route path="/rooms/:roomId">

<Room/>
</Route>

      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/main">
        <MainPage />
      </Route>
      

      <Route path="/">
        <Signin />
      </Route>
    </Switch>
  );
}

export default App;
