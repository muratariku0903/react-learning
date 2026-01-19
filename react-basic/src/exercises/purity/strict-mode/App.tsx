// StrictModeと純粋性の検証 - 演習
// 注意: このコードはStrictModeで問題が検出されるように意図的に書かれています

import { useEffect, useState } from "react";

// ========================================
// グローバル変数（問題の原因）
// ========================================
let globalId = 0;
let messageLog: string[] = [];

// ========================================
// 問題のあるコンポーネント: IdGenerator
// ========================================
function IdGenerator() {
  const [currentId] = useState(1);

  // ❌ 問題: レンダリングのたびにグローバル変数をインクリメント
  // globalId++;
  // const currentId = globalId;

  console.log(`IdGenerator レンダリング: currentId = ${currentId}`);

  return (
    <div>
      <h2>ID生成器</h2>
      <p>生成されたID: {currentId}</p>
      <p style={{ color: "#666", fontSize: "12px" }}>
        （コンソールを確認してください。StrictModeで2回レンダリングされると IDがずれます）
      </p>
    </div>
  );
}

// ========================================
// 問題のあるコンポーネント: MessageRecorder
// ========================================
type MessageRecorderProps = {
  message: string;
};

function MessageRecorder({ message }: MessageRecorderProps) {
  // ❌ 問題: レンダリングのたびにグローバル配列にpush
  // messageLog.push(message);

  // console.log(`MessageRecorder レンダリング: messageLog =`, [...messageLog]);

  const [messageLog] = useState([message]);

  console.log(`MessageRecorder レンダリング: messageLog =`, [...messageLog]);

  return (
    <div>
      <h2>メッセージ記録</h2>
      <p>記録されたメッセージ数: {messageLog.length}</p>
      <ul>
        {messageLog.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

// ========================================
// 正常なコンポーネント: Counter（比較用）
// ========================================
function Counter() {
  const [count, setCount] = useState(0);

  console.log(`Counter レンダリング: count = ${count}`);

  return (
    <div>
      <h2>カウンター（正常）</h2>
      <p>カウント: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <p style={{ color: "#666", fontSize: "12px" }}>
        （このコンポーネントはstateを使用しているため、StrictModeでも正常に動作します）
      </p>
    </div>
  );
}

// ========================================
// メインApp
// ========================================
export default function App() {
  const [showComponents, setShowComponents] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <h1>StrictModeと純粋性の検証 - 演習</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setShowComponents(!showComponents)}>
          コンポーネントを {showComponents ? "非表示" : "表示"}
        </button>
        <p style={{ color: "#666", fontSize: "12px" }}>
          ボタンを押して表示/非表示を切り替えると、問題がより顕著になります
        </p>
      </div>

      {showComponents && (
        <>
          <section
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #e74c3c",
              backgroundColor: "#fde",
            }}
          >
            <h3>コンポーネント1: IdGenerator（問題あり）</h3>
            <IdGenerator />
          </section>

          <section
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #e74c3c",
              backgroundColor: "#fd0",
            }}
          >
            <h3>コンポーネント2: MessageRecorder（問題あり）</h3>
            <MessageRecorder message="Hello, Worl" />
          </section>

          <section
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #27ae60",
              backgroundColor: "#f2f",
            }}
          >
            <h3>コンポーネント3: Counter（正常）</h3>
            <Counter />
          </section>
        </>
      )}

      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f" }}>
        <p>
          <strong>課題:</strong>
        </p>
        <ol>
          <li>
            ブラウザのコンソールを開いて、各コンポーネントのレンダリング回数を確認してください
          </li>
          <li>
            StrictModeの二重レンダリングにより、どのような問題が発生しているか観察してください
          </li>
          <li>
            問題のあるコンポーネント（IdGenerator, MessageRecorder）を修正してください
          </li>
        </ol>
        <p>
          <strong>期待される結果:</strong> 修正後は、StrictModeで2回レンダリングされても
          表示される値が一貫している
        </p>
      </div>
    </div>
  );
}
