import React, { Component } from "react";
import { connect } from "react-redux";

import Congrats from "./Congrats";
import Input from "./Input";
import GuessedWords from "./GuessedWords";
import TotalGuesses from "./TotalGuesses";
import {
  getSecretWord,
  resetGame,
  setUserEntering,
  setUserSecretWord
} from "./actions";
import NewWordButton from "./NewWordButton";
import SecretWordReveal from "./SecretWordReveal";
import EnterWordForm from "./EnterWordForm";
import EnterWordButton from "./EnterWordButton";
import ServerError from "./ServerError";

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
    let content;
    if (this.props.serverError) {
      content = <ServerError data-test="component-server-error" />;
    } else {
      content =
        this.props.userEnter === "inProgress" ? (
          <EnterWordForm
            data-test="component-enter-word-form"
            formAction={this.props.setUserSecretWord}
          />
        ) : (
          <>
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
            <EnterWordButton
              display={
                this.props.guessedWords.length === 0 ||
                this.props.success ||
                this.props.gaveUp
              }
              buttonAction={this.props.setUserEntering}
            />
          </>
        );
    }

    return (
      <div className="container text-center">
        <h1>Jotto</h1>
        {content}
      </div>
    );
  }
}

const mapState = ({
  success,
  secretWord,
  guessedWords,
  gaveUp,
  userEnter,
  serverError
}) => ({
  success,
  secretWord,
  guessedWords,
  gaveUp,
  userEnter,
  serverError
});

const actions = {
  getSecretWord,
  resetGame,
  setUserEntering,
  setUserSecretWord
};
export default connect(mapState, actions)(UnconnectedApp);
