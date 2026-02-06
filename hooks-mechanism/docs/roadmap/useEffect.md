## 1. そもそも useEffect は「何を解決するためのものか」

まず前提。

**関数コンポーネントのレンダーは「純粋な計算」であるべき**

という思想がある。

```jsx
function Component() {
  return <div>Hello</div>
}
```

- 同じ props / state → 同じ JSX
- レンダー中に「外部に影響を与える処理」をしてはいけない

でも現実には、こんな処理が必要です：

- API通信
- DOM操作
- setInterval / addEventListener
- ログ送信

👉 これらは **「レンダーの結果として発生する副作用（side effect）」**

- **useEffect はこの「副作用を、レンダーの外で実行するための仕組み」**。

---

## 2. なぜ「レンダー中」に副作用をやってはいけないのか

例えば：

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  document.title = count // ← レンダー中の副作用

  return <button onClick={() => setCount(count + 1)}>+</button>
}
```

一見動きますが、React的には **アウト**。

理由はシンプルで：

- **レンダーは「何度でも」「途中で」「やり直される」可能性がある**
- StrictMode では **同じレンダーが2回呼ばれる**
- 並列レンダリングでは **途中で破棄される**

👉 レンダー中に副作用があると

**「何回実行されたのか保証できない」**

だから React はこう分離：

| フェーズ | 役割 |
| --- | --- |
| render | JSXを計算する（純粋） |
| commit | DOM反映後に副作用を実行 |

**useEffect は commit フェーズに登録される処理**。

---

## 3. useEffect を最小実装で考える

useState と同じく「自作して理解」。

### 最小の発想

- effect を「あとで実行する関数」として保存
- レンダー完了後にまとめて実行

```jsx
let effects = []

function useEffect(effect) {
  effects.push(effect)
}
```

```jsx
function render() {
  Component()

  // DOM更新後
  effects.forEach(fn => fn())
}
```

```jsx
function Component() {
  useEffect(() => {
    console.log("mounted")
  })

  return <div />
}
```

👉 **useEffect =「あとで実行する処理を登録するだけ」**

---

## 4. でもこれだと毎回実行される → 依存配列の登場

問題点：

```jsx
useEffect(() => {
  console.log("effect")
})
```

これは **毎レンダー後に実行**される。

そこで React が導入したのが **依存配列**。

---

## 5. 依存配列をコードで再現する

```jsx
let hooks = []
let currentIndex = 0

function useEffect(effect, deps) {
  const index = currentIndex
  const prevDeps = hooks[index]

  let hasChanged = true

  if (prevDeps) {
    hasChanged = deps.some((dep, i) => dep !== prevDeps[i])
  }

  if (hasChanged) {
    effects.push(effect)
    hooks[index] = deps
  }

  currentIndex++
}
```

### 実行イメージ

```jsx
useEffect(() => {
  console.log(count)
}, [count])
```

- 前回の deps と比較
- **どれか1つでも違えば effect 登録**
- 同じならスキップ

👉 **依存配列 =「再実行条件」**

---

## 6. なぜ依存配列を書き忘れると危険なのか

```jsx
useEffect(() => {
  setCount(count + 1)
})
```

依存配列なし = 毎回実行。

```
render
↓
effect → setState
↓
render
↓
effect → setState...
```

👉 **無限ループ**

だから ESLint がこう怒る：

> React Hook useEffect has missing dependencies
> 

これは「親切なお節介」ではなく

**仕組み上の地雷を防いでいる**。

---

## 7. cleanup がある理由（超重要）

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick")
  }, 1000)

  return () => {
    clearInterval(id)
  }
}, [])
```

これを仕組みで見ると：

```jsx
if (depsChanged) {
  if (prevCleanup) prevCleanup()
  cleanup = effect()
}
```

つまり：

- 次の effect 実行前
- コンポーネント破棄時

に **必ず cleanup が呼ばれる**

👉 **useEffect = ライフサイクルではなく「同期管理」**

---

## 8. [] が「componentDidMount」になる理由

```jsx
useEffect(() => {
  console.log("once")
}, [])
```

- 初回：prevDeps がない → 実行
- 次回以降：[] === [] → 変化なし → 実行されない

👉 「結果として」 mount 時1回になるだけ

**ライフサイクルを真似しているわけではない**

ここ、かなり重要。

---

## 9. useState / useEffect を対で理解する

| Hook | 本質 |
| --- | --- |
| useState | 次のレンダーで使う値を保存 |
| useEffect | 次の commit フェーズでやる処理を予約 |

```
render（計算）
  ├─ useState → 値を読む
  └─ useEffect → 処理を登録
commit（反映）
  └─ effect 実行
```

---

## 10. 一文でまとめると

**useEffect とは：**

> レンダーという「純粋な計算」の外で、
> 
> 
> state / props の変化に同期して
> 
> 副作用を安全に実行するための仕組み
>
