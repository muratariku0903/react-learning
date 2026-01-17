/* eslint-disable react-hooks/refs */
// 純粋なコンポーネントとは - 演習

import { useRef } from "react";

// グローバル変数（この変数自体は変更しないでください）
let renderCount = 0;

// ========================================
// コンポーネント1: Greeting
// ========================================
type GreetingProps = {
  name: string;
  renderCount: number;
};

function Greeting({ name, renderCount }: GreetingProps) {
  return (
    <div>
      <h2>こんにちは、{name}さん！</h2>
      <p>あなたは{renderCount}番目の訪問者です</p>
    </div>
  );
}

// ========================================
// コンポーネント2: CurrentTime
// ========================================

type CurrentTimeProps = {
  timeString: string;
};
function CurrentTime({ timeString }: CurrentTimeProps) {
  return (
    <div>
      <h2>現在時刻</h2>
      <p>{timeString}</p>
    </div>
  );
}

// ========================================
// コンポーネント3: PriceDisplay
// ========================================
type PriceDisplayProps = {
  price: number;
  quantity: number;
};

function PriceDisplay({ price, quantity }: PriceDisplayProps) {
  const total = price * quantity;
  const tax = total * 0.1;
  const grandTotal = total + tax;

  return (
    <div>
      <h2>価格計算</h2>
      <p>小計: {total}円</p>
      <p>税込: {grandTotal}円</p>
    </div>
  );
}

// ========================================
// メインApp
// ========================================
export default function App() {
  // レンダリング回数を保持（更新しても再レンダーは発生しない）
  const renderCountRef = useRef(0);

  // このコンポーネントがレンダーされるたびに増える
  renderCountRef.current += 1;

  // 現在時刻を取得
  const now = new Date();
  const timeString = now.toLocaleTimeString();

  return (
    <div style={{ padding: "20px" }}>
      <h1>純粋なコンポーネントとは - 演習</h1>

      <section
        style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>コンポーネント1: Greeting</h3>
        <Greeting name="田中" renderCount={renderCountRef.current} />
      </section>

      <section
        style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>コンポーネント2: CurrentTime</h3>
        <CurrentTime timeString={timeString} />
      </section>

      <section
        style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}
      >
        <h3>コンポーネント3: PriceDisplay</h3>
        <PriceDisplay price={1000} quantity={3} />
      </section>

      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f5f5f5" }}>
        <p>
          <strong>課題:</strong> 上記3つのコンポーネントのうち、純粋でないものを特定し、
          純粋に書き換えてください。
        </p>
      </div>
    </div>
  );
}
