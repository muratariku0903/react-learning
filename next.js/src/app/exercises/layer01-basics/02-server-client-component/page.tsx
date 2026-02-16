// これは Server Component（デフォルト）
// 課題A: ここに useState を追加してみて、何が起きるか確認する
// 課題B: 完了後、Server / Client を適切に分離したページに仕上げる

import LikeButton from "./components/LikeButton";

// サーバー側で取得したデータ（本来はDB/APIから取得するが、今回はハードコード）
function getUserData() {
  return {
    name: "田中太郎",
    role: "エンジニア",
    joinedAt: "2024-01-15",
  };
}

export default function ServerClientPage() {
  const user = getUserData();

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        演習1-2: Server Component vs Client Component
      </h1>

      {/* ユーザー情報（Server Component で表示） */}
      <section className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">ユーザー情報</h2>
        <p>名前: {user.name}</p>
        <p>役割: {user.role}</p>
        <p>参加日: {user.joinedAt}</p>
      </section>

      <section className="mb-8 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">いいねボタン</h2>
        <p className="text-zinc-500">
          <LikeButton
            name="test"
            obj={{ name: "taro" }}
            // fn={() => console.log("hello")}
          />
        </p>
      </section>
    </div>
  );
}
