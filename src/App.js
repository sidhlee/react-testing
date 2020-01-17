import React, { Component } from "react";
import { connect } from "react-redux";

import Congrats from "./Congrats";
import Input from "./Input";
import GuessedWords from "./GuessedWords";
import TotalGuesses from "./TotalGuesses";
import { getSecretWord } from "./actions";
import NewWordButton from "./NewWordButton";

export class UnconnectedApp extends Component {
  // without { disableLifecycleMethods: true } option,
  // this will run every time a test runs shallow() on this component
  // and make axios call
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }
  render() {
    const totalGuesses = this.props.guessedWords.length;
    return (
      <div className="container">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        <NewWordButton display />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <TotalGuesses totalGuesses={totalGuesses} />
      </div>
    );
  }
}

const mapState = ({ success, secretWord, guessedWords }) => ({
  success,
  secretWord,
  guessedWords
});

export default connect(mapState, { getSecretWord })(UnconnectedApp);
