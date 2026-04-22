import { useForm, FormProvider, useWatch } from "react-hook-form";
// TODO: zodResolver をインポートする
// import { zodResolver } from "@hookform/resolvers/zod";

// TODO: Zod をインポートし、discriminatedUnion でスキーマを定義する
// import { z } from "zod";

// TODO: 各支払い方法のフィールドコンポーネントをインポートする
// import { CreditFields } from "./components/CreditFields";
// import { BankFields } from "./components/BankFields";
// import { ConvenienceFields } from "./components/ConvenienceFields";

// ---------------------------------------------------------------------------
// TODO: Zod スキーマを定義する
// ---------------------------------------------------------------------------
// const creditSchema = z.object({
//   paymentType: z.literal("credit"),
//   cardNumber: ...,
//   expiryDate: ...,
//   cvv: ...,
// });
//
// const bankSchema = z.object({
//   paymentType: z.literal("bank"),
//   bankName: ...,
//   branchCode: ...,
//   accountNumber: ...,
// });
//
// const convenienceSchema = z.object({
//   paymentType: z.literal("convenience"),
//   storeName: ...,
//   phoneNumber: ...,
// });
//
// const paymentSchema = z.discriminatedUnion("paymentType", [
//   creditSchema,
//   bankSchema,
//   convenienceSchema,
// ]);
//
// type PaymentFormValues = z.infer<typeof paymentSchema>;

// ---------------------------------------------------------------------------
// 仮の型定義（スキーマ実装後は z.infer に置き換えること）
// ---------------------------------------------------------------------------
type PaymentFormValues = {
  paymentType: "credit" | "bank" | "convenience";
  // 各支払い方法のフィールドはスキーマ実装後に自動推論される
};

// ---------------------------------------------------------------------------
// 条件付きフィールドを表示するコンポーネント
// ---------------------------------------------------------------------------
function ConditionalFields() {
  // TODO: useWatch で paymentType を監視する
  // const paymentType = useWatch<PaymentFormValues>({ name: "paymentType" });

  // TODO: paymentType の値に応じて対応するフィールドコンポーネントを返す
  // switch (paymentType) {
  //   case "credit":
  //     return <CreditFields />;
  //   case "bank":
  //     return <BankFields />;
  //   case "convenience":
  //     return <ConvenienceFields />;
  //   default:
  //     return null;
  // }

  return (
    <div style={{ padding: 16, border: "1px dashed #ccc", marginTop: 16 }}>
      <p>ここに選択された支払い方法のフィールドが表示されます</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// メインフォーム
// ---------------------------------------------------------------------------
export default function App() {
  const methods = useForm<PaymentFormValues>({
    defaultValues: {
      paymentType: "credit",
    },
    // TODO: zodResolver を設定する
    // resolver: zodResolver(paymentSchema),
  });

  const onSubmit = (data: PaymentFormValues) => {
    console.log("送信データ:", data);
  };

  return (
    <FormProvider {...methods}>
      <div style={{ padding: 20, maxWidth: 560 }}>
        <h1>支払い方法選択フォーム</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          {/* 支払い方法の選択 */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="paymentType">支払い方法</label>
            <select
              id="paymentType"
              {...methods.register("paymentType")}
              style={{ display: "block", marginTop: 4, padding: 8 }}
            >
              <option value="credit">クレジットカード</option>
              <option value="bank">銀行振込</option>
              <option value="convenience">コンビニ払い</option>
            </select>
          </div>

          {/* 条件付きフィールド */}
          <ConditionalFields />

          {/* 送信ボタン */}
          <button type="submit" style={{ marginTop: 16, padding: "8px 24px" }}>
            送信
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
