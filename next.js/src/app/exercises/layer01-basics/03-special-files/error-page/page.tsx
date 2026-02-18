// TODO: 意図的にエラーを throw して、error.tsx が発火することを確認する

export default function ErrorPage() {
  throw Error("test error");

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">エラーページ</h2>
      <p>ここが見えているなら、エラーは throw されていません。</p>
      <p>→ このコンポーネント内でエラーを throw してください。</p>
    </div>
  );
}
