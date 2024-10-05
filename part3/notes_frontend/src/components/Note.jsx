const Note = ({ note, toggleImportance, deleteNote }) => {
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>
        {note.important ? "make not important" : "make important"}
      </button>
      <button onClick={deleteNote}>
        delete
      </button>
    </li>
  );
};

export default Note;
