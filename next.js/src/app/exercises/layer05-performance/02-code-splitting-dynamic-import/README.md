# 演習5-2: Code Splitting & Dynamic Import

## 目的

Next.js における **Code Splitting** と **Dynamic Import（遅延読み込み）** の仕組みを理解し、**バンドルサイズの最適化**と **初期読み込みパフォーマンスの改善** がどのように実現されるかを体感する。また、`Link` コンポーネントの **Prefetch** の仕組みを実際に確認する。

---

## 言語化演習

以下の問いに対して、`answer.md` に自分の言葉で回答してください。

### Q1: Code Splitting とは何か

Code Splitting が必要な理由を、**ユーザー体験**と**ネットワークコスト**の観点から説明してください。Code Splitting をしない場合にどのような問題が発生するか、具体例を挙げてください。

### Q2: Next.js の自動 Code Splitting

Next.js はデフォルトでどのような単位で Code Splitting を行っているか？開発者が意識しなくても分割される部分と、明示的に `dynamic()` を使うべき場面の違いを説明してください。

### Q3: `dynamic()` と React の `lazy()` の違い

`next/dynamic` は React 標準の `React.lazy()` と何が異なるか？Next.js 環境では `dynamic()` を使うメリットは何か説明してください。特に **SSR** との関係に注目してください。

### Q4: Prefetch の仕組み

Next.js の `Link` コンポーネントが行う Prefetch とは何か？以下の観点から説明してください。

- 静的ルートと動的ルートで Prefetch の挙動はどう異なるか
- `prefetch={false}` を設定すべきケースはどのような場合か
- Prefetch がユーザー体験にどう影響するか

---

## 実装演習

### 実装1: Dynamic Import による遅延読み込み

「重い」コンポーネントを `next/dynamic` で遅延読み込みするページを作成してください。

#### 要件
- 「重いコンポーネント」を `components/HeavyComponent.tsx` として作成する
  - 大きなライブラリの代わりに、意図的に計算処理を入れるか、大量のUIを含めて「重さ」を演出する
- ページ上にボタンを配置し、**クリック時に初めて HeavyComponent を表示する**（条件付き読み込み）
- `next/dynamic` を使い、`loading` オプションでローディング状態を表示する
- DevTools の Network タブで、**ボタンクリック時に新しい JS チャンクが読み込まれること**を確認する

#### ヒント
- `next/dynamic` の `ssr: false` オプションの意味を調べてみましょう
- `useState` で表示/非表示を切り替えるとよいでしょう

### 実装2: SSR 無効化の Dynamic Import

ブラウザ専用の API（`window` や `document`）を使用するコンポーネントを作成し、`ssr: false` で読み込んでください。

#### 要件
- `components/BrowserOnlyComponent.tsx` を作成し、`window.innerWidth` や `navigator.userAgent` などブラウザ専用の API を使った表示を行う
- `dynamic(() => import(...), { ssr: false })` で読み込む
- SSR 無効化しない場合にどのようなエラーが起きるか、コメントで説明を添える

### 実装3: Prefetch の挙動確認

`Link` コンポーネントの Prefetch 挙動を確認するページを作成してください。

#### 要件
- 複数のリンクを配置する（演習の他のページへのリンクなどでOK）
- 以下の3パターンのリンクを用意する
  1. デフォルト（`prefetch` 未指定）
  2. `prefetch={true}`（明示的にオン）
  3. `prefetch={false}`（オフ）
- DevTools の Network タブで、**ページ読み込み時にどのリンク先が事前取得されるか**を確認する
- 各パターンの違いを画面上にテキストで説明する

---

## 制約

- `next/dynamic` を使った実装を**最低2箇所**含めること
- DevTools で確認した JS チャンクの読み込みタイミングの違いを `notes.md` に記録すること
- 過度に複雑な実装は避け、**最適化の仕組みを理解する**ことに集中すること
