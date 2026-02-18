import { notFound } from "next/navigation";

const users: Record<string, { name: string; email: string }> = {
  "1": { name: "田中太郎", email: "tanaka@example.com" },
  "2": { name: "鈴木花子", email: "suzuki@example.com" },
  "3": { name: "佐藤次郎", email: "sato@example.com" },
};

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (id !== "1" && id !== "2" && id !== "3") return notFound();

  const user = users[id];

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">ユーザー詳細</h2>
      <p>名前: {user?.name ?? "不明"}</p>
      <p>メール: {user?.email ?? "不明"}</p>
    </div>
  );
}
