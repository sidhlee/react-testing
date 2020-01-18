import React from "react";
import PropTypes from "prop-types";

const SecretWordReveal = props => {
  const message = (
    <div
      data-test="reveal-message"
      className="alert alert-info pt-3 pb-0"
    >
      <p>
        The secret word is <strong>{props.secretWord}.</strong>
      </p>
      <p>Let's try again!</p>
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
