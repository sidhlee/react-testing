import React from "react";
import PropTypes from "prop-types";

const NewWordButton = props => {
  return props.display ? (
    <button
      data-test="component-new-word-button"
      className="btn btn-success mb-3"
      onClick={props.resetAction}
    >
      New word
    </button>
  ) : (
    <div data-test="component-new-word-button" />
  );
};

NewWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  resetAction: PropTypes.func
};

export default NewWordButton;
