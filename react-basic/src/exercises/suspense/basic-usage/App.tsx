import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./components/HeavyComponent"));

export default function App() {
  return (
    <div>
      <h1>Suspense 基本演習</h1>
      <p>下のコンポーネントを遅延読み込みに変更してください</p>

      {/* TODO: Suspenseでラップしてください */}
      <Suspense fallback={<div>読み込み中...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
