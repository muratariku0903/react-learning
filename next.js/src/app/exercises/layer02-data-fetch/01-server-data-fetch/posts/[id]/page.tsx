// TODO: generateStaticParams を使って、ID 1〜5 の投稿を静的生成する
// ヒント:
//   - generateStaticParams 関数を export する
//   - 個別の投稿データは https://jsonplaceholder.typicode.com/posts/[id] から取得する
//   - params の型は Promise<{ id: string }> であることに注意（Next.js 15）

export default function PostPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">投稿詳細</h1>

      {/* TODO: ここに投稿のタイトルと本文を表示する */}
      <p className="text-red-500">未実装: 投稿データを取得して表示してください</p>
    </div>
  );
}
