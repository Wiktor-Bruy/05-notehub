import css from "./App.module.css";

import { type NoteTag } from "../../types/note.ts";

import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchNotes,
  createNote,
  deleteNote,
} from "../../services/noteService.ts";

import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import Modal from "../Modal/Modal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [word, setWord] = useState("");

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: NoteTag) => {
      const res = await createNote(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
  });

  const { data } = useQuery({
    queryKey: ["note", page, word],
    queryFn: () => fetchNotes(page, word),
    placeholderData: keepPreviousData,
  });

  function closeModal() {
    setIsModal(false);
  }

  function handleSubmit(content: NoteTag) {
    setIsModal(false);
    createMutation.mutate(content);
  }

  function deledeNot(id: string) {
    deleteMutation.mutate(id);
  }

  function cancelForm() {
    setIsModal(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox enterWord={setWord} />
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
      {data && data.notes.length > 0 && (
        <NoteList onDelete={deledeNot} noteList={data.notes} />
      )}
      {isModal && (
        <Modal onClose={closeModal}>
          <NoteForm onSubmit={handleSubmit} onCancel={cancelForm} />
        </Modal>
      )}
    </div>
  );
}
