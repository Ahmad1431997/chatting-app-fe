import React from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { createMessage } from "../../store/actions/messageActions";
function Room() {
  const [text, setText] = useState("");
  const [socket, setSocket] = useState(null);
  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(user);
  const { roomId } = useParams();

  useEffect(() => {
    setSocket(io("localhost:8080"));
  }, []);

  const handleOnEnter = (text) => {
    setText(text);
  };
  console.log(text);
  useEffect(() => {
    if (socket) {
      socket.emit("message", {
        senderId: user.id,
        image: "gfyjgjyg",
        text: text,
        roomId: +roomId,
      });
      socket.on("message", (message) => {
        dispatch(createMessage(message));
      });
    }
  }, [text]);

  // createdAt: "2021-07-31T22:16:48.133Z"
  // id: 19
  // image: "gfyjgjyg"
  // roomId: 3
  // text: "hi ahmad"
  // updatedAt: "2021-07-31T22:16:48.133Z"
  // voicenote: null

  const _messages = messages.filter((msg) => msg.roomId === +roomId);
  // if (!message) return <Redirect to="/main" />;

  return (
    <>
      <ChatList />
      <GroupList />
      <div className="room-cont">
        <div className="room-head">Title</div>
        <div className="body-send" style={{ color: "black" }}>
          {_messages ? _messages.map((message) => message.text) : ""}
          {text}
        </div>
        {/* <div className="body-send">dsfdssd</div> */}

        <div className="footer">
          <InputEmoji
            value={text}
            //   onChange={setText}
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
