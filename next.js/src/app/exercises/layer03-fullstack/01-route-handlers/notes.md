Edge Runtimeでファイルシステムのモジュールを読み込んだ場合に、以下のエラーが発生した。
Ecmascript file had an error
  3 | import { NextRequest, NextResponse } from "next/server";
  4 | import { memos } from "../../lib/store";
> 5 | import fs from "fs";
    | ^^^^^^^^^^^^^^^^^^^^
  6 |
  7 | export async function GET() {
  8 |   const res = fs.readFileSync("");

A Node.js module is loaded ('fs' at line 5) which is not supported in the Edge Runtime.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime

上記よりEdge Runtimeではそもそもファイルシステムのモジュールが用意されていないということがわかる。


このメモAPIにEdge Runtimeを使うメリットがあるのかについては、結論としてあるかなと思っています。理由としては、まずそもそも重たい処理というのをしない。ファイルシステムやDBアクセスもなく、とにかく中のメモリに保存されているデータを返却するだけの簡易的なAPIになりますので、そういったランタイムであればEdgeで良いかなと思います。
私、Edge Runtimeは分散されて複数の箇所に存在するので、今回のようなインメモリにデータを保存するケースの場合は、複数のEdge Runtimeでそのデータを共有する仕組みがない場合は、適していないかなというふうに言えます。例えば東京のEdgeでメモの内容を追加したとして、それを大阪のEdgeで取得したときに追加したメモが反映されないことになります。それぞれのEdgeのメモをコンテンツとして表示するからですね。なのでメモの共有を考えるのであれば、Node Runtimeで実装する必要があるかなと思います。

---

## 実装レビューコメント（Claude Code）

### notes.md について
Edge Runtimeの分散性によるインメモリデータの不整合問題に自ら気づけている点は素晴らしいです。「東京のEdgeと大阪のEdge」という具体例で説明しているのも良い理解です。

### 実装の指摘事項

#### 【重要】page.tsx: Server Componentから自身のRoute Handlerをfetchしている
```tsx
const { memos } = (await fetch(
  "http://localhost:3000/exercises/layer03-fullstack/01-route-handlers/api/memos/",
  ...
```
2つの問題があります:
1. **`http://localhost:3000` のハードコード** — 本番環境やポートが異なる環境では動かない
2. **Server Componentから自身のRoute Handlerへのfetch** — これはNext.jsのアンチパターンです。Server Componentは同じサーバー上で実行されるため、わざわざHTTPリクエストを介さずに、データストア（`store.ts`）を直接 import して使う方が効率的です。あるいは、READMEの要件通り「Client Componentからfetchで呼ぶ」設計にするなら、page.tsx 全体を `"use client"` にして `useEffect` で取得するアプローチが考えられます

→ この点について、どちらのアプローチが良いか考えてみてください。
ホストはおそらくNode.js側で用意されている環境変数から取ってくればいいのかなと思います。ただ、下で追記している通り、サーバー側で取ってくることはなくなるので、サーバーコンポーネント内でフェッチすることはないので、この処理は削除するかなと思います。
クライアント側でデータ取得をすると、クライアント側のコードが複雑化して読みにくくなっちゃうんで、それは避けたくて、すでにサーバー側にあるんだったら、それを直接返せばいいかなというふうに思います。なので、サーバー側でフェッチするのではなく、直接取得して返せばいいかなと思いました。

#### 【要修正】api/memos/route.ts: 未使用の `import fs from "fs"` が残っている
Edge Runtime 実験の残骸と思われますが、不要なimportは削除しましょう。
->削除しました。

#### 【改善】api/memos/route.ts: POSTのバリデーション
```tsx
if (memo.title.length === 0) return NextResponse.json({}, { status: 400 });
```
`memo` や `memo.title` が `undefined` の場合、`Cannot read properties of undefined` でサーバーエラー（500）になります。`!memo?.title` のようにオプショナルチェーンを使うとより堅牢です。また、400エラー時にエラーメッセージを返すと、クライアント側でのデバッグが容易になります（例: `{ error: "title is required" }`）。
->メモのタイトルがundefinedであることを考慮して、バリデーションを修正しました。また、responseにエラーメッセージを追加しました。

#### 【改善】api/memos/[id]/route.ts: HTTPステータスコードの見直し
- **PUT** が `201 (Created)` を返していますが、更新成功は `200 (OK)` が適切です。201は「新規リソースの作成」を意味します。
- **DELETE** が `NextResponse.json({}, { status: 204 })` を返していますが、204 (No Content) はレスポンスボディを持たないことを意味します。ボディありなら `200`、ボディなしなら `new NextResponse(null, { status: 204 })` が正しい形です。
->それぞれのレスポンスの修正をしました。

#### 【改善】components/form.tsx: 送信後のフォームクリア
送信成功後に `setTitle("")` と `setContent("")` でフォームをクリアしていません。input の `value` も制御していないため、送信後もフォームに値が残ります。
->リセット処理を実施しました。

#### 【改善】components/form.tsx, memo.tsx: エラーハンドリング
fetch の結果を確認していないため、APIがエラーを返した場合（400, 404, 500等）にもユーザーには何も通知されません。最低限 `response.ok` のチェックを入れると良いでしょう。
->本件はルートハンドラーズの使い方を学ぶことであって、エラーハンドリングといったクライアント制御はスコープ外になるのでそこまではやりません。

#### 【良かった点】
- Route Handlers の基本的な構成（ファイル配置、HTTPメソッドの分離）は正しい
- `params` を `Promise<{ id: string }>` として `await` しているのは、Next.js 15 の仕様に正しく対応している
- `crypto.randomUUID()` でID生成しているのは適切
- `router.refresh()` でServer Componentの再レンダリングを促すパターンは理解できている
- Client/Server の分離（フォームと表示をClient Component、ページをServer Component）は方向性として良い

---

## 再レビュー（Claude Code）

### 修正済みの項目 ✅
- `import fs` の削除 → 確認OK
- POSTバリデーションの改善（`!memo?.title` + エラーメッセージ） → 確認OK
- PUTのステータスコード 201→200 → 確認OK
- PUTにもバリデーション追加 → README の要件にはなかったが良い判断
- フォーム送信後の `setTitle("")` / `setContent("")` 追加 → 確認OK
- エラーハンドリングはスコープ外とする判断 → 了解、演習の目的から合理的

### 残っている指摘事項

#### 【要修正】page.tsx: Server Componentからの自己fetchがまだ残っている
notes.md で「サーバー側で直接取得して返す」という判断をしたのは正しいですが、page.tsx のコードがまだ修正されていません。この修正を適用してください。具体的には `fetch("http://localhost:3000/...")` の部分を、`store.ts` から直接 `memos` を import して使う形に変更します。

#### 【軽微】components/form.tsx: input の `value` 属性が設定されていない
`setTitle("")` / `setContent("")` でステートはリセットしていますが、`<input>` に `value={title}` / `value={content}` を指定していないため、**非制御コンポーネント**になっています。非制御の場合、React のステート変更で input の表示値は更新されず、送信後もフォームに文字が残ります。`value` を追加するか、もしくは `form.reset()` でDOM側をリセットする必要があります。

#### 【軽微】DELETE の 204 レスポンス
`NextResponse.json(null, { status: 204 })` になっていますが、`NextResponse.json()` は `Content-Type: application/json` でボディ `null` を送ります。204 の意味に厳密に従うなら `new NextResponse(null, { status: 204 })` の方が適切です。実動作に影響はほぼないので、知識として押さえておいてもらえればOKです。

---

## 最終レビュー（Claude Code）— 合格 ✅

すべての指摘事項が修正されました:
- page.tsx: `store.ts` から直接 import する形に変更済み ✅
- form.tsx: `value` 属性を追加し制御コンポーネント化済み ✅
- DELETE の 204 は知識として把握済みとする

本演習を完了とします。
