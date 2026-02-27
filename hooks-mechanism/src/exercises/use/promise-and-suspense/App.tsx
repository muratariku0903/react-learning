import { Suspense, use } from "react";

// --- ダミーデータ ---
type User = {
  id: number;
  name: string;
  email: string;
};

const DUMMY_USERS: User[] = [
  { id: 1, name: "田中太郎", email: "tanaka@example.com" },
  { id: 2, name: "佐藤花子", email: "sato@example.com" },
  { id: 3, name: "鈴木一郎", email: "suzuki@example.com" },
];

// 1秒かかるダミーのデータ取得関数
function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_USERS), 1000);
  });
}

// --- ここでPromiseを作成（モジュールスコープ） ---
const usersPromise = fetchUsers();

// --- TODO: use フックを使ってユーザー一覧を表示するコンポーネントを実装 ---
function UserList() {
  const users = use(usersPromise);

  return (
    <div>
      <p>ここにユーザー一覧を表示してください</p>
      <ul>
        {users.map((e) => (
          <li key={e.id}>
            {e.name} {e.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>ユーザー一覧</h2>
      <Suspense fallback={<div>loading...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
}
