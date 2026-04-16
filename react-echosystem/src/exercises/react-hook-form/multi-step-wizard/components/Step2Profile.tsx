import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

const GENDER_OPTIONS = [
  { label: "男", value: "male" },
  { label: "女", value: "female" },
  { label: "その他", value: "other" },
] as const;

export function Step2Profile() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <div>
      <h2>Step 2: プロフィール</h2>
      <label>
        氏名
        <input
          placeholder="氏名"
          {...register("fullName", {
            required: "氏名は必須です",
          })}
        />
      </label>
      {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
      <br />
      <label>
        誕生日
        <input
          type="date"
          {...register("birthday", {
            required: "誕生日は必須です",
          })}
        />
      </label>
      {errors.birthday && <p style={{ color: "red" }}>{errors.birthday.message}</p>}
      <br />
      {GENDER_OPTIONS.map((option) => (
        <label key={option.value} style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value={option.value}
            {...register("gender", {
              required: "性別は必須です",
            })}
          />
          {option.label}
        </label>
      ))}
      {errors.gender && <p style={{ color: "red" }}>{errors.gender.message}</p>}
      <br />
    </div>
  );
}
