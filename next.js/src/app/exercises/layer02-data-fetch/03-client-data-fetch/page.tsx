import Link from "next/link";

export default function ClientDataFetchPage() {
  const basePath = "/exercises/layer02-data-fetch/03-client-data-fetch";

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        演習2-3: Client側データフェッチ
      </h1>
      <p className="text-zinc-500 mb-6">
        Server fetch / SWR / TanStack Query の3手法を比較する
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">3パターン比較</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href={`${basePath}/server-fetch`}
              className="text-blue-600 hover:underline"
            >
              Server Component の fetch()（ベースライン）
            </Link>
          </li>
          <li>
            <Link
              href={`${basePath}/with-swr`}
              className="text-blue-600 hover:underline"
            >
              SWR (useSWR)
            </Link>
          </li>
          <li>
            <Link
              href={`${basePath}/with-tanstack`}
              className="text-blue-600 hover:underline"
            >
              TanStack Query (useQuery)
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">応用</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href={`${basePath}/search`}
              className="text-blue-600 hover:underline"
            >
              検索付き一覧ページ
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
