import css from "./App.module.css";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService.ts";

import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import Modal from "../Modal/Modal.tsx";

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
      {isModal && <Modal onClose={closeModal} />}
    </div>
  );
}
