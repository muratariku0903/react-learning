import { PreviousValue } from "./components/PreviousValue";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>stateとrefの使い分け - 前回の値を表示</h1>
      <PreviousValue />
    </div>
  );
}
