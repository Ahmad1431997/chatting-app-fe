import React from "react";
import { useSelector } from "react-redux";

const ChatItem = ({ _room }) => {
  const users = useSelector((state) => state.user.allUsers);

  const user = useSelector((state) => state.user.user);
  // const members = users.map(usr=> usr.id)


  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: "150px", maxHeight: "100px", backgroundColor:"darkgray" }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img className="card-img" src={"https://i.dlpng.com/static/png/7115850_preview.png"} alt="ahmad" />
          </div>
          <div className="col-md-8">
            <div >
              <p className="card-title"style={{ marginTop:"10px"}}  >

              {/* {_room.users.includes(user.id)? <p>{users.name}</p> : ""}  */}

                    {_room.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
