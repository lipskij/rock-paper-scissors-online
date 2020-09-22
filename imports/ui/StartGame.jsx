import React, { useState } from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { GamesCollection } from "../api/games";

const Start = () => {
  const [hand, setHand] = useState("paper");
  const [opponentHand, setOpponentHand] = useState("paper");

  const game = useTracker(() => {
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame && currentGame.players) {
      const myIndex = currentGame.players.indexOf(Session.get("username"));
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
      const otherUsername = currentGame.players[otherPlayerIndex];
      // now its comparing current count of points
      // need to store the previous score
      // compare previous score with current score
      setOpponentHand(currentGame?.winner?.choices?.[otherPlayerIndex]);
      return {
        otherUsername,
        myScore: currentGame.score[myIndex],
        opponentsScore: currentGame.score[otherPlayerIndex],
      };
    }
    return { otherUsername: "", myScore: 0, opponentsScore: 0 };
  },[opponentHand, setOpponentHand]);

  // {
  //   _id: "DPDRweahtuJHT85M9",
  //   players: ["pirmas", "antras" ],
  //   pirmas: "rock",
  //   antras: "scissors"
  //   }
  return (
    <div className="match">
      {/* After choosing an option press start to determine who won */}
      <button
        className="start"
        onClick={(event) => {
          event.preventDefault();
          setOpponentHand(opponentHand);
          Meteor.call("Choice", {
            gameID: Session.get("gameID"),
            username: Session.get("username"),
            hand,
          });
        }}
      >
        Start!
      </button>
      {/* Change hands after choosing and option */}
      <div className="hands">
        <img className="player1" src={`/${hand}.png`} alt="paper" />
        <img className="player2" src={`/${opponentHand ? opponentHand : "paper"}.png`} alt="rock" />
      </div>
      <h2>Choose an option</h2>
      {/* Toggle player's hands depending on chosen option */}
      <div className="options">
        <button onClick={() => setHand("rock")} className="rock">
          Rock
        </button>
        <button onClick={() => setHand("paper")} className="paper">
          Paper
        </button>
        <button onClick={() => setHand("scissors")} className="scissors">
          Scissors
        </button>
      </div>
    </div>
  );
};

export default Start;
