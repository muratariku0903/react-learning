# Contextの基本的な使い方

## 目的

Contextの「3点セット」（createContext / Provider / useContext）を理解し、実際に使えるようになる。

---

## 言語化演習

### 質問1
Contextの「3点セット」について、それぞれの役割を自分の言葉で説明してください。

- `createContext`
- `Provider`
- `useContext`

### 質問2
ロードマップには「Contextはグローバル変数ではない」と書かれています。では、Contextはグローバル変数と何が違うのでしょうか？「Providerを境界としたスコープ付きの共有状態」という表現の意味を、具体例を交えて説明してください。

### 質問3
以下のコードで、`useContext(UserContext)`が`null`を返すケースはどんな場合ですか？

```tsx
const UserContext = createContext<User | null>(null)

function UserMenu() {
  const user = useContext(UserContext)
  // userがnullになるのはどんな時？
}
```

---

## 実装演習

### 課題

前の演習（props-drilling）で見たprops drilling問題を、Contextを使って解決してください。

#### 要件

1. `UserContext.tsx`を作成し、以下を実装する：
   - `UserContext`の作成
   - `UserProvider`コンポーネント（stateとProviderをまとめる）
   - `useUser`カスタムフック（useContextをラップしたもの）

2. `App.tsx`を修正し、UserProviderでラップする

3. 各コンポーネント（Layout, Header）からuserのpropsを削除し、UserMenuではuseUserを使って取得する

#### 制約

- Contextの値がnullの場合のエラーハンドリングを実装すること
- `useUser`フック内でnullチェックを行い、Providerの外で使われた場合はエラーをthrowすること

---

## ヒント

- カスタムフック `useUser` を作ると、利用側でnullチェックを毎回書かなくて済みます
- `UserProvider`の中で`useState`を使い、ユーザー情報を管理します
