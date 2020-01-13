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
    <div
      data-test="congrats-message"
      className="alert alert-success mb-4"
    >
      Congratulations! You guessed the word!
    </div>
  ) : null;
  return <div data-test="component-congrats">{message}</div>;
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;
