ログイン後に Cookie が追加されるか
「Authorization」というキーでエンコードされた値がー格納されています。
HttpOnly / Secure / SameSite / Max-Age 属性が正しく設定されているか
ブラウザのDevToolsで確認したところ、全て設定されていました。
ログアウトで Cookie が削除されるか
削除されています。
JWT の中身を jwt.io で確認してみる（ペイロードの sub が読めること、署名の検証）

{
  "alg": "HS256"
}
{
  "sub": "test",
  "exp": 1775973245
}
a-string-secret-at-least-256-bits-long
