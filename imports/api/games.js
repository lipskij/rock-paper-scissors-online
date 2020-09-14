import { Mongo } from "meteor/mongo";
import { Session } from "meteor/session";

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
      const gameID = GamesCollection.insert({ players: [username] });
      return { gameID };
    }
    const existingGame = games.fetch()[0];
    GamesCollection.update(existingGame._id, {
      $addToSet: { players: username },
    });
    return { gameID: existingGame._id };
  },

  Choice(payload) {
    // insert choices to the gameID that those users exist in
    // append choice to the username
    GamesCollection.update(payload.gameID, {
      $set: {
        [payload.username]: payload.hand,
      },
    });
    
    // compare : gameID username and choice
    // return "choice";
  },
});
