import { useRef, useState } from "react";

/**
 * 前回の値を表示するコンポーネント
 *
 * 問題点:
 * - 「前回の値」が正しく表示されない
 * - 不必要な再レンダリングが発生している
 *
 * TODO: stateとrefを適切に使い分けて修正してください
 */
export function PreviousValue() {
  const [count, setCount] = useState(0);
  // 問題: 前回の値もstateで管理している
  const prev = useRef(0);

  console.log("PreviousValue rendered");

  const handleIncrement = () => {
    setCount((current) => {
      prev.current = current; // 「更新前」を確実に保存
      return current + 1;
    });
  };

  return (
    <div>
      <p>現在の値: {count}</p>
      <p>前回の値: {prev.current}</p>
      <button onClick={handleIncrement}>+1</button>
    </div>
  );
}
