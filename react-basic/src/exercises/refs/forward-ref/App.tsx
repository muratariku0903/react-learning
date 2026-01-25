// TODO: 必要なimportを追加
import { useRef } from "react";
import { TextInput } from "./components/TextInput";

/**
 * forwardRef演習 - メインコンポーネント
 *
 * TODO: 以下の機能を実装してください
 * 1. TextInputコンポーネントを2つ配置（ユーザー名、メールアドレス）
 * 2. 各入力欄にフォーカスするボタンを実装
 */
export default function App() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const focusUserName = () => {
    userNameRef.current?.focus();
  };

  const focusEmail = () => {
    emailRef.current?.focus();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>forwardRef - カスタム入力コンポーネント</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* TODO: TextInputコンポーネントを配置 */}
        <p>TextInputコンポーネントを実装してください</p>
        <TextInput ref={userNameRef} label="ユーザー名" />
        <TextInput ref={emailRef} label="メールアドレス" />
      </div>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {/* TODO: フォーカスボタンを実装 */}
        <button onClick={focusUserName}>ユーザー名にフォーカス</button>
        <button onClick={focusEmail}>メールアドレスにフォーカス</button>
      </div>
    </div>
  );
}
