// TODO: ここで入れ子の useFieldArray (options) を実装する
// import { useFieldArray, useFormContext } from "react-hook-form";

type Props = {
  nestIndex: number;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export function ItemRow({ nestIndex, onRemove, onMoveUp, onMoveDown }: Props) {
  // const { control, register } = useFormContext();
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: `items.${nestIndex}.options`,
  // });

  return (
    <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <strong>商品 #{nestIndex + 1}</strong>
        <button type="button" onClick={onMoveUp}>↑</button>
        <button type="button" onClick={onMoveDown}>↓</button>
        <button type="button" onClick={onRemove}>削除</button>
      </div>

      {/* TODO: name / quantity の input をここに置く */}

      <div style={{ marginTop: 8 }}>
        <p>オプション:</p>
        {/* TODO: options の入れ子 useFieldArray をここで描画 */}
      </div>
    </div>
  );
}
