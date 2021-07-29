import { Button, Modal, Form, FormGroup } from "react-bootstrap";
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

  const _users = useSelector((state) => state.user.allUsers);

  console.log("from here");
  console.log(_users);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test");
    dispatch(createRoom(room));
    handleClose();
  };

  const rooms = useSelector((state) => state.rooms.rooms);

  const chatList = rooms
    .filter((room) => room.usersId.length === 2)
    .map((_room) => _users.find((_id) => _id.id === _room.usersId[0]));

  console.log(chatList);

  const newList = chatList.map((userobj) => (<ChatItem _room={userobj} key={userobj.id} />));

  // console.log(newList)

  const handleChange = (event) => {
    console.log("here");
    console.log(event.target.name, event.target.value);

    setRoom({ ...room, [event.target.name]: [parseInt(event.target.value)] });

    console.log(room);
  };

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
            <Modal.Title>Start a chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Label>contact</Form.Label>

              <Form.Control
                name="users"
                // value={users.name}
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={handleChange}
                custom
                // multiple
              >


                <option value="">Select User</option>

                {_users.map((user) => (
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
