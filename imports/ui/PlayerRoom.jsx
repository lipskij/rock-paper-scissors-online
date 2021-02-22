import React, { useState } from "react";
import { Presence } from "meteor/tmeasday:presence";
import { GamesCollection } from "../api/games";
import { useTracker } from "meteor/react-meteor-data";

// fix the game interface after quit
// for now the the waiting room takes all screen width
// so player can't press any button
// add modal to call a player to agree for a game

const Room = ({ room }) => {
  const myName = Presence.state("user");

  const [hideList, setHideList] = useState(false);
  const [quit, setQuit] = useState(false);

  const game = useTracker(() => {
    Meteor.subscribe("games");
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame?.players?.length > 1 && !quit) {
      setHideList(true);
      Meteor.call("userPresence", myName.user, (err, result) => {
        Session.set({
          user: myName.user,
          isPlaying: true,
        });
      });
      return currentGame;
    }
  }, [setHideList, setQuit]);

  console.log(room.length)

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
                    alert(room.map(i => i.state.user))
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
