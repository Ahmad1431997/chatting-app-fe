import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import { createRoom } from "../../store/actions/roomActions";
import { useDispatch } from "react-redux";
import { AiOutlineUserAdd } from "@react-icons/all-files/ai/AiOutlineUserAdd";

const ChatList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    users: [],
  });
  const rooms = useSelector((state) => state.rooms.rooms);
  const _users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);

  const otherUsers = _users.filter((_id) => _id.id !== user.id);
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
    <div className="chats-cont">
      <div style={{ marginBottom: 0, marginLeft: "20px" }}>
        <span style={{ color: "white", marginRight: "30%" }}>
          <AiOutlineUserAdd color="black" size="2em" onClick={handleShow} />
          &nbsp; new chat
        </span>
      </div>

      <div>
        <div className="chats">
          <br />

          {newList}

          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header style={{ backgroundColor: "#353656" }} closeButton>
                <Modal.Title>New Chat</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form
                  style={{
                    backgroundColor: "#353656",
                    margin: "auto",
                    border: "solid 3px black",
                  }}
                  onSubmit={handleSubmit}
                >
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Select a reciver
                  </Form.Label>

                  <Form.Control
                    name="users"
                    as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect"
                    onChange={handleChange}
                    custom
                    required
                  >
                    <option value="">Select User</option>

                    {otherUsers.map((user) => (
                      <option
                        value={user.id}
                        name={user.username}
                        key={user.id}
                      >
                        {user.username}
                      </option>
                    ))}
                  </Form.Control>

                  <Modal.Footer>
                    <button className="btn secondary btn-primary" type="submit">
                      Start a Chat
                    </button>

                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
