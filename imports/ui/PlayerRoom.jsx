import React, { useState } from "react";
import { Presence } from "meteor/tmeasday:presence";
import { GamesCollection } from "../api/games";
import { useTracker } from "meteor/react-meteor-data";
import { Requests } from "../api/invites";
import { Session } from "meteor/session";

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

  useTracker(() => {
    Meteor.subscribe("requests");

    const gameRequests = Requests.find({ callee: Session.get("user") });
    console.log(gameRequests);
    if (gameRequests.count()) {
      const play = window.confirm("Wanna play??");
      if (!play) {
        Requests.remove({ _id });
      } else {
        Meteor.call("CreateGame", myName.user, (error, result) => {
          Session.set({
            gameID: result.gameID,
            username: myName.user,
          });
        });
      }
    }
  });

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
                value={item.state.user}
                onClick={(event) => {
                  event.persist();
                  event.preventDefault();
                  Meteor.call(
                    "HandlePlay",
                    event.target.value,
                    myName.user,
                    (err, result) => {
                      Session.set({
                        callee: event.target.value,
                        caller: Session.get("user"),
                      });
                    }
                  );
                  setHideList(true);
                  setQuit(false);
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
