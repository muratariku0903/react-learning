// SSG（Static Site Generation）

// export const revalidate = 60;

export const dynamic = "force-static";
interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function SSGPage() {
  const posts = (
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache", // 例: ビルド時取得を安定させる
    }).then((r) => r.json())
  ).slice(0, 10) as Post[];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">SSG - Static Site Generation</h1>
      <p className="text-zinc-500 mb-6">ビルド時にデータを取得してHTMLを生成する</p>

      <p className="text-sm text-zinc-400 mb-4">生成時刻: {new Date().toISOString()}</p>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-3 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="text-sm text-zinc-600 mt-1">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
