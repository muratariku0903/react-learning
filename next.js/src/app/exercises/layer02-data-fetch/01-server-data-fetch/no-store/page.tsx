// TODO: cache: 'no-store' を使って投稿一覧を取得し、毎回最新データが取得されることを確認する
// ヒント:
//   - async コンポーネントとして定義する
//   - fetch() の第2引数に { cache: 'no-store' } を指定する
//   - 取得時刻を表示して、リロードのたびに時刻が変わることを確認する

export default function NoStorePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">no-store</h1>
      <p className="text-zinc-500 mb-4">キャッシュなし（SSR相当）</p>

      {/* TODO: ここにデータ取得時刻と投稿一覧を表示する */}
      <p className="text-red-500">未実装: fetch() でデータを取得してください</p>
    </div>
  );
}
