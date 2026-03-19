// 演習4-1: レンダリング戦略の比較
// 3つのレンダリング戦略（SSG / SSR / CSR）で同じデータを表示し、違いを比較する

import Link from "next/link";

const basePath =
  "/exercises/layer04-rendering/01-rendering-strategies/pages";

const pages = [
  {
    href: `${basePath}/ssg`,
    title: "SSG（Static Site Generation）",
    description: "ビルド時にHTMLを生成。CDNから配信。",
  },
  {
    href: `${basePath}/ssr`,
    title: "SSR（Server Side Rendering）",
    description: "リクエストごとにサーバーでHTMLを生成。",
  },
  {
    href: `${basePath}/csr`,
    title: "CSR（Client Side Rendering）",
    description: "クライアント側でデータを取得して表示。",
  },
];

export default function RenderingStrategiesPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        演習4-1: レンダリング戦略の比較
      </h1>
      <p className="text-zinc-500 mb-6">
        同じデータを3つのレンダリング戦略で表示し、違いを観察する
      </p>

      <div className="space-y-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="block p-4 border rounded hover:bg-zinc-50 transition"
          >
            <h2 className="font-semibold">{page.title}</h2>
            <p className="text-sm text-zinc-500">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
