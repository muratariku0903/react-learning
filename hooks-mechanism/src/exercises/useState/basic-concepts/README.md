# useState 基本概念

## 目的

この演習では、**なぜuseStateが必要なのか**を根本から理解します。
関数コンポーネントにおけるローカル変数の問題点と、useStateがそれをどう解決するかを学びます。

---

## 言語化演習

以下の質問に `answer.md` で回答してください。

### 質問1

以下のコードで「+1」ボタンをクリックしても画面の数字が変わりません。**2つの理由**を説明してください。

```tsx
function Counter() {
  let count = 0;

  function handleClick() {
    count = count + 1;
    console.log(count); // ← これは増えているのに...
  }

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}
```

### 質問2

useStateの戻り値 `[state, setState]` において、`setState` を呼ぶと何が起きますか？
「値を更新する」だけでなく、その後Reactがどう動くかも含めて説明してください。

### 質問3

以下のコードで、`state` 変数がコンポーネント関数の**外側**に置かれている理由を説明してください。

```tsx
let state; // ← なぜ外？

function useState(initialValue) {
  if (state === undefined) {
    state = initialValue;
  }

  function setState(newValue) {
    state = newValue;
    render();
  }

  return [state, setState];
}
```

---

## 実装演習

`App.tsx` には、ローカル変数を使った**動かないカウンター**が実装されています。

### 要件

1. `design.md` に、どう修正すればカウンターが正しく動くか設計を書いてください
2. 設計に基づいて `App.tsx` を修正し、カウンターが正しく動くようにしてください

### 制約

- ReactのuseStateを使用すること
- 既存のUI構造（ボタンと表示部分）は変更しないこと

---

## ヒント

<details>
<summary>ヒント1（言語化演習）</summary>

関数コンポーネントは**いつ**再実行されますか？そのとき、関数内のローカル変数はどうなりますか？

</details>

<details>
<summary>ヒント2（実装演習）</summary>

useStateは何を返しますか？その返り値をどう使いますか？

</details>
