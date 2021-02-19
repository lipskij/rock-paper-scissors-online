import React, { useState } from "react";
import { Presence } from "meteor/tmeasday:presence";
import { GamesCollection } from "../api/games";
import { useTracker } from "meteor/react-meteor-data";

// put the player into the gameID (game room) after pressing play
// dont show the list for both playing players
// dont show users if they are in the game for other players
// make a quit game button ant after click set status back to isPlaying: false
// and show them the waiting room

const Room = ({ room }) => {
  const myName = Presence.state("user");

  const [hideList, setHideList] = useState(false);

  const game = useTracker(() => {
    Meteor.subscribe("games");
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame && currentGame.players && currentGame.players.length > 1) {
      setHideList(true);

      Meteor.call("userPresence", myName.user, (err, result) => {
        Session.set({
          isPlaying: true,
        });
      });
    }
    return currentGame;
  }, [setHideList]);

  console.log(room);

  return hideList ? null : (
    <div className={room.length > 0 ? "room" : "room-closed"}>
      <h2>Waiting Room</h2>
      <ul className='list'>
        {room.map((item) => (
          <li className='list-itm' key={item._id}>
            {item.state.user}
            {item.state.user === myName.user ? null : (
              <button
                className='call-to-play'
                onClick={(event) => {
                  event.preventDefault();
                  Meteor.call("CreateGame", myName.user, (error, result) => {
                    Session.set({
                      gameID: result.gameID,
                      username: myName.user,
                    });
                    setHideList(true);
                  });
                }}
              >
                play
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
