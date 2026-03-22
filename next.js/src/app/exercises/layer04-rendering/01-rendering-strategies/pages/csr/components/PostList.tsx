"use client";

import { useEffect, useState } from "react";

// CSR（Client Side Rendering）

interface Post {
  id: number;
  title: string;
  body: string;
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const posts = (
          await fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json())
        ).slice(0, 10) as Post[];

        setPosts(posts);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    return;
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          title: {post.title} <br /> body: {post.body}
        </li>
      ))}
    </ul>
  );
}
