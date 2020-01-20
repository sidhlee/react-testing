import React from "react";

const ServerError = props => {
  return (
    <div data-test="component-server-error">
      We cannot retrieve the secret word for the moment. Please try
      again later.
    </div>
  );
};

export default ServerError;
