//style
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Switch } from "react-router";

//components
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import MainPage from "./components/Main/MainPage";
import Room from "./components/Room/Room";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <>
    
    <Switch>
      <Route path="/rooms/:roomId">{user && <Room />}</Route>

      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/main">{user && <MainPage />}</Route>

      <Route path="/">
        <Signin />
      </Route>
    </Switch>
    </>
  );
}

export default App;
