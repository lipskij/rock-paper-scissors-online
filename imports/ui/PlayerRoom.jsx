import React from 'react';
import { Session } from 'meteor/session';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '../api/games';

// it inserts only one username at a time idk why

const Room = () => {
  const list = useTracker(() => {
    Meteor.subscribe('room');

    const loggedIn = GamesCollection.findOne(Session.get('list'));

    if (loggedIn && loggedIn.players) {
      const playerName = loggedIn.players.map(() => (Session.get('username')));

      return { playerName };
    }
    return { playerName: '' };
  });
  return (
    <div className="room">
      <h3>Waiting Room</h3>
      <h3>{list.playerName}</h3>
      {console.log(list)}
    </div>
  );
};

export default Room;
