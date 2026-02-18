import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Next.js Learning</h1>
      <p className="text-zinc-500 mb-8">
        フルスタック開発のためのNext.js学習プロジェクト
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Layer 1: Next.jsの基本構造
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/exercises/layer01-basics/01-app-router"
              className="text-blue-600 hover:underline"
            >
              演習1-1: App Router構造の理解
            </Link>
          </li>
          <li>
            <Link
              href="/exercises/layer01-basics/02-server-client-component"
              className="text-blue-600 hover:underline"
            >
              演習1-2: Server Component vs Client Component
            </Link>
          </li>
          <li>
            <Link
              href="/exercises/layer01-basics/03-special-files"
              className="text-blue-600 hover:underline"
            >
              演習1-3: 特殊ファイル群の挙動理解
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          Layer 2: データフェッチ
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/exercises/layer02-data-fetch/01-server-data-fetch"
              className="text-blue-600 hover:underline"
            >
              演習2-1: Server Side Data Fetch
            </Link>
          </li>
          <li>
            <Link
              href="/exercises/layer02-data-fetch/02-streaming-suspense"
              className="text-blue-600 hover:underline"
            >
              演習2-2: Streaming / Suspense
            </Link>
          </li>
          <li>
            <Link
              href="/exercises/layer02-data-fetch/03-client-data-fetch"
              className="text-blue-600 hover:underline"
            >
              演習2-3: Client側データフェッチ（TanStack Query / SWR）
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
