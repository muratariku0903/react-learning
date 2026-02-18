// TODO: SWR (useSWR) を使ってクライアント側でデータを取得する
// ヒント:
//   - "use client" が必要
//   - useSWR(key, fetcher) の形で使う
//   - fetcher: (url: string) => fetch(url).then(res => res.json())
//   - data, error, isLoading を使ってローディング/エラー/データ表示を分岐

export default function WithSWRPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">SWR (useSWR)</h1>
      <p className="text-zinc-500 mb-4">
        クライアント側でデータを取得（stale-while-revalidate）
      </p>

      {/* TODO: useSWR でデータを取得し、投稿一覧を表示する */}
      <p className="text-red-500">未実装: useSWR でデータを取得してください</p>
    </div>
  );
}
