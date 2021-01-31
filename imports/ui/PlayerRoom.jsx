import React from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { PlayerCollection } from "../api/players";

// show new/all connected players to every player
// put the list on the right side of the screen

const Room = () => {
  const game = useTracker(() => {
    Meteor.subscribe("players");

    const waitingRoom = PlayerCollection.findOne(Session.get("players"));
    if (waitingRoom && waitingRoom.user) {
      const player = waitingRoom.user.map(() => (Session.get("users")));
      return { player };
    }
    return { player: "" };
  });

  return (
    <div className="room">
      <h3>Waiting Room</h3>
      <ul className="list">
        {PlayerCollection.find()
          .fetch()
          .map((item, key) => (
            <li key={key}>{item.user[0].toString()}</li>
          ))}
      </ul>
    </div>
  );
};

export default Room;
