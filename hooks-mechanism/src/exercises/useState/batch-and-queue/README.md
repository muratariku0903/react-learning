# useState バッチ処理とキュー

## 目的

この演習では、**setStateが即座に値を変えない仕組み**を理解します。
更新がキューに積まれてバッチ処理される仕組みと、安全な更新方法を学びます。

---

## 言語化演習

以下の質問に `answer.md` で回答してください。

### 質問1

以下のコードで、ボタンをクリックしたとき `count` はいくつになりますか？理由も説明してください。

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return <button onClick={handleClick}>+3?</button>;
}
```

### 質問2

質問1のコードを修正して、クリックで本当に `+3` されるようにするにはどう書きますか？
コードと、なぜそれで正しく動くかの理由を書いてください。

### 質問3

以下のコードで `console.log` に出力される値は何ですか？なぜその値になりますか？

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // ← ここで出力される値は？
  }

  return <button onClick={handleClick}>+1</button>;
}
```

---

## 実装演習

`App.tsx` には、「いいね」ボタンを連打すると期待通りにカウントが増えない問題があります。

### 要件

1. `design.md` に、なぜ連打すると正しく増えないか原因を書いてください
2. 設計に基づいて `App.tsx` を修正し、連打しても正しくカウントが増えるようにしてください

### 制約

- 状態の更新方法のみを修正すること（UIは変更しない）
- 関数形式のstate更新（updater function）を使用すること

---

## ヒント

<details>
<summary>ヒント1（言語化演習）</summary>

`setCount(count + 1)` の `count` は、いつ時点の値ですか？

</details>

<details>
<summary>ヒント2（実装演習）</summary>

`setCount(c => c + 1)` と `setCount(count + 1)` は何が違いますか？

</details>
