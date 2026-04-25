import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formValuesSchema = z.object({
  name: z.string().min(2, "2文字以上で入力してください"),
  email: z.email("メールアドレスの形式で入力してください"),
  age: z.coerce
    .number("数値を入力してください")
    .min(18, "18歳以上で入力してください")
    .max(100, "100歳以下で入力してください"),
  role: z.enum(["admin", "user", "editor"]),
});

type FormValues = z.infer<typeof formValuesSchema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: 18,
      role: "user",
    },
    resolver: zodResolver(formValuesSchema),
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
          {errors.name?.message && <p style={{ color: "red" }}>{errors.name.message}</p>}
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
            <input type="number" {...register("age")} />
          </label>
          {errors.age?.message && <p style={{ color: "red" }}>{errors.age.message}</p>}
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
          {errors.role?.message && <p style={{ color: "red" }}>{errors.role.message}</p>}
        </div>

        <button type="submit">登録</button>
      </form>
    </div>
  );
}
