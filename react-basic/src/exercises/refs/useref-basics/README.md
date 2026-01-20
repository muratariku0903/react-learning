# useRefの基本

## 目的

この演習では、`useRef`の基本的な使い方を理解し、DOM要素への参照と再レンダリングを伴わない値の保持について学びます。

---

## 要件

### 言語化演習（answer.mdに回答）

以下の問いに答えてください。

#### 問1: useRefが返すオブジェクトの構造

`useRef(initialValue)`を呼び出すと、どのようなオブジェクトが返されますか？そのオブジェクトの特性について説明してください。

#### 問2: なぜDOM操作にuseRefを使うのか

`document.getElementById`などの従来のDOM操作ではなく、ReactでuseRefを使う理由を説明してください。

#### 問3: useRefの「再レンダリングされない」特性

以下のコードを見て、ボタンをクリックしたときに画面に表示される数値がどうなるか予想し、その理由を説明してください。

```tsx
function Counter() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };

  return (
    <div>
      <p>Count: {countRef.current}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}
```

---

### 実装演習（design.mdに設計を書いてから実装）

#### 課題: ストップウォッチコンポーネントの実装

以下の仕様を満たすストップウォッチコンポーネントを実装してください。

**機能要件:**

1. 「スタート」ボタンをクリックすると、タイマーが開始される
2. 「ストップ」ボタンをクリックすると、タイマーが停止する
3. 「リセット」ボタンをクリックすると、タイマーが0にリセットされる
4. 経過時間は画面に表示される（秒単位でOK）

**技術要件:**

- `setInterval`のIDを保持するために`useRef`を使用すること
- 経過時間の表示には`useState`を使用すること
- コンポーネントがアンマウントされる際にタイマーをクリーンアップすること

**ヒント:**

- タイマーIDを`useState`で保持すると何が問題になるか考えてみてください
- `useEffect`のクリーンアップ関数でタイマーを停止しましょう

---

## 制約条件

- サードパーティのタイマーライブラリは使用しないこと
- `document.getElementById`などの直接DOM操作は使用しないこと

---

## ファイル構成

```
useref-basics/
├── README.md      ← この課題文
├── answer.md      ← 言語化演習の回答
├── design.md      ← 実装演習の設計メモ
├── notes.md       ← 学びログ
├── App.tsx        ← エントリーポイント
└── components/
    └── Stopwatch.tsx  ← ストップウォッチ実装
```
