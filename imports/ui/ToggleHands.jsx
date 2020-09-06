import React, { useState } from 'react';

export const Toggle = () => {
  const [hand, setHand] = useState('');

  const toggleHands = () => {
    // setHand(hand + 1);
    setHand()
  };

  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <p>You've pressed the button {hand} times.</p>
    </div>
  );
};
