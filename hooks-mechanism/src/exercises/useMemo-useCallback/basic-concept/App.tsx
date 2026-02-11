import { useMemo, useState } from "react";

const ITEMS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Remix",
  "Vue",
  "Angular",
  "Svelte",
  "Node.js",
  "Deno",
];

function filterItems(query: string): string[] {
  console.log("フィルタリング実行");
  // 重い処理をシミュレート
  const start = performance.now();
  while (performance.now() - start < 100) {
    // 100msの遅延
  }
  return ITEMS.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
}

export default function App() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  // TODO: この処理はcountが変わるたびにも実行されてしまう
  const filteredItems = useMemo(() => filterItems(query), [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>useMemo 基本概念 - フィルタリングの最適化</h2>

      <div style={{ marginBottom: "16px" }}>
        <p>カウント: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
