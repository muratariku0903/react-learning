import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

// ============================================================
// モック API 関数（変更不要）
// ============================================================
const checkUsername = async (name: string): Promise<boolean> => {
  await new Promise((r) => setTimeout(r, 500));
  return !["admin", "test", "user"].includes(name);
};

const checkEmail = async (email: string): Promise<boolean> => {
  await new Promise((r) => setTimeout(r, 500));
  return email !== "test@example.com";
};

const createAccount = async (
  data: FormValues,
): Promise<{
  success: boolean;
  errors?: { field: string; message: string }[];
}> => {
  await new Promise((r) => setTimeout(r, 1000));
  if (data.email === "existing@example.com") {
    return {
      success: false,
      errors: [{ field: "email", message: "このメールアドレスは既に登録されています" }],
    };
  }
  return { success: true };
};

// ============================================================
// TODO: Zod スキーマを定義
// ============================================================
const formValuesSchema = z
  .object({
    username: z.string().min(3, "3文字以上で入力してください"),
    email: z.email("メールアドレスの形式で入力してください").min(1, "入力してください"),
    password: z.string().min(8, "8文字以上で入力してください"),
  })
  .refine(
    async (values) => {
      const username = values["username"];
      return await checkUsername(username);
    },
    { path: ["username"], message: "このユーザー名は既に使われています" },
  )
  .refine(
    async (values) => {
      const email = values["email"];
      return await checkEmail(email);
    },
    { path: ["email"], message: "このメールアドレスは既に登録されています" },
  );

type FormValues = z.infer<typeof formValuesSchema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(formValuesSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const result = await createAccount(data);
    if (!result.success) {
      for (const { field, message } of result.errors ?? []) {
        setError(field as keyof FormValues, { type: "server", message });
      }

      return;
    }

    console.log("送信データ:", data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h1>アカウント作成</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ユーザー名 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            ユーザー名
            <input {...register("username")} placeholder="3文字以上" />
          </label>
          {errors.username?.message && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: 12 }}>
          <label>
            メールアドレス
            <input type="email" {...register("email")} placeholder="example@mail.com" />
          </label>
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* パスワード */}
        <div style={{ marginBottom: 12 }}>
          <label>
            パスワード
            <input type="password" {...register("password")} placeholder="8文字以上" />
          </label>
          {errors.password?.message && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "送信中..." : "アカウント作成"}
        </button>
      </form>

      {/* デバッグ用: 試すべきケース */}
      <div style={{ marginTop: 24, padding: 12, background: "#f5f5" }}>
        <h3>テストケース</h3>
        <ul style={{ fontSize: 14 }}>
          <li>
            ユーザー名: <code>admin</code>, <code>test</code>, <code>user</code> →
            非同期バリデーションで弾かれる
          </li>
          <li>
            メール: <code>test@example.com</code> → 非同期バリデーションで弾かれる
          </li>
          <li>
            メール: <code>existing@example.com</code> →
            非同期バリデーションは通るが、サーバーエラーで弾かれる
          </li>
          <li>
            ユーザー名: <code>newuser</code> / メール: <code>new@example.com</code> /
            パスワード: <code>password123</code> → 成功
          </li>
        </ul>
      </div>
    </div>
  );
}
