import React from "react";

const PianoKeys = (props) => {
  const notes = props.noteList.map((note) => {
    return (
      <div key={props.noteList.indexOf(note)} id={note}>
        {note}
      </div>
    );
  });

  return <div>{notes}</div>;
};

export default PianoKeys;
