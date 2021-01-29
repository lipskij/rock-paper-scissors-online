import React from 'react';
import { Session } from 'meteor/session';
import { useTracker } from 'meteor/react-meteor-data';
import { PlayerCollection } from '../api/players';

// it inserts only one username at a time idk why

const Room = () => {
  const room = useTracker(() => {
    Meteor.subscribe('players');

    const waitingRoom = PlayerCollection.findOne(Session.get('playersID'));
    if (waitingRoom && waitingRoom.users) {
      const player = waitingRoom.users.map(() =>Session.get('name'));
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
