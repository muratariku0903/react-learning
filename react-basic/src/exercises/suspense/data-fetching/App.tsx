import { Suspense } from "react";
import { wrapPromise } from "./components/wrapPromise";

// 従来のパターン: useEffect + useState でデータ取得
// TODO: これを Suspense 対応のパターンに書き換えてください

type User = {
  id: number;
  name: string;
  email: string;
};

// ダミーのfetch関数（1秒後にユーザーデータを返す）
function fetchUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "田中太郎",
        email: "tanaka@example.com",
      });
    }, 2000);
  });
}

const userResource = wrapPromise(fetchUser());

// 従来パターンのUserProfileコンポーネント
function UserProfile() {
  const user = userResource.read();

  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>データ取得とSuspense</h1>
      <p>下のコンポーネントをSuspense対応に書き換えてください</p>

      <Suspense fallback={<div>読み込み中...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
