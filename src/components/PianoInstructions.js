import React from "react";
import PropTypes from "prop-types";

class PianoInstructions extends React.Component {
  render() {
    return (
      <div className="piano-instructions">
        <h4>Play or enter two notes comprising a</h4>
        <h3>{this.props.interval.name}</h3>
      </div>
    );
  }
}

PianoInstructions.propTypes = {
  interval: PropTypes.object,
};

export default PianoInstructions;
