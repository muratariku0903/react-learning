import Link from "next/link";

export default function ServerDataFetchPage() {
  const basePath = "/exercises/layer02-data-fetch/01-server-data-fetch";

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">演習2-1: Server Side Data Fetch</h1>
      <p className="text-zinc-500 mb-6">
        キャッシュ設定の違いによるデータ取得の挙動を比較する
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">キャッシュ戦略の比較</h2>
        <ul className="space-y-2">
          <li>
            <Link href={`${basePath}/force-cache`} className="text-blue-600 hover:underline">
              force-cache — キャッシュを強制（SSG相当）
            </Link>
          </li>
          <li>
            <Link href={`${basePath}/no-store`} className="text-blue-600 hover:underline">
              no-store — キャッシュなし（SSR相当）
            </Link>
          </li>
          <li>
            <Link href={`${basePath}/revalidate`} className="text-blue-600 hover:underline">
              revalidate — 時間ベースの再検証（ISR相当）
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">generateStaticParams</h2>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5].map((id) => (
            <li key={id}>
              <Link href={`${basePath}/posts/${id}`} className="text-blue-600 hover:underline">
                投稿 #{id}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
