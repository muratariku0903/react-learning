type Params = { id: string };

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = (await fetch("https://jsonplaceholder.typicode.com/posts").then((r) =>
    r.json(),
  )) as Post[];

  return posts.slice(0, 5).map((p) => ({ id: p.id.toString() }));
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  const post = (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    (r) => r.json(),
  )) as Post;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">投稿詳細</h1>

      <p>id: {post.id}</p>
      <p>title: {post.title}</p>
      <p>body: {post.body}</p>
    </div>
  );
}
