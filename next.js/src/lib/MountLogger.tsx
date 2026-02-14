"use client";

import { useEffect, useState } from "react";

interface MountLoggerProps {
  name: string;
}
export default function MountLogger({ name }: MountLoggerProps) {
  const [count] = useState(0);

  useEffect(() => {
    console.log(`✅ ${name} がマウントされました`);

    return () => {
      console.log(`❌ ${name} がアンマウントされました`);
    };
  }, [name]);

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      {count}
    </div>
  );
}
