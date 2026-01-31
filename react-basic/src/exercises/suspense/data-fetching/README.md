# データ取得とSuspense

## 目的

この演習では、Suspenseをデータ取得と組み合わせる方法を理解します。
「useEffect + fetch」では Suspense は動かないことを体験し、Suspense対応のデータ取得パターンを学びます。

## 背景

Suspenseは「コンポーネントが準備できるまで待つ」仕組みですが、単純に `useEffect` で fetch するだけでは Suspense は反応しません。
これは Suspense が「Promiseをthrowする」という特殊な仕組みで動いているためです。

Suspense対応のデータ取得には、以下のようなアプローチがあります：
- React Server Components
- Suspense対応ライブラリ（TanStack Query、SWR など）
- 自作のSuspense対応ラッパー

---

## 要件

### 言語化演習

以下の質問に `answer.md` で回答してください。

1. なぜ `useEffect` + `fetch` + `useState` のパターンでは Suspense が反応しないのですか？Suspenseが「待つ」ために必要な条件は何ですか？

2. 「Suspense = fetchの代替」ではないと言われます。これはどういう意味ですか？Suspenseの本質的な役割は何ですか？

3. Suspense対応のデータ取得を実現するために、ライブラリ（TanStack Query等）はどのような工夫をしていると考えられますか？

---

### 実装演習

現在の `App.tsx` は、従来の `useEffect` + `useState` パターンでユーザーデータを取得しています。
これを Suspense 対応のパターンに書き換えてください。

#### やること

1. `design.md` に設計メモを記載する
   - 従来パターンの問題点
   - Suspense対応にするために何を変更する必要があるか

2. 以下を実装する
   - `components/wrapPromise.ts` にある `wrapPromise` 関数を理解し、活用する
   - `UserProfile` コンポーネントを Suspense 対応に書き換える
   - `App` コンポーネントで `Suspense` を使ってラップする

#### wrapPromise について

`wrapPromise` は、通常のPromiseをSuspense対応に変換するシンプルなユーティリティです。
これは教育目的のシンプルな実装であり、本番環境では TanStack Query などのライブラリを使用することを推奨します。

---

## 制約条件

- `UserProfile` コンポーネント内で `useState` や `useEffect` を使わないこと
- ローディング状態の管理は Suspense に任せること

---

## ヒント

- `wrapPromise` の返り値は `read()` メソッドを持ちます
- `read()` を呼ぶと、データの準備状況に応じて：
  - 準備中：Promiseをthrow
  - エラー：Errorをthrow
  - 完了：データを返す
- リソースの作成タイミングに注意してください（レンダリングのたびに作成されないように）
