import React, { useState } from "react";
import { Session } from "meteor/session";
import PlayerRoom from "./PlayerRoom";
import { useTracker } from "meteor/react-meteor-data";
import { Presences } from "meteor/tmeasday:presence";

window.Presences = Presences;

const UserName = () => {
  const [input, setInput] = useState("");
  const [hideInput, setHideInput] = useState(false);

  const room = useTracker(() => {
    Meteor.subscribe("userPresence");

    return Presences.find().fetch();
  });

  return hideInput ? (
    <PlayerRoom room={room} />
  ) : (
    <form className='name'>
      <label htmlFor='input'>
        <input
          onChange={(event) => setInput(event.target.value)}
          type='text'
          placeholder='Username'
          className='input'
          id='input'
        />
      </label>
      <button
        disabled={input.length > 0 ? false : true}
        onClick={(event) => {
          event.preventDefault();

          Session.set({
            user: input,
            isPlaying: false,
          });
          setHideInput(true);
        }}
        className='username'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
};

export default UserName;
