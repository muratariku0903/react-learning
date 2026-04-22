# クロスフィールドバリデーション（refine / superRefine）

## 目的
単一フィールドでは検証できない「フィールド間の関係」をZodで表現する方法を学ぶ。
`refine` と `superRefine` の使い分け、カスタムエラーパスの指定、
そしてそれらが React Hook Form の `errors` オブジェクトとどう連携するかを理解する。

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1. refine と superRefine の違い
`refine` と `superRefine` の違いは何か。
どちらを使うべきかの判断基準を、**エラーを返せる数**と**パス指定の柔軟性**の観点で説明してください。

### Q2. superRefine の path 指定と RHF の errors の関係
`superRefine` で `ctx.addIssue({ path: ["confirmPassword"] })` のように path を指定すると、
RHF の `errors.confirmPassword` にエラーが表示される仕組みを説明してください。
path を指定しない場合はどうなるか、についても述べてください。

### Q3. refine の配置場所による挙動の違い
`.refine()` をスキーマチェーンのどこに書くかで挙動が変わります。
`z.object({...}).refine(...)` のようにオブジェクト全体に付ける場合と、
個別フィールドに `.refine()` を付ける場合の違いを説明してください。

## 実装演習

### 題材
イベント申込フォーム

### 要件

`App.tsx` にフォームのUIスケルトンが用意されています。
Zodスキーマと `superRefine` による相関バリデーションを実装してください。

#### フィールド
| フィールド名 | 型 | 単体バリデーション |
|---|---|---|
| `password` | string | 8文字以上、英字と数字の両方を含む |
| `confirmPassword` | string | （相関チェックで検証） |
| `startDate` | string（date input） | 必須 |
| `endDate` | string（date input） | 必須 |
| `participants` | number | 1以上の整数 |
| `maxCapacity` | number | 1以上の整数 |

#### 相関バリデーション（superRefine で実装）
- `password` と `confirmPassword` が一致すること
- `endDate` が `startDate` より後の日付であること
- `maxCapacity` が `participants` 以上であること

#### 表示要件
- 各エラーは対応するフィールドの直下に表示すること（`path` を正しく指定する）
- 送信成功時は `console.log` でフォーム値を出力する

### 制約
- 相関バリデーションには `refine` ではなく **`superRefine` を使うこと**（複数エラーを同時に返せるようにする）
- `@hookform/resolvers/zod` の `zodResolver` を使って RHF と Zod を接続すること

### ヒント
- `z.object({...}).superRefine((data, ctx) => { ... })` の形でオブジェクト全体に対して相関チェックを書く
- `ctx.addIssue()` の `path` プロパティでエラーの表示先フィールドを制御できる
- date input の値は文字列（`"2024-01-15"` 形式）で取得されるため、比較には `new Date()` を使う
