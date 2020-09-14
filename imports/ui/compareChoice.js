export const tie = "tie";
export const oponnent = "oponnent";
export const me = "me";

export default function rockPaper(myChoice, opponentsChoice) {
  if (myChoice === opponentsChoice) {
    return tie;
  }
  // rock & paper
  if (myChoice == "rock" && opponentsChoice == "paper") {
    return oponnent;
  }
  // rock & scissors
  if (myChoice == "rock" && opponentsChoice == "scissors") {
    return me;
  }

  // paper && rock
  if (myChoice == "paper" && opponentsChoice == "rock") {
    return me;
  }
  // paper scissors
  if (myChoice == "paper" && opponentsChoice == "scissors") {
    return oponnent;
  }

  // scissors & rock
  if (myChoice == "scissors" && opponentsChoice == "rock") {
    return oponnent;
  }

  // scissors & paper
  if (myChoice == "scissors" && opponentsChoice == "paper") {
    return me;
  }
}
