import React from "react";
import InputEmoji from "react-input-emoji";
import IoMdSend from "react-input-emoji";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { createMessage } from "../../store/actions/messageActions";
import { Spinner } from "react-bootstrap";
import Profile from "../Profile/Profile";

function Room() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  console.log(roomId);
  const [text, setText] = useState("");

  const [socket, setSocket] = useState(null);
  const messages = useSelector((state) => state.messages.messages);
  const loading = useSelector((state) => state.rooms.loading);

  const rooms = useSelector((state) => state.rooms.rooms);
  const users = useSelector((state) => state.user.allUsers);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    setSocket(io("localhost:8080"));
  }, []);

  const handleOnEnter = (text) => {
    if (text !== "")
      socket.emit("message", {
        senderId: user.id,
        image: "",
        roomId: +roomId,

        text: ` ${user.username} |  ${new Date(Date.now())
          .toString()
          .substr(0, 21)}  : \n\n\n ${text}`,
      });
  };

  useEffect(() => {
    if (socket) {
      socket.off("message");
      socket.on("message", ({ message }) => {
        dispatch(createMessage(message));
      });
    }
  }, [socket]);

  const el = useRef(null);

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
      //
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
        <div className="room-head">{title()}</div>

        {_messages
          ? _messages.map((message) => (
              <>
                {user.id === message.senderId ? (
                  <>
                    <div className="body-send">{message.text}</div>
                  </>
                ) : (
                  <div className="body-recive">{message.text} </div>
                )}
              </>
            ))
          : ""}

        <div className="footer">
          <IoMdSend
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message..."
            style={{
              width: "40px",
              height: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Room;
