"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <button type="submit" disabled={pending}>
        {pending ? "処理中" : "作成"}
      </button>
    </div>
  );
};
