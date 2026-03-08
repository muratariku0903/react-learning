# 演習3-1: Route Handlers

## 目的
Next.js App Router の Route Handlers（`app/api/xxx/route.ts`）を使って API エンドポイントを構築する方法を理解する。
HTTP メソッドごとの実装パターン、リクエスト/レスポンスの扱い方を習得し、
Server Actions との使い分けを判断できるようになる。

---

## 言語化演習（answer.md に回答を記入）

### Q1: Route Handlers と Server Actions の使い分け
Route Handlers と Server Actions はどちらもサーバー側でロジックを実行できる。
以下の観点で、それぞれをどう使い分けるべきか説明せよ:

- どんなクライアントからのリクエストを想定しているか（ブラウザの自アプリだけか、外部からもか）
- データの取得（Read）とデータの変更（Write）で、それぞれどちらが適しているか
- URL を持つかどうかの違いが、実際の設計にどう影響するか

### Q2: Route Handlers のキャッシュ挙動
Route Handlers の `GET` メソッドは、特定の条件下でキャッシュされることがある。

- どのような条件のとき、GET の結果がキャッシュされるか？
- キャッシュされないようにするには、どのような方法があるか？（複数挙げよ）
- これは Server Component の `fetch()` のキャッシュとどう異なるか？

### Q3: NextRequest と Web API の Request
Route Handlers の引数として受け取る `Request` と、Next.js が提供する `NextRequest` の違いを説明せよ:

- `NextRequest` で追加されている便利な機能は何か？
- どちらを使うべきか、判断基準は何か？

### Q4: Edge Runtime と Node Runtime
Route Handlers では `export const runtime = 'edge'` を指定することで Edge Runtime で実行できる。
以下の観点で、Edge Runtime と Node Runtime（デフォルト）の違いを説明せよ:

- それぞれの実行環境はどこで動くか？（物理的・インフラ的な観点で）
- Edge Runtime で使えない Node.js API にはどのようなものがあるか？
- どのような API に Edge Runtime が向いていて、どのような API には向いていないか？
- コールドスタートの速度に違いが出る理由は何か？

---

## 実装演習（design.md に設計を書いてから実装）

### 課題: メモ帳 CRUD API の実装

インメモリのデータストアを使って、シンプルなメモ帳の CRUD API を Route Handlers で実装せよ。

```
exercises/layer03-fullstack/01-route-handlers/
├── page.tsx                → メモ帳 UI（API を呼び出す Client Component）
├── _lib/
│   └── store.ts            → インメモリデータストア
└── api/
    └── memos/
        ├── route.ts        → GET（一覧取得）/ POST（作成）
        └── [id]/
            └── route.ts    → GET（個別取得）/ PUT（更新）/ DELETE（削除）
```

### 要件

1. **データストア（`_lib/store.ts`）を実装**
   - メモの型: `{ id: string; title: string; content: string; createdAt: string; updatedAt: string }`
   - インメモリ（配列）でデータを保持する（サーバー再起動で消えてOK）
   - 初期データとして2〜3件のサンプルメモを入れておく

2. **`api/memos/route.ts` を実装**
   - `GET`: メモ一覧を JSON で返す
   - `POST`: リクエストボディからメモを作成し、作成されたメモを返す（201）
   - バリデーション: `title` が空の場合は 400 エラーを返す

3. **`api/memos/[id]/route.ts` を実装**
   - `GET`: 指定 ID のメモを返す（存在しない場合は 404）
   - `PUT`: 指定 ID のメモを更新する（存在しない場合は 404）
   - `DELETE`: 指定 ID のメモを削除する（存在しない場合は 404）

4. **`page.tsx` にメモ帳 UI を実装**
   - メモ一覧の表示
   - 新規メモの追加フォーム
   - メモの編集・削除ボタン
   - API の呼び出しは `fetch('/api/...')` で行う（Client Component）

### 課題B: Edge Runtime で動かしてみる（課題A 完了後）

課題A で作成した GET（一覧取得）の Route Handler を Edge Runtime でも動かし、違いを体験せよ。

1. `api/memos/route.ts` に `export const runtime = 'edge'` を追加して動作を確認する
2. Edge Runtime で動かしたとき、何か制約に引っかかるか確認する
3. 確認後、`runtime` の指定を元に戻す（Node Runtime に戻す）
4. **notes.md に以下を記録する:**
   - Edge Runtime に切り替えたとき、動作に変化はあったか？
   - もしインメモリストアの代わりに `fs` モジュールでファイル読み書きしていたら、Edge Runtime で動くか？
   - この API を Edge Runtime で動かすメリットはあるか？ ないか？ その理由は？

### ヒント
- Route Handlers は `app` ディレクトリ内の `route.ts` ファイルで定義する
- 動的ルートパラメータは第2引数から取得する: `(request, { params })` の形
- `NextResponse.json()` でレスポンスを返せる
- ステータスコードは `NextResponse.json(data, { status: 201 })` のように指定する
- `request.json()` でリクエストボディを取得できる
