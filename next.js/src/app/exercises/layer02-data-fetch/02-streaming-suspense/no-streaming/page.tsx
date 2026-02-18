// TODO: Suspense を使わずに3つのデータ取得を直列に await する
// ヒント:
//   - async コンポーネントとして定義
//   - fetchUserInfo, fetchPosts, fetchComments をすべて await で順番に呼ぶ
//   - 結果: 全データ取得完了（約6.5秒）まで何も表示されない

export default function NoStreamingPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Suspense なし</h1>

      {/* TODO: ユーザー情報セクション */}
      {/* TODO: 投稿一覧セクション */}
      {/* TODO: コメント一覧セクション */}
      <p className="text-red-500">未実装: 3つのデータを取得して表示してください</p>
    </div>
  );
}
