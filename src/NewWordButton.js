import React, { Component } from "react";
import { connect } from "react-redux";
import { getNewWord } from "./actions/";

export class UnconnectedNewWordButton extends Component {
  render() {
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
  }
}

const mapState = ({ success }) => ({ success });
export default connect(mapState, { getNewWord })(
  UnconnectedNewWordButton
);
