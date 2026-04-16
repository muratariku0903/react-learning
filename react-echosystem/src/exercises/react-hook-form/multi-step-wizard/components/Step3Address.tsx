import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

const PREFECTURES = ["北海道", "青森県", "岩手県", "沖縄県"];

export function Step3Address() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();
  return (
    <div>
      <h2>Step 3: 配送先住所</h2>
      <label>
        郵便番号
        <input
          placeholder="郵便番号"
          {...register("zip", {
            required: "郵便番号は必須です",
          })}
        />
      </label>
      {errors.zip && <p style={{ color: "red" }}>{errors.zip.message}</p>}
      <br />
      <label>
        都道府県
        <select {...register("prefecture", { required: "選択してください" })}>
          <option value="">選択してください</option>
          {PREFECTURES.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </label>
      {errors.prefecture && <p style={{ color: "red" }}>{errors.prefecture.message}</p>}
      <br />
      <label>
        市区町村
        <input
          placeholder="市区町村"
          {...register("city", {
            required: "市区町村は必須です",
          })}
        />
      </label>
      {errors.city && <p style={{ color: "red" }}>{errors.city.message}</p>}
      <label>
        番地号
        <input
          placeholder="番地号"
          {...register("street", {
            required: "番地号は必須です",
          })}
        />
      </label>
      {errors.street && <p style={{ color: "red" }}>{errors.street.message}</p>}
    </div>
  );
}
