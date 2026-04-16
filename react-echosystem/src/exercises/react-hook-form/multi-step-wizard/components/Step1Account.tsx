import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

export function Step1Account() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div>
      <h2>Step 1: アカウント情報</h2>
      <div>
        <label>
          メール
          <input
            {...register("email", {
              required: "メールアドレスは必須です",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "有効なメールアドレス形式で入力してください",
              },
            })}
          />
        </label>
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        <br />
        <label>
          パスワード
          <input
            type="password"
            {...register("password", {
              required: "パスワードは必須です",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              deps: ["passwordConfirm"],
            })}
          />
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        <br />
        <label>
          確認用パスワード
          <input
            type="password"
            {...register("passwordConfirm", {
              required: "確認用パスワードは必須です",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              validate: (value, formValues) => {
                if (value !== formValues["password"]) return "パスワードが一致しません";

                return true;
              },
            })}
          />
        </label>
        {errors.passwordConfirm && (
          <p style={{ color: "red" }}>{errors.passwordConfirm.message}</p>
        )}
      </div>
    </div>
  );
}
