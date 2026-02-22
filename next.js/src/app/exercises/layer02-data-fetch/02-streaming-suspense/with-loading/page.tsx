import { fetchComments, fetchPosts, fetchUserInfo } from "../_lib/data";

export default async function WithLoadingPage() {
  const user = await fetchUserInfo();
  const posts = await fetchPosts();
  const comments = await fetchComments();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">loading.tsx あり</h1>
      <p>
        {user.name} {user.email} {user.role}
      </p>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            {p.title} {p.summary}
          </li>
        ))}
      </ul>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            {c.text} {c.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
