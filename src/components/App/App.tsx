import css from "./App.module.css";

import { type NoteTag, type Note } from "../../types/note.ts";

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
import CreateMessage from "../CreateMessage/CreateMessage.tsx";
import Error from "../Error/Error.tsx";

type Modal = "form" | "error" | "create" | "delete";

export default function App() {
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [word, setWord] = useState("");
  const [typeModal, setTypeModal] = useState<Modal>("form");
  const [message, setMessage] = useState<Note | null>(null);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: NoteTag) => {
      const res = await createNote(data);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setIsModal(true);
      setTypeModal("create");
      setMessage(data);
    },
    onError: (error) => {
      setIsModal(true);
      setTypeModal("error");
      setError(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setIsModal(true);
      setTypeModal("delete");
      setMessage(data);
    },
    onError: (error) => {
      setIsModal(true);
      setTypeModal("error");
      setError(error.message);
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

  function createBtn() {
    setIsModal(true);
    setTypeModal("form");
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox changePage={setPage} enterWord={setWord} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}
        <button className={css.button} onClick={createBtn}>
          Create note +
        </button>
      </header>
      {data && data.notes.length > 0 && (
        <NoteList onDelete={deledeNot} noteList={data.notes} />
      )}
      {isModal && (
        <Modal onClose={closeModal}>
          {typeModal === "form" && (
            <NoteForm onSubmit={handleSubmit} onCancel={cancelForm} />
          )}
          {typeModal === "create" && message && (
            <CreateMessage note={message} mess="Is created" />
          )}
          {typeModal === "delete" && message && (
            <CreateMessage note={message} mess="Is deleted" />
          )}
          {typeModal === "error" && <Error mess={error} />}
        </Modal>
      )}
    </div>
  );
}
