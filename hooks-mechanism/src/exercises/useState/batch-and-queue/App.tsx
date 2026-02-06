/**
 * 演習: useState バッチ処理とキュー
 *
 * この「いいね」ボタンには問題があります。
 * 素早く連打すると、期待通りにカウントが増えません。
 *
 * 原因を特定し、正しく修正してください。
 */

import { useState } from "react";

function App() {
  const [likes, setLikes] = useState(0);

  // 問題: 連打すると正しく増えない
  function handleLike() {
    // シミュレーション: 非同期処理後に更新（API呼び出しを想定）
    setTimeout(() => {
      setLikes((prev) => prev + 1);
    }, 1000);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>いいねボタン</h1>
      <p style={{ fontSize: "24px" }}>いいね: {likes}</p>
      <button
        onClick={handleLike}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        いいね！
      </button>
      <p style={{ color: "#666", marginTop: "10px" }}>※ 素早く連打してみてください</p>
    </div>
  );
}

export default App;
