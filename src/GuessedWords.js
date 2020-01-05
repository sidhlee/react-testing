import React from "react";
import PropTypes from "prop-types";

const GuessedWords = props => {
  const content =
    props.guessedWords.length === 0 ? (
      <span data-test="guess-instructions">
        Guess the secret word!
      </span>
    ) : null;

  return <div data-test="component-guessed-words">{content}</div>;
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default GuessedWords;
