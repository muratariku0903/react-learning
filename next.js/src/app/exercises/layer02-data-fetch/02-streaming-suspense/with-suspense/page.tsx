// TODO: 各セクションを Suspense で囲んで段階的にストリーミングする
// ヒント:
//   - 各データ取得を行う非同期コンポーネントを作成する（同ファイル内 or 別ファイル）
//   - <Suspense fallback={...}> で各コンポーネントを囲む
//   - ユーザー情報(0.5秒) → 投稿一覧(2秒) → コメント一覧(4秒) と順次表示される

export default function WithSuspensePage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Suspense あり</h1>

      {/* TODO: <Suspense> で囲んだユーザー情報コンポーネント */}
      {/* TODO: <Suspense> で囲んだ投稿一覧コンポーネント */}
      {/* TODO: <Suspense> で囲んだコメント一覧コンポーネント */}
      <p className="text-red-500">未実装: Suspense で各セクションを囲んでください</p>
    </div>
  );
}
