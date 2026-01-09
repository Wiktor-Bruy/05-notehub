export interface Note {
  content: string;
  id: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  title: string;
}

export interface NoteTag {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
