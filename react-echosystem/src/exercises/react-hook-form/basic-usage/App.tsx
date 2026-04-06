import { useForm, Controller } from "react-hook-form";
import { Rating } from "./components/Rating";

type FormValues = {
  name: string;
  email: string;
  age: number;
  bio: string;
  rating: number;
};

export default function App() {
  // TODO: useForm の設定を完成させてください（mode, defaultValues 等）
  console.log('app render')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      bio: "",
      rating: 0,
    },
    // mode: ???
  });

  const onSubmit = (data: FormValues) => {
    console.log("submit:", data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h1>プロフィール編集</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: 12 }}>
          <label>
            名前
            {/* TODO: register でバリデーション付きで登録 */}
            <input {...register("name")} />
          </label>
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            メール
            <input {...register("email")} />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            年齢
            <input type="number" {...register("age", { valueAsNumber: true })} />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            自己紹介
            <textarea {...register("bio")} />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <span>評価</span>
          {/* TODO: Controller で Rating を接続する */}
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Rating value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {/* TODO: isDirty && isValid の時だけ活性化 */}
        <button type="submit">送信</button>

        <pre style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
          {JSON.stringify({ isDirty, isValid }, null, 2)}
        </pre>
      </form>
    </div>
  );
}
