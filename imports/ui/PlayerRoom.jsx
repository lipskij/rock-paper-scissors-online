import React from 'react';
import { Session } from 'meteor/session';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '../api/games';

// it inserts only one username at a time idk why

const Room = () => {
  const room = useTracker(() => {
    Meteor.subscribe('games');

    const waitingRoom = GamesCollection.findOne(Session.get('gameID'));
    if (waitingRoom && waitingRoom.players) {
      const player = waitingRoom.players?.map(() => Session.get('username'));
      return { player };
    }
    return {player: ''}
  });

  return (
    <div className="room">
      <h3>Waiting Room</h3>
      <h3>{room.player}</h3>
      {console.log(room.player)}
    </div>
  );
};

export default Room;
