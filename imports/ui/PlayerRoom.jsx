import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PlayerCollection } from "../api/players";

// TODO: hidden before username input
// TODO: hidden after selecting and starting a game
// TODO: update list of players after each username input
// TODO: fix how we pun players to array

const Room = () => {
  const room = useTracker(() => {
    Meteor.subscribe("players");

    return PlayerCollection.find().fetch();
  });

  return (
    <div className={room.length > 0 ? "room" : "room-closed"}>
      <h2>Waiting Room</h2>
      <ul className="list">
        {room.map((item) => (
          <li className='list-itm' key={item._id}>
            {item.user}
            <button className='call-to-play'>play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
