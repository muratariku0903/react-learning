// Props Drilling 問題を体感する演習

type User = {
  name: string
  role: string
}

// --- Layout コンポーネント ---
function Layout({ user, children }: { user: User; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px' }}>
      <Header user={user} />
      <main>{children}</main>
    </div>
  )
}

// --- Header コンポーネント ---
function Header({ user }: { user: User }) {
  return (
    <header style={{ borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '16px' }}>
      <h1>My App</h1>
      <UserMenu user={user} />
    </header>
  )
}

// --- UserMenu コンポーネント ---
function UserMenu({ user }: { user: User }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <span>👤 {user.name}</span>
      <span style={{ marginLeft: '8px', color: '#666' }}>({user.role})</span>
    </div>
  )
}

// --- App コンポーネント ---
export default function App() {
  const user: User = {
    name: '田中太郎',
    role: '管理者',
  }

  return (
    <Layout user={user}>
      <p>メインコンテンツがここに表示されます。</p>
    </Layout>
  )
}
