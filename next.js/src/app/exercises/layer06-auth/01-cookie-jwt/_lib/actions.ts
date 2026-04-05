"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";

const authUser = {
  userId: "test",
  email: "test@example.com",
  password: "password123",
};

export const login = async (prevState: string | undefined, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (email !== authUser.email || password !== authUser.password) {
    return "認証情報が異なります";
  }

  try {
    await createSession(authUser.userId);
  } catch (e) {
    console.error(e);
    return "セッションの作成に失敗しました";
  }

  redirect("/exercises/layer06-auth/01-cookie-jwt");
};

export const logout = async () => {
  try {
    await deleteSession();
  } catch (e) {
    console.error(e);
    console.log("セッションの削除に失敗しました");
  }

  redirect("/exercises/layer06-auth/01-cookie-jwt");
};
