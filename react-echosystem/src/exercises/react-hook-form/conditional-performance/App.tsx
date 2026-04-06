import { useForm, useFieldArray } from "react-hook-form";

// ⚠️ このファイルはわざとアンチパターンで書かれています。
// README に従って子コンポーネントへ切り出し、再レンダリングを抑えてください。

type FormValues = {
  plan: "basic" | "standard" | "premium";
  hasFamily: boolean;
  family: { name: string; age: number }[];
  addOns: { roadAssistance: boolean; rental: boolean };
};

const PRICE: Record<FormValues["plan"], number> = {
  basic: 1000,
  standard: 2000,
  premium: 3500,
};

export default function App() {
  console.count("App render"); // 何文字打っても増えるはず

  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      plan: "basic",
      hasFamily: false,
      family: [],
      addOns: { roadAssistance: false, rental: false },
    },
  });

  // ❌ アンチパターン: 親で全部 watch
  const values = watch();

  const { fields, append, remove } = useFieldArray({ control, name: "family" });

  // ❌ 親で計算
  const estimate =
    PRICE[values.plan] +
    values.family.length * 500 +
    (values.addOns.roadAssistance ? 300 : 0) +
    (values.addOns.rental ? 800 : 0);

  return (
    <div style={{ display: "flex", gap: 24, padding: 20 }}>
      <form onSubmit={handleSubmit((d) => console.log(d))} noValidate>
        <h1>保険申し込み</h1>

        <div>
          <label>プラン: </label>
          <select {...register("plan")}>
            <option value="basic">basic</option>
            <option value="standard">standard</option>
            <option value="premium">premium</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            <input type="checkbox" {...register("hasFamily")} />
            家族を追加する
          </label>
        </div>

        {/* ❌ アンチパターン: ここに直接書いている */}
        {values.hasFamily && (
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
                <button type="button" onClick={() => remove(i)}>削除</button>
              </div>
            ))}
            <button type="button" onClick={() => append({ name: "", age: 0 })}>
              + 追加
            </button>
          </div>
        )}

        {/* ❌ アンチパターン */}
        {watch("plan") === "premium" && (
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

        <button type="submit" style={{ marginTop: 16 }}>申し込む</button>
      </form>

      {/* ❌ アンチパターン: 親が再レンダリングされる度に再計算 */}
      <aside style={{ borderLeft: "1px solid #ccc", paddingLeft: 16 }}>
        <h2>お見積もり</h2>
        <p style={{ fontSize: 24 }}>¥{estimate.toLocaleString()}</p>
      </aside>
    </div>
  );
}
