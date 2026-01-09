import { useEffect, useState } from "react";
import css from "./SearchBox.module.css";

import { useDebouncedCallback } from "use-debounce";

interface SearchBoxProps {
  enterWord: (word: string) => void;
  changePage: (page: number) => void;
}

export default function SearchBox({ enterWord, changePage }: SearchBoxProps) {
  const [text, setText] = useState("");

  const handleChange = useDebouncedCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setText(ev.target.value);
    },
    500
  );

  useEffect(() => {
    enterWord(text);
    const page = 1;
    changePage(page);
  }, [text, enterWord, changePage]);

  return (
    <input
      onChange={handleChange}
      defaultValue={text}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
