import React from "react"; //Not needed
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import InputEmoji from "react-input-emoji";
import io from "socket.io-client";

//Components
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";

//Actions
import { createMessage } from "../../store/actions/messageActions";

function Room() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); //Remove unused code
  const [socket, setSocket] = useState(null);

  const messages = useSelector((state) => state.messages.messages);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  console.log(user); //Remove console log

  const { roomId } = useParams();

  useEffect(() => {
    setSocket(io("localhost:8080"));
  }, []);

  const handleOnEnter = (text) => {
    setText(text);
  };

  console.log(text); //Remove console log

  useEffect(() => {
    if (socket) {
      socket.off("message");
      socket.on("message", ({ message }) => {
        console.log(message, "from room"); //Remove console log
        dispatch(createMessage(message));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && text !== "") {
      socket.emit("message", {
        senderId: user.id,
        image: "gfyjgjyg",
        text: text,
        roomId: +roomId,
      });
    }
  }, [text]);

  //Remove unused code
  // createdAt: "2021-07-31T22:16:48.133Z"
  // id: 19
  // image: "gfyjgjyg"
  // roomId: 3
  // text: "hi ahmad"
  // updatedAt: "2021-07-31T22:16:48.133Z"
  // voicenote: null

  const _messages = messages.filter((msg) => msg.roomId === +roomId);
  if (!_messages) return <Redirect to="/main" />;

  return (
    <>
      <ChatList />
      <GroupList />
      <div className="room-cont">
        <div className="room-head">Title</div>
        {/*Remove inline styling */}
        <div className="body-send" style={{ color: "black" }}>
          {_messages
            ? _messages.map((message) => (
                <>
                  <div>{message.text} </div>
                  <hr />
                </>
              ))
            : ""}
        </div>
        {/*Remove unused code */}
        {/* <div className="body-send">dsfdssd</div> */}

        <div className="footer">
          <InputEmoji
            value={text}
            //   onChange={setText} //Remove unused code
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
