import Link from "next/link";

export default function StreamingSuspensePage() {
  const basePath = "/exercises/layer02-data-fetch/02-streaming-suspense";

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">演習2-2: Streaming / Suspense</h1>
      <p className="text-zinc-500 mb-6">
        Suspense による段階的レンダリングの違いを比較する
      </p>

      <ul className="space-y-2">
        <li>
          <Link href={`${basePath}/no-streaming`} className="text-blue-600 hover:underline">
            Suspense なし — 全データ取得完了まで待機（約6.5秒）
          </Link>
        </li>
        <li>
          <Link href={`${basePath}/with-suspense`} className="text-blue-600 hover:underline">
            Suspense あり — セクションごとに段階的に表示
          </Link>
        </li>
        <li>
          <Link href={`${basePath}/with-loading`} className="text-blue-600 hover:underline">
            loading.tsx — ページ全体のローディング表示
          </Link>
        </li>
      </ul>
    </div>
  );
}
