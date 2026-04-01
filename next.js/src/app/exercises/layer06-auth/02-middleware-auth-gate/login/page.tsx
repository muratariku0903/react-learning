import Link from "next/link";

// TODO: LoginForm コンポーネントを演習6-1 から import する
// import LoginForm from "../../01-cookie-jwt/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">ログイン</h1>
      <p className="text-zinc-500 mb-6">
        ダッシュボードにアクセスするにはログインが必要です
      </p>

      <div className="border rounded-lg p-6 mb-6">
        {/* TODO: LoginForm コンポーネントを配置する */}
        <p className="text-zinc-400 text-sm">
          演習6-1 の LoginForm コンポーネントをここに配置してください
        </p>
      </div>

      <Link
        href="/exercises/layer06-auth/02-middleware-auth-gate"
        className="text-blue-600 hover:underline text-sm"
      >
        ← 演習トップへ
      </Link>
    </div>
  );
}
