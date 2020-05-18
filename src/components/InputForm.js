import React from "react";
import PropTypes from "prop-types";

class InputForm extends React.Component {
  state = { term: "" };

  handleInputState = (e) => {
    const inputNotes = e.target.value.split(" ");
    if (inputNotes.length > 2) {
      inputNotes.shift();
      const newInput = inputNotes.join(" ").toUpperCase();
      this.setState({ term: newInput });
    } else {
      this.setState({ term: e.target.value.toUpperCase() });
    }
  };

  handleFormSubmission = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  componentDidUpdate(prevProps) {
    if (this.props.lastClick !== prevProps.lastClick) {
      let newInput;
      if (this.props.inputNotes === "new") {
        newInput = "";
      } else {
        const newInputNotes = (
          this.state.term +
          " " +
          this.props.inputNotes
        ).split(" ");
        if (newInputNotes.length > 2) {
          newInputNotes.shift();
        }
        newInput = newInputNotes.join(" ").toUpperCase();
      }
      this.setState({ term: newInput });
    }
  }

  render() {
    return (
      <div className="input-form">
        <form onSubmit={this.handleFormSubmission}>
          <input
            type="text"
            value={this.state.term}
            onChange={this.handleInputState}
          />
          <button type="submit">OK!</button>
          <button type="button" onClick={(e) => this.setState({ term: "" })}>
            Retry!
          </button>
        </form>
      </div>
    );
  }
}

InputForm.propTypes = {
  onSubmit: PropTypes.func,
  inputNotes: PropTypes.string,
  lastClick: PropTypes.number,
};

export default InputForm;
