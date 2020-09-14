import React, { useState, useEffect, useCallback } from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { GamesCollection } from "../api/games";
import compareChoice from "./compareChoice";

const Start = () => {
  const [hand, setHand] = useState("paper");
  const [winner, setWinner] = useState("");

  const game = useTracker(() => {
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    return currentGame;
  });
  console.log(game);

  // {
  //   _id: "DPDRweahtuJHT85M9",
  //   players: ["pirmas", "antras" ],
  //   pirmas: "rock",
  //   antras: "scissors"
  //   }

  // check if ather player has a choice
  useEffect (() => {
    if (game && game[Session.get("username")]) {
      // find other player index
      const myIndex = game.players.indexOf(Session.get("username"));
      // append index to username
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
  
      const otherUsername = game.players[otherPlayerIndex];
      const myChoice = game[Session.get("username")];
      const opponentsChoice = game[otherUsername];
      if (game[otherUsername]) {
        // compare choices (full game play logic/compare rock, paper, scissors)
        const winner = compareChoice(myChoice, opponentsChoice);
        setWinner(winner);
      }
    }
  },[game, Session.get("username"), setWinner])
  

  return (
    <div className="match">
      {winner}
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
