"use server";

import { revalidatePath } from "next/cache";
import { Todo, todos } from "../_lib/store";
import z from "zod";

const todoSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
});

export type AddTodoResult =
  | { success: true; todo: Todo }
  | { success: false; error: string }
  | null;
export const addTodo = async (formData: FormData): Promise<AddTodoResult> => {
  const rawFormData = {
    title: formData.get("title"),
  };

  const { success, data, error } = todoSchema.safeParse(rawFormData);
  if (!success) {
    return { success: false, error: error.issues[0].message };
  }
  const { title } = data;

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);

  revalidatePath("/exercises/layer03-fullstack/02-server-actions");

  return { success: true, todo: newTodo };
};

export const toggleTodo = async (id: string): Promise<void> => {
  const index = todos.findIndex((e) => e.id === id);
  if (index === -1) {
    throw Error("not found todo for update");
  }

  const target = todos[index];
  const completed = { ...target, completed: !target.completed };

  todos.splice(index, 1, completed);

  revalidatePath("/exercises/layer03-fullstack/02-server-actions");
};

export const deleteTodo = async (id: string): Promise<void> => {
  const target = todos.findIndex((e) => e.id === id);
  if (target === -1) {
    throw Error("not found todo for delete");
  }

  todos.splice(target, 1);

  revalidatePath("/exercises/layer03-fullstack/02-server-actions");
};
