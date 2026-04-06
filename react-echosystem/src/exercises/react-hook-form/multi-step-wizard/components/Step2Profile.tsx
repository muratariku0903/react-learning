import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

export function Step2Profile() {
  const { register } = useFormContext<FormValues>();
  return (
    <div>
      <h2>Step 2: プロフィール</h2>
      {/* TODO: fullName / birthday / gender を実装 */}
      <input placeholder="氏名" {...register("fullName")} />
    </div>
  );
}
