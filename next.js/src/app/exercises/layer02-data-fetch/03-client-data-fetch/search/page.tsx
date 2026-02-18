// TODO: SWR または TanStack Query を使って検索付きの投稿一覧ページを作成する
// ヒント:
//   - "use client" が必要
//   - useState で検索キーワードを管理
//   - SWR/TanStack Query のキーに検索キーワードを含めると、キーワード変更時に自動で再取得される
//   - API: https://jsonplaceholder.typicode.com/posts?_limit=10&q={keyword}

export default function SearchPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">検索付き一覧</h1>
      <p className="text-zinc-500 mb-4">
        キーワードで投稿を検索（クライアント側データ取得）
      </p>

      {/* TODO: 検索入力フィールド */}
      {/* TODO: 検索結果の投稿一覧 */}
      <p className="text-red-500">未実装: 検索機能を実装してください</p>
    </div>
  );
}
