// 演習3-1: Route Handlers
// このページはメモ帳のUIとして、Route Handlers で実装した API を呼び出す。
// TODO: API の実装後に UI を構築する。

import { memos } from "./lib/store";
import { MemoForm } from "./components/form";
import { MemoItem } from "./components/memo";

export default async function RouteHandlersPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">演習3-1: Route Handlers</h1>
      <p className="text-zinc-500 mb-6">
        Route Handlers で CRUD API を実装し、このページから呼び出す
      </p>

      <div className="p-3">
        <MemoForm />
      </div>

      <ul className="p-3">
        {memos.map((memo) => (
          <MemoItem key={memo.id} memo={memo} />
        ))}
      </ul>
    </div>
  );
}
