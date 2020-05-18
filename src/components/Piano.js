import React from "react";
// importing 3rd-party components
import MIDISounds from "midi-sounds-react";
// importing author's data arrays
import keyNotesArray from "../data/keyNotesArray";
import intervalsArray from "../data/intervalsArray";
// importing author's components
import PianoInstructions from "./PianoInstructions";
import InputForm from "./InputForm";
import PianoKey from "./PianoKey";

class Piano extends React.Component {
  constructor(props) {
    super(props);

    this.midiNotes = [];

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
    this.handleKeyClick = this.handleKeyClick.bind(this);
  }

  state = {
    keysToRender: [],
    lastClick: null,
    inputNotes: "",
    submittedNotes: "",
    intervalToPlay: { name: "", distance: null },
  };

  componentDidMount() {
    this.envelopes = [];
    this.setState({
      keysToRender: keyNotesArray.map((note) => {
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
      }),
      intervalToPlay: this.selectInterval(),
    });
  }

  selectInterval() {
    return intervalsArray[Math.floor(Math.random() * intervalsArray.length)];
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

  handleKeyClick = (time, note) => {
    this.setState({ lastClick: time, inputNotes: note });
  };

  handleFormSubmission = (term) => {
    console.log(`Form Submission: ${term}`);
    this.setState({ submittedNotes: term });
  };

  render() {
    return (
      <div className="piano-exercise">
        <PianoInstructions interval={this.state.intervalToPlay} />
        <InputForm
          inputNotes={this.state.inputNotes}
          onSubmit={this.handleFormSubmission}
          lastClick={this.state.lastClick}
        />
        <div className="piano-keys">
          {this.state.keysToRender}
          <div className="midi-component">
            <MIDISounds
              ref={(ref) => (this.midiSounds = ref)}
              appElementName="root"
              instruments={[5]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Piano;
