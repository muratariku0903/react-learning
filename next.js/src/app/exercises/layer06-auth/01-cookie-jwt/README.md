# 演習6-1: Cookie & JWT

## 目的

Web アプリケーションにおける **認証（Authentication）** の基本を理解する。HTTP Cookie の仕組みと、**JWT（JSON Web Token）** を使ったステートレスなセッション管理の方法を実装を通じて体感する。特に、Next.js の Server Actions と `cookies()` API を活用した認証フローを構築する。

---

## 言語化演習

以下の問いに対して、`answer.md` に自分の言葉で回答してください。

### Q1: Cookie の役割と属性

HTTP Cookie がなぜ認証に使われるのか、その仕組みを説明してください。また、以下の Cookie 属性がセキュリティにどう影響するか、それぞれ説明してください。

- `HttpOnly`
- `Secure`
- `SameSite`
- `Max-Age` / `Expires`

「これらの属性を設定しなかった場合、どのような攻撃が可能になるか」という観点で考えてください。

### Q2: JWT の構造と特徴

JWT は `ヘッダー.ペイロード.署名` の3つの部分から構成されます。以下の問いに答えてください。

- なぜ JWT は「ステートレス」と言われるのか？サーバー側のセッションストア（Redis 等）を使う方式と比較して説明してください
- JWT の署名部分は何を保証しているのか？「暗号化」との違いを明確にしてください
- JWT を使う場合のデメリット（特にトークン失効に関して）は何か？

### Q3: Cookie ベース vs LocalStorage

認証トークン（JWT）の保存先として、Cookie と LocalStorage のどちらが適切か？以下の観点から比較してください。

- XSS（クロスサイトスクリプティング）への耐性
- CSRF（クロスサイトリクエストフォージェリ）への耐性
- Server Component からのアクセス可否

Next.js の App Router 環境ではどちらが推奨されるか、理由と共に説明してください。

### Q4: Next.js における認証の実装パターン

Next.js で認証を実装する際、以下の3箇所でそれぞれ何をチェックすべきか説明してください。

1. **Middleware**（`middleware.ts`）
2. **Server Component**（`page.tsx` 内）
3. **Server Action**（`"use server"` 関数内）

それぞれの役割の違いと、「なぜ Middleware だけでは不十分なのか」を考えてください。

---

## 実装演習

### 実装1: セッション管理ユーティリティの作成

JWT を使ったセッションの暗号化・復号化と、Cookie 操作のユーティリティを作成してください。

#### 要件
- `_lib/session.ts` に以下の関数を実装する
  - `encrypt(payload)` — ペイロードを JWT に変換する（`jose` ライブラリを使用）
  - `decrypt(session)` — JWT を検証してペイロードを取り出す
  - `createSession(userId)` — JWT を生成し Cookie にセットする
  - `deleteSession()` — Cookie を削除する（ログアウト用）
- 秘密鍵は環境変数 `SESSION_SECRET` から取得する
- `'server-only'` をインポートして、クライアントバンドルに含まれないことを保証する

#### ヒント
- `jose` ライブラリの `SignJWT` と `jwtVerify` を使います
- Next.js の `cookies()` は Server Component / Server Action / Route Handler 内で使用可能です

### 実装2: ログイン・ログアウトフローの構築

Server Actions を使ったログイン・ログアウト機能を実装してください。

#### 要件
- `_lib/actions.ts` に Server Actions を実装する
  - `login(formData)` — メールアドレスとパスワードを受け取り、認証成功時にセッションを作成する
  - `logout()` — セッションを削除し、ログインページにリダイレクトする
- `components/LoginForm.tsx` を作成する（Client Component）
  - メールアドレスとパスワードの入力フォーム
  - `useActionState` を使ってエラー状態を管理する
  - バリデーションエラーを画面に表示する
- 認証は簡易的でOK（ハードコードされたユーザー情報と照合）
  - 例: `email: "test@example.com"`, `password: "password123"`

### 実装3: 認証状態に応じた表示の切り替え

ログイン済みかどうかで表示内容を切り替えるページを作成してください。

#### 要件
- `page.tsx` をエントリーポイントとする
- 未認証時: ログインフォームを表示
- 認証済み時: ユーザー情報（userId）とログアウトボタンを表示
- Server Component で Cookie を読み取り、JWT を復号してセッション状態を判定する
- DevTools の Application タブで Cookie が実際にセット・削除されることを確認する

---

## 制約

- 認証ライブラリ（NextAuth.js 等）は使用しない — 仕組みを理解するために自前で実装すること
- パスワードのハッシュ化は今回はスキップしてOK（本番では必須）
- `jose` ライブラリを JWT 操作に使用すること
- Cookie の属性（`HttpOnly`, `Secure`, `SameSite`）を適切に設定すること
- DevTools で確認した Cookie の状態を `notes.md` に記録すること
