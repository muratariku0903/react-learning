/**
 * 演習: useState 基本概念
 *
 * このカウンターは動きません。
 * なぜ動かないかを理解し、useStateを使って修正してください。
 */

function App() {
  // 問題: ローカル変数を使っている
  let count = 0;

  function handleClick() {
    count = count + 1;
    console.log("count:", count); // コンソールでは増えている
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
