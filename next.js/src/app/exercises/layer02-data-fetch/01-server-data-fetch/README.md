# 演習2-1: Server Side Data Fetch

## 目的
Server Component での `fetch()` によるデータ取得と、キャッシュ戦略（`force-cache` / `no-store` / `revalidate`）の違いを理解する。
また、`generateStaticParams` を使った動的ルートの静的生成（SSG）を体験する。

---

## 言語化演習（answer.md に回答を記入）

### Q1: fetch() のキャッシュオプション
以下の3つのキャッシュ設定について、**挙動の違い**と**適切なユースケース**をそれぞれ説明せよ:

| 設定 | いつデータを取得する？ | キャッシュはどうなる？ | 適切なユースケース |
|------|---------------------|---------------------|------------------|
| `cache: 'force-cache'` | | | |
| `cache: 'no-store'` | | | |
| `next: { revalidate: N }` | | | |

また、Next.js App Router における `fetch()` のデフォルトのキャッシュ挙動はどうなっているか？
（ヒント: Next.js 15 で変更があった）

### Q2: ISR と SSG の違い
ISR（Incremental Static Regeneration）と SSG（Static Site Generation）の違いを、
以下の観点で説明せよ:

- ビルド時に何が起きるか
- リクエスト時に何が起きるか
- データが古くなった場合にどうなるか
- それぞれどのような場面で使うべきか

### Q3: generateStaticParams の役割
`generateStaticParams` は何のために使う関数か？
この関数を使う場合と使わない場合で、動的ルート（`[id]`）へのアクセス時の挙動はどう変わるか説明せよ。

---

## 実装演習（design.md に設計を書いてから実装）

### 課題: キャッシュ戦略の違いを体験する

外部API（JSONPlaceholder: `https://jsonplaceholder.typicode.com`）を使って、
キャッシュ設定の違いによる挙動を比較できるページ群を作成せよ。

```
exercises/layer02-data-fetch/01-server-data-fetch/
├── page.tsx              → 各サブページへのリンク一覧（実装済み）
├── no-store/
│   └── page.tsx          → TODO: cache: 'no-store' でデータ取得
├── force-cache/
│   └── page.tsx          → TODO: cache: 'force-cache' でデータ取得
├── revalidate/
│   └── page.tsx          → TODO: next: { revalidate: 10 } でデータ取得
└── posts/
    └── [id]/
        └── page.tsx      → TODO: generateStaticParams で静的生成
```

### 要件

1. **force-cache/page.tsx を実装**
   - `https://jsonplaceholder.typicode.com/posts` から投稿一覧（最初の5件）を取得
   - `cache: 'force-cache'` を明示的に指定
   - 取得したデータと、**データ取得時刻**を表示する（キャッシュの確認用）

2. **no-store/page.tsx を実装**
   - 同じAPIから投稿一覧（最初の5件）を取得
   - `cache: 'no-store'` を指定
   - 取得したデータと、**データ取得時刻**を表示する
   - force-cache のページと比較して、リロード時の時刻の変化を観察する

3. **revalidate/page.tsx を実装**
   - 同じAPIから投稿一覧（最初の5件）を取得
   - `next: { revalidate: 10 }` を指定（10秒ごとに再検証）
   - 取得したデータと、**データ取得時刻**を表示する
   - 10秒以内と10秒以降のリロードで時刻がどう変わるか観察する

4. **posts/[id]/page.tsx を実装**
   - `https://jsonplaceholder.typicode.com/posts/[id]` から個別の投稿を取得
   - `generateStaticParams` を定義し、ID 1〜5 の投稿を**ビルド時に静的生成**する
   - 投稿のタイトルと本文を表示する

### ヒント
- Server Component は `async` 関数として定義できる
- データ取得時刻は `new Date().toLocaleTimeString('ja-JP')` で表示すると比較しやすい
- `generateStaticParams` は `page.tsx` と同じファイルから `export` する
- キャッシュの挙動は **`next build` → `next start`（本番モード）** でないと正確に確認できない点に注意（`next dev` ではキャッシュが無効化される場合がある）
