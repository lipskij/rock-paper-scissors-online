import React from "react";
import { Presence } from "meteor/tmeasday:presence";

// find my index
// find other players names
// find other players indexes findIndex()
// put the player into the gameID (game room) after pressing play

const Room = ({ room }) => {
  const users = room.map((i) => i.state.user);
  const myName = Presence.state("user");
  const myIndex = users.indexOf(myName.user);

  console.log(myName.user);
  console.log(myIndex);
  console.log(users);

  return (
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
