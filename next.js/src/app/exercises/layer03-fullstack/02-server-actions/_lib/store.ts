export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export const todos: Todo[] = [
  {
    id: "1",
    title: "test title 1",
    completed: false,
    createdAt: "2026-03-14",
  },
  {
    id: "2",
    title: "test title 2",
    completed: false,
    createdAt: "2026-03-14",
  },
  {
    id: "3",
    title: "test title 3",
    completed: false,
    createdAt: "2026-03-14",
  },
];
