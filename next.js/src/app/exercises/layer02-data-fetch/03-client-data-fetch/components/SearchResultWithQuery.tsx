"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function SearchResultWithQuery() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
      return res.json();
    },
  });

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
