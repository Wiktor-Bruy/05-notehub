import css from "./NoteList.module.css";

import { type Note } from "../../types/note.ts";

interface NoteListProps {
  noteList: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ noteList, onDelete }: NoteListProps) {
  return (
    <ul className={css.list}>
      {noteList.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button onClick={() => onDelete(note.id)} className={css.button}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
