import { Mongo } from "meteor/mongo";

export const Requests = new Mongo.Collection("requests");

if (Meteor.isServer) {
  Meteor.publish("request", () => {
    return Requests.find();
  });
}

Meteor.methods({
  HandlePlay(callee, caller) {
    Requests.insert({ callee, caller });
  },
});
