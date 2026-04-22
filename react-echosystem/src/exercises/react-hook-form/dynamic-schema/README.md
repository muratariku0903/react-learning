# 動的スキーマ: discriminatedUnion による条件付きバリデーション

## 目的
ユーザーの選択に応じてバリデーションスキーマが変わるフォームを、Zod の `discriminatedUnion` で型安全に実装する方法を学ぶ。
「支払い方法によって入力項目が変わる」という実務的なパターンを通じて、
動的フォームの設計・バリデーション・型推論を一貫して扱えるようになる。

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1. `z.discriminatedUnion` と `z.union` の違い

`z.discriminatedUnion` と `z.union` はどちらも複数のスキーマを「いずれか1つ」として表現できるが、挙動は大きく異なる。
以下の2つの観点で違いを説明してください。

- **エラーメッセージの明確さ**: バリデーション失敗時にユーザーに返されるエラーの品質はどう異なるか
- **パフォーマンス**: 入力データに対してどのスキーマを適用するか決定するロジックの効率はどう違うか

なぜフォームでは `discriminatedUnion` の方が扱いやすいかも合わせて述べること。

### Q2. 表示されていないフィールドのバリデーションスキップ

`discriminatedUnion` を使った場合、RHF の `watch` や `useWatch` で判別フィールド（例: `paymentType`）を監視して、
対応する入力フィールドのみを画面に表示する。

このとき、Zod 側では「画面に表示されていないフィールドのバリデーション」をどのようにスキップ（あるいは不要に）しているか、
`discriminatedUnion` の判別ロジックと関連付けて説明してください。

### Q3. TypeScript の型の絞り込み（narrowing）との連携

`z.infer` で `discriminatedUnion` のスキーマから型を推論すると、TypeScript の discriminated union 型が得られる。
この型に対して `paymentType` の値で条件分岐すると、各分岐内で型が自動的に絞り込まれる。

この仕組みを、以下のようなコード例を交えて説明してください。

```ts
if (data.paymentType === "credit") {
  // ここで data の型はどうなるか？
  // data.cardNumber にアクセスできるのはなぜか？
}
```

## 実装演習

### 題材: 支払い方法選択フォーム

ユーザーが支払い方法を選択すると、それに応じた入力フィールドが動的に切り替わるフォームを実装する。

### 支払い方法と必要フィールド

| paymentType | フィールド | バリデーション |
|---|---|---|
| `"credit"` | cardNumber | 16桁の数字 |
| | expiryDate | MM/YY 形式 |
| | cvv | 3桁の数字 |
| `"bank"` | bankName | 必須 |
| | branchCode | 3桁の数字 |
| | accountNumber | 7桁の数字 |
| `"convenience"` | storeName | `"seven"` \| `"lawson"` \| `"familymart"` のいずれか |
| | phoneNumber | 電話番号形式（例: 090-1234-5678） |

### 要件

- `z.discriminatedUnion("paymentType", [...])` でスキーマを定義する
- `zodResolver` を使って `useForm` と接続する
- `useWatch` で `paymentType` を監視し、対応するフィールドのみを画面に表示する
- フォーム送信時に `console.log` でデータを出力する

### 制約

- 各支払い方法のフィールド群は**子コンポーネント**に切り出すこと
  - `components/CreditFields.tsx`
  - `components/BankFields.tsx`
  - `components/ConvenienceFields.tsx`
- 子コンポーネントでは `useFormContext` を使ってフォームにアクセスすること

### ヒント

- `App.tsx` にスケルトンが用意されているので、TODO コメントに沿って実装を進める
- `useWatch({ name: "paymentType" })` で現在の選択値をリアクティブに取得できる
- `discriminatedUnion` を使えば、表示していないフィールドのバリデーションは自動的にスキップされる
- `defaultValues` で `paymentType` の初期値を設定しておくと、初回表示時から対応フィールドが表示される
