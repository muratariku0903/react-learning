import { Suspense, useState } from "react";

// --- ダミーデータ ---
type Post = {
  id: number;
  title: string;
  body: string;
};

const DUMMY_POSTS: Post[] = [
  { id: 1, title: "Reactの基礎", body: "Reactはコンポーネントベースのライブラリです。" },
  { id: 2, title: "use フックとは", body: "React 19で導入された新しいAPIです。" },
  { id: 3, title: "Suspenseの活用", body: "非同期処理のローディング状態を宣言的に扱えます。" },
];

// データ取得関数（1.5秒の遅延）
function fetchPosts(): Promise<Post[]> {
  console.log("fetchPosts が呼ばれました"); // ← この出力回数に注目
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_POSTS), 1500);
  });
}

/**
 * ❌ アンチパターン：レンダーのたびに新しいPromiseを生成している
 *
 * このコンポーネントには問題があります。
 * ブラウザのコンソールを確認して、何が起きているか把握してください。
 * その後、正しいパターンに修正してください。
 */
function PostList() {
  // 問題: レンダーのたびに fetchPosts() が呼ばれ、新しいPromiseが生成される
  const posts: Post[] = []; // TODO: use を使って正しくデータを取得する

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [showPosts, setShowPosts] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>投稿一覧</h2>
      <button onClick={() => setShowPosts(!showPosts)}>
        {showPosts ? "非表示にする" : "投稿を表示する"}
      </button>

      {showPosts && (
        // TODO: Suspenseの配置を見直す必要があるかもしれません
        <PostList />
      )}
    </div>
  );
}
