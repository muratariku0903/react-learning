"use client";

export default function HeavyComponent() {
  const nums = heavyFunc();

  return (
    <div className="text-black">
      <h4 className="text-lg font-semibold mb-2">Heavy Component</h4>
      <p className="text-zinc-500">
        このコンポーネントを「重い」コンポーネントとして実装してください。 dynamic()
        で遅延読み込みされる対象です。
      </p>
      <ul>
        {nums.map((num) => (
          <li key={num}>num</li>
        ))}
      </ul>
    </div>
  );
}

const heavyFunc = () => {
  const nums = [];
  for (let i = 0; i < 100000; i++) {
    nums.push(i);
  }

  return nums;
};
