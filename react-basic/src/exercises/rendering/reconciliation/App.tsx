// Reconciliation（差分計算）演習
// この演習では、要素のtypeの違いによる再作成の挙動を観察します

import { useState, type ElementType, type ReactNode } from "react";

export default function App() {
  const [parentType, setParentType] = useState<ElementType>("div");
  const [parentLabel, setParentLabel] = useState("input");
  const [childType, setChildType] = useState<ElementType>("input");
  const [childLabel, setChildLabel] = useState("input");

  return (
    <div>
      <h1>Reconciliation（差分計算）</h1>
      <p>README.mdの要件に従って実装してください。</p>
      {/* ここに要素タイプ切り替えUIを実装 */}
      <div className="display-flex">
        <button onClick={() => setParentType(parentType === "div" ? "section" : "div")}>
          type切り替え（親）
        </button>
        <button
          onClick={() => setChildType(childType === "input" ? "textarea" : "input")}
        >
          type切り替え（子）
        </button>
        <button
          onClick={() => setParentLabel(parentLabel === "input" ? "textarea" : "input")}
        >
          属性切り替え（親）
        </button>
        <button
          onClick={() => setChildLabel(childLabel === "input" ? "textarea" : "input")}
        >
          属性切り替え（子）
        </button>
      </div>
      <Box as={parentType} label={parentLabel}>
        <Box as={childType} label={childLabel}></Box>
      </Box>
    </div>
  );
}

const Box = ({
  as: Component = "div",
  children,
  label,
}: {
  as: ElementType;
  children?: ReactNode;
  label: string;
}) => {
  return <Component label={label}>{children}</Component>;
};
