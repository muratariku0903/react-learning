"use client";

export default function BrowserOnlyComponent() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Browser Only Component</h4>
      <p className="text-zinc-500">
        ブラウザ専用の API を使った情報をここに表示してください。
      </p>
      <p>
        width: {width} <br />
        height: {height}
      </p>
    </div>
  );
}
