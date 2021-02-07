import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PlayerCollection } from "../api/players";

// show new/all connected players to every player after putting in username
// put the list on the right side of the screen(done)
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
          <li key={item._id}>{item.user}</li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
