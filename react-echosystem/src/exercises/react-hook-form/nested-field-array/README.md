# ネストした useFieldArray（フォームの中のフォーム）

## 目的
`useFieldArray` を使った動的な行追加・削除を理解し、
さらに **配列の中にさらに配列がある** という入れ子構造を扱えるようになる。
題材は「注文フォーム」で、以下の3階層を扱う。

```
order
└── items[]            （注文商品の一覧）
    └── options[]      （各商品ごとの追加オプション）
```

これは現実の EC・SaaS フォームでも頻出するパターンで、
「親フォームのコンテキストを子コンポーネントへどう渡すか」「行ごとの再レンダリングをどう抑えるか」という
RHF らしい論点が一気に出てきます。

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1.
`useFieldArray` の `fields` 配列の各要素には RHF が振った `id` が付いています。
React のレンダリング時に `key={field.id}` ではなく `key={index}` を使うと、
**行を途中で削除した時** に何が起きると予想しますか？
RHF が内部で何を `id` でトラッキングしているのかを踏まえて答えてください。

### Q2.
入れ子の `useFieldArray` を実装するとき、
親コンポーネントにすべての `register` / `control` 操作を集約する設計と、
子コンポーネント (`ItemRow` など) を切り出してその中で `useFieldArray` を呼ぶ設計があります。
**後者を選ぶメリットとデメリット** を、再レンダリングの観点で説明してください。
（ヒント：子で `useFormContext` を呼ぶと何が起きる？）

### Q3.
入れ子配列 `items.0.options.2.name` のような **動的な name** を組み立てる場面で、
バグが入りやすい典型的なパターンを1つ挙げ、なぜそれがバグるのかを説明してください。

## 実装演習

### 要件
`App.tsx` に「商品3つを追加できる注文フォーム」の枠だけ用意してあります。次を実装してください。

- `items` を `useFieldArray` で管理し、行の **追加 / 削除 / 並べ替え（上下移動）** を実装
- 各 `item` には `name` (string, 必須) と `quantity` (number, 1以上) と `options[]` を持たせる
- `options` も `useFieldArray` で管理し、各 option は `label` と `extraPrice` (number, 0以上) を持つ
- `ItemRow` というコンポーネントを `components/` に切り出し、そこで **入れ子の useFieldArray** を呼ぶこと
  - 親からは `nestIndex`（親 items 内のインデックス）だけ受け取る前提でよい
  - `useFormContext` を使って `control` を取得すること
- 送信時、合計金額（quantity × (基本100円 + extraPrice合計)）を計算して `console.log`

### 制約
- `FormProvider` を使うこと
- `ItemRow` の中で `useForm` を **新たに呼ばない**（同じフォームのコンテキストを共有する）
- 各 `ItemRow` は他の行の入力で再レンダリングされないように工夫する（`useWatch` の `name` 指定 など）

### ヒント
- 入れ子で `useFieldArray` を使うとき、`name` には `` `items.${nestIndex}.options` `` のようにテンプレート文字列で渡す
- `Controller` を使えば数値入力で `valueAsNumber` 相当の制御がしやすい
- 金額の合計表示を `useWatch({ name: "items" })` で書くと、行追加の度にどこが再描画されるか観察できる
