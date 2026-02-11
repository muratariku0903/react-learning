> **useMemo と useCallback は useEffect と同じ依存配列比較ロジックで動いている**
> 
> 
> 違うのは「副作用を登録するか」「値をキャッシュするか」だけ
> 

---

# 1. まず前提：なぜ必要なのか？

Reactは **レンダーのたびに関数を再実行**します。

```jsx
function Component() {
  const value = { a: 1 }
  const fn = () => console.log("hello")
}

```

レンダーごとに：

- `{ a: 1 }` は毎回新しいオブジェクト
- `() => {}` も毎回新しい関数

つまり：

```jsx
prevValue === nextValue // false
```

👉 **参照が毎回変わる**

これが問題になるのは：

- `React.memo`
- useEffect の依存配列
- 子コンポーネントの props 比較

---

# 2. useMemo の本質

まず最小実装。

```jsx
let hooks = []
let currentIndex = 0

function useMemo(factory, deps) {
  const index = currentIndex
  const prev = hooks[index]

  if (prev) {
    const [prevValue, prevDeps] = prev
    const hasChanged = deps.some((dep, i) => dep !== prevDeps[i])

    if (!hasChanged) {
      currentIndex++
      return prevValue
    }
  }

  const newValue = factory()
  hooks[index] = [newValue, deps]
  currentIndex++
  return newValue
}

```

👉 やっていること：

1. 前回の deps と比較
2. 変わってなければ前回の値を返す
3. 変わっていれば再計算して保存

---

## 使い方

```jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(count)
}, [count])
```

- count が変わらない限り
- heavyCalculation は再実行されない

---

# 3. useCallback の本質

実はこれ：

```jsx
useCallback(fn, deps)
```

は内部的にこう書ける：

```jsx
useMemo(() => fn, deps)
```

つまり

> useCallback は「関数を返す useMemo」
> 

---

## 最小実装

```jsx
function useCallback(callback, deps) {
  return useMemo(() => callback, deps)
}
```

以上。

---

# 4. では、なぜ必要なのか？

### ケース1：React.memo

```jsx
const Child = React.memo(({ onClick }) => {
  console.log("child render")
  return <button onClick={onClick}>Click</button>
})
```

```jsx
function Parent() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    console.log("clicked")
  }

  return <Child onClick={handleClick} />
}
```

毎回：

- handleClick は新しい関数
- Child の props が変わる
- Child 再レンダー

これを防ぐ：

```jsx
const handleClick = useCallback(() => {
  console.log("clicked")
}, [])
```

👉 同じ関数参照を維持

---

# 5. 依存配列ロジックは全部同じ

実はこの3つは同じ比較構造を持っている：

| Hook | やること |
| --- | --- |
| useEffect | 副作用を実行 |
| useMemo | 値をキャッシュ |
| useCallback | 関数をキャッシュ |

内部的には：

```jsx
if (depsChanged) {
  // effectなら実行
  // memoなら再計算
  // callbackなら新しい関数保存
}
```

**違いは「何を保存しているか」だけ。**

---

# 6. なぜ「最適化用」と言われるのか？

重要な理解：

Reactは基本的に

> 再レンダーしても正しく動く
> 

設計になっている。

つまり useMemo / useCallback は

- 正しさのためではない
- パフォーマンス最適化のため

---

# 7. よくある誤解

### ❌「とりあえず全部 useCallback つける」

逆効果。

理由：

- Hook自体も比較コストがある
- 可読性が落ちる
- 本当に必要な場所は限られる

---

# 8. 本質的理解

useState / useEffect / useMemo / useCallback を

構造で整理するとこうなります：

```
render
  ├─ useState     → 値を保存
  ├─ useEffect    → 後で実行する処理を保存
  ├─ useMemo      → 値をキャッシュ
  └─ useCallback  → 関数をキャッシュ
```

全部：

- hooks配列
- currentIndex
- deps比較

で動いている。

---

# 9. 一文でまとめると

**useMemo / useCallback とは：**

> レンダーごとに新しく生成される値や関数を、
> 
> 
> 依存配列が変わらない限り「同じ参照として維持する」仕組み
> 

[useMemo](https://www.notion.so/useMemo-2a584cd819dc80bea1a1c2773b95872e?pvs=21)
