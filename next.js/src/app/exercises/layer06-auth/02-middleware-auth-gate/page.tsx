import Link from "next/link";

export default function MiddlewareAuthGatePage() {
  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        演習6-2: Middleware 認証ゲート
      </h1>
      <p className="text-zinc-500 mb-6">
        Middleware を使ったルートレベルの認証ゲートを理解する
      </p>

      <div className="space-y-4 mb-8">
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">保護されたページ</h2>
          <Link
            href="/exercises/layer06-auth/02-middleware-auth-gate/dashboard"
            className="text-blue-600 hover:underline"
          >
            /dashboard →
          </Link>
          <p className="text-sm text-zinc-500 mt-1">
            未認証の場合、ログインページにリダイレクトされます
          </p>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">ログインページ</h2>
          <Link
            href="/exercises/layer06-auth/02-middleware-auth-gate/login"
            className="text-blue-600 hover:underline"
          >
            /login →
          </Link>
          <p className="text-sm text-zinc-500 mt-1">
            認証済みの場合、ダッシュボードにリダイレクトされます
          </p>
        </div>
      </div>

      <div className="bg-zinc-50 border rounded p-4 text-sm text-zinc-600 mb-6">
        <h3 className="font-semibold mb-2">確認シナリオ</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>未認証で /dashboard にアクセス → ログインへリダイレクト</li>
          <li>ログイン後、/dashboard にアクセス → 正常表示</li>
          <li>ログイン済みで /login にアクセス → ダッシュボードへリダイレクト</li>
          <li>ログアウト後、/dashboard にアクセス → ログインへリダイレクト</li>
          <li>Network タブでリダイレクトのステータスコード（307）を確認</li>
        </ol>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-800">
        <h3 className="font-semibold mb-2">注意</h3>
        <p>
          この演習では <code>src/middleware.ts</code> を作成します。
          Middleware はプロジェクト全体に影響するため、<code>config.matcher</code>{" "}
          で適用範囲を適切に限定してください。
        </p>
      </div>
    </div>
  );
}
