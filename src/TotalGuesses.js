import React from "react";

const TotalGuesses = props => {
  return (
    <div data-test="total-guesses">
      <strong>TotalGuesses: {props.totalGuess}</strong>
    </div>
  );
};

export default TotalGuesses;
