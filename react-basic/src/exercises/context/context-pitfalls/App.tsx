// Contextの落とし穴を体感する演習
// このコードにはパフォーマンス上の問題があります

import { createContext, useContext, useState, type ReactNode } from "react";

type UserState = {
  user: { name: string; role: string };
};
type CounterState = {
  count: number;
  increment: () => void;
};

const UserContext = createContext<UserState | null>(null);
const CounterContext = createContext<CounterState | null>(null);

function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
}
function useCounterContext() {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounterContext must be used within CounterProvider");
  }
  return context;
}

function UserProvider({ children }: { children: ReactNode }) {
  const user = { name: "田中太郎", role: "管理者" };

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
}
function CounterProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);

  return (
    <CounterContext.Provider value={{ count, increment }}>
      {children}
    </CounterContext.Provider>
  );
}

// --- UserInfo コンポーネント ---
// userだけを使っている
function UserInfo() {
  const { user } = useUserContext();
  console.log("UserInfo rendered"); // 再レンダリング確認用

  return (
    <div style={{ padding: "8px", border: "1px solid blue", marginBottom: "16px" }}>
      <h3>ユーザー情報</h3>
      <p>名前: {user.name}</p>
      <p>役割: {user.role}</p>
    </div>
  );
}

// --- Counter コンポーネント ---
// countとincrementを使っている
function Counter() {
  const { count, increment } = useCounterContext();
  console.log("Counter rendered"); // 再レンダリング確認用

  return (
    <div style={{ padding: "8px", border: "1px solid green" }}>
      <h3>カウンター</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

// --- App コンポーネント ---
export default function App() {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Contextの落とし穴</h1>
      <p>開発者ツールのConsoleを開いて、+1ボタンをクリックしてみてください。</p>
      <UserProvider>
        <UserInfo />
      </UserProvider>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </div>
  );
}
