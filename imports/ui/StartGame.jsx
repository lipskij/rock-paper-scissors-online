import React, { useState } from "react";

const Start = () => {
  const [hand, setHand] = useState("paper");

  return (
    <div className="match">
      {/* After choosing an option press start to determine who won */}
      <button className="start">Start!</button>
      {/* Change hands after choosing and option */}
      <div className="hands">
        <img className="player1" src={`/${hand}.png`} alt="paper" />
        <img className="player2" src="/rock.png" alt="rock" />
      </div>
      <h2>Choose an option</h2>
      {/* Toggle player's hands depending on chosen option */}
      <div className="options">
        <button onClick={() => setHand("rock")} className="rock">Rock</button>
        <button onClick={() => setHand("paper")} className="paper">Paper</button>
        <button onClick={() => setHand("scissors")} className="scissors">Scissors</button>
      </div>
    </div>
  );
};

export default Start;
