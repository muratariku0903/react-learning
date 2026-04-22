# 非同期バリデーションとサーバーエラー統合

## 目的
非同期バリデーション（API呼び出しによるチェック）と、サーバーサイドエラーをReact Hook Formのエラー表示に統合する方法を学ぶ。
具体的には、Zodの `refine` による非同期バリデーション、`setError` によるサーバーエラーの手動設定、
そしてそれらをフォームUXとして統合するパターンを体験で掴む。

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1.
Zodの `refine` で async 関数を渡した場合、バリデーションはどのタイミングで実行されるか。
毎キーストロークで API を叩くと何が問題になるか、RHF の `mode` オプションとの関係で説明してください。

### Q2.
`setError` で手動設定したエラーと、zodResolver が自動設定したエラーの違いは何か。
`clearErrors` や次回バリデーション時の挙動の観点で説明してください。

### Q3.
非同期バリデーション（例：ユーザー名重複チェック）を zodResolver 内の refine で行うか、
onSubmit ハンドラ内で setError を使うか、それぞれのメリット・デメリットを説明してください。

## 実装演習

### 要件
アカウント作成フォームを実装します。
`App.tsx` には未完成のフォームとモックAPI関数が置いてあります。以下を完成させてください。

#### フィールド
- **username**: `string`, 必須, 3文字以上, 重複チェック（非同期）
- **email**: `string`, 必須, email形式, 重複チェック（非同期）
- **password**: `string`, 必須, 8文字以上

#### 非同期バリデーション
- `checkUsername(name)`: `"admin"`, `"test"`, `"user"` は使用済みとして `false` を返す（500ms delay）
- `checkEmail(email)`: `"test@example.com"` は使用済みとして `false` を返す（500ms delay）

#### サーバーエラー統合
- `onSubmit` 時にモック API `createAccount(data)` を呼び出す
- サーバーが返すエラー（例：`"existing@example.com"` で登録すると `"このメールアドレスは既に登録されています"`）を `setError` でフォームに表示する

### 具体的な作業
1. Zod スキーマを定義する（同期バリデーション + `refine` による非同期バリデーション）
2. `zodResolver` で RHF に接続する
3. `onSubmit` ハンドラで `createAccount` を呼び、サーバーエラーを `setError` でフォームに反映する
4. フォームの型は `z.infer<typeof schema>` で導出する

### 制約
- モック API はファイル内に関数として定義済み（実際のHTTPリクエストは不要）
- 非同期バリデーションは submit 時（`mode: "onSubmit"`）に実行されるようにする
- `useState` でフォーム値を管理しない（RHF が管理する）

### ヒント
- `z.string().refine(async (val) => { ... })` で非同期バリデーションを定義できる
- `setError("fieldName", { type: "server", message: "..." })` でサーバーエラーを設定できる
- `zodResolver` は async な refine も自動的に処理してくれる
- `mode: "onSubmit"` にすると、バリデーションは送信ボタン押下時にのみ実行される
