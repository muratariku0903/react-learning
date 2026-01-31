import { Suspense } from "react";
import { wrapPromise } from "./components/wrapPromise";

// TODO: ErrorBoundary を追加して、エラー発生時の処理を実装してください

type User = {
  id: number;
  name: string;
  email: string;
};

// この値を true に変更すると、データ取得が失敗するようになります
const shouldFail = false;

function fetchUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("データの取得に失敗しました"));
      } else {
        resolve({
          id: 1,
          name: "田中太郎",
          email: "tanaka@example.com",
        });
      }
    }, 1000);
  });
}

// リソースを作成（コンポーネントの外で1回だけ実行）
const userResource = wrapPromise(fetchUser());

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
      <h1>ErrorBoundaryとSuspense</h1>
      <p>エラー処理を追加してください（shouldFail を true にしてテスト）</p>

      {/* TODO: ErrorBoundary でラップしてください */}
      <Suspense fallback={<div>読み込み中...</div>}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
