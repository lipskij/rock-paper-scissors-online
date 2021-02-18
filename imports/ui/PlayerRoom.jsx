import React from "react";
import { Presence } from "meteor/tmeasday:presence";

// find my index
// find other players names
// find other players indexes

const Room = ({ room }) => {
  const otherlUsers = room.map((i) => i.state);
  const myName = Presence.state("user");
  const userNames = otherlUsers.map((i) => i.user);
  const myIndex = userNames.indexOf(myName.user);

  console.log(myName);
  console.log(myIndex);
  console.log(userNames);
  console.log(userNames.indexOf(userNames));
  const clickHandler = () => {
    alert('lol');
  };

  return (
    <div className={room.length > 0 ? "room" : "room-closed"}>
      <h2>Waiting Room</h2>
      <ul className='list'>
        {room.map((item) => (
          <li className='list-itm' key={item._id}>
            {item.state.user}
            <button className='call-to-play' onClick={() => clickHandler()}>
              play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
