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

---

## レビューコメント（Claude Code）

design.md の内容は README.md の要件をそのまま転記したものになっています。設計メモとしては、**自分なりの設計判断**が欲しいところです。例えば:

- page.tsx を Server Component にするか Client Component にするか、その理由は？
- 一覧取得はどこで行うか（Server Component で初期取得？ Client Component で useEffect？）
- フォーム送信後の画面更新はどうやるか（`router.refresh()`？ ローカルステートの更新？ `revalidatePath`？）
- エラーハンドリングはどこでどのように行うか？
- HTTPステータスコードの設計（200 vs 201 vs 204 の使い分け）

今回の実装を振り返って、これらの判断を design.md に追記してみると、今後の設計力につながります。次回の演習では、実装前にこのレベルの判断を書いてから着手してみてください。

