import { useForm } from "react-hook-form";
// TODO: zodResolver をインポートする
// import { zodResolver } from "@hookform/resolvers/zod";
// TODO: z を Zod からインポートする
// import { z } from "zod";

// TODO: Zod スキーマを定義する
// - 各フィールドの単体バリデーション（password: 8文字以上・英数字混合、participants/maxCapacity: 1以上の整数、など）
// - superRefine でクロスフィールドバリデーションを追加:
//   1. password === confirmPassword
//   2. endDate > startDate
//   3. maxCapacity >= participants
// - ctx.addIssue() の path を正しく指定して、エラーが対応するフィールドに表示されるようにする

// TODO: スキーマから型を推論する
// type FormValues = z.infer<typeof schema>;

// 仮の型定義（スキーマ完成後は z.infer に置き換えること）
type FormValues = {
  password: string;
  confirmPassword: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxCapacity: number;
};

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
      startDate: "",
      endDate: "",
      participants: 1,
      maxCapacity: 10,
    },
    // TODO: zodResolver を設定する
    // resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("送信データ:", data);
  };

  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h1>イベント申込フォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* パスワード */}
        <div style={{ marginBottom: 16 }}>
          <label>
            パスワード
            <input
              type="password"
              {...register("password")}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>
          {errors.password && (
            <p style={{ color: "red", margin: "4px 0 0" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* パスワード確認 */}
        <div style={{ marginBottom: 16 }}>
          <label>
            パスワード（確認）
            <input
              type="password"
              {...register("confirmPassword")}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>
          {errors.confirmPassword && (
            <p style={{ color: "red", margin: "4px 0 0" }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* 開始日 */}
        <div style={{ marginBottom: 16 }}>
          <label>
            開始日
            <input
              type="date"
              {...register("startDate")}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>
          {errors.startDate && (
            <p style={{ color: "red", margin: "4px 0 0" }}>
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* 終了日 */}
        <div style={{ marginBottom: 16 }}>
          <label>
            終了日
            <input
              type="date"
              {...register("endDate")}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>
          {errors.endDate && (
            <p style={{ color: "red", margin: "4px 0 0" }}>
              {errors.endDate.message}
            </p>
          )}
        </div>

        {/* 参加人数 */}
        <div style={{ marginBottom: 16 }}>
          <label>
            参加人数
            <input
              type="number"
              {...register("participants", { valueAsNumber: true })}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>
          {errors.participants && (
            <p style={{ color: "red", margin: "4px 0 0" }}>
              {errors.participants.message}
            </p>
          )}
        </div>

        {/* 最大収容人数 */}
        <div style={{ marginBottom: 16 }}>
          <label>
            最大収容人数
            <input
              type="number"
              {...register("maxCapacity", { valueAsNumber: true })}
              style={{ display: "block", width: "100%", marginTop: 4 }}
            />
          </label>
          {errors.maxCapacity && (
            <p style={{ color: "red", margin: "4px 0 0" }}>
              {errors.maxCapacity.message}
            </p>
          )}
        </div>

        <button type="submit" style={{ marginTop: 8 }}>
          申し込む
        </button>
      </form>
    </div>
  );
}
