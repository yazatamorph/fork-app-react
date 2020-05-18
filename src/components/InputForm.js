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

  render() {
    return (
      <div className="input-form">
        <form onSubmit={this.handleFormSubmission}>
          <input
            type="text"
            value={this.state.term}
            onChange={this.handleInputState}
          />
        </form>
      </div>
    );
  }
}

InputForm.propTypes = { onSubmit: PropTypes.func };

export default InputForm;
