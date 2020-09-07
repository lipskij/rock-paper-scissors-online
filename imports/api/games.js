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
    console.log("here");
    const result = GamesCollection.upsert(
      {
        players: {
          $size: 1,
        },
      },
      { $addToSet: { players: username } }
    );

    return { gameID: result.insertedId };
  },

  Choice(payload) {
    const game = GamesCollection.findOne(payload.gameID);
    console.log(game);
    console.log(payload);
    return "choice";
  },
});
