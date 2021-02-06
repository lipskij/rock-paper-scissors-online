import React from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { PlayerCollection } from "../api/players";

// show new/all connected players to every player after putting in username
// put the list on the right side of the screen(done)
// TODO: hidden before username input
// TODO: hidden after selecting and starting a game
// TODO: update list of players after each username input
// TODO: fix how we pun players to array

const Room = () => {
  const game = useTracker(() => {
    Meteor.subscribe("players");

    const waitingRoom = PlayerCollection.findOne(Session.get("players"));
    if (waitingRoom && waitingRoom.user) {
      const player = waitingRoom.user.map(() => Session.get("users"));
      return { player };
    }
    return { player: "" };
  });

  return (
    <div className={game.player.length > 0 ? "room" : "room-closed"}>
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
