// 副作用の分離 - 演習
// 注意: このコードには意図的にアンチパターンが含まれています

import { useEffect, useState } from "react";

// ========================================
// 問題のあるコンポーネント: PageView
// ========================================
function PageView() {
  const [count, setCount] = useState(0);

  // ❌ アンチパターン: レンダリング中にdocument.titleを変更
  // document.title = `カウント: ${count}`;

  useEffect(() => {
    document.title = `カウント: ${count}`;
    console.log("PageViewがレンダリングされました。カウント:", count);
  }, [count]);

  // ❌ アンチパターン: レンダリング中にconsole.logを実行
  // console.log("PageViewがレンダリングされました。カウント:", count);

  return (
    <div>
      <h2>ページビューカウンター</h2>
      <p>現在のカウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>カウントアップ</button>
    </div>
  );
}

// ========================================
// 問題のあるコンポーネント: UserGreeting
// ========================================
type UserGreetingProps = {
  username: string;
};

function UserGreeting({ username }: UserGreetingProps) {
  // ❌ アンチパターン: レンダリング中にlocalStorageに書き込み
  // localStorage.setItem("lastVisitedUser", username);

  // ❌ アンチパターン: レンダリング中に現在時刻を記録
  // const visitTime = new Date().toISOString();
  // localStorage.setItem("lastVisitTime", visitTime);

  useEffect(() => {
    localStorage.setItem("lastVisitedUser", username);
    const visitTime = new Date().toISOString();
    localStorage.setItem("lastVisitTime", visitTime);
  }, [username]);

  return (
    <div>
      <h2>ようこそ、{username}さん！</h2>
      <p>訪問時刻を記録しました</p>
    </div>
  );
}

// ========================================
// 問題のあるコンポーネント: DataLogger
// ========================================
function DataLogger() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // ❌ アンチパターン: レンダリングのたびにAPIを呼び出す想定のログ
  // （実際のAPI呼び出しの代わりにconsole.logで模擬）
  // console.log("データを送信中...", { itemCount: items.length });

  const handleAdd = () => {
    console.log("データを送信中...", { itemCount: items.length });
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div>
      <h2>アイテムリスト</h2>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="アイテムを入力"
        />
        <button onClick={handleAdd}>追加</button>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>合計: {items.length}件</p>
    </div>
  );
}

// ========================================
// メインApp
// ========================================
export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>副作用の分離 - 演習</h1>

      <section
        style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>コンポーネント1: PageView</h3>
        <PageView />
      </section>

      <section
        style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>コンポーネント2: UserGreeting</h3>
        <UserGreeting username="山田太郎" />
      </section>

      <section
        style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>コンポーネント3: DataLogger</h3>
        <DataLogger />
      </section>

      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
        <p>
          <strong>課題:</strong> 上記3つのコンポーネントには、レンダリング中に副作用を
          実行しているアンチパターンがあります。副作用を適切な場所（useEffectまたは
          イベントハンドラ）に移動してください。
        </p>
        <p>
          <strong>確認方法:</strong> ブラウザのコンソールを開いて、不要なログが
          出力されていないか確認してください。StrictModeの二重レンダリングで
          副作用が2回実行されているのが分かるはずです。
        </p>
      </div>
    </div>
  );
}
