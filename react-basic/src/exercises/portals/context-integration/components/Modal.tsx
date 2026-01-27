type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

/**
 * TODO: このコンポーネントをPortalを使う実装に変更してください
 *
 * 変更後も、children内でContextが正しく機能することを確認してください
 */
export function Modal({ children, onClose }: ModalProps) {
  // 現在の実装（Portalを使っていない）
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
