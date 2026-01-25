## 1. なぜContextが必要なのか？

Reactでは基本的に **データは props で上から下へ渡す** というルールがある。

```
App
 └─ Layout
     └─ Header
         └─ UserMenu
```

例えば「ログインユーザー情報」を `App` から `UserMenu` に渡したい場合、

```tsx
<App user={user}>
	<Layoutuser={user}>
		<Headeruser={user}>
			<UserMenuuser={user} />
		</Header>
	</Layout>
</App>
```

😇 **HeaderやLayoutは user を使ってないのに渡してる…**

これがいわゆる **props drilling（プロップスドリリング）** 問題。

Contextは、これを解決する。

---

## 2. Contextの全体像（Provider / Consumer）

![image.png](attachment:2ee232dc-36a7-4dd5-be72-655ba91eb1b3:image.png)

Contextは大きく **3点セット** で理解するとラク。

### ① Contextを作る

```tsx
constUserContext =React.createContext<User |null>(null)
```

### ② Providerで値を流す（供給する）

```tsx
<UserContext.Provider value={user}>
	<App />
</UserContext.Provider>
```

### ③ Consumer（useContext）で受け取る

```tsx
const user =useContext(UserContext)
```

👉 Provider配下の **どのコンポーネントでも** user を直接取得可能。

---

## 3. 最小構成のサンプル

### Context定義

```tsx
// user-context.ts
import { createContext } from 'react'

exportconstUserContext = createContext<{name:string } |null>(null)
```

### Provider側

```tsx
import { UserContext } from './user-context'

exportfunctionApp() {
const user = { name : 'Taro' }

return (
	<UserContext.Providervalue={user}>
		<Layout />
	</UserContext.Provider>
  )
}
```

### 利用側

```tsx
import { useContext } from'react'
import { UserContext } from'./user-context'

exportfunctionUserMenu() {
const user = useContext(UserContext)

if (!user) return null
	return <div>Hello, {user.name}</div>
}
```

---

## 4. Contextの本質（仕組みの話）

ここが大事です 👇

- Contextは **グローバル変数ではない**
- **Providerを境界** とした「スコープ付きの共有状態」
- Reactの **レンダリングシステムに統合された依存関係**

つまり、

- Contextの値が変わる
- そのContextを **useContextしているコンポーネントだけ** が再レンダリングされる

という仕組み。

---

## 5. Contextが向いている用途

Contextは **「頻繁に変わらないが、多くの場所で使う値」** に向いてる。

### 代表例

- 認証情報（user / session）
- テーマ（dark / light）
- 言語設定（i18n）
- 設定フラグ（feature flag）
- フォームやUIの状態（限定的な範囲）

---

## 6. Contextの落とし穴（重要）

### ❌ 何でもContextに入れる

```
Context = グローバルState管理
```

は **アンチパターン** になりやすい。

### 理由

- Contextの値が変わると **購読している全コンポーネントが再レンダリング**
- 更新頻度が高いとパフォーマンス悪化
- ロジックが見えにくくなる

---

## 7. Context × State の典型パターン

よく使うのがこの形👇

```tsx
const CountContext = createContext<{
	count:number
	increment:() =>void
} | null >(null)

functionCountProvider({ children }: { children: React.ReactNode }) {
const [count, setCount] =useState(0)

const increment = () => setCount(c => c +1)

return (
<CountContext.Providervalue={{count,increment }}>
      {children}
</CountContext.Provider>
  )
}
```

👉 **状態 + 操作をまとめて公開**

👉 ローカルな状態管理を「共有可能」にする
