# 基本: Zod スキーマと React Hook Form の接続

## 目的
Zod スキーマを React Hook Form に接続する基礎を理解する。
具体的には `zodResolver` による外部バリデーション統合、`z.string()` / `z.number()` / `z.enum()` の基本的なバリデーション定義、
そして `z.infer<typeof schema>` によるフォーム型の自動導出を体験で掴む。

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1.
`zodResolver` を使うことで、RHF のバリデーション定義（`register` の `validate` オプション）と比べて何が変わるか。
**型安全性** と **バリデーションロジックの一元管理** の2つの観点で説明してください。

### Q2.
`z.infer<typeof schema>` で型を導出するメリットは何か。
手動で `FormValues` 型を定義する場合と比較して、
スキーマの変更が発生したときにどのような差が生まれるかを具体的に説明してください。

### Q3.
Zod のエラーメッセージをカスタマイズする方法と、RHF の `formState.errors` との関係を説明してください。
Zod 側で設定したメッセージが、どのような経路で `errors.フィールド名.message` に反映されるのかを追ってみてください。

## 実装演習

### 要件
ユーザー登録フォームを実装します。
`App.tsx` には未完成のフォームが置いてあります。以下を完成させてください。

- **name**: `string`, 必須, 2文字以上
- **email**: `string`, 必須, email 形式
- **age**: `number`, 必須, 18以上100以下
- **role**: `enum`, `"admin"` | `"user"` | `"editor"` から選択

具体的な作業:
1. Zod スキーマを定義する（各フィールドのバリデーションルールとエラーメッセージを含む）
2. `zodResolver` で RHF に接続する
3. フォームの型は `z.infer<typeof schema>` で導出する（手動で型定義しない）
4. エラーメッセージは日本語でカスタマイズする

### 制約
- `register` の `validate` / `required` / `minLength` 等のオプションは使わない（すべて Zod で定義する）
- `useState` は使わない（RHF が管理する）
- 手動で `FormValues` のような型を定義しない（`z.infer` で導出する）

### ヒント
- `@hookform/resolvers/zod` から `zodResolver` をインポートできる
- `z.coerce.number()` を使うと、`<input type="number">` の文字列値を自動で数値に変換できる
- `z.enum()` には配列でリテラル値を渡す: `z.enum(["admin", "user", "editor"])`
- `zodResolver(schema)` を `useForm` の `resolver` オプションに渡す
