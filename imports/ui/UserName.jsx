import React, { useState } from "react";

const UserName = () => {
  const [input, setInput] = useState("");
  return (
    <form className="name">
      <label>
        <input
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="User name"
        />
      </label>
      <button
        onClick={(event) => {
          event.preventDefault();
          Meteor.call("CreateGame", input, (error, result) => {
            Session.set({
              gameID: result.gameID,
              username: input,
            });
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
