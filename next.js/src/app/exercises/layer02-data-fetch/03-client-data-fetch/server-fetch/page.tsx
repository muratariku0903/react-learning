// 比較用ベースライン: Server Component での fetch()
// このファイルは実装済み。他のパターンと表示結果やUXを比較してください。

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function ServerFetchPage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    { cache: "no-store" }
  );
  const posts: Post[] = await res.json();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Server Component の fetch()</h1>
      <p className="text-zinc-500 mb-4">
        サーバー側でデータを取得し、HTMLとして送信
      </p>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-3">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-zinc-600 mt-1">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
