import React, { useState } from "react";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import { GamesCollection } from "../api/games";
import compareChoice from "./compareChoice";

const Start = () => {
  const [hand, setHand] = useState("rock");
  const [opponentHand, setOpponentHand] = useState("rock");
  const [winner, setWinner] = useState("");

  const game = useTracker(() => {
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame && currentGame.players) {
      const myIndex = currentGame.players.indexOf(Session.get("username"));
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
      const otherUsername = currentGame.players[otherPlayerIndex];

      const myChoice = currentGame.winner.choices[myIndex];
      const opponentsChoice = currentGame.winner.choices[otherPlayerIndex];
      const winner = compareChoice(myChoice, opponentsChoice);
      setWinner(winner);
      console.log(myChoice);

      setOpponentHand(currentGame?.winner?.choices?.[otherPlayerIndex]);
      return {
        otherUsername,
        myScore: currentGame.score[myIndex],
        opponentsScore: currentGame.score[otherPlayerIndex],
      };
    }
    return { otherUsername: "", myScore: 0, opponentsScore: 0 };
  }, [opponentHand, setOpponentHand, setWinner]);

  const showOptions = !!game.otherUsername;

  return (
    <div className="match">
      {winner}
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
      <div className="hands">
        <img className="player1" src={`/${hand}.png`} alt="paper" />
        <img
          className="player2"
          src={`/${opponentHand ? opponentHand : "rock"}.png`}
          alt="rock"
        />
      </div>
      <h2>Choose an option</h2>
      {showOptions ? (
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
      ) : (
        "Wait for other player"
      )}
    </div>
  );
};

export default Start;
