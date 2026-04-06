import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { ItemRow } from "./components/ItemRow";

type Option = { label: string; extraPrice: number };
type Item = { name: string; quantity: number; options: Option[] };
type FormValues = { items: Item[] };

const emptyItem: Item = { name: "", quantity: 1, options: [] };

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: { items: [emptyItem] },
    mode: "onChange",
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    // TODO: 合計金額を計算して console.log する
    console.log("submit:", data);
  };

  return (
    <FormProvider {...methods}>
      <div style={{ padding: 20, maxWidth: 640 }}>
        <h1>注文フォーム（入れ子の useFieldArray）</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((field, index) => (
            <ItemRow
              key={field.id}
              nestIndex={index}
              onRemove={() => remove(index)}
              onMoveUp={() => index > 0 && swap(index, index - 1)}
              onMoveDown={() =>
                index < fields.length - 1 && swap(index, index + 1)
              }
            />
          ))}

          <button type="button" onClick={() => append(emptyItem)}>
            + 商品を追加
          </button>

          <div style={{ marginTop: 16 }}>
            <button type="submit">注文する</button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
