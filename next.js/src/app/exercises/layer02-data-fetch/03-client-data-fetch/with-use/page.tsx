// TODO: React の use API を使ってデータを取得する
//
// このパターンの流れ:
//   1. Server Component (このファイル) で fetch() を呼ぶが、await しない → Promise のまま保持
//   2. その Promise を Client Component に props として渡す
//   3. Client Component 側で use(promise) を呼び、Promise の値を読み取る
//   4. use() は Promise が解決するまでコンポーネントを suspend させるため、Suspense が必要
//
// ヒント:
//   - このファイル自体は Server Component（"use client" を付けない）
//   - Client Component を別途作成して use() を呼ぶ
//   - import { use, Suspense } from "react" を使う
//   - Client Component は "use client" が必要

import { Suspense } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function WithUsePage() {
  // TODO: fetch() を呼ぶが await しない → Promise<Post[]> を取得
  // const postsPromise = fetch(...)...

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">React use API</h1>
      <p className="text-zinc-500 mb-4">
        Server Component で Promise を作成し、Client Component で use() で読み取る
      </p>

      {/* TODO: Suspense で囲み、fallback にローディング表示を設定 */}
      {/* TODO: Client Component に postsPromise を渡す */}
      <p className="text-red-500">未実装: use API でデータを取得してください</p>
    </div>
  );
}
