# 演習4-1: レンダリング戦略の比較

## 目的
Next.js App Router における各レンダリング戦略（SSR / SSG / ISR / CSR）の違いを理解し、
ユースケースに応じて適切な戦略を選択できるようになる。
単に「どう動くか」だけでなく、SEO・TTFB・コスト・動的データとの相性まで含めた総合的な判断力を養う。

---

## 言語化演習（answer.md に回答を記入）

### Q1: レンダリング戦略の比較表
以下の表を自分の理解で埋めよ。正確な用語でなくてよいので、自分の言葉で書くこと。

| 戦略 | いつHTMLが生成されるか? | SEO | TTFB | 動的データへの対応 | インフラコスト | 代表的なユースケース |
|------|----------------------|-----|------|--------------------|---------------|---------------------|
| SSG  |                      |     |      |                    |               |                     |
| ISR  |                      |     |      |                    |               |                     |
| SSR  |                      |     |      |                    |               |                     |
| CSR  |                      |     |      |                    |               |                     |

### Q2: Next.js App Router における「静的」と「動的」の境界
Next.js App Router では、ページが **静的レンダリング（Static Rendering）** されるか **動的レンダリング（Dynamic Rendering）** されるかが自動的に決まる。

- Next.js はどのような基準で「このページは動的」と判断するか？ 具体的なトリガーを複数挙げよ。
- 開発者が明示的に静的/動的を制御したい場合、どのような手段があるか？
- Layer 3 で学んだ Route Handlers の GET キャッシュ条件と、この仕組みの共通点は何か？

### Q3: ECサイトの設計判断
あなたがECサイトを設計するとしたら、以下の各ページにどのレンダリング戦略を採用するか？
それぞれ理由も含めて説明せよ。

- トップページ（プロモーションバナー + おすすめ商品）
- 商品一覧ページ（カテゴリ別フィルタリング付き）
- 商品詳細ページ（レビュー・在庫表示あり）
- カート・決済ページ
- 利用規約・プライバシーポリシー

### Q4: CSR の功罪
Client Side Rendering（CSR）は、Next.js 以前の React アプリ（Create React App 等）では標準だった。

- CSR のみで構成されたアプリが SEO で不利になる**技術的な理由**を、クローラーの動作と関連付けて説明せよ。
- Next.js で CSR を使うべき場面はどのようなケースか？ 2つ以上挙げよ。
- 「Server Component のほうが常に優れている」と言い切れない場面はあるか？ あるとすればどのような場面か？

---

## 実装演習（design.md に設計を書いてから実装）

### 課題: 同一データを3つのレンダリング戦略で表示・比較する

外部APIから取得した同一のデータを、SSG / SSR / CSR の3つの方法で表示するページを作り、
DevTools の Network タブで違いを観察する。

```
exercises/layer04-rendering/01-rendering-strategies/
├── page.tsx              → 演習トップ（3つのページへのリンク）
└── pages/
    ├── ssg/page.tsx      → 静的生成で表示
    ├── ssr/page.tsx      → リクエストごとにサーバーで生成
    └── csr/page.tsx      → クライアント側で fetch して表示
```

### データソース
JSONPlaceholder（`https://jsonplaceholder.typicode.com/posts`）を使用する。
一覧から10件を取得し、タイトルと本文を表示するだけのシンプルな画面でよい。

### 要件

1. **`pages/ssg/page.tsx`（静的生成）**
   - ビルド時にデータを取得してHTMLを生成する
   - Next.js App Router で「このページを静的にする」ためにどう書けばよいか考えて実装せよ
   - `export const dynamic` や `export const revalidate` の設定を活用すること

2. **`pages/ssr/page.tsx`（サーバーサイドレンダリング）**
   - リクエストのたびにサーバーでデータを取得してHTMLを生成する
   - Next.js App Router で「このページを動的にする」ためにどう書けばよいか考えて実装せよ

3. **`pages/csr/page.tsx`（クライアントサイドレンダリング）**
   - `"use client"` を使い、クライアント側で `useEffect` + `fetch` でデータを取得する
   - ローディング表示を実装する
   - ページのHTMLソース（View Source）を確認し、SSG/SSR との違いを観察する

4. **`page.tsx`（トップページ）**
   - 3つのページへの `<Link>` を配置する

### 観察ポイント（notes.md に記録）

各ページにアクセスした際に、以下を確認して notes.md に記録せよ:

1. **Network タブ**: 最初のHTMLレスポンスにデータが含まれているか？
2. **View Source**（右クリック → ページのソースを表示）: HTMLにデータが埋め込まれているか？
3. **ページ遷移時**: `<Link>` で遷移した場合と、ブラウザでURL直打ちした場合の挙動の違い
4. **`next build` してから `next start`** で確認すると、SSG と SSR の違いがより明確に見える（dev モードではどちらも似た挙動になる点に注意）

### ヒント
- App Router では、デフォルトで Server Component であり、動的関数を使わなければ**静的にレンダリング**される
- `export const dynamic = 'force-dynamic'` で強制的に動的レンダリングにできる
- `export const revalidate = 0` も動的レンダリングのトリガーになる
- CSR ページでは `"use client"` をつけ、`useState` + `useEffect` でデータ取得する
- **dev モード（`next dev`）では SSG も毎回レンダリングされるため、違いを見るには `next build && next start` が必要**
