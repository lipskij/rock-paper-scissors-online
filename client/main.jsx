import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});

Meteor.startup(() => {
  navigator.serviceWorker
    .register('/sw.js')
    .then()
    .catch((error) => console.log('ServiceWorker registration failed: ', err));
});
