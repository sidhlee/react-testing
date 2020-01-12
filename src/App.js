import React, { Component } from "react";
import { connect } from "react-redux";

import Congrats from "./Congrats";
import Input from "./Input";
import GuessedWords from "./GuessedWords";
import { getSecretWord } from "./actions";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapState = ({ success, secretWord, guessedWords }) => ({
  success,
  secretWord,
  guessedWords
});

export default connect(mapState, { getSecretWord })(App);
