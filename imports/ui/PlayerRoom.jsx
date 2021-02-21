import React, { useState } from "react";
import { Presence } from "meteor/tmeasday:presence";
import { GamesCollection } from "../api/games";
import { useTracker } from "meteor/react-meteor-data";

// put the player into the gameID (game room) after pressing play(done)
// dont show the list for both playing players(done)
// dont show users if they are in the game for other players(done)
// make a quit game button ant after click set status back to isPlaying: false(done)
// and show them the waiting room(done)

const Room = ({ room }) => {
  const myName = Presence.state("user");

  const [hideList, setHideList] = useState(false);
  const [quit, setQuit] = useState(false);

  const game = useTracker(() => {
    Meteor.subscribe("games");
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame && currentGame.players && currentGame.players.length > 1) {
      setHideList(true);
      if (quit === false) {
        setQuit(false);
        Meteor.call("userPresence", myName.user, (err, result) => {
          Session.set({
            user: myName.user,
            isPlaying: true,
          });
        });
      } else {
        setQuit(true);
        setHideList(false);
      }
    }
    return currentGame;
  }, [setHideList]);

  console.log(room);

  return hideList ? (
    <button
      onClick={(event) => {
        event.preventDefault();

        Meteor.call("userPresence", myName.user, (err, result) => {
          Session.set({
            user: myName.user,
            isPlaying: false,
          });
          setQuit(true);
        });
      }}
    >
      quit
    </button>
  ) : (
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
