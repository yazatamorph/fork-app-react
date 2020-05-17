import React from "react";
import keyNotesArray from "../data/keyNotesArray";
import PianoKeys from "./PianoKeys";

class Piano extends React.Component {
  playNote(note) {
    // this is where the actual midi playback code goes
  }

  render() {
    return (
      <div className="piano-keys">
        <PianoKeys noteList={keyNotesArray} />
      </div>
    );
  }
}

export default Piano;
