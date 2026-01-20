// TODO: forwardRefをimport
// import { forwardRef } from "react";

/**
 * フォーカス可能なカスタム入力コンポーネント
 *
 * TODO: 以下を実装してください
 * 1. Props型を定義（label: string）
 * 2. forwardRefを使って、親からrefを受け取れるようにする
 * 3. 受け取ったrefを内部のinput要素に渡す
 */

// ヒント: forwardRefの書き方
// const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
//   return <input ref={ref} />;
// });

type TextInputProps = {
  label: string;
};

// TODO: forwardRefを使った実装に変更
export function TextInput({ label }: TextInputProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <label style={{ minWidth: "120px" }}>{label}:</label>
      <input
        type="text"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}
