// TODO: React.lazy() と Suspense を使って遅延読み込みに変更してください
import HeavyComponent from "./components/HeavyComponent";

export default function App() {
  return (
    <div>
      <h1>Suspense 基本演習</h1>
      <p>下のコンポーネントを遅延読み込みに変更してください</p>

      {/* TODO: Suspenseでラップしてください */}
      <HeavyComponent />
    </div>
  );
}
