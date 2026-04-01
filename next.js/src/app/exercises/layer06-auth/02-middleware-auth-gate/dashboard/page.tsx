import { cookies } from "next/headers";
import Link from "next/link";

// TODO: decrypt 関数を演習6-1 の _lib/session.ts から import する
// import { decrypt } from "../../01-cookie-jwt/_lib/session";

export default async function DashboardPage() {
  // TODO: Server Component 内での二重認証チェック
  // Middleware をバイパスされた場合の安全策として、ここでもセッションを検証する
  //
  // const cookieStore = await cookies();
  // const session = cookieStore.get("session")?.value;
  // const payload = await decrypt(session);
  //
  // if (!payload?.userId) {
  //   redirect("/exercises/layer06-auth/02-middleware-auth-gate/login");
  // }

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">ダッシュボード</h1>
      <p className="text-green-600 mb-6">
        このページは認証済みユーザーのみがアクセスできます
      </p>

      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">ユーザー情報</h2>
        {/* TODO: セッションから取得したユーザー情報を表示 */}
        <p className="text-zinc-500">ユーザー ID: ???</p>
      </div>

      <div className="flex gap-4">
        {/* TODO: ログアウトフォームを実装する */}
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          ログアウト
        </button>
        <Link
          href="/exercises/layer06-auth/02-middleware-auth-gate"
          className="px-4 py-2 border rounded hover:bg-zinc-50"
        >
          ← 演習トップへ
        </Link>
      </div>
    </div>
  );
}
