"use client";

// TODO: このコンポーネントにブラウザ専用 API を使った表示を実装してください
// 例: window.innerWidth, window.innerHeight, navigator.userAgent など
//
// 注意: このコンポーネントを通常通り import すると、
// SSR 時に window や navigator が undefined でエラーになります。
// そのため dynamic(() => import(...), { ssr: false }) で読み込む必要があります。

export default function BrowserOnlyComponent() {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Browser Only Component</h4>
      <p className="text-zinc-500">
        ブラウザ専用の API を使った情報をここに表示してください。
      </p>
    </div>
  );
}
