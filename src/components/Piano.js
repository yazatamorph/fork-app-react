import React from "react";
import MIDISounds from "midi-sounds-react";
import keyNotesArray from "../data/keyNotesArray";
import PianoKey from "./PianoKey";

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.midiNotes = [];

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
    this.handleKeyClick = this.handleKeyClick.bind(this);
  }

  state = { inputNotes: "" };

  componentDidMount() {
    this.envelopes = [];
    this.setState(this.state);
  }

  handleKeyRelease = (note) => {
    if (this.envelopes) {
      if (this.envelopes[note]) {
        this.envelopes[note].cancel();
        this.envelopes[note] = null;
        this.setState(this.state);
      }
    }
  };

  handleKeyPress = (note) => {
    this.handleKeyRelease(note);
    const volume = 1;
    this.envelopes[note] = this.midiSounds.player.queueWaveTable(
      this.midiSounds.audioContext,
      this.midiSounds.equalizer.input,
      window[this.midiSounds.player.loader.instrumentInfo(5).variable],
      0,
      note,
      9999,
      volume
    );
    this.setState(this.state);
  };

  handleKeyClick = (note) => {
    console.log(note);
  };

  keysToRender = keyNotesArray.map((note) => {
    return (
      <div key={keyNotesArray.indexOf(note)}>
        <PianoKey
          noteName={note.name}
          noteMidiValue={note.midi}
          onMouseDown={this.handleKeyPress}
          onMouseUp={this.handleKeyRelease}
          onClick={this.handleKeyClick}
        />
      </div>
    );
  });

  render() {
    return (
      <div className="piano-keys">
        {this.keysToRender}
        <MIDISounds
          ref={(ref) => (this.midiSounds = ref)}
          appElementName="root"
          instruments={[5]}
        />
      </div>
    );
  }
}

export default Piano;
