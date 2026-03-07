"use client";

import { use } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function SearchResult({
  postsPromise,
}: {
  postsPromise: Promise<Post[]>;
}) {
  const posts = use(postsPromise);

  return (
    <ul className="p-4">
      {posts.map((post) => (
        <li className="pb-2" key={post.id}>
          title: {post.title}
          <br />
          body: {post.body}
        </li>
      ))}
    </ul>
  );
}
