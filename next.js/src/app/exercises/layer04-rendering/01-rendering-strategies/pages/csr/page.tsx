// CSR（Client Side Rendering）
// TODO: "use client" を使い、useEffect + fetch でクライアント側からデータを取得せよ
// TODO: ローディング表示を実装せよ
// ヒント: useState でデータとローディング状態を管理する

export default function CSRPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        CSR - Client Side Rendering
      </h1>
      <p className="text-zinc-500 mb-6">
        クライアント側でデータを取得して表示する
      </p>

      <p className="text-sm text-zinc-400 mb-4">
        {/* TODO: 表示時刻を表示 */}
      </p>

      {/* TODO: posts の表示を実装 */}
      <p>ここにデータ取得と表示の実装を追加してください</p>
    </div>
  );
}
