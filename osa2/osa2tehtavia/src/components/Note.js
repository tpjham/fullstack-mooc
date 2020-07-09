import React from 'react';

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? "Make unimportant" : "Make important"

  return (
    <div>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
    </div>
  )
}

export default Note;