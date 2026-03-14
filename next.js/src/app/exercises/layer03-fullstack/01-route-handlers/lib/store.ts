export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const memos: Memo[] = [
  {
    id: "1",
    title: "test title 1",
    content: "test content 1",
    createdAt: "2026-03-14",
    updatedAt: "2026-03-14",
  },
  {
    id: "2",
    title: "test title 2",
    content: "test content 2",
    createdAt: "2026-03-14",
    updatedAt: "2026-03-14",
  },
  {
    id: "3",
    title: "test title 3",
    content: "test content 3",
    createdAt: "2026-03-14",
    updatedAt: "2026-03-14",
  },
];
