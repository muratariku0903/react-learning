/**
 * 演習: useState 基本概念
 *
 * このカウンターは動きません。
 * なぜ動かないかを理解し、useStateを使って修正してください。
 */

import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    const newCount = count + 1;
    console.log("count:", newCount); // コンソールでは増えている
    setCount(newCount);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>カウンター</h1>
      <p style={{ fontSize: "24px" }}>カウント: {count}</p>
      <button onClick={handleClick} style={{ padding: "10px 20px" }}>
        +1
      </button>
    </div>
  );
}

export default App;
