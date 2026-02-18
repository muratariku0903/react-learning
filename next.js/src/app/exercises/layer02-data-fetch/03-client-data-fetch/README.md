# 演習2-3: Client側データフェッチ — TanStack Query / SWR

## 目的
クライアント側でのデータ取得手法（SWR / TanStack Query）を理解し、
Server Component の `fetch()` との使い分けを判断できるようになる。

---

## 事前準備

この演習では外部ライブラリを使用する。以下のコマンドでインストールすること:

```bash
npm install swr @tanstack/react-query
```

---

## 言語化演習（answer.md に回答を記入）

### Q1: データ取得手法の使い分け
以下の3つのデータ取得手法を、**ユースケースごとに使い分ける基準**を説明せよ:

| 手法 | どんな場面で使う？ | メリット | デメリット |
|------|------------------|---------|-----------|
| Server Component の `fetch()` | | | |
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

---

## 実装演習（design.md に設計を書いてから実装）

### 課題A: 3パターンのデータ取得を比較する

同じAPI（`https://jsonplaceholder.typicode.com/posts?_limit=5`）からデータを取得する処理を、
3つの異なる手法で実装して比較せよ。

```
exercises/layer02-data-fetch/03-client-data-fetch/
├── page.tsx              → 各サブページへのリンク一覧（実装済み）
├── server-fetch/
│   └── page.tsx          → Server Component の fetch()（実装済み、比較用ベースライン）
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

2. **with-swr/page.tsx を実装**
   - `useSWR` を使って同じAPIからデータを取得する Client Component を作成
   - ローディング状態とエラー状態のハンドリングを行う
   - 取得したデータを一覧表示する

3. **with-tanstack/page.tsx を実装**
   - `useQuery` を使って同じAPIからデータを取得する Client Component を作成
   - `QueryClientProvider` のセットアップが必要（配置場所を設計で考えること）
   - ローディング状態とエラー状態のハンドリングを行う

4. **search/page.tsx を実装**
   - SWR または TanStack Query を使って検索付きの投稿一覧ページを作成
   - テキスト入力で検索キーワードを入力すると、APIにクエリパラメータを付けて再取得する
   - API: `https://jsonplaceholder.typicode.com/posts?_limit=10&q={検索キーワード}` ※JSONPlaceholderはqパラメータで全文検索が可能
   - 検索中のローディング表示を行う

### ヒント
- SWR は `useSWR(key, fetcher)` の形で使う。fetcher は `(url) => fetch(url).then(res => res.json())` のようなシンプルな関数
- TanStack Query は `useQuery({ queryKey: [...], queryFn: ... })` の形で使う
- TanStack Query の `QueryClientProvider` は Client Component 内に配置する必要がある（layout.tsx で囲むパターンが一般的）
- 検索ページでは、検索キーワードを `useState` で管理し、SWR/TanStack Query のキーに含めることで自動再取得される
