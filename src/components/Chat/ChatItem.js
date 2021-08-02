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
                src={
                  "https://images-ext-1.discordapp.net/external/-Gh1ENyBFoPNXBjPeDgkgEjkjrbaKJHePdLJsYrVri8/https/cdn.iconscout.com/icon/free/png-512/user-avatar-contact-portfolio-personal-portrait-profile-2-5270.png?width=468&height=468"
                }
                alt={_room.username}
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
