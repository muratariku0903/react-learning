import { useState } from "react";

/**
 * ストップウォッチコンポーネント
 *
 * TODO: 以下の機能を実装してください
 * 1. スタートボタンでタイマー開始
 * 2. ストップボタンでタイマー停止
 * 3. リセットボタンで0にリセット
 *
 * ヒント:
 * - setIntervalのIDをuseRefで保持する
 * - useEffectでクリーンアップを行う
 */
export function Stopwatch() {
  const [seconds, setSeconds] = useState(0);

  // TODO: setIntervalのIDを保持するためのuseRefを追加

  const handleStart = () => {
    // TODO: タイマーを開始する処理を実装
  };

  const handleStop = () => {
    // TODO: タイマーを停止する処理を実装
  };

  const handleReset = () => {
    // TODO: タイマーをリセットする処理を実装
  };

  // TODO: useEffectでクリーンアップを実装

  return (
    <div>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{seconds} 秒</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleStart}>スタート</button>
        <button onClick={handleStop}>ストップ</button>
        <button onClick={handleReset}>リセット</button>
      </div>
    </div>
  );
}
