import { useState, useEffect } from "react";

/**
 * 問題のあるタイマー実装
 * 「開始」を押すと1秒ごとにカウントアップするはずですが...
 */
function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        // ここに問題がある！
        setCount(count + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning]); // ← この依存配列は正しい？

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCount(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>タイマー</h2>
      <p style={{ fontSize: "48px", fontFamily: "monospace" }}>{count}</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleStart} disabled={isRunning}>
          開始
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          停止
        </button>
        <button onClick={handleReset}>リセット</button>
      </div>

      <div style={{ marginTop: "20px", color: "gray", fontSize: "14px" }}>
        <p>開始ボタンを押して、カウントの動きを確認してください。</p>
        <p>期待通りに1秒ごとにカウントアップしていますか？</p>
      </div>
    </div>
  );
}

export default function App() {
  return <Timer />;
}
