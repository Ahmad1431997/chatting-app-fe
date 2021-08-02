import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import { createRoom } from "../../store/actions/roomActions";
import { useDispatch } from "react-redux";
import { BiCommentAdd } from "@react-icons/all-files/bi/BiCommentAdd";

const ChatList = () => {
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    users: [],
  });
  const rooms = useSelector((state) => state.rooms.rooms);
  const _users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);
  const otherUsers = _users.filter((_id) => _id.id !== user.id);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => {
    setRoom({ ...room, [event.target.name]: [parseInt(event.target.value)] });
  };

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

  return (
    <div className="chats">
      <div
        style={{
          position: "fixed",
          zIndex: 2,
          marginBottom: "7px",
          backgroundColor: "darkcyan",
        }}
      >
        <span style={{ color: "white" }}>
          <BiCommentAdd color="black" size="2em" onClick={handleShow} />
        </span>
        Your Chats
      </div>
      <br />

      {newList}

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "black" }}>New Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Label style={{ color: "black" }}>
                Select a reciver
              </Form.Label>

              <Form.Control
                name="users"
                // value={users.name}
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={handleChange}
                custom
                required
                // multiple
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
                  {" "}
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
