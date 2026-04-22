import { useForm } from "react-hook-form";
// TODO: zod をインポート
// TODO: @hookform/resolvers/zod から zodResolver をインポート

// TODO: Zod スキーマを定義
// - name: string, 必須, 2文字以上
// - email: string, 必須, email形式
// - age: number, 必須, 18以上100以下
// - role: enum "admin" | "user" | "editor"
// エラーメッセージは日本語でカスタマイズすること

// TODO: z.infer でフォームの型を導出（手動で型定義しない）
type FormValues = {
  name: string;
  email: string;
  age: number;
  role: string;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      age: 18,
      role: "user",
    },
    // TODO: resolver に zodResolver を接続
  });

  const onSubmit = (data: FormValues) => {
    console.log("送信データ:", data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* 名前 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            名前
            <input {...register("name")} />
          </label>
          {errors.name?.message && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>

        {/* メールアドレス */}
        <div style={{ marginBottom: 12 }}>
          <label>
            メールアドレス
            <input type="email" {...register("email")} />
          </label>
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* 年齢 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            年齢
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
          </label>
          {errors.age?.message && (
            <p style={{ color: "red" }}>{errors.age.message}</p>
          )}
        </div>

        {/* 役割 */}
        <div style={{ marginBottom: 12 }}>
          <label>
            役割
            <select {...register("role")}>
              <option value="user">ユーザー</option>
              <option value="admin">管理者</option>
              <option value="editor">編集者</option>
            </select>
          </label>
          {errors.role?.message && (
            <p style={{ color: "red" }}>{errors.role.message}</p>
          )}
        </div>

        <button type="submit">登録</button>
      </form>
    </div>
  );
}
