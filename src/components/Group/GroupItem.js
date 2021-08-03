import React from "react";
import { Link } from "react-router-dom";

const GroupItem = ({ _room }) => {
  return (
    <div>
      <Link className="txtlink" to={`/rooms/${_room.roomId}`}>
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
                src={
                  "https://www.kindpng.com/picc/m/263-2637306_society-icon-png-transparent-png.png"
                }
                alt={_room.name}
              />
            </div>
            <div className="col-md-8">
              <div>
                <p className="card-title" style={{ marginTop: "10px" }}>
                  {_room.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GroupItem;
