import React, { useState } from 'react';
import { Session } from 'meteor/session';

const UserName = () => {
  const [input, setInput] = useState('');
  const [hideInput, setHideInput] = useState(false);
  //hideInput ? null :
  return (
    <form className="name">
      <label htmlFor="input">
        <input
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="Username"
          className="input"
          id="input"
        />
      </label>
      <button
        onClick={(event) => {
          event.preventDefault();
          Meteor.call('CreateRoom', input, (error, result) => {
            Session.set({
              players: result.players,
              user: input,
            });
            setHideInput(true);
          });
        }}
        className="username"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default UserName;
