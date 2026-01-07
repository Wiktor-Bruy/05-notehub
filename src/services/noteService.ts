import axios from "axios";

import { type Note } from "../types/note.ts";

interface Answer {
  notes: Note[];
  totalPages: number;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(page: number) {
  const res = await axios.get<Answer>(
    `https://notehub-public.goit.study/api/notes?page=${page}&perPage=12`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export function createNote() {}

export function deleteNote() {}
