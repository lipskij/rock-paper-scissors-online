import { Mongo } from "meteor/mongo";
import rockPaper, { tie, me, oponnent } from "../ui/compareChoice";

export const GamesCollection = new Mongo.Collection("games");

// Meteor.methods({
//   declareWinners() {
//     Players.update({ score: { $gt: 10 } }, {
//       $addToSet: { badges: 'Winner' }
//     }, { multi: true });
//   }
// });

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
      // find other player index
      const myIndex = game.players.indexOf(payload.username);
      // append index to username
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;

      const otherUsername = game.players[otherPlayerIndex];
      const opponentsChoice = game[otherUsername];

      if (opponentsChoice) {
        // if opponent made a choice...
        const winner = rockPaper(payload.hand, opponentsChoice); // using rockPaper function of compering hands
        const choices = [];
        choices[myIndex] = payload.hand;
        choices[otherPlayerIndex] = opponentsChoice;
        if (winner === me) {
          return GamesCollection.update(game._id, {
            $set: { winner: {username: payload.username, choices }},
            $inc: { [`score.${myIndex}`]: 1 }, // increment by 1
            $unset: { [payload.username]: "", [otherUsername]: "" }, // reseting hand choice using usernames of players
          });
        }
        if (winner === oponnent) {
          return GamesCollection.update(game._id, {
            $set: { winner: {username: otherUsername, choices } },
            $inc: { [`score.${otherPlayerIndex}`]: 1 },
            $unset: { [payload.username]: "", [otherUsername]: "" },
          });
        }
        if (winner === tie) {
          return GamesCollection.update(game._id, {
            $set: { winner: {username: tie, choices }},
            $unset: { [payload.username]: "", [otherUsername]: "" },
          });
        }
      } else {
        GamesCollection.update(payload.gameID, {
          $set: {
            [payload.username]: payload.hand,
          },
        });
      }
    }
  },
});
