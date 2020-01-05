import React from "react";
import PropTypes from "prop-types";

/**
 * Functional react component for congratulatory message
 * @function
 * @param {Object} props - React props.
 * @returns {JSX.Element} - Rendered component (or null if 'success' prop is false)
 */
const Congrats = props => {
  const message = props.success ? (
    <span data-test="congrats-message">
      Congratulations! You guessed the word!
    </span>
  ) : null;
  return (
    <div
      data-test="component-congrats"
      className="alert alert-success"
    >
      {message}
    </div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;
