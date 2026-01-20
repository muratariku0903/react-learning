Reactの **Refs（レフ）** は、**レンダリングの流れとは独立して、DOMやコンポーネント内部の値へ直接アクセスするための仕組み**。

「基本は state / props で設計するが、どうしても“例外的に直接触りたい”とき」に使う。

---

## 1. Refsとは何か（役割）

Refsは次のような用途のために存在します。

- 実DOM要素への直接アクセス
- フォーカス・スクロール・サイズ取得などのUI操作
- 再レンダリングを伴わない値の保持

> 重要な前提
> 
> 
> Refsは「Reactの宣言的モデルから外れる“逃げ道”」
> 
> → 乱用するとReactらしさが崩れる
> 

---

## 2. なぜ state ではダメなのか

### stateの性質

- 更新されると **再レンダリング** が発生
- UIの表示内容を表すためのもの

### refsの性質

- 更新しても **再レンダリングされない**
- UIとは直接関係しない「参照・操作用」

```
state → UIを表現するための状態
ref   → UIの裏側を操作するための参照
```

---

## 3. useRef の基本

### DOM要素への参照

```tsx
import { useRef }from"react";

functionExample() {
const inputRef = useRef<HTMLInputElement>(null);

constfocusInput = () => {
    inputRef.current?.focus();
  };

return (
<>
<inputref={inputRef} />
<buttononClick={focusInput}>フォーカス</button>
</>
  );
}
```

### ポイント

- `useRef()` は `{ current: ... }` を返す
- `current` に **DOMノード** が入る
- 値が変わっても再レンダリングされない

---

## 4. Refsが必要になる典型例

### ① フォーカス制御

```tsx
inputRef.current?.focus();
```

### ② スクロール操作

```tsx
divRef.current?.scrollIntoView({behavior:"smooth" });
```

### ③ サイズ取得

```tsx
const height = divRef.current?.offsetHeight;
```

### ④ タイマーID・前回値の保持

```tsx
const timerId = useRef<number |null>(null);
```

---

## 5. Refsは「再レンダリングしない箱」

```tsx
const countRef =useRef(0);

countRef.current +=1;// UIは更新されない
```

これにより：

- 前回値の保存
- interval / timeout のID保持
- 外部ライブラリとの連携

が安全にできる。

---

## 6. state vs ref の使い分け

| 観点 | state | ref |
| --- | --- | --- |
| UIに影響 | する | しない |
| 更新時の再描画 | あり | なし |
| 宣言的 | ◎ | ✕ |
| 主用途 | 表示ロジック | DOM操作・内部保持 |

**判断基準**

> 「その値がUIに表示されるか？」
> 
> 
> YES → state
> 
> NO → ref
> 

---

## 7. forwardRef（親から子のDOMを触る）

```tsx
import { forwardRef }from"react";

constInput = forwardRef<HTMLInputElement>((props, ref) => {
return<inputref={ref} />;
});
```

```tsx
const ref = useRef<HTMLInputElement>(null);
<Inputref={ref} />
```

### 使いどころ

- コンポーネントをラップしつつDOM操作を許可したいとき
- UIライブラリの実装

---

## 8. よくあるアンチパターン ❌

### ❌ RefsでUI状態を管理

```tsx
// NG例
ref.current =true;// 表示ロジックに使用
```

### ❌ Refsを多用した命令的UI

```
React = 宣言的UI
Refs多用 = jQuery的思考
```

---

## 9. mental model（理解の核心）

- Reactは **state → render → DOM**
- Refsは **renderをバイパスしてDOMに触る**
- だから「最後の手段」

---

## 10. まとめ

- Refsは **DOMや内部値への直接参照**
- 再レンダリングを起こさない
- UI状態は state、操作・参照は ref
- 必要最小限で使うのがReact流
