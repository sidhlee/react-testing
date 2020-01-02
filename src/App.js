import React, { Component } from "react";
import classes from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div data-test="component-app" className={classes.App}>
        Jotto
      </div>
    );
  }
}

export default App;
