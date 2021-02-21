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
  }, [setHideList, setQuit]);

  return hideList ? (
    <button
      className='call-to-quit'
      onClick={(event) => {
        event.preventDefault();
        Meteor.call("userPresence", myName.user, (err, result) => {
          Session.set({
            user: myName.user,
            isPlaying: false,
          });
          setQuit(true);
          setHideList(false);
        });
      }}
    >
      Quit game
    </button>
  ) : (
    <div className={room.length > 0 ? "room" : "room-closed"}>
      <ul className='list'>
        <li className='list-name'>Waiting Room</li>
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
                    setQuit(false);
                  });
                }}
              >
                Play
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Room;
