// TODO: ユーザー詳細ページを実装する
// - 有効なユーザーIDは 1, 2, 3 のみ
// - それ以外のIDでアクセスされたら notFound() を呼ぶ
// ヒント: next/navigation から notFound をインポートする

const users: Record<string, { name: string; email: string }> = {
  "1": { name: "田中太郎", email: "tanaka@example.com" },
  "2": { name: "鈴木花子", email: "suzuki@example.com" },
  "3": { name: "佐藤次郎", email: "sato@example.com" },
};

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: ここで id が有効かチェックし、無効なら notFound() を呼ぶ

  const user = users[id];

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">ユーザー詳細</h2>
      <p>名前: {user?.name ?? "不明"}</p>
      <p>メール: {user?.email ?? "不明"}</p>
    </div>
  );
}
