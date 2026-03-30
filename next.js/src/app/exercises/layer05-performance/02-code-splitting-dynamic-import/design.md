### 実装1: Dynamic Import による遅延読み込み

- 「重いコンポーネント」を `components/HeavyComponent.tsx` として作成する
  - 大きなライブラリの代わりに、意図的に計算処理を入れる
- ページ上にボタンを配置し、**クリック時に初めて HeavyComponent を表示する**（条件付き読み込み）
- `next/dynamic` を使い、`loading` オプションでローディング状態を表示する
- DevTools の Network タブで、**ボタンクリック時に新しい JS チャンクが読み込まれること**を確認する

### 実装2: SSR 無効化の Dynamic Import

- `components/BrowserOnlyComponent.tsx` を作成し、`window.innerWidth` や `navigator.userAgent` などブラウザ専用の API を使った表示を行う
- `dynamic(() => import(...), { ssr: false })` で読み込む
- SSR 無効化しない場合にどのようなエラーが起きるか、コメントで説明を添える

### 実装3: Prefetch の挙動確認

- 複数のリンクを配置する（演習の他のページへのリンクなどでOK）
- 以下の3パターンのリンクを用意する
  1. デフォルト（`prefetch` 未指定）
  2. `prefetch={true}`（明示的にオン）
  3. `prefetch={false}`（オフ）
- DevTools の Network タブで、**ページ読み込み時にどのリンク先が事前取得されるか**を確認する
- 各パターンの違いを画面上にテキストで説明する
