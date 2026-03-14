"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const MemoForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const memo = {
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await fetch(`/exercises/layer03-fullstack/01-route-handlers/api/memos/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ memo }),
          });

          setTitle("");
          setContent("");

          router.refresh();
        }}
      >
        <label htmlFor="message"></label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};
