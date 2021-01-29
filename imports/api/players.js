import { Mongo } from "meteor/mongo";

export const PlayerCollection = new Mongo.Collection("players");

if (Meteor.isServer) {
  Meteor.publish("players", () => {
    return PlayerCollection.find();
  });
}

Meteor.methods({
  CreateRoom(name) {
    const players = PlayerCollection.find({
      users: {
        $size: 19,
      },
    });
    if (players.count() === 0) {
      const playerID = PlayerCollection.insert({
        users: [name],
        updatedAt: new Date(),
      });
      return { playerID };
    }
    const blah = players.fetch()[0];
    PlayerCollection.update(blah._id, {
      $addToSet: { users: name },
    });
    console.log(PlayerCollection.find().fetch()[0].users)
    return { playerID: blah._id };
  },
});
