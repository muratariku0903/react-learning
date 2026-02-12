# Next.js 学習計画 — アウトプット駆動型

## 学習方針

### 基本思想
**「読んで終わり」にしない。全レイヤーで必ず手を動かし、言語化する。**

各レイヤーは以下の3ステップで進める：

1. **インプット** — 公式ドキュメント + Claude Codeによる解説（最小限）
2. **アウトプット: 言語化** — 学んだことを自分の言葉で書く（answer.md）
3. **アウトプット: 実装** — 実際にコードを書いて動かす（design.md → 実装）

### Claude Code の活用方法
- **演習の自動生成**: 各レイヤーで `演習を作って` と依頼すると、README.md（課題）、answer.md（言語化の回答欄）、design.md（設計メモ欄）を自動生成
- **レビュー**: 実装・言語化の回答後に `レビューして` と依頼するとフィードバック
- **段階的ヒント**: 詰まったら質問 → すぐ答えは出さず、思考を促す形で導く
- **公式ドキュメント参照**: Context7 MCP を使って最新のNext.js公式ドキュメントを参照可能

---

## プロジェクト構成

```
next.js/
├── lerning-category.md      # 学習カテゴリ一覧（既存）
├── learning-plan.md          # この学習計画
├── CLAUDE.md                 # Claude Code用ルール（初回に作成）
├── src/
│   └── app/                  # Next.js App Router構成
│       ├── layout.tsx
│       ├── page.tsx
│       └── exercises/        # 演習用ルート群
└── docs/
    └── roadmap/              # レイヤーごとの学習ロードマップ
        ├── layer01-basics.md
        ├── layer02-data-fetch.md
        ├── ...
        └── layer10-advanced.md
```

### 演習ディレクトリの構造（各レイヤー共通）
```
src/app/exercises/layer01-basics/
├── 01-app-router/
│   ├── README.md        # 課題文
│   ├── answer.md        # 言語化演習の回答
│   ├── design.md        # 実装演習の設計メモ
│   ├── notes.md         # 気づき・学びのログ
│   ├── page.tsx         # Next.jsのページコンポーネント
│   ├── layout.tsx       # （必要に応じて）
│   └── components/      # （必要に応じて）
└── 02-server-client-component/
    └── ...
```

> **ポイント**: React学習（Vite）とは異なり、Next.jsでは`app/`ディレクトリのルーティング自体が学習対象なので、演習をNext.jsのルートとして配置する。これにより「ルーティングを学びながら演習を進める」という二重の学びが得られる。

---

## レイヤー別 学習計画

---

### Layer 1: Next.jsの基本構造（推定 3-4日）

#### 学ぶこと
- App Routerの仕組み（`app/`ディレクトリ構造）
- 特殊ファイル: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- Nested Layout
- Server Component / Client Component の違い
- `"use client"` の意味と使い分け
- props制約（関数を渡せないなど）

#### インプット
- Next.js公式ドキュメント: Routing Fundamentals, Defining Routes, Pages and Layouts
- Next.js公式ドキュメント: Server Components, Client Components

#### アウトプット演習

**演習1-1: App Router構造の理解（言語化 + 実装）**
- 言語化: 「`layout.tsx`と`page.tsx`の違いを、レンダリングの流れで説明せよ」
- 言語化: 「Nested Layoutが存在する理由を、SPAのルーティングと比較して説明せよ」
- 実装: 3階層のNested Layoutを持つページ群を作成し、各レイヤーで共通UIを配置

**演習1-2: Server Component vs Client Component（言語化 + 実装）**
- 言語化: 「Server Componentがデフォルトである理由を、パフォーマンスとセキュリティの観点で説明せよ」
- 言語化: 「"use client"を付けるべきケースと付けてはいけないケースを判断基準と共に列挙せよ」
- 実装: あえてServer Componentに`useState`を使おうとしてエラーを体験→Client Componentに分離
- 実装: Server → Client へpropsを渡す際の制約を実体験（関数を渡そうとしてエラーを確認）

**演習1-3: 特殊ファイル群の挙動理解（実装）**
- `loading.tsx`, `error.tsx`, `not-found.tsx` をそれぞれ配置し、意図的にそれぞれが発火する状況を作る
- error boundary の挙動を確認（`error.tsx`の`reset`関数の動作）

---

### Layer 2: データフェッチ（推定 5-6日）

#### 学ぶこと
- Server Componentでの`fetch()`
- キャッシュ挙動: `cache: "no-store"`, `revalidate`
- ISR（Incremental Static Regeneration）
- `generateStaticParams`
- Streaming / Suspense
- `loading.tsx` の内部挙動
- Client側データフェッチ: TanStack Query / SWR
- Server fetch vs Client fetch の使い分け判断

#### アウトプット演習

**演習2-1: Server Side Data Fetch（言語化 + 実装）**
- 言語化: 「`fetch()`のキャッシュオプション（`force-cache`, `no-store`, `revalidate`）の違いをユースケースと共に説明せよ」
- 言語化: 「ISRとSSGの違いを、ビルド時と実行時の挙動で説明せよ」
- 実装: 外部API（JSONPlaceholder等）からデータを取得する一覧ページを作成し、キャッシュ設定を変えて挙動の違いを確認
- 実装: `generateStaticParams` を使った動的ルートの静的生成

**演習2-2: Streaming / Suspense（言語化 + 実装）**
- 言語化: 「StreamingがUXをどう改善するか、従来のSSRと比較して説明せよ」
- 実装: 意図的に遅い非同期処理を含むページで`Suspense`による部分的ストリーミングを実装
- 実装: `loading.tsx`を配置した場合としない場合の挙動の差を確認

**演習2-3: Client側データフェッチ — TanStack Query / SWR（言語化 + 実装）**
- 言語化: 「Server Componentのfetch、Server Actions、TanStack Query/SWRの3つを、ユースケースごとに使い分ける基準を説明せよ」
- 言語化: 「SWR（stale-while-revalidate）戦略とは何か、UXの観点でメリットを説明せよ」
- 実装: 同じデータ取得処理を以下の3パターンで実装して比較
  1. Server Componentの`fetch()`
  2. SWR（`useSWR`）
  3. TanStack Query（`useQuery`）
- 実装: TanStack QueryまたはSWRを使って検索付き一覧ページ（クライアント側フィルタリング + 再fetch）を実装
- 実装: 無限スクロールまたはページネーションの実装（`useSWRInfinite` or `useInfiniteQuery`）

---

### Layer 3: フルスタック機能（推定 4-5日）

#### 学ぶこと
- Route Handlers (`app/api/xxx/route.ts`)
- GET / POST / その他HTTPメソッド
- Edge Runtime vs Node Runtime
- Server Actions (`"use server"`)
- フォームとの連携
- DB操作（簡易的に）
- Optimistic UI

#### アウトプット演習

**演習3-1: Route Handlers（言語化 + 実装）**
- 言語化: 「Route HandlersとServer Actionsの使い分け基準を説明せよ」
- 言語化: 「Edge RuntimeとNode Runtimeの違いを、制約・パフォーマンス・ユースケースで比較せよ」
- 実装: CRUD APIを`route.ts`で実装（JSONファイルまたはインメモリをデータストアとして使用）
- 実装: 同じAPIをEdge RuntimeとNode Runtimeの両方で試し、違いを体験

**演習3-2: Server Actions（言語化 + 実装）**
- 言語化: 「Server Actionsの"use server"が裏側で何をしているか、HTTPリクエストの観点で説明せよ」
- 実装: フォーム送信 → Server Action → データ更新 → UIへの反映の一連のフローを実装
- 実装: `useOptimistic`を使ったOptimistic UIの実装（Todoアプリなど）
- 実装: Server Actionsのバリデーション（`zod`等を使用）

---

### Layer 4: レンダリング戦略（推定 3-4日）

#### 学ぶこと
- SSR / SSG / ISR / CSR / Edge Rendering の違い
- 各戦略の使い分け
- SEOへの影響
- コスト（インフラ）の観点

#### アウトプット演習

**演習4-1: レンダリング戦略の比較（言語化 + 実装）**
- 言語化: 以下の表を埋める形式
  ```
  | 戦略 | いつHTML生成? | SEO | TTFB | 動的データ | コスト | ユースケース |
  |------|-------------|-----|------|----------|--------|------------|
  | SSR  |             |     |      |          |        |            |
  | SSG  |             |     |      |          |        |            |
  | ISR  |             |     |      |          |        |            |
  | CSR  |             |     |      |          |        |            |
  | Edge |             |     |      |          |        |            |
  ```
- 言語化: 「あなたがECサイトを設計するとしたら、どのページにどのレンダリング戦略を採用するか、理由と共に説明せよ」
- 実装: 同じコンテンツを SSR / SSG / CSR それぞれで表示するページを作り、DevToolsのNetworkタブでレスポンスを比較

---

### Layer 5: パフォーマンス最適化（推定 3-4日）

#### 学ぶこと
- `next/image` による画像最適化
- `next/font` によるフォント最適化
- `dynamic import`（遅延読み込み）
- Code Splitting
- Prefetch

#### アウトプット演習

**演習5-1: 画像・フォント最適化（言語化 + 実装）**
- 言語化: 「`next/image`が通常の`<img>`タグと比べてどのような最適化を行うか列挙せよ」
- 実装: `<img>`タグと`next/image`で同じ画像を表示し、Lighthouseスコアを比較
- 実装: `next/font`を使ったフォント読み込みの実装

**演習5-2: Code Splitting & Dynamic Import（言語化 + 実装）**
- 言語化: 「Code Splittingが必要な理由と、Next.jsでの自動分割の仕組みを説明せよ」
- 実装: 重いコンポーネントを`dynamic()`で遅延読み込みし、バンドルサイズの変化を確認
- 実装: Linkコンポーネントのprefetch挙動をNetworkタブで確認

---

### Layer 6: 認証・セッション管理（推定 4-5日）

#### 学ぶこと
- Cookie操作
- JWT
- Middlewareによる認証ゲート
- サーバーサイドでの認証チェック

#### アウトプット演習

**演習6-1: Cookie & JWT（言語化 + 実装）**
- 言語化: 「CookieベースとJWTベースの認証の違いを、セキュリティ・スケーラビリティの観点で比較せよ」
- 実装: ログインフォーム → JWT発行 → Cookieに保存 → 認証付きAPIアクセスの一連のフローを実装

**演習6-2: Middleware認証ゲート（言語化 + 実装）**
- 言語化: 「Middlewareで認証チェックを行うメリットと、Server Component内でチェックする場合との違いを説明せよ」
- 実装: `middleware.ts`で未認証ユーザーをログインページにリダイレクトする仕組みを実装
- 実装: 認証済みユーザーのみがアクセスできるダッシュボードページを作成

---

### Layer 7: Middleware & Edge（推定 2-3日）

#### 学ぶこと
- `middleware.ts`の詳細
- Geo / A/Bテスト
- Rewrite / Redirect

#### アウトプット演習

**演習7-1: Middleware活用（言語化 + 実装）**
- 言語化: 「MiddlewareがEdgeで動くことのメリットと制約を説明せよ」
- 実装: A/Bテスト（リクエストヘッダーやCookieに基づいて異なるページを表示）
- 実装: `rewrite`と`redirect`の違いを実際に動かして確認（URLバーの変化に注目）

---

### Layer 8: データベース連携（推定 4-5日）

#### 学ぶこと
- Prisma / Drizzle のセットアップ
- Server ComponentでのDB直接呼び出し
- Connection Pool問題
- EdgeとDBの相性

#### アウトプット演習

**演習8-1: Prisma連携（言語化 + 実装）**
- 言語化: 「Server ComponentからDBを直接呼び出せるメリットと、APIルート経由との違いを説明せよ」
- 言語化: 「Connection Poolが問題になるケースと対策を説明せよ」
- 実装: Prisma + SQLite でTodoアプリを構築（CRUD完備）
- 実装: Server Componentから直接DB呼び出し + Server ActionsでのDB更新

**演習8-2: 発展 — Drizzle or Edge DB（実装）**
- 実装: Drizzleでの同等の実装（Prismaとの違いを体感）
- 実装: Turso等のEdge対応DBとの接続を試す（オプション）

---

### Layer 9: デプロイ & 本番運用（推定 2-3日）

#### 学ぶこと
- Vercelへのデプロイ
- 環境変数（ビルド時 vs 実行時）
- Preview環境
- 本番でのキャッシュ戦略

#### アウトプット演習

**演習9-1: デプロイ & 環境管理（言語化 + 実装）**
- 言語化: 「`NEXT_PUBLIC_`プレフィックスの有無で何が変わるか、セキュリティの観点で説明せよ」
- 言語化: 「ビルド時環境変数と実行時環境変数の違いを、具体例と共に説明せよ」
- 実装: Vercelにデプロイし、Preview環境とProduction環境の違いを確認
- 実装: 環境変数の使い分けを実際のデプロイで体験

---

### Layer 10: 高度なトピック（推定 3-5日）

#### 学ぶこと
- Partial Prerendering
- React Server Actionsの内部仕組み
- React Flight / RSC Payload
- Bundling構造
- Turbopack

#### アウトプット演習

**演習10-1: RSC内部理解（言語化）**
- 言語化: 「RSC Payloadとは何か、HTMLとの違いを説明せよ」
- 言語化: 「React Flightプロトコルの役割を、Server → Clientのデータ転送の観点で説明せよ」
- 実装: DevToolsのNetworkタブでRSC Payloadの中身を実際に観察し、notes.mdに記録

**演習10-2: Partial Prerendering & Turbopack（言語化 + 実装）**
- 言語化: 「Partial Prerenderingが解決する課題と、従来のSSR/SSGとの違いを説明せよ」
- 実装: Turbopackでのdev server起動と、Webpackとの速度比較

---

## 学習の進め方ガイド

### 1レイヤーの進め方（テンプレート）

```
1. Claude Codeに「Layer Xの演習を作成して」と依頼
   → README.md, answer.md, design.md, notes.md が自動生成される

2. 公式ドキュメントを読む（Claude Codeに「公式ドキュメントのこの部分を説明して」と聞いてもOK）

3. 言語化演習に取り組む
   → answer.md に自分の言葉で回答を書く
   → 「レビューして」と依頼 → フィードバックを受ける

4. 実装演習に取り組む
   → design.md に設計を書く
   → 実装する
   → 「レビューして」と依頼 → フィードバックを受ける

5. notes.md に気づき・学びを記録

6. 次のレイヤーへ
```

### Claude Code 活用コマンド例

| やりたいこと | Claude Codeへの依頼例 |
|---|---|
| 演習の作成 | `Layer 1の演習1-1を作成して` |
| 公式ドキュメント参照 | `Next.jsのApp Routerについて公式ドキュメントを参照して教えて` |
| 言語化レビュー | `answer.mdをレビューして` |
| 実装レビュー | `実装をレビューして` |
| ヒントを求める | `この演習のヒントをください`（段階的に出す） |
| 振り返り | `Layer 1で学んだことを整理して` |
| 進捗確認 | `今の学習進捗を教えて` |

---

## 推定スケジュール

| レイヤー | テーマ | 推定日数 | 累計 |
|---------|--------|---------|------|
| Layer 1 | Next.jsの基本構造 | 3-4日 | 3-4日 |
| Layer 2 | データフェッチ（TanStack Query / SWR含む） | 5-6日 | 8-10日 |
| Layer 3 | フルスタック機能 | 4-5日 | 12-15日 |
| Layer 4 | レンダリング戦略 | 3-4日 | 15-19日 |
| Layer 5 | パフォーマンス最適化 | 3-4日 | 18-23日 |
| Layer 6 | 認証・セッション管理 | 4-5日 | 22-28日 |
| Layer 7 | Middleware & Edge | 2-3日 | 24-31日 |
| Layer 8 | データベース連携 | 4-5日 | 28-36日 |
| Layer 9 | デプロイ & 本番運用 | 2-3日 | 30-39日 |
| Layer 10 | 高度なトピック | 3-5日 | 33-44日 |

**想定合計: 約6-7週間**（1日2-3時間の学習を想定）

---

## 最終ゴール

全レイヤー完了後、**総合演習**として以下を実装する：

### 総合プロジェクト: フルスタックTodoアプリ（本番品質）
- App Router + Nested Layout
- Server Components + Client Components の適切な使い分け
- Server Actions によるCRUD
- Prisma + SQLite（またはPostgreSQL）
- JWT認証 + Middleware認証ゲート
- ISRによるキャッシュ戦略
- `next/image` + `next/font` による最適化
- Vercelデプロイ
- Optimistic UI

これにより、全レイヤーの知識を統合的にアウトプットできる。
