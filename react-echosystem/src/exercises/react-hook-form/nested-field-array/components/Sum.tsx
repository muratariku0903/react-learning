import { useFormContext, useWatch } from "react-hook-form";
import type { FormValues } from "../App";

export function Sum() {
  console.log("Sum rendering");

  const { control } = useFormContext<FormValues>();

  const items = useWatch({ control, name: "items" });

  let sum = 0;
  for (const { quantity, options } of items) {
    const unitPrice = 100 + options.reduce((acc, curr) => acc + curr.extraPrice, 0);
    sum += unitPrice * quantity;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
      <p>合計: {sum}円</p>
    </div>
  );
}
