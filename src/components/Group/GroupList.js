import { Button, Modal, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import GroupItem from "./GroupItem";
import { createRoom } from "../../store/actions/roomActions";
import { useDispatch } from "react-redux";
import { AiOutlineUsergroupAdd } from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";

import Select from "react-select";

const GroupList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [room, setRoom] = useState({
    users: [],
    name: "",
  });
  const rooms = useSelector((state) => state.rooms.rooms);
  const _users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);

  const otherUsers = _users.filter((_id) => _id.id !== user.id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createRoom(room));
    handleClose();
    setRoom({
      users: [],
      name: "",
    });
  };

  const groupList = rooms
    .filter((room) => room.usersId.length > 2)
    .filter((users) => users.usersId.includes(user.id))
    .map((_room) => <GroupItem _room={_room} key={_room.id} />);

  const handleChange = (event) => {
    setRoom({
      ...room,
      users: [...room.users, event[event.length - 1].value],
    });
  };

  const handleInputChange = (event) => {
    setRoom({
      ...room,
      [event.target.name]: event.target.value,
    });
  };

  const TheListOfUsers = otherUsers.map((user) => {
    return { value: user.id, label: user.username };
  });

  return (
    <div className="chats-cont">
      <div style={{ marginBottom: 0, marginLeft: "20px" }}>
        <span style={{ color: "white", marginRight: "30%" }}>
          <AiOutlineUsergroupAdd
            color="black"
            size="2em"
            onClick={handleShow}
          />
          &nbsp; new group
        </span>
      </div>

      <div>
        <div className="chats">
          <div
            style={{
              zIndex: 2,
              marginBottom: "7px",
              backgroundColor: "darkcyan",
            }}
          ></div>

          <br />

          {groupList}

          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header style={{ backgroundColor: "#353656" }} closeButton>
                <Modal.Title>New Group</Modal.Title>
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
                    Select members
                  </Form.Label>
                  <Select
                    isMulti
                    name="users"
                    options={TheListOfUsers}
                    className="basic-multi-select optselect"
                    classNamePrefix="select"
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      name="name"
                      type="text"
                      onChange={handleInputChange}
                      placeholder="group name"
                      required
                    />
                  </Form.Group>

                  <Modal.Footer>
                    {room.users.length > 1 ? (
                      <button
                        className="btn secondary btn-primary"
                        type="submit"
                      >
                        {" "}
                        Create a group
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn secondary btn-primary"
                        type="submit"
                      >
                        {" "}
                        Create a group
                      </button>
                    )}

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

export default GroupList;
