// TODO: 意図的に遅い処理を入れて、loading.tsx が発火することを確認する
// ヒント: async コンポーネントにして、await で遅延を入れる

export default function SlowPage() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">遅いページ</h2>
      <p>このページの表示には時間がかかります。</p>
      <p>→ ここに到達しているなら、loading.tsx の表示を経由したはずです。</p>
    </div>
  );
}
