import Image from "next/image";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function ImageFontOptimizationPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">演習5-1: 画像・フォント最適化</h1>
      <p className="text-zinc-500 mb-8">next/image と next/font による最適化を体験する</p>

      {/* ===== 画像最適化セクション ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">画像最適化の比較</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* --- 通常の img タグ --- */}
          <div>
            <h3 className="text-lg font-medium mb-3">通常の &lt;img&gt; タグ</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-zinc-100 h-64 flex items-center justify-center text-zinc-400">
                <img
                  src="/DRQnCm5UMAAeDYe.jpg"
                  width={500}
                  height={500}
                  alt="女の子が寝ている画像"
                />
              </div>
            </div>
            <ul className="text-sm text-zinc-500 mt-2">
              <li></li>
            </ul>
          </div>

          {/* --- next/image --- */}
          <div>
            <h3 className="text-lg font-medium mb-3">next/image</h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-zinc-100 h-64 flex items-center justify-center text-zinc-400">
                <Image
                  src="/DRQnCm5UMAAeDYe.jpg"
                  width={500}
                  height={500}
                  alt="女の子が寝ている画像"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <ul className="text-sm text-zinc-500 mt-2">
              <li>
                srcset属性に複数の画像パスが指定されている
                <br />
                _next/image?url=%2FDRQnCm5UMAAeDYe.jpg&w=1080&q=75 2x
                <br />
                /_next/image?url=%2FDRQnCm5UMAAeDYe.jpg&w=640&q=75 1x
              </li>
              <li>
                閲覧するマシンの横幅に応じてリクエストクエリが切り替わっている。Macのディスプレイだと、wが1080で外付けディスプレイだとwが640となっていた
              </li>
              <li>レスポンスタブを見ると、拡張子が「webp」となっている</li>
              <li>
                「sizes」を指定すると、画面幅に応じてリクエストのwが切り替わる。768px以下だとwが1920になり、768以上だと1090が設定されている。また、srcsetがsizesを指定しない時よりも細かい幅の区切りで設定されていた。
              </li>
              <li>
                また、ブラウザの横幅を変えて時の初回のリクエストは200で通常のimgよりも時間がかかっていた。だが、それ以降は304でキャッシュの応答となり、ロード時間も一定だった。通常のimgは初回リクエスト以降は画面幅によらず常に304だったので、常に同じ画像を使い回してることがわかる。
              </li>
              <li>
                ブラウザでIphoneSEサイズで見たときに、通常のimgは70KBに対して、next/imageは16KBとコンパクト化されていた。ただ、ネットワークタブのsize項目では初期以降のリクエストは全て、0.2KBとなっていた。
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== フォント最適化セクション ===== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">フォント最適化</h2>

        <div className="space-y-4">
          <p className="text-zinc-500">
            next/font/google からフォントを読み込み、このセクションに適用してください。
          </p>
          <div className="bg-zinc-50 p-6 rounded-lg border ">
            <p className={"text-lg text-black mb-2 "}>
              Regular (400): The quick brown fox jumps over the lazy dog
            </p>
            <p className={"text-lg text-black mb-2 " + inter.className}>
              Regular (400): The quick brown fox jumps over the lazy dog
            </p>
            <p className={"text-lg text-black font-bold " + inter.className}>
              Bold (700): The quick brown fox jumps over the lazy dog
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
