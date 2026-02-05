# useState 配列とインデックス

## 目的

この演習では、**useStateが「呼び出し順」で状態を管理している仕組み**を理解します。
なぜ「Hooksはトップレベルで呼ぶ」というルールがあるのか、その必然性を学びます。

---

## 言語化演習

以下の質問に `answer.md` で回答してください。

### 質問1

以下のコードで、`hooks` 配列の中身はどうなっていますか？

```tsx
function MyComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("太郎");
  const [isOpen, setIsOpen] = useState(false);

  // ...
}
```

`hooks = [?, ?, ?]` の形式で答えてください。

### 質問2

以下のコードには重大な問題があります。何が問題で、どんなバグが発生しますか？

```tsx
function MyComponent({ showCount }) {
  if (showCount) {
    const [count, setCount] = useState(0);
  }
  const [name, setName] = useState("太郎");

  // ...
}
```

`showCount` が `true` → `false` に変わったとき、何が起きるか具体的に説明してください。

### 質問3

「Hooksはトップレベルで、同じ順番で呼べ」というルールは、useStateの**どんな実装上の特徴**から来ていますか？

---

## 実装演習

`App.tsx` には、条件分岐の中でuseStateを呼んでいる**バグのあるコード**が実装されています。

### 要件

1. `design.md` に、このコードの問題点と修正方針を書いてください
2. 設計に基づいて `App.tsx` を修正し、バグを解消してください

### 制約

- 機能（カウント表示のON/OFF切り替え、カウントアップ）は維持すること
- useStateの呼び出しはすべてトップレベルで行うこと

---

## ヒント

<details>
<summary>ヒント1（言語化演習）</summary>

useStateは内部的に「何番目の呼び出しか」を追跡しています。条件分岐があると、その番号がどうなりますか？

</details>

<details>
<summary>ヒント2（実装演習）</summary>

「表示するかどうか」と「値を保持するかどうか」は別の問題です。

</details>
