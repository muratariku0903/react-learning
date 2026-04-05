"use client";

import { useActionState } from "react";
import { login } from "../_lib/actions";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form action={formAction}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      {state && <p>{state}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "送信中..." : "ログイン"}
      </button>
    </form>
  );
};
