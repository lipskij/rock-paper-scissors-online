import React, { useState } from 'react';
import { Session } from 'meteor/session';
import { useTracker } from 'meteor/react-meteor-data';
import { GamesCollection } from '../api/games';
import { motion } from 'framer-motion';
import compareChoice from './compareChoice';

// TODO: add function for mobile devices that instead of pressing START you can shake your phone

const Start = () => {
  const [hand, setHand] = useState('rock');
  const [opponentHand, setOpponentHand] = useState('rock');
  const [winner, setWinner] = useState('');
  const [animation, setAnimation] = useState('visible');
  const [outcomeChoices, setOutcomeChoices] = useState(['rock', 'rock']);
  const [outcomeMessage, setOutcomeMessage] = useState('');

  const variants = {
    visible: {},
    moving: { y: [0, 40, -40, 40, -40, 0] },
  };

  function onStart() {
    if (animation === 'moving') {
      setHand('rock');
      setOpponentHand('rock');
      setWinner('1-2-3');
    }
  }

  function onFinish() {
    if (animation === 'moving') {
      setHand(outcomeChoices[0]);
      setOpponentHand(outcomeChoices[1]);
      setWinner(outcomeMessage);
    }
  }

  const game = useTracker(() => {
    Meteor.subscribe('games');
    const currentGame = GamesCollection.findOne(Session.get('gameID'));
    if (currentGame && currentGame.players) {
      const myIndex = currentGame.players.indexOf(Session.get('username'));
      const otherPlayerIndex = myIndex == 0 ? 1 : 0;
      const otherUsername = currentGame.players[otherPlayerIndex];

      const myChoice = currentGame?.winner?.choices[myIndex];
      const opponentsChoice = currentGame?.winner?.choices[otherPlayerIndex];
      const winner = compareChoice(myChoice, opponentsChoice);

      if (currentGame?.winner?.choices?.length === 2) {
        setAnimation('moving');
        setOutcomeChoices([myChoice, opponentsChoice]);
        setOutcomeMessage(winner);
      } else {
        setAnimation('visible');
      }

      return {
        otherUsername,
        myScore: currentGame.score[myIndex],
        opponentsScore: currentGame.score[otherPlayerIndex],
      };
    }
    return { otherUsername: '', myScore: 0, opponentsScore: 0 };
  }, [
    opponentHand,
    setOpponentHand,
    setWinner,
    setOutcomeChoices,
    setAnimation,
    setOutcomeMessage,
  ]);

  const showOptions = !!game.otherUsername;

  return (
    <div className="match">
      {animation === 'visible' ? <h2>Wait...</h2> : <h2>{winner}</h2>}

      <button
        disabled={outcomeMessage === winner && showOptions ? false : true}
        className="start"
        onClick={(event) => {
          event.preventDefault();
          Meteor.call('Choice', {
            gameID: Session.get('gameID'),
            username: Session.get('username'),
            hand,
          });
        }}
      >
        Start!
      </button>

      <motion.div
        initial="visible"
        animate={animation}
        variants={variants}
        transition={{ duration: 1 }}
        onAnimationStart={onStart}
        onAnimationComplete={onFinish}
        className="hands"
      >
        <img className="player1" src={`/${hand}.png`} alt="paper" />
        <img
          className="player2"
          src={`/${opponentHand ? opponentHand : 'rock'}.png`}
          alt="hand"
        />
      </motion.div>

      <h2>Choose an option</h2>
      {showOptions ? (
        <div className="options">
          <button
            disabled={outcomeMessage === winner ? false : true}
            onClick={() => setHand('rock')}
            className="rock"
          >
            Rock
          </button>
          <button
            disabled={outcomeMessage === winner ? false : true}
            onClick={() => setHand('paper')}
            className="paper"
          >
            Paper
          </button>
          <button
            disabled={outcomeMessage === winner ? false : true}
            onClick={() => setHand('scissors')}
            className="scissors"
          >
            Scissors
          </button>
        </div>
      ) : (
        <h3 className="message">Wait for other player to connect</h3>
      )}
      <div>
        {animation === 'visible' ? (
          <h3 className="message">Waiting for opponent...</h3>
        ) : null}
      </div>
    </div>
  );
};

export default Start;
