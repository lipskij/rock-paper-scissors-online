import React, { useState, useEffect } from "react";
import { GamesCollection } from "../api/games";
import { Session } from "meteor/session";
import { useTracker } from "meteor/react-meteor-data";
import setName from "./setName";

const PlayerScore = () => {
  const [name, setUserName] = useState("");
  const [oponentsName, setOponantsName] = useState("");

  const game = useTracker(() => {
    const currentGame = GamesCollection.findOne(Session.get("gameID"));
    return currentGame;
  });

  useEffect(() => {
    if (game && game[Session.get("username")]) {
      // find other player index
      const myName = game.players.indexOf(Session.get("username"));
      // append index to username
      const otherPlayerIndex = myName == 0 ? 1 : 0;

      const otherUsername = game.players[otherPlayerIndex];
      if (game[otherUsername]) {
        
        const name = setName(game.players[0]);
        const oponentsName = setName(game.players[1]);
        setUserName(name);
        setOponantsName(oponentsName);
      }
    }
  }, [oponentsName, name, game, Session.get("username"), setUserName, setOponantsName]);

  return (
    <div className="score">
      <h2>{name} score:</h2>
      <h2>{oponentsName} score:</h2>
    </div>
  );
};

export default PlayerScore;
