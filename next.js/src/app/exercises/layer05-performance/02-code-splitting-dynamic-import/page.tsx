"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./components/HeavyComponent"), {
  loading: () => <p>Loading...</p>,
});

const BrowserOnlyComponent = dynamic(() => import("./components/BrowserOnlyComponent"), {
  ssr: false,
  // ssr: true,
});

export default function CodeSplittingPage() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        演習5-2: Code Splitting & Dynamic Import
      </h1>
      <p className="text-zinc-500 mb-8">遅延読み込みとPrefetchの仕組みを体験する</p>

      {/* ===== Dynamic Import セクション ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Dynamic Import（遅延読み込み）
        </h2>

        <div className="space-y-6">
          {/* --- 条件付き読み込み --- */}
          <div className="bg-zinc-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-3">
              条件付き読み込み（ボタンクリックで表示）
            </h3>
            <p className="text-sm text-zinc-500 mb-4">
              ボタンをクリックすると HeavyComponent が読み込まれます。 DevTools の Network
              タブで新しい JS チャンクを確認してください。
            </p>
            <button
              onClick={() => setShowHeavy(!showHeavy)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showHeavy ? "非表示にする" : "重いコンポーネントを表示"}
            </button>

            {showHeavy && (
              <div className="mt-4 p-4 border rounded-lg bg-white">
                <HeavyComponent />
              </div>
            )}
          </div>

          {/* --- SSR 無効化 --- */}
          <div className="bg-zinc-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-3">
              SSR 無効化（ブラウザ専用コンポーネント）
            </h3>
            <p className="text-sm text-zinc-500 mb-4">
              window や navigator などブラウザ専用 API を使うコンポーネントを ssr: false
              で読み込みます。
            </p>
            <div className="p-4 border rounded-lg bg-white">
              <BrowserOnlyComponent />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Prefetch セクション ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          Link の Prefetch 挙動
        </h2>

        <p className="text-sm text-zinc-500 mb-6">
          DevTools の Network タブを開いた状態でページをリロードし、 各リンクの Prefetch
          挙動の違いを確認してください。
        </p>

        <div className="space-y-4">
          {/* --- デフォルト --- */}
          <div className="p-4 border rounded-lg">
            <Link
              href="/exercises/layer05-performance/01-image-font-optimization"
              className="text-blue-600 hover:underline"
            >
              演習5-1へ（prefetch: デフォルト）
            </Link>
            <p className="text-sm text-zinc-500 mt-1">
              デフォルト: ビューポートに入ると自動的に Prefetch される
            </p>
          </div>

          {/* --- 明示的にオン --- */}
          <div className="p-4 border rounded-lg">
            <Link
              href="/exercises/layer05-performance/01-image-font-optimization"
              prefetch={true}
              className="text-blue-600 hover:underline"
            >
              演習5-1へ（prefetch: true）
            </Link>
            <p className="text-sm text-zinc-500 mt-1">
              明示的オン: フルルートが事前取得される
            </p>
          </div>

          {/* --- オフ --- */}
          <div className="p-4 border rounded-lg">
            <Link
              href="/exercises/layer05-performance/01-image-font-optimization"
              prefetch={false}
              className="text-blue-600 hover:underline"
            >
              演習5-1へ（prefetch: false）
            </Link>
            <p className="text-sm text-zinc-500 mt-1">
              オフ: クリック時にのみ取得される（事前取得なし）
            </p>
          </div>

          {/* --- デフォルト --- */}
          <div className="p-4 border rounded-lg">
            <Link
              href="/exercises/layer04-rendering/01-rendering-strategies/pages/ssr"
              className="text-blue-600 hover:underline"
            >
              演習4-1へ（prefetch: デフォルト）
            </Link>
            <p className="text-sm text-zinc-500 mt-1">
              デフォルト: ビューポートに入ると自動的に Prefetch される
            </p>
          </div>

          {/* --- 明示的にオン --- */}
          <div className="p-4 border rounded-lg">
            <Link
              href="/exercises/layer04-rendering/01-rendering-strategies/pages/ssr"
              prefetch={true}
              className="text-blue-600 hover:underline"
            >
              演習4-1へ（prefetch: true）
            </Link>
            <p className="text-sm text-zinc-500 mt-1">
              明示的オン: フルルートが事前取得される
            </p>
          </div>
        </div>
      </section>

      {/* ===== 確認チェックリスト ===== */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">確認チェックリスト</h2>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <input type="checkbox" className="mr-2" />
            HeavyComponent がボタンクリック時に JS
            チャンクとして読み込まれることを確認した
          </li>
          <li>
            <input type="checkbox" className="mr-2" />
            BrowserOnlyComponent が SSR されずにクライアントのみで動作することを確認した
          </li>
          <li>
            <input type="checkbox" className="mr-2" />
            Prefetch の3パターンの違いを Network タブで確認した
          </li>
          <li>
            <input type="checkbox" className="mr-2" />
            notes.md に確認結果を記録した
          </li>
        </ul>
      </section>
    </div>
  );
}
