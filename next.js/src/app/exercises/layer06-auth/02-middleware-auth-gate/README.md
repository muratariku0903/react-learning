# 演習6-2: Middleware 認証ゲート

## 目的

Next.js の **Middleware**（`middleware.ts`）を使って、**ルートレベルの認証ゲート**を実装する。Middleware がリクエスト処理パイプラインのどこで実行されるかを理解し、**保護されたルート**と**公開ルート**のアクセス制御パターンを体感する。また、Server Component 内での認証チェックとの違いを理解する。

---

## 言語化演習

以下の問いに対して、`answer.md` に自分の言葉で回答してください。

### Q1: Middleware の実行タイミング

Next.js の Middleware は、リクエストがサーバーに到達してからレスポンスが返るまでの間の**どの時点**で実行されるか？以下の要素を含めた処理フローの中で、Middleware の位置を説明してください。

- リクエスト受信
- Middleware 実行
- ルーティング（ページの特定）
- レンダリング（Server Component / Client Component）
- レスポンス送信

「ルーティングの前」に実行されることが、認証ゲートとしてなぜ有利なのかを考えてください。

### Q2: Middleware vs Server Component での認証チェック

認証チェックを Middleware で行う場合と、各 Server Component 内で行う場合を比較してください。

- それぞれのメリット・デメリット
- 「Middleware で認証チェックをしているから Server Component では不要」は正しいか？
- 実際のプロダクションではどのような組み合わせが推奨されるか？

### Q3: `matcher` の設計

Middleware の `config.matcher` は、どのルートに Middleware を適用するかを制御します。以下のケースでどのように `matcher` を設計するか考えてください。

- `/dashboard` 以下のすべてのページを保護したい場合
- API ルート（`/api/*`）と静的ファイル（`/_next/static/*`）を除外したい場合
- 認証不要なページ（`/`, `/about`, `/login`）を除外したい場合

正規表現パターンの読み方と、`matcher` が配列を受け取れることにも言及してください。

### Q4: Edge Runtime の制約

Next.js の Middleware は **Edge Runtime** で動作します。これはどういう意味か？以下の観点で説明してください。

- Node.js Runtime との違い
- 使えない API（`fs`, `net` など）がある理由
- 「軽量で高速」と言われる理由
- データベースへの直接接続ができない理由と代替手段

---

## 実装演習

### 実装1: Middleware の作成

プロジェクトルートに `middleware.ts` を作成し、演習6-1 で実装した認証の仕組みと連携する認証ゲートを実装してください。

#### 要件
- `src/middleware.ts` に Middleware を作成する
- 保護されたルート: `/exercises/layer06-auth/02-middleware-auth-gate/dashboard`
- 公開ルート: `/exercises/layer06-auth/02-middleware-auth-gate/login`
- 未認証ユーザーが保護されたルートにアクセスした場合 → ログインページにリダイレクト
- 認証済みユーザーがログインページにアクセスした場合 → ダッシュボードにリダイレクト
- `config.matcher` で適用範囲を適切に設定する

#### ヒント
- Cookie から JWT を取得し、`decrypt()` で検証する
- Middleware 内では `cookies()` ではなく `request.cookies` を使う
- `NextResponse.redirect()` と `NextResponse.next()` を使い分ける

### 実装2: 保護されたダッシュボードページ

認証済みユーザーのみがアクセスできるダッシュボードページを作成してください。

#### 要件
- `dashboard/page.tsx` を作成する
- Server Component で Cookie を読み取り、ユーザー情報を表示する
- ログアウトボタンを配置する
- Middleware による認証チェック + Server Component 内での二重チェックを実装する
  - Middleware をバイパスされた場合の安全策として

### 実装3: ログインページ

演習6-1 の LoginForm を再利用する形で、ログインページを作成してください。

#### 要件
- `login/page.tsx` を作成する
- 演習6-1 で作成した LoginForm コンポーネントとServer Actions を活用する
- ログイン成功後、ダッシュボードにリダイレクトする
- 認証済みユーザーがアクセスした場合は Middleware によりダッシュボードにリダイレクトされることを確認

### 実装4: リダイレクトの挙動確認

以下のシナリオを実際に試し、挙動を `notes.md` に記録してください。

#### 確認シナリオ
1. 未認証状態で `/dashboard` にアクセス → ログインページにリダイレクトされるか
2. ログイン後、`/dashboard` にアクセス → 正常に表示されるか
3. ログイン済み状態で `/login` にアクセス → ダッシュボードにリダイレクトされるか
4. ログアウト後、`/dashboard` にアクセス → ログインページにリダイレクトされるか
5. DevTools の Network タブで、リダイレクト時のステータスコード（307）を確認

---

## 制約

- Middleware は `src/middleware.ts`（プロジェクト内に1つのみ）に配置すること
- 演習6-1 のセッション管理ユーティリティ（`_lib/session.ts`）を再利用すること
- Middleware 内でデータベースアクセスやNode.js専用APIを使用しないこと
- 認証チェックは Middleware と Server Component の**両方**で行うこと（Defense in Depth）
- リダイレクトの挙動を `notes.md` に記録すること
