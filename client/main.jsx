import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App";
import { Presence } from "meteor/tmeasday:presence";

Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));

  navigator.serviceWorker
    .register("/sw.js")
    .then()
    .catch((error) => console.log("ServiceWorker registration failed: ", err));

  Presence.state = function () {
    console.log(Session.get('user'))
    return {
      isPlaying: Session.get("isPlaying"),
      user: Session.get("user"),
    };
  };
});
