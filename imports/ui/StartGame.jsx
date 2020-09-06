import React from "react";

const Start = () => {
  return (
    <div className="match">
      <button className="start">Start!</button>
      <div className="hands">
        <img className="player1" src="/paper.png" alt="paper" />
        <img className="player2" src="/rock.png" alt="rock" />
      </div>
      <h2>Choose an option</h2>
      <div className="options">
        <button className="rock">Rock</button>
        <button className="paper">Paper</button>
        <button className="scissors">Scissors</button>
      </div>
    </div>
  );
};

export default Start;
