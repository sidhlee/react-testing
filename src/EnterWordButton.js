import React from "react";
import PropTypes from "prop-types";

const EnterWordButton = props => {
  if (props.display) {
    return (
      <button
        data-test="component-enter-word-button"
        type="button"
        className="btn btn-outline-success mt-5 mb-3"
        onClick={props.buttonAction}
      >
        Enter your own secret word
      </button>
    );
  } else {
    return <div data-test="component-enter-word-button" />;
  }
};

EnterWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  buttonAction: PropTypes.func // not required when button is not visible
};

export default EnterWordButton;
