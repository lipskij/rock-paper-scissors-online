import { Mongo } from "meteor/mongo";

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
    const affected = GamesCollection.update(
      {
        players: {
          $size: 1,
        },
      },
      { $addToSet: { players: username } }
    );

    if (affected === 0) {
      GamesCollection.insert({ players: [username] });
      return 0;
    }
    return 1;
  },
  Choice(userId) {
    const change = GamesCollection.insert({
        id: this.userId,
    })
  },
});
