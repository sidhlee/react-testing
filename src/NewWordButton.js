import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedNewWordButton extends Component {
  render() {
    return <di></di>;
  }
}

const mapState = ({ success }) => ({ success });
export default connect(mapState)(UnconnectedNewWordButton);
