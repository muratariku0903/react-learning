import Link from "next/link";

export default function SpecialFilesPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        演習1-3: 特殊ファイル群の挙動理解
      </h1>

      <p className="text-zinc-500 mb-6">
        以下のリンクをクリックして、各特殊ファイルの挙動を確認してください。
      </p>

      <ul className="space-y-4">
        <li>
          <Link
            href="/exercises/layer01-basics/03-special-files/slow-page"
            className="text-blue-600 hover:underline"
          >
            遅いページ → loading.tsx の確認
          </Link>
          <p className="text-sm text-zinc-400">
            3秒かかるページ。loading.tsx が表示されるはず。
          </p>
        </li>
        <li>
          <Link
            href="/exercises/layer01-basics/03-special-files/error-page"
            className="text-blue-600 hover:underline"
          >
            エラーページ → error.tsx の確認
          </Link>
          <p className="text-sm text-zinc-400">
            意図的にエラーを投げるページ。error.tsx が表示されるはず。
          </p>
        </li>
        <li>
          <Link
            href="/exercises/layer01-basics/03-special-files/users/999"
            className="text-blue-600 hover:underline"
          >
            存在しないユーザー → not-found.tsx の確認
          </Link>
          <p className="text-sm text-zinc-400">
            存在しないユーザーID。not-found.tsx が表示されるはず。
          </p>
        </li>
        <li>
          <Link
            href="/exercises/layer01-basics/03-special-files/users/1"
            className="text-blue-600 hover:underline"
          >
            存在するユーザー（ID: 1）→ 正常表示
          </Link>
          <p className="text-sm text-zinc-400">
            有効なユーザーID。正常に表示されるはず。
          </p>
        </li>
      </ul>
    </div>
  );
}
