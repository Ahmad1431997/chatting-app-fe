import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import Profile from "../Profile/Profile";

function MainPage() {
  return (
    <div>
      <Profile />
      <ChatList />
      <GroupList />
    </div>
  );
}

export default MainPage;
