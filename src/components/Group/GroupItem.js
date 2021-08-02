import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GroupItem = ({ _room }) => {
  return (
    <div>
      <Link to={`/rooms/${_room.roomId}`}>
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
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtPyxGKybSpG2tEyeHPaIyoAvIn3dUbJGpWJ1pqe_-ROdV14KAty1F6C6Oby47qYr5ibg&usqp=CAU"
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
