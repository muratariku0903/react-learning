// TODO: セッション管理ユーティリティを実装する
//
// 以下の関数を実装してください:
//
// 1. encrypt(payload) — ペイロードを JWT に変換
//    - jose ライブラリの SignJWT を使用
//    - アルゴリズム: HS256
//    - 有効期限: 7日間
//
// 2. decrypt(session) — JWT を検証してペイロードを返す
//    - jose ライブラリの jwtVerify を使用
//    - 検証失敗時は undefined を返す
//
// 3. createSession(userId) — セッションを作成して Cookie にセット
//    - encrypt() で JWT を生成
//    - cookies() で Cookie にセット
//    - Cookie 属性: httpOnly, secure, sameSite: "lax", path: "/"
//
// 4. deleteSession() — Cookie を削除（ログアウト用）
//
// ヒント:
// - import "server-only" を先頭に追加する
// - const secretKey = process.env.SESSION_SECRET
// - const encodedKey = new TextEncoder().encode(secretKey)
