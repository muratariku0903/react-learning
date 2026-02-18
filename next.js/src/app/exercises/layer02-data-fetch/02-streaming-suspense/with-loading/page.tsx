// TODO: loading.tsx と組み合わせてページ全体のローディングを表示する
// ヒント:
//   - このディレクトリに loading.tsx を作成する
//   - ページ内では3つのデータを await で直列に取得する
//   - loading.tsx → データ取得完了 → ページ全体が表示される

export default function WithLoadingPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">loading.tsx あり</h1>

      {/* TODO: 3つのデータを取得して表示する */}
      <p className="text-red-500">未実装: データ取得と loading.tsx を実装してください</p>
    </div>
  );
}
