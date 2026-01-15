// Render PhaseとCommit Phase 演習
// この演習では、Reactのレンダリングの2段階を理解します

import { useEffect, useLayoutEffect, useState } from "react";

export default function App() {
  return (
    <div>
      <h1>Render PhaseとCommit Phase</h1>
      <p>README.mdの要件に従って実装してください。</p>
      {/* ここにカウンターコンポーネントを実装 */}
      <Counter />
    </div>
  );
}

const Counter = () => {
  console.log("exec Counter");

  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    console.log("exec useLayoutEffect");
  });

  useEffect(() => {
    console.log("exec useEffect");
  });

  return (
    <div>
      <p>count:{count}</p>
      <button onClick={() => setCount(count + 1)}>count up</button>
    </div>
  );
};
