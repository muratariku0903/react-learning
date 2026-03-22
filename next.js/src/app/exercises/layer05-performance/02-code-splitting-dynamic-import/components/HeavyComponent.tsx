"use client";

// TODO: このコンポーネントを「重い」コンポーネントとして実装してください
// 例:
// - 大量のリストアイテムを生成する
// - 複雑な計算処理を行う
// - 大きなテーブルやチャートを表示する

export default function HeavyComponent() {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Heavy Component</h4>
      <p className="text-zinc-500">
        このコンポーネントを「重い」コンポーネントとして実装してください。
        dynamic() で遅延読み込みされる対象です。
      </p>
    </div>
  );
}
