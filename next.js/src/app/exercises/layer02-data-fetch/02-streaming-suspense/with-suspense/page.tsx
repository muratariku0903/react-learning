import { Suspense } from "react";
import { fetchComments, fetchPosts, fetchUserInfo } from "../_lib/data";

export default async function WithSuspensePage() {
  const fetchUserInfoPromise = fetchUserInfo();
  const fetchPostsPromise = fetchPosts();
  const fetchCommentsPromise = fetchComments();

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Suspense あり</h1>

      <Suspense fallback={<Loading />}>
        <UserInfo fetchUserInfoPromise={fetchUserInfoPromise} />
      </Suspense>
      <br />
      <Suspense fallback={<Loading />}>
        <Posts fetchPostsPromise={fetchPostsPromise} />
      </Suspense>
      <br />
      <Suspense fallback={<Loading />}>
        <Comments fetchCommentsPromise={fetchCommentsPromise} />
      </Suspense>
    </div>
  );
}

async function UserInfo({
  fetchUserInfoPromise,
}: {
  fetchUserInfoPromise: Promise<{
    name: string;
    email: string;
    role: string;
  }>;
}) {
  const user = await fetchUserInfoPromise;

  return (
    <p>
      {user.email} {user.name} {user.role}
    </p>
  );
}

async function Posts({
  fetchPostsPromise,
}: {
  fetchPostsPromise: Promise<
    {
      id: number;
      title: string;
      summary: string;
    }[]
  >;
}) {
  const posts = await fetchPostsPromise;

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          {p.title} {p.summary}
        </li>
      ))}
    </ul>
  );
}

async function Comments({
  fetchCommentsPromise,
}: {
  fetchCommentsPromise: Promise<
    {
      id: number;
      author: string;
      text: string;
    }[]
  >;
}) {
  const comments = await fetchCommentsPromise;

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>
          {c.text} {c.author}
        </li>
      ))}
    </ul>
  );
}

function Loading() {
  return <p>loading...</p>;
}
