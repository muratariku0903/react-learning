interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default async function RevalidatePage() {
  const { posts, date } = (await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 10 },
  }).then(async (e) => {
    return { posts: await e.json(), date: e.headers.get("date") };
  })) as { posts: Post[]; date: string };

  const slicedPosts = posts.slice(0, 5);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">revalidate</h1>
      <p className="text-zinc-500 mb-4">10秒ごとに再検証（ISR相当）</p>

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
