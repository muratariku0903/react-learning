import { useState, useMemo, useCallback, memo } from "react";

// React.memoされた子コンポーネント
const ExpensiveList = memo(function ExpensiveList({
  items,
  onItemClick,
}: {
  items: string[];
  onItemClick: (item: string) => void;
}) {
  console.log("ExpensiveList rendered");
  return (
    <ul>
      {items.map((item) => (
        <li key={item} onClick={() => onItemClick(item)} style={{ cursor: "pointer" }}>
          {item}
        </li>
      ))}
    </ul>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");

  // (1) タイトル文字列をuseMemoでキャッシュ
  const title = `検索結果（${count}回クリック済み）`;

  // (2) スタイルオブジェクトをuseMemoでキャッシュ
  const containerStyle = { padding: "20px", border: "1px solid #ccc" };

  // (3) 検索対象のアイテムリスト
  const allItems = useMemo(() => {
    return ["React", "TypeScript", "JavaScript", "Next.js", "Vue", "Angular"];
  }, []);

  // (4) フィルタリング処理をuseMemoでキャッシュ
  const filteredItems = useMemo(() => {
    console.log("フィルタリング実行");
    return allItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query, allItems]);

  // (5) クリックハンドラをuseCallbackでキャッシュ
  const handleItemClick = useCallback((item: string) => {
    alert(`${item} をクリックしました`);
  }, []);

  // (6) カウントのインクリメントをuseCallbackでキャッシュ
  const handleIncrement = () => {
    setCount((c) => c + 1);
  };

  // (7) queryの文字数をuseMemoでキャッシュ
  const queryLength = query.length;

  return (
    <div style={containerStyle}>
      <h2>useMemo・useCallback の使いどころ判断</h2>
      <p>{title}</p>

      <div style={{ marginBottom: "16px" }}>
        <button onClick={handleIncrement}>+1</button>
        <span style={{ marginLeft: "8px" }}>カウント: {count}</span>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span style={{ marginLeft: "8px" }}>文字数: {queryLength}</span>
      </div>

      <ExpensiveList items={filteredItems} onItemClick={handleItemClick} />
    </div>
  );
}
