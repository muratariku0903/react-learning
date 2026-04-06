type Props = {
  value: number;
  onChange: (next: number) => void;
};

/**
 * 5段階の星評価コンポーネント。
 * 完全制御コンポーネントとして外部に value / onChange を公開する。
 * register では繋げないので Controller を使うことになる。
 */
export function Rating({ value, onChange }: Props) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n === value ? 0 : n)}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "none",
            fontSize: 24,
            color: n <= value ? "#f5a623" : "#ccc",
          }}
          aria-label={`${n} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
