// 演習3-2: Server Actions
// このページは Todo アプリのメインページ。
// Server Component としてデータを取得し、Client Component に渡す。
// TODO: Server Actions とデータストアの実装後に構築する。

export default function ServerActionsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">演習3-2: Server Actions</h1>
      <p className="text-zinc-500 mb-6">
        Server Actions で Todo アプリを実装（フォーム連携・Optimistic UI・バリデーション）
      </p>

      <p className="text-red-500">
        未実装: まず _actions/todo.ts と _lib/store.ts を実装してから、このページを構築してください
      </p>
    </div>
  );
}
