import React from 'react';
import PlayerScore from './PlayerScore';
import Start from './StartGame';
import UserName from './UserName';

export const App = () => {
  return (
    <div className="game-ui">
      <h1 className="title">Rock Paper Scissors</h1>
      <UserName />
      <PlayerScore />
      <Start />
    </div>
  );
};
