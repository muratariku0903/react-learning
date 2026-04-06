# 基本: register と Controller / バリデーション

## 目的
React Hook Form (RHF) におけるフォーム値管理の最小単位を理解する。
具体的には `register` と `Controller` の使い分け、`handleSubmit` の役割、
`formState` から得られる情報、そしてバリデーションの組み込み方を体験で掴む。

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1.
RHF が「非制御コンポーネント (uncontrolled) を基本とする」と言われる理由を、
**フォームに10個のテキスト入力がある状況での再レンダリング** を想定して説明してください。
`useState` で各入力を管理した場合と比較すると、何が変わりますか？

### Q2.
`register` だけで全部済むなら `Controller` は不要に見えます。
それでも `Controller` が必要になるのはどういう状況か、
`register` が裏側で何をやっているか（DOM への参照取得・onChange の付与）を踏まえて説明してください。

### Q3.
`formState.isDirty` と `formState.isValid` を画面のボタン活性制御に使う場合、
それぞれを単独で使うとどんな落とし穴があるか、自分の言葉で考察してください。

## 実装演習

### 要件
シンプルな「ユーザープロフィール編集フォーム」を実装します。
`App.tsx` には未完成のフォームが置いてあります。以下を完成させてください。

- `name`（必須・2文字以上20文字以下）
- `email`（必須・メール形式）
- `age`（必須・0以上120以下の整数）
- `bio`（任意・最大200文字）
- 自作の `<Rating />` コンポーネント（5段階の星評価、0〜5）を `Controller` で接続する
  - `<Rating />` は `value` / `onChange` を props で受け取る前提のコンポーネントとして用意済み
- `submit` ボタンは `isDirty && isValid` の時だけ活性
- 送信時は `console.log` でフォーム値を出力
- バリデーションエラーは各フィールドの下に表示

### 制約
- `useState` を使わない（RHF が管理する）
- `<Rating />` は中身を変更してよいが、外部APIは `value` / `onChange` のみとする

### ヒント
- `register` は戻り値を `<input {...register("name")} />` のように展開する
- `Controller` の `render` には `field` が渡ってくる
- `mode: "onChange"` を `useForm` に渡すと `isValid` がリアルタイムで更新される
