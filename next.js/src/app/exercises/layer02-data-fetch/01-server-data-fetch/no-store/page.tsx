interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function NoStorePage() {
  const { posts, date } = (await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  }).then(async (e) => {
    return { posts: await e.json(), date: e.headers.get("date") };
  })) as { posts: Post[]; date: string };

  const slicedPosts = posts.slice(0, 5);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">no-store</h1>
      <p className="text-zinc-500 mb-4">キャッシュなし（SSR相当）</p>

      <p>fetch()データ取得日時：{date}</p>
      <br />

      {slicedPosts.map((post) => (
        <p key={post.id}>
          {post.id} : {post.title}
        </p>
      ))}
    </div>
  );
}
