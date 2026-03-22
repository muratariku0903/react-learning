import Image from "next/image";

// TODO: next/font/google からフォントをインポートして設定する
// import { ... } from "next/font/google";

export default function ImageFontOptimizationPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        演習5-1: 画像・フォント最適化
      </h1>
      <p className="text-zinc-500 mb-8">
        next/image と next/font による最適化を体験する
      </p>

      {/* ===== 画像最適化セクション ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          画像最適化の比較
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- 通常の img タグ --- */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              通常の &lt;img&gt; タグ
            </h3>
            <div className="border rounded-lg overflow-hidden">
              {/* TODO: 通常の <img> タグで画像を表示する */}
              <div className="bg-zinc-100 h-64 flex items-center justify-center text-zinc-400">
                ここに &lt;img&gt; タグで画像を表示
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              {/* TODO: img タグの特徴・問題点を記述 */}
              ブラウザのデフォルト動作に依存
            </p>
          </div>

          {/* --- next/image --- */}
          <div>
            <h3 className="text-lg font-medium mb-3">next/image</h3>
            <div className="border rounded-lg overflow-hidden">
              {/* TODO: next/image で同じ画像を表示する */}
              <div className="bg-zinc-100 h-64 flex items-center justify-center text-zinc-400">
                ここに next/image で画像を表示
              </div>
            </div>
            <p className="text-sm text-zinc-500 mt-2">
              {/* TODO: next/image の最適化ポイントを記述 */}
              Next.js による自動最適化が適用される
            </p>
          </div>
        </div>
      </section>

      {/* ===== フォント最適化セクション ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
          フォント最適化
        </h2>

        {/* TODO: next/font で読み込んだフォントを適用する */}
        <div className="space-y-4">
          <p className="text-zinc-500">
            next/font/google からフォントを読み込み、このセクションに適用してください。
          </p>
          <div className="bg-zinc-50 p-6 rounded-lg border">
            <p className="text-lg mb-2">
              {/* TODO: フォントウェイト 400 のサンプルテキスト */}
              Regular (400): The quick brown fox jumps over the lazy dog
            </p>
            <p className="text-lg font-bold">
              {/* TODO: フォントウェイト 700 のサンプルテキスト */}
              Bold (700): The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>
      </section>

      {/* ===== 確認チェックリスト ===== */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
          確認チェックリスト
        </h2>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <input type="checkbox" className="mr-2" />
            DevTools の Network タブで画像のフォーマット（WebP/AVIF）を確認した
          </li>
          <li>
            <input type="checkbox" className="mr-2" />
            img タグと next/image の転送サイズの違いを確認した
          </li>
          <li>
            <input type="checkbox" className="mr-2" />
            next/image の遅延読み込み（Lazy Loading）を確認した
          </li>
          <li>
            <input type="checkbox" className="mr-2" />
            next/font のフォントがセルフホスティングされていることを確認した
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
