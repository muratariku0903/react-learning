// CSR（Client Side Rendering）

import { PostList } from "./components/PostList";

export default function CSRPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">CSR - Client Side Rendering</h1>
      <p className="text-zinc-500 mb-6">クライアント側でデータを取得して表示する</p>

      <p className="text-sm text-zinc-400 mb-4">生成時刻: {new Date().toISOString()}</p>

      <PostList />
    </div>
  );
}
