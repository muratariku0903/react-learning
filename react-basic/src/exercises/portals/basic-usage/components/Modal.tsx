import { createPortal } from "react-dom";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

/**
 * TODO: このコンポーネントをPortalを使って修正してください
 *
 * 現在の問題:
 * - モーダルが親のoverflow: hiddenの影響を受けて正しく表示されない
 *
 * 修正のポイント:
 * - createPortalを使って、モーダルをdocument.bodyに描画する
 */
export function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div
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
      onClick={onClose}
    >
      <div
        style={{
          background: "red",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          閉じる
        </button>
      </div>
    </div>,
    document.body,
  );
}
