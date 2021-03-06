import React from "react";
import PropTypes from "prop-types";

const PianoKey = (props) => {
  return (
    <button
      className="piano-keys"
      id={props.noteName}
      onMouseDown={(e) => props.onMouseDown(props.noteMidiValue)}
      onMouseUp={(e) => props.onMouseUp(props.noteMidiValue)}
      onClick={(e) => props.onClick(e.timeStamp, props.noteName)}
    />
  );
};

PianoKey.propTypes = {
  noteName: PropTypes.string,
  noteMidiValue: PropTypes.number,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onClick: PropTypes.func,
};

export default PianoKey;
