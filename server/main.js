import { Meteor } from "meteor/meteor";
import { GamesCollection } from "/imports/api/games";
import { PlayerCollection } from "/imports/api/players";

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
});

Meteor.startup(() => {
  const players = PlayerCollection.find({
    users: {
      $size: 19,
    },
  });

  players.observe({});
});
