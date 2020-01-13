import React from "react";
import PropTypes from "prop-types";

const TotalGuesses = props => {
  return (
    <div data-test="total-guesses">
      <strong>TotalGuesses: {props.totalGuesses}</strong>
    </div>
  );
};

TotalGuesses.propTypes = {
  totalGuesses: PropTypes.number.isRequired
};

export default TotalGuesses;
