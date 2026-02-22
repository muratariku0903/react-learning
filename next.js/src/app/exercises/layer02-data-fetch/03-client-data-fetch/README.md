# 演習2-3: Client側データフェッチ — React use / TanStack Query / SWR

## 目的
クライアント側でのデータ取得手法（React `use` API / SWR / TanStack Query）を理解し、
Server Component の `fetch()` との使い分けを判断できるようになる。
React 19 で追加された `use` API の役割と、外部ライブラリとの違いも把握する。

---

## 事前準備

この演習では外部ライブラリを使用する。以下のコマンドでインストールすること:

```bash
npm install swr @tanstack/react-query
```

---

## 言語化演習（answer.md に回答を記入）

### Q1: データ取得手法の使い分け
以下の4つのデータ取得手法を、**ユースケースごとに使い分ける基準**を説明せよ:

| 手法 | どんな場面で使う？ | メリット | デメリット |
|------|------------------|---------|-----------|
| Server Component の `fetch()` | | | |
| React `use` API | | | |
| SWR (`useSWR`) | | | |
| TanStack Query (`useQuery`) | | | |

### Q2: stale-while-revalidate 戦略
SWR の名前の由来である「stale-while-revalidate」とは何か？
以下の観点で説明せよ:

- ユーザーがページにアクセスしたとき、何が起きるか（ステップごとに）
- なぜこの戦略がUXの向上につながるのか
- HTTP の `Cache-Control: stale-while-revalidate` ヘッダーとの関連

### Q3: Client データフェッチで必要になるもの
TanStack Query を使うには `QueryClientProvider` をセットアップする必要がある。
なぜ Provider が必要なのか？また、App Router でこの Provider をどこに配置すべきか、
Server Component / Client Component の制約を踏まえて説明せよ。

### Q4: React `use` API の特徴
React 19 で追加された `use` API について、以下の観点で説明せよ:

- `use` は何を受け取って、何を返すか？（Promise と Context の2つのケースで）
- `use(promise)` を使ったとき、コンポーネントはどう振る舞うか？（Suspense との関係）
- SWR / TanStack Query と比べて、`use` API だけでは**できないこと**は何か？
- Server Component で Promise を作り、Client Component に渡して `use()` で読むパターンは、どんな場面で有効か？

---

## 実装演習（design.md に設計を書いてから実装）

### 課題A: 3パターンのデータ取得を比較する

同じAPI（`https://jsonplaceholder.typicode.com/posts?_limit=5`）からデータを取得する処理を、
4つの異なる手法で実装して比較せよ。

```
exercises/layer02-data-fetch/03-client-data-fetch/
├── page.tsx              → 各サブページへのリンク一覧（実装済み）
├── server-fetch/
│   └── page.tsx          → Server Component の fetch()（実装済み、比較用ベースライン）
├── with-use/
│   └── page.tsx          → TODO: React use API でデータ取得
├── with-swr/
│   └── page.tsx          → TODO: SWR でデータ取得
├── with-tanstack/
│   └── page.tsx          → TODO: TanStack Query でデータ取得
└── search/
    └── page.tsx          → TODO: 検索付き一覧ページ
```

### 要件

1. **server-fetch/page.tsx は実装済み**（比較用ベースライン）
   - Server Component で `fetch()` を使って投稿一覧を取得

2. **with-use/page.tsx を実装**
   - React `use` API を使ってデータを取得する
   - Server Component で Promise を作成し、Client Component に渡すパターンで実装する
   - `Suspense` でローディング状態をハンドリングする
   - ポイント: 外部ライブラリなし（React 組み込みの機能のみ）で実現できることを体感する

3. **with-swr/page.tsx を実装**
   - `useSWR` を使って同じAPIからデータを取得する Client Component を作成
   - ローディング状態とエラー状態のハンドリングを行う
   - 取得したデータを一覧表示する

4. **with-tanstack/page.tsx を実装**
   - `useQuery` を使って同じAPIからデータを取得する Client Component を作成
   - `QueryClientProvider` のセットアップが必要（配置場所を設計で考えること）
   - ローディング状態とエラー状態のハンドリングを行う

5. **search/page.tsx を実装**
   - SWR または TanStack Query を使って検索付きの投稿一覧ページを作成
   - テキスト入力で検索キーワードを入力すると、APIにクエリパラメータを付けて再取得する
   - API: `https://jsonplaceholder.typicode.com/posts?_limit=10&q={検索キーワード}` ※JSONPlaceholderはqパラメータで全文検索が可能
   - 検索中のローディング表示を行う

### ヒント
- **React `use` API**: `use(promise)` は Promise を受け取り、解決された値を返す。コンポーネントは Promise が解決するまで suspend する（= Suspense が必要）
- **React `use` API**: Server Component 側で `fetch()` を呼び、**await せずに** Promise のまま Client Component に渡すのがポイント。これによりサーバーからクライアントへ Promise がストリーミングされる
- SWR は `useSWR(key, fetcher)` の形で使う。fetcher は `(url) => fetch(url).then(res => res.json())` のようなシンプルな関数
- TanStack Query は `useQuery({ queryKey: [...], queryFn: ... })` の形で使う
- TanStack Query の `QueryClientProvider` は Client Component 内に配置する必要がある（layout.tsx で囲むパターンが一般的）
- 検索ページでは、検索キーワードを `useState` で管理し、SWR/TanStack Query のキーに含めることで自動再取得される
