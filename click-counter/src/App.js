import React, { Component } from "react";
import classes from "./App.module.css";

class App extends Component {
  state = {
    counter: 0,
    errorMessage: ""
  };
  increment = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
    this.setState({ errorMessage: "" });
  };
  decrement = () => {
    if (this.state.counter <= 0) {
      this.setState({
        errorMessage: "The counter can't go below zero"
      });
      return;
    }
    this.setState(prevState => ({
      counter: prevState.counter - 1
    }));
  };

  render() {
    return (
      <div data-test="component-app" className={classes.App}>
        <h1 data-test="counter-display">
          The counter is currently {this.state.counter}
        </h1>
        <button
          className={classes.Button}
          data-test="increment-button"
          onClick={this.increment}
        >
          Increment
        </button>
        <button
          className={classes.Button}
          data-test="decrement-button"
          onClick={this.decrement}
        >
          Decrement
        </button>
        <p className={classes.Error} data-test="error-message">
          {this.state.errorMessage}
        </p>
      </div>
    );
  }
}

export default App;
