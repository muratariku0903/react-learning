import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import type { FormValues } from "../App";

type Props = {
  nestIndex: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function ItemRow({ nestIndex, onRemove, onMoveUp, onMoveDown }: Props) {
  console.log("ItemRow rendering");

  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `items.${nestIndex}.options`,
  });

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <strong>
          商品 #{nestIndex + 1} : {useWatch({ control, name: `items.${nestIndex}.name` })}
        </strong>
        <br />
        <strong>
          数量 : {useWatch({ control, name: `items.${nestIndex}.quantity` })}
        </strong>
        <button type="button" onClick={onMoveUp}>
          ↑
        </button>
        <button type="button" onClick={onMoveDown}>
          ↓
        </button>
        <button type="button" onClick={onRemove}>
          削除
        </button>
      </div>

      <input
        {...register(`items.${nestIndex}.name`, {
          required: { value: true, message: "名前を入力してください" },
          minLength: { value: 2, message: "最低でも2文字入力してください" },
        })}
      />
      {errors.items?.[nestIndex]?.name && (
        <p style={{ color: "red" }}>{errors.items?.[nestIndex]?.name.message}</p>
      )}
      <br />
      <input
        {...register(`items.${nestIndex}.quantity`, {
          required: { value: true, message: "数量を入力してください" },
          min: 1,
          valueAsNumber: true,
          validate: (e) => (!isNaN(e) ? true : "数値を入力してください"),
        })}
      />
      {errors.items?.[nestIndex]?.quantity && (
        <p style={{ color: "red" }}>{errors.items?.[nestIndex]?.quantity.message}</p>
      )}
      <br />

      <div style={{ marginTop: 8 }}>
        <p>オプション:</p>

        <button
          type="button"
          onClick={() => {
            append({
              label: "",
              extraPrice: 100,
            });
          }}
        >
          + オプション追加
        </button>
        <ul>
          {fields.map((field, index) => (
            <li key={field.id}>
              <input
                {...register(`items.${nestIndex}.options.${index}.label`, {
                  required: { value: true, message: "名前を入力してください" },
                  minLength: { value: 2, message: "最低でも2文字入力してください" },
                })}
              />
              {errors.items?.[nestIndex]?.options?.[index]?.label?.message && (
                <p style={{ color: "red" }}>
                  {errors.items?.[nestIndex]?.options?.[index]?.label.message}
                </p>
              )}
              <br />
              <input
                {...register(`items.${nestIndex}.options.${index}.extraPrice`, {
                  required: { value: true, message: "料金を入力してください" },
                  min: { value: 100, message: "最低でも100円以上になります" },
                  valueAsNumber: true,
                  validate: (e) => (!isNaN(e) ? true : "数値を入力してください"),
                })}
              />
              {errors.items?.[nestIndex]?.options?.[index]?.extraPrice?.message && (
                <p style={{ color: "red" }}>
                  {errors.items?.[nestIndex]?.options?.[index]?.extraPrice?.message}
                </p>
              )}
              <button
                onClick={() => {
                  remove(index);
                }}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
