import React, { useState } from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { GamesCollection } from "../api/games";
import rockPaper from './compareChoice';

const Start = () => {
  const [hand, setHand] = useState("paper");

  const game = useTracker(() => {
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame && currentGame.players) {
      const myIndex = currentGame.players.indexOf(Session.get("username"));
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
      const otherUsername = currentGame.players[otherPlayerIndex];
      console.log(currentGame.score);
      // now its comparing current count of points
      // need to store the previous score
      // compare previous score with current score
      // if changed return opponents hand accordingly
      if (currentGame.score[myIndex] === currentGame.score[otherPlayerIndex]) {
        console.log("tie");
      }
      if (currentGame.score[myIndex] > currentGame.score[otherPlayerIndex]) {
        console.log("i win");
      }
      if (currentGame.score[myIndex] < currentGame.score[otherPlayerIndex]) {
        console.log("opponent win");
      }
      return {
        otherUsername,
        myScore: currentGame.score[myIndex],
        opponentsScore: currentGame.score[otherPlayerIndex],
      };
    }
    return { otherUsername: "", myScore: 0, opponentsScore: 0 };
  });
  console.log(game);

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
        <img className="player2" src="/rock.png" alt="rock" />
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
