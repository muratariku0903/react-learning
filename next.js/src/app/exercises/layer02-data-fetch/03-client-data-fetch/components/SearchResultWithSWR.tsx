"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function SearchResultSWR() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    (url: string) => fetch(url).then((res) => res.json()),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!posts) return null;

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

export function SearchResultSWRWithSearchParams() {
  const router = useRouter();
  const params = useSearchParams();
  const keyword = params.get("keyword") ?? "";

  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<Post[]>(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&q=${keyword}`,
    (url: string) => fetch(url).then((res) => res.json()),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!posts) return null;

  return (
    <div>
      <div className="bg-white p-4">
        <input
          type="text"
          className="text-black border"
          onChange={(e) => {
            router.replace(`?keyword=${e.target.value}`);
          }}
        />
      </div>
      <ul className="p-4">
        {posts.map((post) => (
          <li className="pb-2" key={post.id}>
            title: {post.title}
            <br />
            body: {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
