// Context基本演習 - スターターコード

import { UserProvider, useUser } from "./UserContext";

// --- Layout コンポーネント ---
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px" }}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

// --- Header コンポーネント ---
function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid #eee",
        paddingBottom: "8px",
        marginBottom: "16px",
      }}
    >
      <h1>My App</h1>
      <UserMenu />
    </header>
  );
}

// --- UserMenu コンポーネント ---
function UserMenu() {
  const user = useUser();

  return (
    <div style={{ textAlign: "right" }}>
      <span>👤 {user.name}</span>
      <span style={{ marginLeft: "8px", color: "#666" }}>({user.role})</span>
    </div>
  );
}

// --- App コンポーネント ---
export default function App() {
  return (
    <UserProvider>
      <Layout>
        <p>メインコンテンツがここに表示されます。</p>
      </Layout>
    </UserProvider>
  );
}
