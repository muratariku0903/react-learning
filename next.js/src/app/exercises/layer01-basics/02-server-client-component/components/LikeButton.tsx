"use client";

import { useState } from "react";

interface LikeButtonProps {
  name: string;
  obj: object;
  // fn: () => void;
}

export default function LikeButton({ name, obj }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        cursor: "pointer",
      }}
    >
      👍 いいね {likes}
    </button>
  );
}
