import React from "react";
import PropTypes from "prop-types";

// ref can only be used with class component
// because they can have instances.
export class EnterWordForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputControl = React.createRef();
  }

  handleSubmit = e => {
    e.preventDefault();
    const val = this.inputControl.current.value;
    if (!val) return;
    this.props.formAction(val);
  };

  render() {
    return (
      <div data-test="component-enter-word-form">
        <p data-test="enter-word-instructions">
          Enter a secret word for other players to guess!
        </p>
        <form
          className="input-group w-sm-75 mx-auto"
          onSubmit={this.handleSubmit}
        >
          <input
            data-test="input-control"
            ref={this.inputControl}
            className="form-control"
            type="text"
            placeholder="enter 5-letter secret word"
          />
          <div className="input-group-append">
            <button
              data-test="submit-button"
              type="submit"
              className="btn btn-success"
            >
              Go
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EnterWordForm.propTypes = {
  formAction: PropTypes.func
};

export default EnterWordForm;
