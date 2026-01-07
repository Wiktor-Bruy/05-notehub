import css from "./App.module.css";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService.ts";

import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";

export default function App() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["note", page],
    queryFn: () => fetchNotes(page),
  });

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
        {/* Кнопка створення нотатки */}
      </header>
      {data && data.notes.length > 0 && <NoteList noteList={data.notes} />}
    </div>
  );
}
