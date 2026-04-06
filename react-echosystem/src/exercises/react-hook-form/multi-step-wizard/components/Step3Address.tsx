import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

export function Step3Address() {
  const { register } = useFormContext<FormValues>();
  return (
    <div>
      <h2>Step 3: 配送先住所</h2>
      {/* TODO: zip / prefecture / city / street を実装 */}
      <input placeholder="郵便番号" {...register("zip")} />
    </div>
  );
}
