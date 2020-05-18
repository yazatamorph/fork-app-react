import React from "react";
// importing 3rd-party components
import MIDISounds from "midi-sounds-react";
// importing author's data arrays
import keyNotesArray from "../data/keyNotesArray";
import intervalsArray from "../data/intervalsArray";
// importing author's components
import PianoInstructions from "./PianoInstructions";
import InputForm from "./InputForm";
import FeedbackModal from "./FeedbackModal";
import PianoKey from "./PianoKey";
import HelpModal from "./HelpModal";

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
    inputNotes: "new",
    submittedNotes: "",
    intervalToPlay: { name: "", distance: null },
    feedback: { title: "", message: "", show: false, type: "" },
    helpShow: false,
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
    const playedNotes = term.split(" ");
    if (playedNotes[0] === "") {
      playedNotes.shift();
    }
    if (playedNotes.length < 2) {
      this.setState({
        feedback: {
          title: "Woah now!",
          message: "You need to play two notes to make an interval!",
          show: true,
          type: "incomplete",
        },
        submittedNotes: term,
      });
    } else {
      const firstNote = keyNotesArray.find(
        (note) => note.name === playedNotes[0]
      );
      const secondNote = keyNotesArray.find(
        (note) => note.name === playedNotes[1]
      );
      const playedInterval = Math.abs(firstNote.val - secondNote.val);
      if (playedInterval === this.state.intervalToPlay.distance) {
        this.setState({
          feedback: {
            title: "Nice!",
            message: "That's right! Now try another one!",
            show: true,
            type: "correct",
          },
          submittedNotes: term,
        });
      } else {
        this.setState({
          feedback: {
            title: "Oops!",
            message: "Not quite! Have a go at another.",
            show: true,
            type: "incorrect",
          },
          submittedNotes: term,
        });
      }
    }
  };

  handleCloseFeedback = () => {
    if (this.state.feedback.type !== "incomplete") {
      this.setState({
        inputNotes: "new",
        lastClick: null,
        intervalToPlay: this.selectInterval(),
        feedback: { title: "", message: "", show: false, type: "" },
      });
    } else {
      this.setState({
        feedback: { title: "", message: "", show: false, type: "" },
      });
    }
  };

  handleOpenHelp = () => {
    this.setState({ helpShow: true });
  };

  handleCloseHelp = () => {
    this.setState({ helpShow: false });
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
        <FeedbackModal
          title={this.state.feedback.title}
          message={this.state.feedback.message}
          show={this.state.feedback.show}
          onClose={this.handleCloseFeedback}
        />
        <HelpModal
          show={this.state.helpShow}
          interval={this.state.intervalToPlay}
          onOpen={this.handleOpenHelp}
          onClose={this.handleCloseHelp}
        />
      </div>
    );
  }
}

export default Piano;
