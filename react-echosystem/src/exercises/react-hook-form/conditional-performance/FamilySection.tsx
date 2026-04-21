import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { FormValues } from "./App";

export const FamilySection = () => {
  console.count("FamilySection");

  const { register, control } = useFormContext<FormValues>();

  const hasFamily = useWatch({
    control,
    name: "hasFamily",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "family" });

  return (
    <div>
      <div style={{ marginTop: 12 }}>
        <label>
          <input type="checkbox" {...register("hasFamily")} />
          家族を追加する
        </label>
        {hasFamily && (
          <div style={{ border: "1px solid #ccc", padding: 8, marginTop: 8 }}>
            <p>家族</p>
            {fields.map((f, i) => (
              <div key={f.id}>
                <input placeholder="名前" {...register(`family.${i}.name`)} />
                <input
                  type="number"
                  placeholder="年齢"
                  {...register(`family.${i}.age`, { valueAsNumber: true })}
                />
                <button type="button" onClick={() => remove(i)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => append({ name: "", age: 0 })}>
              + 追加
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
