import { Todo } from "../_lib/store";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = (props: TodoListProps) => {
  const { todos } = props;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
