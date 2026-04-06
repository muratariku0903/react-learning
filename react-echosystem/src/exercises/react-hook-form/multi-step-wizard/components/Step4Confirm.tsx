import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

export function Step4Confirm() {
  const { getValues } = useFormContext<FormValues>();
  // TODO: getValues か useWatch を選んで全フィールドを表示する
  const values = getValues();
  return (
    <div>
      <h2>Step 4: 確認</h2>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
