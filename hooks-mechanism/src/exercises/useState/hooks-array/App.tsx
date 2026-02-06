/**
 * 演習: useState 配列とインデックス
 *
 * このコードにはHooksのルール違反があります。
 * 「カウント表示」をOFFにするとエラーまたは予期しない動作が発生します。
 *
 * 問題を特定し、正しく修正してください。
 */

import { useState } from "react";

function App() {
  const [showCount, setShowCount] = useState(true);
  const [count, setCount] = useState(0);

  if (showCount) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>カウンター</h1>
        <p style={{ fontSize: "24px" }}>カウント: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          +1
        </button>
        <button onClick={() => setShowCount(false)} style={{ padding: "10px 20px" }}>
          カウント表示OFF
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>カウンター</h1>
      <p style={{ fontSize: "24px" }}>カウント: 非表示</p>
      <button onClick={() => setShowCount(true)} style={{ padding: "10px 20px" }}>
        カウント表示ON
      </button>
    </div>
  );
}

export default App;
