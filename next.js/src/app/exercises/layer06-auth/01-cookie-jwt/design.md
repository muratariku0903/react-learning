- `_lib/session.ts` に以下の関数を実装する
  - `encrypt(payload)` — ペイロードを JWT に変換する（`jose` ライブラリを使用）
  - `decrypt(session)` — JWT を検証してペイロードを取り出す
  - `createSession(userId)` — JWT を生成し Cookie にセットする
  - `deleteSession()` — Cookie を削除する（ログアウト用）
- 秘密鍵は環境変数 `SESSION_SECRET` から取得する
- `'server-only'` をインポートして、クライアントバンドルに含まれないことを保証する


- `_lib/actions.ts` に Server Actions を実装する
  - `login(formData)` — メールアドレスとパスワードを受け取り、認証成功時にセッションを作成する
  - `logout()` — セッションを削除し、ログインページにリダイレクトする
- `components/LoginForm.tsx` を作成する（Client Component）
  - メールアドレスとパスワードの入力フォーム
  - `useActionState` を使ってエラー状態を管理する
  - バリデーションエラーを画面に表示する
- 認証は簡易的でOK（ハードコードされたユーザー情報と照合）
  - 例: `email: "test@example.com"`, `password: "password123"`


  - `page.tsx` をエントリーポイントとする
- 未認証時: ログインフォームを表示
- 認証済み時: ユーザー情報（userId）とログアウトボタンを表示
- Server Component で Cookie を読み取り、JWT を復号してセッション状態を判定する
- DevTools の Application タブで Cookie が実際にセット・削除されることを確認する
