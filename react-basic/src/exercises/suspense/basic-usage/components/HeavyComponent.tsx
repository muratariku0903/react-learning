// 重いコンポーネントを想定したダミーコンポーネント
// 実際のプロジェクトでは、大きなライブラリを使うコンポーネントや
// 複雑なUIを持つコンポーネントが該当します

export default function HeavyComponent() {
  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #333",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h2>Heavy Component</h2>
      <p>このコンポーネントは「重い」コンポーネントを想定しています。</p>
      <p>実際には大きなライブラリや複雑なUIを含むことがあります。</p>
      <ul>
        <li>グラフ描画ライブラリ</li>
        <li>リッチテキストエディタ</li>
        <li>複雑なフォーム</li>
      </ul>
    </div>
  );
}
