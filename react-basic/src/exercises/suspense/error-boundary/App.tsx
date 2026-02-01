import { Suspense, useMemo, useState } from "react";
import { wrapPromise } from "./components/wrapPromise";
import { ErrorBoundary } from "./components/ErrorBoundary";

type User = {
  id: number;
  name: string;
  email: string;
};

type SuspenseResource<T> = {
  read: () => T;
};

// この値を true に変更すると、データ取得が失敗するようになります
const shouldFail = true;

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

function UserProfile({ userResource }: { userResource: SuspenseResource<User> }) {
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
  const [resourceVersion, setResourceVersion] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const userResource = useMemo(() => wrapPromise(fetchUser()), [resourceVersion]);

  return (
    <div>
      <h1>ErrorBoundaryとSuspense</h1>
      <p>エラー処理を追加してください（shouldFail を true にしてテスト）</p>

      <ErrorBoundary
        fallback={({ reset }) => (
          <div>
            <p>エラーが発生しました</p>
            <button
              onClick={() => {
                setResourceVersion((v) => v + 1);
                reset();
              }}
            >
              リトライ
            </button>
          </div>
        )}
      >
        <Suspense fallback={<div>読み込み中...</div>}>
          <UserProfile userResource={userResource} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
