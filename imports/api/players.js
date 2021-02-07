import { Mongo } from "meteor/mongo";

export const PlayerCollection = new Mongo.Collection("players");

if (Meteor.isServer) {
  Meteor.publish("players", () => {
    return PlayerCollection.find();
  });
}

Meteor.methods({
  CreateRoom(name) {
    const players = PlayerCollection.insert({
      user: name,
      updatedAt: new Date(),
    });

    return { players };
  },
});
