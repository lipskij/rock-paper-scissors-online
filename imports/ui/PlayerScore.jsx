import React, { useState, useEffect } from "react";
import { GamesCollection } from "../api/games";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";

const PlayerScore = () => {
  const game = useTracker(() => {
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    if (currentGame && currentGame.players) {
      const myIndex = currentGame.players.indexOf(Session.get("username"));
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
      const otherUsername = currentGame.players[otherPlayerIndex];
      return {
        otherUsername,
        myScore: currentGame.score[myIndex],
        opponentsScore: currentGame.score[otherPlayerIndex],
      };
    }
    return { otherUsername: "", myScore: 0, opponentsScore: 0 };
  });

  return (
    <div className="score">
      <h2>
        {Session.get("username")} score: {game.myScore}
      </h2>
      <h2>
        {game.otherUsername} score: {game.opponentsScore}
      </h2>
    </div>
  );
};

export default PlayerScore;
