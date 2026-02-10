import { useState, useEffect } from "react";

/**
 * 問題のあるマウストラッカー
 * イベントリスナーのクリーンアップが適切に行われていません
 */
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (isTracking) {
      // マウスの動きを追跡
      const handleMouseMove = (event: MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
      };

      console.log("イベントリスナーを追加しました");
      window.addEventListener("mousemove", handleMouseMove);

      // ここに問題がある！クリーンアップ関数がない
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isTracking]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>マウストラッカー</h2>

      <button onClick={() => setIsTracking(!isTracking)}>
        追跡 {isTracking ? "OFF" : "ON"}
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: isTracking ? "#e8f" : "#e11",
          borderRadius: "8px",
        }}
      >
        <p>
          追跡状態: <strong>{isTracking ? "ON" : "OFF"}</strong>
        </p>
        <p>
          マウス位置: X={position.x}, Y={position.y}
        </p>
      </div>

      <div style={{ marginTop: "20px", color: "gray", fontSize: "14px" }}>
        <p>1. 追跡ONにして、マウスを動かしてください</p>
        <p>2. 追跡OFFにして、再度ONにしてください</p>
        <p>3. コンソールを確認してください。何が起きていますか？</p>
        <p>4. ブラウザの開発者ツールでEvent Listenersを確認してみてください</p>
      </div>
    </div>
  );
}

/**
 * 親コンポーネント - マウストラッカーの表示/非表示を制御
 */
export default function App() {
  const [showTracker, setShowTracker] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => setShowTracker(!showTracker)}
        style={{ marginBottom: "20px" }}
      >
        トラッカーを {showTracker ? "非表示" : "表示"}
      </button>

      {showTracker && <MouseTracker />}

      {!showTracker && (
        <div style={{ color: "gray" }}>
          <p>トラッカーは非表示です。</p>
          <p>この状態でもイベントリスナーはどうなっていますか？</p>
        </div>
      )}
    </div>
  );
}
