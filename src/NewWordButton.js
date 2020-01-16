import React from "react";
import PropTypes from "prop-types";

const NewWordButton = props => {
  const newWordButton = this.props.success ? (
    <button
      data-test="new-word-button"
      className="btn btn-success mb-3"
      onClick={this.props.getNewWord}
    >
      New Word
    </button>
  ) : null;

  return <>{newWordButton}</>;
};

NewWordButton.propTypes = {};

export default NewWordButton;
