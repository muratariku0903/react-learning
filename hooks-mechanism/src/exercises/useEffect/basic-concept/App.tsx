import { useState } from "react";

/**
 * 問題のあるコード
 * このコンポーネントはレンダー中に副作用を実行しています。
 * StrictModeで実行して、何が起こるか確認してください。
 */
function Counter() {
  const [count, setCount] = useState(0);

  // ここに問題がある！
  // レンダー中に副作用を実行している
  console.log(`[レンダー中] カウントが変更されました: ${count}`);

  // 仮にAPIリクエストをここで行ったらどうなる？
  // fetch(`/api/log?count=${count}`) // これは絶対にやってはいけない

  return (
    <div style={{ padding: "20px" }}>
      <h2>カウンター</h2>
      <p>現在のカウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>

      <div style={{ marginTop: "20px", color: "gray", fontSize: "14px" }}>
        <p>ブラウザの開発者ツール（Console）を確認してください。</p>
        <p>ボタンを1回クリックすると、ログは何回出力されますか？</p>
      </div>
    </div>
  );
}

export default function App() {
  return <Counter />;
}
