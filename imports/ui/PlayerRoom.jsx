import React from 'react';
import { Session } from 'meteor/session';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '../api/games';

const Room = () => {
  const game = useTracker(() => {
    Meteor.subscribe('games');
    const loggedIn = GamesCollection.findOne(Session.get('gameID'));
    if (loggedIn && loggedIn.players) {
      const myIndex = loggedIn.players.indexOf(Session.get('username'));
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
      const otherUsername = loggedIn.players[otherPlayerIndex];
      const myUsername = loggedIn.players[myIndex];

      return { otherUsername, myUsername };
    }
    return { otherUsername: '', myUsername : '' };
  });
  return (
    <div className="room">
      <ul>
        <li>Waiting Room</li>
        <h3>
          {Session.get('username')}
        </h3>
        <h3>
          {game.otherUsername}
        </h3>
      </ul>
    </div>
  );
};

export default Room;
