import { memo, useCallback, useState } from "react";

// TODO: このコンポーネントは親のstate変更のたびに再レンダーされてしまう
const TodoItem = memo(function TodoItem({
  text,
  index,
  onDelete,
}: {
  text: string;
  index: number;
  onDelete: (index: number) => void;
}) {
  console.log(`TodoItem rendered: ${text}`);
  return (
    <li>
      {text} <button onClick={() => onDelete(index)}>削除</button>
    </li>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const [todos] = useState(["買い物に行く", "本を読む", "コードを書く"]);

  const handleDelete = useCallback((index: number) => {
    console.log(`Todo ${index} を削除`);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>useCallback と React.memo - 不要な再レンダー防止</h2>

      <div style={{ marginBottom: "16px" }}>
        <p>親カウント: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>親カウント+1</button>
      </div>

      <ul>
        {todos.map((todo, i) => (
          <TodoItem key={todo} text={todo} index={i} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}
