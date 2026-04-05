import "server-only";

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw Error("SESSION_SECRETが設定されていません");
}
const encodedKey = new TextEncoder().encode(secretKey);

const cookieKey = "Authorization";

export const createSession = async (userId: string) => {
  const payload: JWTPayload = { sub: userId };
  const jwt = await encrypt(payload);

  const cookie = await cookies();
  cookie.set(cookieKey, jwt, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60,
    // maxAge: 60 * 60 * 24 * 7,
  });
};

export const deleteSession = async () => {
  const cookie = await cookies();
  cookie.delete(cookieKey);
};

const encrypt = async (payload: JWTPayload) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(encodedKey);

  return jwt;
};

export const decrypt = async (jwt: string) => {
  try {
    return await jwtVerify(jwt, encodedKey);
  } catch (e) {
    console.error("jwtVerifyに失敗しました", e);
    return undefined;
  }
};
