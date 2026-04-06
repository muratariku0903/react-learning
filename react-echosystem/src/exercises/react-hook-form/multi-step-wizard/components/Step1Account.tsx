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
      {/* TODO: email / password / passwordConfirm を register
                passwordConfirm は password と一致を validate */}
      <div>
        <label>メール
          <input {...register("email")} />
        </label>
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>
    </div>
  );
}
