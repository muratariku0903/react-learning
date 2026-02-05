useState を「根本」から見ると、やっていることはかなりシンプルで、

- **(1) 関数コンポーネントの外側に値を保持する**
- **(2) 値が変わったら“もう一回そのコンポーネント関数を実行してね”とReactに依頼する**
- **(3) どの useState がどの値と対応するかは“呼び出し順”で決める**

この3つに集約される。

---

## 1) そもそも何が問題で、useState が何を解決するのか

関数コンポーネントは **レンダリングのたびに“関数が先頭から再実行”** される。だから、コンポーネント内の `let count = 0` は毎回 0 に戻る。

さらに、`count = count + 1` とローカル変数を変えても、Reactはそれを見ていないので **「再レンダリングしよう」とはならない**。これが「関数コンポーネントの問題点」。

つまり、解決したいのはこの2点：

1. **再レンダリングをトリガーする仕組み**
2. **再レンダリング後も値が保持される仕組み**

```jsx
function Counter() {
  let count = 0

  function increment() {
    count++
    console.log(count)
  }

  return { increment }
}

const c = Counter()
c.increment() // 1
c.increment() // 2
```

一見動きますが、**Reactではこうはいかない**。

Reactでは `Counter()` は **再レンダリングのたびに再実行**されるので

```jsx
Counter() // ← 再実行されるたびに count = 0
```

つまり

- ローカル変数は保持できない
- 変更しても再レンダリングされない

---

## 2) 最小の発想：状態を“外側”に逃がす + setStateで再実行させる

記事の「状態を外側に保存する」アイデアはこう：

- `state` をコンポーネント関数の外に置く
- `setState` で `state` を更新したら、`render()` を呼んでコンポーネントを再実行する

このとき重要なのが **クロージャ** で、`setState` が「外側にある `state`」を覚えたまま使える点。

React公式も、`useState` は「state（現在値）と setter（更新して再レンダリングを起こす関数）を返す」と説明している。

```jsx
let state

function useState(initialValue) {
  if (state === undefined) {
    state = initialValue
  }

  function setState(newValue) {
    state = newValue
    render() // 再レンダリングを依頼
  }

  return [state, setState]
}

function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  return { increment }
}
```

ここで重要なのは：

- `state` は **コンポーネント関数の外**
- `setState` は **state を更新して render を呼ぶ**

👉 **これが useState の本質（最小形）**

---

## 3) でもこれだと useState を複数回呼べない → 配列 + インデックス

`state` が1個だと、`useState` を2回呼んだ瞬間に破綻します（同じ `state` を共有してしまう）。そこで記事は次の発想に進みます：

- 状態を `hooks` 配列で持つ
- 「今どの useState を処理してるか」を `currentIndex` で管理する
- レンダーの開始時に `currentIndex = 0` に戻す

この構造がそのまま **「Hooksは呼び出し順が大事」** の理由になる。呼び出し順が変わると、`index` がズレて「別の state を読んでしまう」。

だから公式も「Hookはトップレベルで呼んで、条件分岐やループ内で呼ばない」と言っている。

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState("hello")
}
```

上の実装だと `state` が1個しかないので破綻。

### 解決策：配列で管理する

```jsx
let hooks = []
let currentIndex = 0

function useState(initialValue) {
  const index = currentIndex

  if (hooks[index] === undefined) {
    hooks[index] = initialValue
  }

  function setState(newValue) {
    hooks[index] = newValue
    render()
  }

  currentIndex++
  return [hooks[index], setState]
}
```

```jsx
function render() {
  currentIndex = 0
  Counter()
}
```

---

## 4) React本体ではどうやってる？（“配列”のイメージは正しい）

記事は教育用に配列で説明しますが、考え方はReact内部と合っている（実装詳細はもっと複雑）。「実際のReactとの違い」として、バッチ処理・優先度・Fiberなどが挙げられる。

内部のイメージだけ掴むなら：

- Reactは「いまレンダリング中のコンポーネント」を把握していて（Fiberノード）
- そのコンポーネントに紐づく「Hookの並び」を持つ
- `useState()` が呼ばれるたびに、その並びの**次**を参照する（＝呼び出し順に依存）

という形。呼び出し順に依存する設計思想は Dan Abramov の解説でも語られている。

```jsx
function Counter() {
  const [count, setCount] = useState(0)   // hooks[0]
  const [text, setText] = useState("hi")  // hooks[1]
}
```

hooks 配列の中身：

```jsx
hooks = [0, "hi"]
```

```jsx
function Counter() {
  if (condition) {
    useState(0)
  }
  useState("hi")
}
```

レンダーごとに `condition` が変わると、

- hooks[0] が count になったり
- hooks[0] が text になったり

👉 **どの state がどの useState かわからなくなる**

だから React はルールを強制。

> Hook はトップレベルで、同じ順番で呼べ
> 

これは設計上の必然。

---

## 5) setState の「キュー」と「バッチ処理」：なぜ即時に変わらないのか

`setState` を呼んだ瞬間に、**そのレンダーの中の変数が書き換わるわけではない**。Reactは「更新要求」を溜めて、次のレンダーでまとめて処理する（これが state update のキュー／バッチングの感覚）。

公式では、同じイベント内の複数更新が「キューに積まれて次レンダーで順に評価される」こと、そして **前の値に基づく更新は updater 関数形式（`setCount(c => c + 1)`）が安全** なことを説明している。

React 18 以降は、自動バッチ処理がより広い範囲（timeout/promise/nativeイベント等）にも効くことが明記されている。

### setState が「即座に変わらない」理由をコードで見る

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
    setCount(count + 1)
  }
}
```

このとき React がやっているイメージ：

```jsx
queue.push(() => count +1)
queue.push(() => count +1)
```

次のレンダーでまとめて処理：

```jsx
let nextState = count
for (const update of queue) {
  nextState = update(nextState)
}
```

だから安全なのがこれ：

```jsx
setCount(c => c + 1)
setCount(c => c + 1)
```

👉 **state は「値」ではなく「更新要求のキュー」**

---

## 6) 重要な“落とし穴”と、それが必然な理由

### A. state を直接代入してもUIが変わらない

`count = count + 1` みたいな書き換えは React に通知されないのでダメ、というのは公式でもはっきり書かれている（setterを使え）。

### B. render中に setState すると無限ループになりがち

レンダー中の setState は「レンダー→更新→レンダー→…」を作りやすいので、公式Lintでも禁止されている。

### C. 初期値に関数を渡すと「遅延初期化」になる

`useState(() => expensiveInit())` は「初回だけ計算して保存」するための仕様です（以降のレンダーでは initialState は無視される）。

### 初期値が「初回だけ」使われる理由

```jsx
useState(expensiveInit())
```

だと毎回実行される可能性がある。

Reactの実装イメージ：

```jsx
if (hooks[index] === undefined) {
  hooks[index] = initialValue
}
```

だから公式はこう書かせる：

```jsx
useState(() =>expensiveInit())
```

初回レンダー時だけ実行される。

---

## まとめ：useStateを一言でいうと

- **「レンダーごとに消えるローカル変数の代わりに、コンポーネント外側（React管理下）に値を保存し、setterで更新要求をキューに積んで再レンダーさせる仕組み」**。

そして「どの state がどの useState に対応するか」は、記事の配列+インデックスの通り **呼び出し順**で決まる。
