import React from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { createMessage } from "../../store/actions/messageActions";
import { Spinner } from "react-bootstrap";

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
    setText(`${user.username} : ${text}`);
  };

  useEffect(() => {
    if (socket) {
      socket.off("message");
      socket.on("message", ({ message }) => {
        dispatch(createMessage(message));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && text !== null) {
      socket.emit("message", {
        senderId: user.id,

        image: "",
        text: text,
        roomId: +roomId,
      });
    }
  }, [text]);

  const title = () => {
    if (loading) return <Spinner />;
    const certainRoom = rooms.find((room) => room.roomId === +roomId);

    if (certainRoom.usersId.length > 2) {
      return certainRoom.name;
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
    <>
      <ChatList />
      <GroupList />
      <div className="room-cont">
        <div className="room-head">{title()}</div>
        <div style={{ color: "black" }}>
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
        </div>

        <div className="footer">
          <InputEmoji
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
          />
        </div>
      </div>
    </>
  );
}

export default Room;
