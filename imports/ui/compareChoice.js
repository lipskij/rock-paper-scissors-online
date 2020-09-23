export const tie = "It's a tie";
export const oponnent = "You loose";
export const me = "You win";

export default function rockPaper(myChoice, opponentsChoice) {
  if (myChoice === opponentsChoice) {
    return tie;
  }
  
  if (myChoice == "rock" && opponentsChoice == "paper") {
    return oponnent;
  }

  if (myChoice == "rock" && opponentsChoice == "scissors") {
    return me;
  }

  if (myChoice == "paper" && opponentsChoice == "rock") {
    return me;
  }

  if (myChoice == "paper" && opponentsChoice == "scissors") {
    return oponnent;
  }

  if (myChoice == "scissors" && opponentsChoice == "rock") {
    return oponnent;
  }

  if (myChoice == "scissors" && opponentsChoice == "paper") {
    return me;
  }
}
