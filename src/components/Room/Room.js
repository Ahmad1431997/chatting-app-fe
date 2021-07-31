import React from "react";
import  { useState } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import ChatList from "../Chat/ChatList";
import GroupList from "../Group/GroupList";
function Room() {
    const [text, setText] = useState("");
    const messages = useSelector(state => state.messages.messages)
    const {roomId} = useParams()
   const message= messages.find((msg)=>msg.roomId===+roomId)
   if(!message) return <Redirect to="/main" />
  console.log(message)
  

    const handleOnEnter=(text)=> {
      setText(text)
    }
  return (
      <>
        <ChatList/>
                    <GroupList/>
    <div className="room-cont">
      <div className="room-head">Title</div>
      <div className="body-send">{message.text?message.text:""}</div>
      {/* <div className="body-send">dsfdssd</div> */}

     
     <div className="footer">
        {" "}
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
