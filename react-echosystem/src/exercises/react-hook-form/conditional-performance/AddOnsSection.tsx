import { useFormContext, useWatch } from "react-hook-form";
import type { FormValues } from "./App";

export const AddOnsSection = () => {
  console.count("AddOnsSection");

  const { register, control } = useFormContext<FormValues>();

  const plan = useWatch({
    control,
    name: "plan",
  });

  return (
    <div>
      {plan === "premium" && (
        <div style={{ marginTop: 12 }}>
          <p>追加オプション (premium のみ)</p>
          <label>
            <input type="checkbox" {...register("addOns.roadAssistance")} />
            ロードサービス
          </label>
          <label>
            <input type="checkbox" {...register("addOns.rental")} />
            代車
          </label>
        </div>
      )}
    </div>
  );
};
