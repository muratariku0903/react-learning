// TODO: next: { revalidate: 10 } を使って投稿一覧を取得し、時間ベースの再検証を確認する
// ヒント:
//   - async コンポーネントとして定義する
//   - fetch() の第2引数に { next: { revalidate: 10 } } を指定する
//   - 取得時刻を表示して、10秒以内と10秒以降のリロードで時刻の変化を比較する

export default function RevalidatePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">revalidate</h1>
      <p className="text-zinc-500 mb-4">10秒ごとに再検証（ISR相当）</p>

      {/* TODO: ここにデータ取得時刻と投稿一覧を表示する */}
      <p className="text-red-500">未実装: fetch() でデータを取得してください</p>
    </div>
  );
}
