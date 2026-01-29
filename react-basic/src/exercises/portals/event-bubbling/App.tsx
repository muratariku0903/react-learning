import { useState } from "react";
import { createPortal } from "react-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Portals - イベントバブリングの挙動</h1>

      {/*
        このdivにonClickがある
        Portalで外に出たモーダル内のクリックはここまでバブリングするか？
      */}
      <div
        onClick={() => addLog("親コンテナ clicked")}
        style={{
          padding: "20px",
          border: "2px solid #3498db",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p style={{ color: "#3498db", fontWeight: "bold" }}>
          この青い枠内にonClickが設定されています
        </p>

        <button
          onClick={() => {
            addLog("「モーダルを開く」ボタン clicked");
            setIsOpen(true);
          }}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          モーダルを開く
        </button>

        {isOpen && <Modal onClose={() => setIsOpen(false)} addLog={addLog} />}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={clearLogs} style={{ padding: "8px 16px" }}>
          ログをクリア
        </button>
      </div>

      <div
        style={{
          padding: "15px",
          background: "#1a1a2e",
          color: "#0f0",
          borderRadius: "8px",
          fontFamily: "monospace",
          minHeight: "150px",
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        <div style={{ marginBottom: "10px", color: "#888" }}>=== イベントログ ===</div>
        {logs.length === 0 ? (
          <div style={{ color: "#666" }}>ログはまだありません</div>
        ) : (
          logs.map((log, i) => <div key={i}>{log}</div>)
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>確認ポイント</h3>
        <ul>
          <li>モーダル内のボタンをクリックしたとき、親コンテナのonClickは発火するか？</li>
          <li>モーダルの背景（オーバーレイ）をクリックしたとき、何が起こるか？</li>
          <li>イベントの発火順序はどうなっているか？</li>
        </ul>
      </div>
    </div>
  );
}

type ModalProps = {
  onClose: () => void;
  addLog: (message: string) => void;
};

function Modal({ onClose, addLog }: ModalProps) {
  return createPortal(
    <div
      onClick={(e) => {
        addLog("オーバーレイ clicked");
        e.stopPropagation();
        onClose();
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => {
          addLog("モーダル本体 clicked");
          e.stopPropagation(); // オーバーレイへの伝播を止める
        }}
        style={{
          background: "red",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
        }}
      >
        <h2>モーダルの内容</h2>
        <p>このモーダルはPortalで描画されています。</p>
        <p>DOM上では document.body の直下にあります。</p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => addLog("モーダル内ボタン clicked")}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            ボタン（ログのみ）
          </button>

          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
