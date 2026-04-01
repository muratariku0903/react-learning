// TODO: Server Actions を実装する
//
// 以下の Server Actions を実装してください:
//
// 1. login(prevState, formData)
//    - "use server" を宣言
//    - formData からメールアドレスとパスワードを取得
//    - 簡易的な認証（ハードコードされたユーザー情報と照合）
//      例: email: "test@example.com", password: "password123"
//    - 認証成功時: createSession() でセッションを作成 → ダッシュボードにリダイレクト
//    - 認証失敗時: エラーメッセージを返す
//
// 2. logout()
//    - "use server" を宣言
//    - deleteSession() でセッションを削除
//    - ログインページにリダイレクト
//
// ヒント:
// - useActionState と組み合わせるため、login は (prevState, formData) の形にする
// - redirect() は try/catch の外で呼ぶこと（redirect は内部的にエラーを throw する）
