import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { defaultValues, type FormValues } from "./types";
import { Step1Account } from "./components/Step1Account";
import { Step2Profile } from "./components/Step2Profile";
import { Step3Address } from "./components/Step3Address";
import { Step4Confirm } from "./components/Step4Confirm";

const STEP_FIELDS: Record<number, (keyof FormValues)[]> = {
  1: ["email", "password", "passwordConfirm"],
  2: ["fullName", "birthday", "gender"],
  3: ["zip", "prefecture", "city", "street"],
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    // TODO: shouldUnregister をどう設定するか考える
  });

  const handleNext = async () => {
    // TODO: 現在ステップのフィールドだけ trigger で部分バリデーション
    // const ok = await methods.trigger(STEP_FIELDS[currentStep]);
    // if (!ok) return;
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  const onSubmit = (data: FormValues) => {
    console.log("最終送信:", data);
  };

  // STEP_FIELDS は今は読まれていないので参照だけしておく
  void STEP_FIELDS;

  return (
    <FormProvider {...methods}>
      <div style={{ padding: 20, maxWidth: 560 }}>
        <h1>会員登録ウィザード ({currentStep}/4)</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {currentStep === 1 && <Step1Account />}
          {currentStep === 2 && <Step2Profile />}
          {currentStep === 3 && <Step3Address />}
          {currentStep === 4 && <Step4Confirm />}

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            {currentStep > 1 && (
              <button type="button" onClick={handleBack}>戻る</button>
            )}
            {currentStep < 4 && (
              <button type="button" onClick={handleNext}>次へ</button>
            )}
            {currentStep === 4 && <button type="submit">送信</button>}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
