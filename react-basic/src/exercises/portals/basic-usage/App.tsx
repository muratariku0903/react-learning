import { useState } from 'react';
import { Modal } from './components/Modal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Portals - 基本的な使い方</h1>

      {/*
        問題: このコンテナにはoverflow: hiddenが設定されている
        通常のモーダルはこの制約を受けてしまう
      */}
      <div
        style={{
          overflow: 'hidden',
          height: '150px',
          border: '2px solid #e74c3c',
          padding: '20px',
          position: 'relative',
        }}
      >
        <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>
          このコンテナは overflow: hidden です
        </p>
        <p>高さは150pxに制限されています</p>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          モーダルを開く
        </button>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <h2>モーダルの内容</h2>
            <p>このモーダルは正しく表示されていますか？</p>
            <p>親の overflow: hidden の影響を受けていませんか？</p>
          </Modal>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '20px', background: '#f5f5' }}>
        <h3>確認ポイント</h3>
        <ul>
          <li>モーダルが画面中央に表示されるか</li>
          <li>背景オーバーレイが画面全体を覆うか</li>
          <li>親の overflow: hidden の影響を受けていないか</li>
        </ul>
      </div>
    </div>
  );
}
