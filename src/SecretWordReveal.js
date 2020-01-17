import React from "react";
import PropTypes from "prop-types";

const SecretWordReveal = props => {
  const message = (
    <div data-test="reveal-message" className="alert alert-info">
      <p>The secret word is{props.secretWord}</p>
      <p>You will get it next time!</p>
    </div>
  );
  return (
    <div data-test="component-secret-word-reveal">
      {props.display && message}
    </div>
  );
};

SecretWordReveal.propTypes = {
  display: PropTypes.bool.isRequired,
  // not required because not needed when display: false
  secretWord: PropTypes.string
};

export default SecretWordReveal;
