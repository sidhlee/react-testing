import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    counter: 0
  };
  increment = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  };
  decrement = () => {
    this.setState(prevState => ({
      counter: prevState.counter - 1
    }));
  };

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        <button data-test="increment-button" onClick={this.increment}>
          Increment
        </button>
        <button data-test="decrement-button" onClick={this.decrement}>
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
