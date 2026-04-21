import { useFormContext, useWatch } from "react-hook-form";
import type { FormValues } from "./App";

const PRICE: Record<FormValues["plan"], number> = {
  basic: 1000,
  standard: 2000,
  premium: 3500,
};

export const EstimatePanel = () => {
  console.count("EstimatePanel");

  const { control } = useFormContext<FormValues>();

  const [plan, family, addOns] = useWatch({
    control,
    name: ["plan", "family", "addOns"],
  });

  const estimate =
    PRICE[plan] +
    family.length * 500 +
    (addOns.roadAssistance ? 300 : 0) +
    (addOns.rental ? 800 : 0);

  return (
    <aside style={{ borderLeft: "1px solid #ccc", paddingLeft: 16 }}>
      <h2>お見積もり</h2>
      <p style={{ fontSize: 24 }}>¥{estimate.toLocaleString()}</p>
    </aside>
  );
};
