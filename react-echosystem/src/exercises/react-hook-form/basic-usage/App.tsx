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
    mode: "onChange",
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
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "必須入力です",
                },
                minLength: {
                  value: 2,
                  message: "2文字以上で入力してください",
                },
                maxLength: {
                  value: 20,
                  message: "20文字以内で入力してください",
                },
              })}
            />
          </label>
          {errors.name?.message && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            メール
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "必須入力です",
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "メールアドレスの形式で入力してください",
                },
              })}
            />
          </label>
          {errors.email?.message && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            年齢
            <input
              type="number"
              {...register("age", { valueAsNumber: true, min: 0, max: 120 })}
            />
          </label>
          {errors.age && (
            <p style={{ color: "red" }}>
              {errors.age.type} {errors.age.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            自己紹介
            <textarea {...register("bio", { maxLength: 200 })} />
          </label>
          {errors.bio && (
            <p style={{ color: "red" }}>
              {errors.bio.type} {errors.bio.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <span>評価</span>
          <Controller
            name="rating"
            control={control}
            rules={{
              validate: (v) => v >= 1 || "評価を選んでください",
            }}
            render={({ field }) => (
              <Rating value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.rating?.message && (
            <p style={{ color: "red" }}>{errors.rating.message}</p>
          )}
        </div>

        <button type="submit" disabled={!isValid || !isDirty}>
          送信
        </button>

        <pre style={{ marginTop: 16, fontSize: 12, color: "#666" }}>
          {JSON.stringify({ isDirty, isValid }, null, 2)}
        </pre>
      </form>
    </div>
  );
}
