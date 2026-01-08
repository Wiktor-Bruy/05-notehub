export interface Note {
  content: string;
  id: string;
  tag: string;
  title: string;
}

export interface NoteTag {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
