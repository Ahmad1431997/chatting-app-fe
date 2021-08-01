import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const ChatItem = ({ _room }) => {
  const rooms = useSelector((state) => state.rooms.rooms);
  const room = rooms.find((room) => room.usersId.includes(_room.id));
  // const members = users.map(usr=> usr.id)
  console.log(room);

  return (
    <div>
      <Link to={`/rooms/${room.roomId}`}>
        <div
          className="card mb-3"
          style={{
            maxWidth: "150px",
            maxHeight: "100px",
            backgroundColor: "darkgray",
          }}
        >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                className="card-img"
                src={"https://i.dlpng.com/static/png/7115850_preview.png"}
                alt="ahmad"
              />
            </div>
            <div className="col-md-8">
              <div>
                <p className="card-title" style={{ marginTop: "10px" }}>
                  {/* {_room.users.includes(user.id)? <p>{users.name}</p> : ""}  */}

                  {_room.username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChatItem;
