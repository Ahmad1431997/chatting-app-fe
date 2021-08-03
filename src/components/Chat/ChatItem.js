
import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChatItem = ({ _room }) => {
  const loading = useSelector((state) => state.rooms.loading);
  const rooms = useSelector((state) => state.rooms.rooms);
  const user = useSelector((state) => state.user.user);

  if (loading) return <Spinner />;
  const room = rooms.find(
    (room) => room.usersId.includes(_room.id) && room.usersId.includes(user.id)
  );

  return (
    <div>
    <Link className="txtlink" to={`/rooms/${room.roomId}`}>
      <div
        className="card mb-3"
        style={{
          maxWidth: "270px",
          maxHeight: "100px",
          backgroundColor: "#edf2fb",
        }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              className="card-img"
              src={"https://aspirationsschools.com/wp-content/uploads/2021/02/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png"}
              alt={_room.username}
            />
          </div>
          <div className="col-md-8">
            <div>
              <p className="card-title" style={{ marginTop: "10px" }}>

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
