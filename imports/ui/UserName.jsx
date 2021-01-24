import React, { useState } from 'react';
import { Session } from 'meteor/session';

const UserName = () => {
  const [input, setInput] = useState('');
  const [hideInput, setHideInput] = useState(false);
  
  return hideInput ? null : (
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
          Meteor.call('PlayerList', input, (error, result) => {
            Session.set({
              list: result.list,
              username: input,
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
