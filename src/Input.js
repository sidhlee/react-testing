import React, { Component } from "react";
import { connect } from "react-redux";

import { guessWord } from "./actions/";

class Input extends Component {
  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline">
        <input
          data-test="input-control"
          className="mb-2"
          type="text"
          placeholder="enter guess"
        />
        <button
          data-test="submit-button"
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
    return <div data-test="component-input">{contents}</div>;
  }
}

const mapState = ({ success }) => ({ success });

export default connect(mapState, { guessWord })(Input);
