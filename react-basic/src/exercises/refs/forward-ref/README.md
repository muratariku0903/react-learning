# forwardRef - 親から子のDOMを操作する

## 目的

この演習では、`forwardRef`を使って親コンポーネントから子コンポーネント内のDOM要素にアクセスする方法を理解します。なぜこの仕組みが必要なのか、どのような場面で使うべきかを学びます。

---

## 要件

### 言語化演習（answer.mdに回答）

以下の問いに答えてください。

#### 問1: なぜforwardRefが必要なのか

以下のコードを見てください。親コンポーネントから`CustomInput`内の`<input>`要素にフォーカスしようとしていますが、うまくいきません。なぜ動作しないのか説明してください。

```tsx
// 子コンポーネント
function CustomInput(props) {
  return <input type="text" className="custom-input" {...props} />;
}

// 親コンポーネント
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus(); // 動作しない
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>フォーカス</button>
    </div>
  );
}
```

#### 問2: forwardRefの役割

`forwardRef`を使うことで、上記の問題がどのように解決されるのか説明してください。`forwardRef`の第2引数として渡される`ref`は何を指しているのでしょうか？

#### 問3: forwardRefを使うべき場面

forwardRefは強力な機能ですが、むやみに使うべきではありません。forwardRefを使うことが適切な場面を2〜3つ挙げ、それぞれなぜ適切なのか説明してください。

---

### 実装演習（design.mdに設計を書いてから実装）

#### 課題: フォーカス可能なカスタム入力コンポーネントの実装

再利用可能な`TextInput`コンポーネントを作成してください。このコンポーネントは、親コンポーネントから内部の`<input>`要素を制御できる必要があります。

**機能要件:**

1. `TextInput`コンポーネントを作成する
   - ラベルと入力欄をセットで表示する
   - `label`プロパティでラベルのテキストを指定できる
   - 親から`ref`を渡せるようにする

2. `App.tsx`で以下の動作を実装する
   - 「ユーザー名にフォーカス」ボタンで、ユーザー名の入力欄にフォーカス
   - 「メールアドレスにフォーカス」ボタンで、メールアドレスの入力欄にフォーカス

**UIイメージ:**

```
ユーザー名: [          ]
メールアドレス: [          ]

[ユーザー名にフォーカス] [メールアドレスにフォーカス]
```

**技術要件:**

- `forwardRef`を使用して実装すること
- TypeScriptの型を適切に定義すること

---

## 制約条件

- `document.getElementById`などの直接DOM操作は使用しないこと
- `ref`を使わない回避策（親でstateを管理するなど）は使用しないこと

---

## ヒント

- `forwardRef`のTypeScript型定義は以下のようになります：

```tsx
const MyComponent = forwardRef<HTMLInputElement, Props>((props, ref) => {
  // ...
});
```

---

## ファイル構成

```
forward-ref/
├── README.md      ← この課題文
├── answer.md      ← 言語化演習の回答
├── design.md      ← 実装演習の設計メモ
├── notes.md       ← 学びログ
├── App.tsx        ← エントリーポイント（要実装）
└── components/
    └── TextInput.tsx  ← カスタム入力コンポーネント（要実装）
```
