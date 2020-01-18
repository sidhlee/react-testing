import React, { Component } from "react";
import { connect } from "react-redux";

import Congrats from "./Congrats";
import Input from "./Input";
import GuessedWords from "./GuessedWords";
import TotalGuesses from "./TotalGuesses";
import { getSecretWord, resetGame } from "./actions";
import NewWordButton from "./NewWordButton";
import SecretWordReveal from "./SecretWordReveal";

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
      <div className="container text-center">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        <SecretWordReveal
          display={this.props.gaveUp}
          secretWord={this.props.secretWord}
        />
        <NewWordButton
          display={this.props.success || this.props.gaveUp}
          resetAction={this.props.resetGame}
        />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <TotalGuesses totalGuesses={totalGuesses} />
      </div>
    );
  }
}

const mapState = ({ success, secretWord, guessedWords, gaveUp }) => ({
  success,
  secretWord,
  guessedWords,
  gaveUp
});

const actions = { getSecretWord, resetGame };
export default connect(mapState, actions)(UnconnectedApp);
