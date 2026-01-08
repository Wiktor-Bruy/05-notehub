import css from "./App.module.css";

import { type NoteTag } from "../../types/note.ts";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes, createNote } from "../../services/noteService.ts";

import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["note", page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });

  function closeModal() {
    setIsModal(false);
  }

  async function handleSubmit(content: NoteTag) {
    const res = await createNote(content);
    console.log(res);
    setIsModal(false);
  }

  function cancelForm() {
    setIsModal(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModal(true)}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && <NoteList noteList={data.notes} />}
      {isModal && (
        <Modal onClose={closeModal}>
          <NoteForm onSubmit={handleSubmit} onCancel={cancelForm} />
        </Modal>
      )}
    </div>
  );
}
