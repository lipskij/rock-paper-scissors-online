import { Meteor } from "meteor/meteor";
import { GamesCollection } from "/imports/api/games";
import {Requests} from '/imports/api/invites'; 

Meteor.startup(() => {
  const games = GamesCollection.find({
    players: {
      $size: 1,
    },
  });

  games.observe({
    added(id, fields) {
      GamesCollection.remove({
        updatedAt: {
          $lt: new Date(new Date() - 1000 * 60 * 60 * 24),
        },
      });
    },
  });

  const requests = Requests.find({})

  Meteor.publish("userPresence", function () {
    return Presences.find({ "state.isPlaying": false });
  });
});
