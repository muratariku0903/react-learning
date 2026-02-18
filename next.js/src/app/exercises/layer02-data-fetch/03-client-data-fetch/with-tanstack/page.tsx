// TODO: TanStack Query (useQuery) を使ってクライアント側でデータを取得する
// ヒント:
//   - "use client" が必要
//   - QueryClientProvider のセットアップが必要（layout.tsx で囲むパターンが一般的）
//   - useQuery({ queryKey: ['posts'], queryFn: ... }) の形で使う
//   - isPending, error, data を使って表示を分岐

export default function WithTanstackPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">TanStack Query (useQuery)</h1>
      <p className="text-zinc-500 mb-4">
        クライアント側でデータを取得（強力なキャッシュ管理）
      </p>

      {/* TODO: useQuery でデータを取得し、投稿一覧を表示する */}
      <p className="text-red-500">未実装: useQuery でデータを取得してください</p>
    </div>
  );
}
