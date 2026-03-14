"use client";

import { useState } from "react";
import { Memo } from "../lib/store";
import { useRouter } from "next/navigation";

export const MemoItem = ({ memo }: { memo: Memo }) => {
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  return (
    <div>
      {update ? (
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      ) : (
        <span>title: {title}</span>
      )}
      {update ? (
        <input value={content} onChange={(e) => setContent(e.target.value)} />
      ) : (
        <span className="pl-2">content: {content}</span>
      )}
      <div>
        <button onClick={() => setUpdate(!update)}>
          {update ? "キャンセル" : "更新"}
        </button>
        {update && (
          <button
            onClick={async (e) => {
              e.preventDefault();

              const updated: Memo = {
                id: memo.id,
                title,
                content,
                createdAt: memo.createdAt,
                updatedAt: new Date().toISOString(),
              };
              await fetch(
                `/exercises/layer03-fullstack/01-route-handlers/api/memos/${memo.id}`,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ memo: updated }),
                },
              );

              setUpdate(false);

              router.refresh();
            }}
          >
            確定
          </button>
        )}

        <button
          onClick={async (e) => {
            e.preventDefault();

            await fetch(
              `/exercises/layer03-fullstack/01-route-handlers/api/memos/${memo.id}`,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              },
            );

            router.refresh();
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
};
