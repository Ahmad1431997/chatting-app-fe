import React from "react"; //Not needed
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router"; //Removed unused import

//Components
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import Profile from "../Profile/Profile";
import Room from "../Room/Room"; //Remove unused import

//Actions
import { signout } from "../../store/actions/authActions"; //Remove unused import

function MainPage() {
  const dispatch = useDispatch(); //Remove unused code
  const history = useHistory(); //Remove unused code

  return (
    <div>
      <Profile />
      <ChatList />
      <GroupList />

      {/*Remove unused code */}
      {/* <Room/> */}

      {/* <button onClick={() => { dispatch(signout(history)) }} >Logout</button> */}
      {/* put it in the user profile */}
    </div>
  );
}

export default MainPage;
