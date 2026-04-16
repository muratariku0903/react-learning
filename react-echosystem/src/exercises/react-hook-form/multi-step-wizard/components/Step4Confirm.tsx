import { useFormContext } from "react-hook-form";
import type { FormValues } from "../types";

export function Step4Confirm() {
  const { getValues } = useFormContext<FormValues>();
  const values = getValues();

  return (
    <div>
      <h2>Step 4: 確認</h2>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
