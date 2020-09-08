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
    //
    // upsert is not returning updated ObjectId
    // find() games with the single player in them !!!
    // use insert() if size === 0
    // use update if size === 1
    // return gameID

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
    const game = GamesCollection.findOne(payload.gameID);
    // compare : gameID username and choice
    return "choice";
  },
});
