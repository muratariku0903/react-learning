"use client";

import { useOptimistic, useTransition } from "react";
import { deleteTodo, toggleTodo } from "../_actions/todo";
import { Todo } from "../_lib/store";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [, startTransition] = useTransition();
  const [completed, setCompleted] = useOptimistic(todo.completed);

  const onCheck = () => {
    startTransition(async () => {
      setCompleted(!completed);
      await toggleTodo(todo.id);
    });
  };

  return (
    <div>
      <p>
        title: {todo.title} completed: {completed ? "完了" : "未済"}
      </p>
      <input type="checkbox" checked={completed} onChange={onCheck}></input>
      <button onClick={() => deleteTodo(todo.id)}>削除</button>
    </div>
  );
};
