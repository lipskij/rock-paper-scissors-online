import React from "react";

const Room = ({ room }) => {
  return (
    <div className={room.length > 0 ? "room" : "room-closed"}>
      <h2>Waiting Room</h2>
      <ul className="list">
        {room.map((item) => (
          <li className="list-itm" key={item._id}>
            {item.state.user}
            <button className="call-to-play">play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
