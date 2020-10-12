import { Mongo } from "meteor/mongo";
import rockPaper, { tie, me, oponnent } from "../ui/compareChoice";

export const GamesCollection = new Mongo.Collection("games");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('games', () => {
    // TODO: return only games aplicable to the player
    return GamesCollection.find();
  });
}

Meteor.methods({
  CreateGame(username) {
    const games = GamesCollection.find({
      players: {
        $size: 1,
      },
    });
    if (games.count() === 0) {
      const gameID = GamesCollection.insert({
        players: [username],
        score: [0, 0],
        updatedAt: new Date(),
      });
      return { gameID };
    }
    const existingGame = games.fetch()[0];
    GamesCollection.update(existingGame._id, {
      $addToSet: { players: username },
    });
    return { gameID: existingGame._id };
  },

  Choice(payload) {
    const game = GamesCollection.findOne(payload.gameID);
    if (game) {
      const myIndex = game.players.indexOf(payload.username);
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;

      const otherUsername = game.players[otherPlayerIndex];
      const opponentsChoice = game[otherUsername];

      if (opponentsChoice) {
        const winner = rockPaper(payload.hand, opponentsChoice);
        const choices = [];

        choices[myIndex] = payload.hand;
        choices[otherPlayerIndex] = opponentsChoice;
        
        if (winner === me) {
          return GamesCollection.update(game._id, {
            $set: { winner: {username: payload.username, choices }, updatedAt: new Date() },
            $inc: { [`score.${myIndex}`]: 1 },
            $unset: { [payload.username]: "", [otherUsername]: "" },
          });
        }
        if (winner === oponnent) {
          return GamesCollection.update(game._id, {
            $set: { winner: {username: otherUsername, choices }, updatedAt: new Date() },
            $inc: { [`score.${otherPlayerIndex}`]: 1 },
            $unset: { [payload.username]: "", [otherUsername]: "" },
          });
        }
        if (winner === tie) {
          return GamesCollection.update(game._id, {
            $set: { winner: {username: tie, choices }, updatedAt: new Date() },
            $unset: { [payload.username]: "", [otherUsername]: "" },
          });
        }
      } else {
        GamesCollection.update(payload.gameID, {
          $set: {
            [payload.username]: payload.hand,
            'winner.choices': [],
            updatedAt: new Date(),
          },
        });
      }
    }
  },
});
