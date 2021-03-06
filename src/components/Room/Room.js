import React from "react";
import IoMdSend from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import {
  createMessage,
  deleteMessage,
  deleteMessageFromBoth,
  updateMessage,
} from "../../store/actions/messageActions";
import { Spinner } from "react-bootstrap";
import Profile from "../Profile/Profile";
import { RiDeleteBin2Line } from "@react-icons/all-files/ri/RiDeleteBin2Line";
import { GrEdit } from "@react-icons/all-files/gr/GrEdit";

import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

function Room() {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const [socket, setSocket] = useState(null);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(null);

  const messages = useSelector((state) => state.messages.messages);
  const loading = useSelector((state) => state.rooms.loading);
  const rooms = useSelector((state) => state.rooms.rooms);
  const users = useSelector((state) => state.user.allUsers);
  const user = useSelector((state) => state.user.user);
  const el = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnEnter = (text) => {
    if (text) {
      socket.emit("message", {
        senderId: user.id,
        image: "",
        roomId: +roomId,

        text: ` ${user.username} |  ${new Date(Date.now())
          .toString()
          .substr(0, 21)}  : \n\n\n    ${text}`,
      });
    }
  };

  const handleInputChange = (event) => {
    setMsg({
      ...msg,
      text: ` ${user.username} |  ${new Date(Date.now())
        .toString()
        .substr(0, 21)}  : \n\n\n ${event.target.value}`,
    });
  };
  const handleUpdate = (event, message) => {
    event.preventDefault();

    handleClose();
    message = { ...message, ...msg };

    if (message)
      socket.emit("messageUpdate", {
        message,
      });
  };

  const handleDelete = (messageId) => {
    dispatch(deleteMessage(messageId));
  };

  const handleDeleteFromBoth = (messageId) => {
    if (messageId)
      socket.emit("messageDelete", {
        messageId,
      });
  };

  useEffect(() => {
    setSocket(io("localhost:8080"));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.off("messageDelete");
      socket.on("messageDelete", (messageId) => {
        dispatch(deleteMessageFromBoth(messageId));
      });

      socket.off("message");
      socket.on("message", ({ message }) => {
        dispatch(createMessage(message));
      });

      socket.off("messageUpdate");
      socket.on("messageUpdate", (message) => {
        console.log(message);
        dispatch(updateMessage(message));
      });
    }
  }, [socket]);

  useEffect(() => {
    el.current.scrollIntoView({ block: "end" });
  });

  const title = () => {
    if (loading) return <Spinner />;
    const certainRoom = rooms.find((room) => room.roomId === +roomId);
    if (certainRoom.usersId.length > 2) {
      const usersName = certainRoom.usersId
        .map((id) => users.find((user) => user.id === id))
        .map((name) => {
          return (
            <>
              <b>{name.username} &nbsp;</b>
            </>
          );
        });

      return (
        <>
          <h1>{certainRoom.name}</h1>
          Group members: {usersName}
        </>
      );
    } else {
      return users.find(
        (_user) =>
          _user.id == certainRoom.usersId.filter((id) => id !== user.id)
      ).username;
    }
  };
  const _messages = messages.filter((msg) => msg.roomId === +roomId);
  if (!_messages) return <Redirect to="/main" />;

  return (
    <div>
      <Profile />
      <ChatList />
      <GroupList />
      <div className="room-cont" id={"el"} ref={el}>
        <div className="room-head">
          {title()}

          <Link
            style={{
              color: "darkcyan",
              position: "absolute",
              right: "15px",
              fontSize: "28px",
              textDecorationLine: "none",
            }}
            to="/main"
          >
            ??? 
          </Link>
        </div>

        {_messages
          ? _messages.map((message) => (
              <>
                {user.id === message.senderId ? (
                  <>
                    <div className="body-send">
                      {message.text}

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header
                          style={{ backgroundColor: "#353656" }}
                          closeButton
                        >
                          <Modal.Title>update message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form
                            style={{
                              backgroundColor: "#353656",
                              margin: "auto",
                              border: "solid 3px black",
                            }}
                            onSubmit={(event) => handleUpdate(event, message)}
                          >
                            <br />
                            <Form.Group controlId="formBasicEmail">
                              <Form.Control
                                name="name"
                                type="text"
                                onChange={handleInputChange}
                                placeholder="edited message"
                                required
                              />
                            </Form.Group>

                            <Modal.Footer style={{ justifyContent: "center" }}>
                              <Button type="submit" variant="success">
                                edit
                              </Button>

                              <Button
                                type="submit"
                                variant="danger"
                                onClick={() => handleDelete(message.id)}
                              >
                                delete for me
                              </Button>

                              <Button
                                type="submit"
                                variant="danger"
                                onClick={() => handleDeleteFromBoth(message.id)}
                              >
                                delete for all
                              </Button>

                              <Button variant="secondary" onClick={handleClose}>
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Form>
                        </Modal.Body>
                      </Modal>
                      <GrEdit onClick={() => handleShow()} />
                    </div>
                  </>
                ) : (
                  <div className="body-recive">{message.text} </div>
                )}
              </>
            ))
          : ""}
      </div>
      <span className="footer">
        <IoMdSend
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message..."
        />
      </span>
    </div>
  );
}

export default Room;
