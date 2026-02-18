// TODO: cache: 'force-cache' を使って投稿一覧を取得し、キャッシュの挙動を確認する
// ヒント:
//   - async コンポーネントとして定義する
//   - fetch() の第2引数に { cache: 'force-cache' } を指定する
//   - 取得時刻を表示して、リロード時にキャッシュが効いているか確認する

export default function ForceCachePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">force-cache</h1>
      <p className="text-zinc-500 mb-4">キャッシュを強制する（SSG相当）</p>

      {/* TODO: ここにデータ取得時刻と投稿一覧を表示する */}
      <p className="text-red-500">未実装: fetch() でデータを取得してください</p>
    </div>
  );
}
