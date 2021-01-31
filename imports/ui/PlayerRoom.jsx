import React from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { PlayerCollection } from "../api/players";
import { GamesCollection } from "../api/games";

// add unique key to every name

const Room = () => {
  const game = useTracker(() => {
    Meteor.subscribe("players");

    const waitingRoom = PlayerCollection.findOne(Session.get("players"));
    if (waitingRoom && waitingRoom.users) {
      const player = waitingRoom.users.indexOf(Session.get("users"));
      return { player };
    }
    return { player: "" };
  });

  const key = PlayerCollection.find()
    .fetch()
    .map((item) => item._id);

  return (
    <div className="room">
      <h3>Waiting Room</h3>
      <ul>
        {PlayerCollection.find()
          .fetch()
          .map((item) => (
            <li
              key={key}
            >
              {item.users[0].toString()}
            </li>
          ))}
      </ul>
      {console.log(
        PlayerCollection.find()
          .fetch()
          .map((item) => item._id)
      )}
      {console.log(game.player)}
    </div>
  );
};

export default Room;
