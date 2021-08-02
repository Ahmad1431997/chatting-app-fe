import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Styling
import { Button, Modal, Form } from "react-bootstrap";
import { BiCommentAdd } from "@react-icons/all-files/bi/BiCommentAdd";

//Components
import ChatItem from "./ChatItem";

//Actions
import { createRoom } from "../../store/actions/roomActions";

const ChatList = () => {
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    users: [],
  });

  const rooms = useSelector((state) => state.rooms.rooms);
  const _users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);

  const otherUsers = _users.filter((_id) => _id.id !== user.id);

  console.log(otherUsers); //Remove console log

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRoom(room));
    handleClose();
    setRoom({
      users: [],
    });
  };

  const finalList = rooms
    .filter((room) => room.usersId.length === 2)
    .filter((users) => users.usersId.includes(user.id))
    .map((_room) => otherUsers.find((_id) => _room.usersId.includes(_id.id)));

  const uniqueChatList = [...new Set(finalList)];

  const newList = uniqueChatList.map((userobj) => (
    <ChatItem _room={userobj} key={userobj.id} />
  ));

  const handleChange = (event) => {
    setRoom({ ...room, [event.target.name]: [parseInt(event.target.value)] });
  };

  return (
    <div className="chats">
      <div
        style={{
          position: "fixed",
          zIndex: 2,
          marginBottom: "7px",
          backgroundColor: "darkcyan",
        }} //Remove inline styling
      >
        {/*Remove inline styling*/}
        <span style={{ color: "white" }}>
          <BiCommentAdd color="black" size="2em" onClick={handleShow} />
        </span>
        Your Chats
      </div>
      <br /> {/*Remove break and add a margin instead*/}
      {newList}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {/*Remove inline styling*/}
            <Modal.Title style={{ color: "black" }}>New Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/*Remove inline styling*/}
              <Form.Label style={{ color: "black" }}>
                Select a receiver
              </Form.Label>

              <Form.Control
                name="users"
                // value={users.name} //Remove unused code
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={handleChange}
                custom
                required
                // multiple //Remove unused code
              >
                <option value="">Select User</option>

                {otherUsers.map((user) => (
                  <option value={user.id} name={user.username} key={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>

              <Modal.Footer>
                <button className="btn secondary btn-primary" type="submit">
                  Start a Chat
                </button>

                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default ChatList;

//Remove unused code

// {otherUsers.map((user) =>
//   room.users.includes(user.id) ? (
//     <option
//       disabled
//       value={user.id}
//       name={user.username}
//       key={user.id}
//     >
//       {user.username}
//     </option>
//   ) : (
//     <option value={user.id} name={user.username} key={user.id}>
//       {user.username}
//     </option>
//   )
// )}
/* const finalList = rooms
    .filter((room) => room.usersId.length === 2)
    .filter((users) => users.usersId.includes(user.id));*/
