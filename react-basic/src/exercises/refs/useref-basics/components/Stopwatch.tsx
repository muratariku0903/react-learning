import { useEffect, useRef, useState } from "react";

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
  const setIntervalId = useRef<number | null>(null);

  const handleStart = () => {
    if (setIntervalId.current !== null) return;

    setIntervalId.current = setInterval(() => {
      // 前の値に依存するので関数形式にする（クロージャ対策）
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    // TODO: タイマーを停止する処理を実装
    if (setIntervalId.current !== null) {
      clearInterval(setIntervalId.current);
      setIntervalId.current = null;
    }
  };

  const handleReset = () => {
    // TODO: タイマーをリセットする処理を実装
    setSeconds(0);
    handleStop();
  };

  // TODO: useEffectでクリーンアップを実装
  useEffect(() => {
    // アンマウント時にクリーンアップ
    return () => {
      if (setIntervalId.current !== null) {
        clearInterval(setIntervalId.current);
        setIntervalId.current = null;
      }
    };
  }, []);

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
