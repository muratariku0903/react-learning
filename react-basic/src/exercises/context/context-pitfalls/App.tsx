// Contextの落とし穴を体感する演習
// このコードにはパフォーマンス上の問題があります

import { createContext, useContext, useState, ReactNode } from 'react'

// --- 全部入りのContext（これが問題） ---
type AppState = {
  user: { name: string; role: string }
  count: number
  increment: () => void
}

const AppContext = createContext<AppState | null>(null)

function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

function AppProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0)
  const user = { name: '田中太郎', role: '管理者' }

  const increment = () => setCount((c) => c + 1)

  return (
    <AppContext.Provider value={{ user, count, increment }}>
      {children}
    </AppContext.Provider>
  )
}

// --- UserInfo コンポーネント ---
// userだけを使っている
function UserInfo() {
  const { user } = useAppContext()
  console.log('UserInfo rendered') // 再レンダリング確認用

  return (
    <div style={{ padding: '8px', border: '1px solid blue', marginBottom: '16px' }}>
      <h3>ユーザー情報</h3>
      <p>名前: {user.name}</p>
      <p>役割: {user.role}</p>
    </div>
  )
}

// --- Counter コンポーネント ---
// countとincrementを使っている
function Counter() {
  const { count, increment } = useAppContext()
  console.log('Counter rendered') // 再レンダリング確認用

  return (
    <div style={{ padding: '8px', border: '1px solid green' }}>
      <h3>カウンター</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  )
}

// --- App コンポーネント ---
export default function App() {
  return (
    <AppProvider>
      <div style={{ padding: '16px' }}>
        <h1>Contextの落とし穴</h1>
        <p>開発者ツールのConsoleを開いて、+1ボタンをクリックしてみてください。</p>
        <UserInfo />
        <Counter />
      </div>
    </AppProvider>
  )
}
