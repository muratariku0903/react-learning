import { cookies } from "next/headers";
import Link from "next/link";

import { decrypt } from "./_lib/session";
import { LoginForm } from "./components/LoginForm";
import { logout } from "./_lib/actions";

export default async function CookieJwtPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("Authorization")?.value;
  const payload = session ? await decrypt(session) : undefined;
  console.log("payload", payload);

  const isAuthenticated = !!payload?.payload?.sub;

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">演習6-1: Cookie & JWT</h1>
      <p className="text-zinc-500 mb-6">
        JWT を使ったセッション管理と Cookie 操作を理解する
      </p>

      <div className="border rounded-lg p-6 mb-6">
        {isAuthenticated ? (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-green-600">ログイン済み</h2>
            <p className="mb-4">ユーザー ID: {payload.payload.sub}</p>
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ログアウト
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">ログイン</h2>
            <LoginForm />
          </div>
        )}
      </div>

      <div className="bg-zinc-50 border rounded p-4 text-sm text-zinc-600">
        <h3 className="font-semibold mb-2">確認ポイント</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>DevTools → Application → Cookies でセッション Cookie を確認</li>
          <li>HttpOnly / Secure / SameSite 属性が正しく設定されているか</li>
          <li>ログイン後に Cookie が追加され、ログアウトで削除されるか</li>
          <li>JWT の中身を jwt.io で確認してみる（署名の検証）</li>
        </ul>
      </div>

      <div className="mt-6">
        <Link
          href="/exercises/layer06-auth/02-middleware-auth-gate"
          className="text-blue-600 hover:underline text-sm"
        >
          次の演習: Middleware 認証ゲート →
        </Link>
      </div>
    </div>
  );
}
