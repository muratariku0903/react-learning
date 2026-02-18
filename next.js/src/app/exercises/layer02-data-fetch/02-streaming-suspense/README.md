# 演習2-2: Streaming / Suspense

## 目的
React の Suspense と Next.js の Streaming を理解する。
従来のSSR（全データ取得完了 → 一括レンダリング）と比較して、
Streaming がどのようにUXを改善するかを体験する。

---

## 言語化演習（answer.md に回答を記入）

### Q1: Streaming と従来の SSR の違い
従来のSSRでは、ページのすべてのデータ取得が完了するまでユーザーには何も表示されない。
Streaming はこの問題をどのように解決するか？以下の観点で説明せよ:

- HTMLの送信タイミングはどう変わるか
- ユーザーが最初のコンテンツを見られるまでの時間（TTFB / FCP）にどう影響するか
- サーバー側の処理フローはどう異なるか

### Q2: Suspense 境界の設計判断
1ページ内に「ユーザー情報（取得0.5秒）」「投稿一覧（取得2秒）」「コメント一覧（取得4秒）」の3つのセクションがあるとする。
Suspense 境界をどのように配置するのが最適か？以下の選択肢を比較して自分の考えを述べよ:

- A: ページ全体を1つの Suspense で囲む
- B: 3つのセクションそれぞれを個別の Suspense で囲む
- C: ユーザー情報は Suspense なし、投稿+コメントをまとめて1つの Suspense で囲む

### Q3: loading.tsx と Suspense の使い分け
Layer 1 で学んだ `loading.tsx` と、直接 `<Suspense>` を書く方法がある。
それぞれどのような場面で使い分けるべきか？具体的なケースを挙げて説明せよ。

---

## 実装演習（design.md に設計を書いてから実装）

### 課題: Suspense による段階的レンダリングを体験する

意図的に遅いデータ取得を含むページを3パターン作成し、UXの違いを比較せよ。

```
exercises/layer02-data-fetch/02-streaming-suspense/
├── page.tsx              → 各サブページへのリンク一覧（実装済み）
├── _lib/
│   └── data.ts           → 遅いデータ取得関数（実装済み）
├── no-streaming/
│   └── page.tsx          → TODO: Suspense なし（全データ取得完了まで何も表示されない）
├── with-suspense/
│   └── page.tsx          → TODO: Suspense で部分的にストリーミング
└── with-loading/
    ├── loading.tsx        → TODO: loading.tsx を作成
    └── page.tsx           → TODO: loading.tsx による全体ローディング
```

### 要件

1. **_lib/data.ts は提供済み**
   - `fetchUserInfo()` — 0.5秒かかるデータ取得
   - `fetchPosts()` — 2秒かかるデータ取得
   - `fetchComments()` — 4秒かかるデータ取得

2. **no-streaming/page.tsx を実装**
   - 3つのデータ取得関数をすべて `await` で直列に呼び出す
   - Suspense は使わない
   - 結果: すべてのデータ取得完了（約6.5秒）まで何も表示されないことを確認

3. **with-suspense/page.tsx を実装**
   - 各データ取得をそれぞれ別の `<Suspense>` 境界で囲む
   - 各 Suspense の `fallback` にはローディング表示を入れる
   - 結果: ユーザー情報（0.5秒）→ 投稿一覧（2秒）→ コメント一覧（4秒）と段階的に表示されることを確認
   - **ポイント**: 各セクションを**非同期コンポーネントとして分離**する必要がある

4. **with-loading/page.tsx + loading.tsx を実装**
   - `loading.tsx` を配置し、ページ全体のローディング表示を行う
   - ページ内では3つのデータを `await` で取得
   - 結果: loading.tsx のフォールバック → データ取得完了後にページ全体が表示される
   - **with-suspense と比較して** UXの違いを体感する

### ヒント
- Suspense で囲むためには、データ取得を行う部分を**別の async コンポーネント**に切り出す必要がある
- `<Suspense fallback={<p>読み込み中...</p>}><AsyncComponent /></Suspense>` の形にする
- no-streaming では全データを1つの async コンポーネント内で直列に await する
- 各パターンの違いはブラウザの表示タイミングで確認する（DevTools の Network タブも活用）
