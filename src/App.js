import React, { Component } from "react";

import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

class App extends Component {
  state = {
    guessedWords: [
      { guessedWord: "train", letterMatchCount: 3 },
      { guessedWord: "agile", letterMatchCount: 1 },
      { guessedWord: "party", letterMatchCount: 5 }
    ]
  };

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessedWords guessedWords={this.state.guessedWords} />
      </div>
    );
  }
}

export default App;
