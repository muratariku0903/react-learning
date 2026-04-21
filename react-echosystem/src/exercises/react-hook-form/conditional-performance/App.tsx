import { useForm, FormProvider } from "react-hook-form";
import { EstimatePanel } from "./EstimatePanel";
import { AddOnsSection } from "./AddOnsSection";
import { FamilySection } from "./FamilySection";

export type FormValues = {
  plan: "basic" | "standard" | "premium";
  hasFamily: boolean;
  family: { name: string; age: number }[];
  addOns: { roadAssistance: boolean; rental: boolean };
};

export default function App() {
  console.count("App render"); // 何文字打っても増えるはず

  const methods = useForm<FormValues>({
    defaultValues: {
      plan: "basic",
      hasFamily: false,
      family: [],
      addOns: { roadAssistance: false, rental: false },
    },
    shouldUnregister: false,
  });
  const { handleSubmit, register } = methods;

  return (
    <FormProvider {...methods}>
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

          <FamilySection />
          <AddOnsSection />

          <button type="submit" style={{ marginTop: 16 }}>
            申し込む
          </button>
        </form>

        <EstimatePanel />
      </div>
    </FormProvider>
  );
}
