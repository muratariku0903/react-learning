"use client";

import { useActionState, useState } from "react";
import { addTodo, AddTodoResult } from "../_actions/todo";
import { SubmitButton } from "./SubmitButton";

export const AddTodoForm = () => {
  const [title, setTitle] = useState("");

  const [state, formAction] = useActionState<AddTodoResult, FormData>(
    async (_, formData: FormData) => {
      const result = await addTodo(formData);
      if (result?.success) {
        setTitle("");
      }

      return result;
    },
    null,
  );

  return (
    <form action={formAction}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {state && !state.success && <p>エラーが発生しました: {state.error}</p>}
      <SubmitButton />
    </form>
  );
};
