import { useState } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
};

const cards: Card[] = [
  { id: 1, title: "タスク1", description: "買い物に行く" },
  { id: 2, title: "タスク2", description: "レポートを書く" },
  { id: 3, title: "タスク3", description: "メールを返信する" },
];

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setSelectedId(id);
    console.log(`カード ${id} が選択されました`);
  };

  const handleDelete = (id: number) => {
    // TODO: ここに修正が必要かもしれません
    alert(`カード ${id} を削除しますか？`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>タスクリスト</h1>
      <p>選択中: {selectedId ? `カード ${selectedId}` : "なし"}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              border: selectedId === card.id ? "2px solid blue" : "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: selectedId === card.id ? "#e6f0ff" : "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0 }}>{card.title}</h3>
                <p style={{ margin: "5px 0 0", color: "#666" }}>{card.description}</p>
              </div>
              <button
                onClick={() => handleDelete(card.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
