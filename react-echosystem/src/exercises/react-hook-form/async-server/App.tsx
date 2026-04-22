import { useForm } from "react-hook-form";
// TODO: zod をインポート
// TODO: @hookform/resolvers/zod から zodResolver をインポート

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
  data: any
): Promise<{
  success: boolean;
  errors?: { field: string; message: string }[];
}> => {
  await new Promise((r) => setTimeout(r, 1000));
  if (data.email === "existing@example.com") {
    return {
      success: false,
      errors: [
        { field: "email", message: "このメールアドレスは既に登録されています" },
      ],
    };
  }
  return { success: true };
};

// ============================================================
// TODO: Zod スキーマを定義
// ============================================================
// 以下の要件を満たすスキーマを作成してください:
//
// username:
//   - 必須（空文字不可）
//   - 3文字以上
//   - refine で checkUsername を呼び、使用済みなら "このユーザー名は既に使用されています" エラー
//
// email:
//   - 必須（空文字不可）
//   - email 形式
//   - refine で checkEmail を呼び、使用済みなら "このメールアドレスは既に使用されています" エラー
//
// password:
//   - 必須（空文字不可）
//   - 8文字以上

// TODO: z.infer でフォームの型を導出（手動で型定義しない）
type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // TODO: setError を分割代入で取得する
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    // TODO: resolver に zodResolver を接続
  });

  const onSubmit = async (data: FormValues) => {
    // TODO: createAccount を呼び出し、サーバーエラーがあれば setError で表示する
    // ヒント:
    //   1. const result = await createAccount(data);
    //   2. result.success が false の場合、result.errors をループして setError を呼ぶ
    //   3. setError("fieldName", { type: "server", message: "エラーメッセージ" })
    //   4. 成功時は console.log やアラートで通知する
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
            <input
              type="email"
              {...register("email")}
              placeholder="example@mail.com"
            />
          </label>
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* パスワード */}
        <div style={{ marginBottom: 12 }}>
          <label>
            パスワード
            <input
              type="password"
              {...register("password")}
              placeholder="8文字以上"
            />
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
      <div style={{ marginTop: 24, padding: 12, background: "#f5f5f5" }}>
        <h3>テストケース</h3>
        <ul style={{ fontSize: 14 }}>
          <li>
            ユーザー名: <code>admin</code>, <code>test</code>, <code>user</code>{" "}
            → 非同期バリデーションで弾かれる
          </li>
          <li>
            メール: <code>test@example.com</code> →
            非同期バリデーションで弾かれる
          </li>
          <li>
            メール: <code>existing@example.com</code> →
            非同期バリデーションは通るが、サーバーエラーで弾かれる
          </li>
          <li>
            ユーザー名: <code>newuser</code> / メール:{" "}
            <code>new@example.com</code> / パスワード: <code>password123</code>{" "}
            → 成功
          </li>
        </ul>
      </div>
    </div>
  );
}
