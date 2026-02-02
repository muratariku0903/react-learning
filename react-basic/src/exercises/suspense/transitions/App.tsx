import { useState, Suspense, useTransition } from "react";
import { wrapPromise } from "./components/wrapPromise";

// TODO: useTransition を使って、入力はサクサク、結果更新は後回しにしてください

type SearchResult = {
  id: number;
  title: string;
};

// 検索API（1秒かかる想定）
function searchItems(query: string): Promise<SearchResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query) {
        resolve([]);
        return;
      }

      // ダミーの検索結果
      const results = [
        { id: 1, title: `${query} に関する記事1` },
        { id: 2, title: `${query} に関する記事2` },
        { id: 3, title: `${query} について詳しく解説` },
        { id: 4, title: `${query} の使い方ガイド` },
        { id: 5, title: `${query} 入門` },
      ];
      resolve(results);
    }, 2000);
  });
}

// リソースを作成する関数
function createSearchResource(query: string) {
  return wrapPromise(searchItems(query));
}

// 検索結果を表示するコンポーネント
function SearchResults({
  resource,
}: {
  resource: ReturnType<typeof createSearchResource>;
}) {
  const results = resource.read();

  if (results.length === 0) {
    return <p>検索結果がありません</p>;
  }

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

// 初期リソース（空の検索）
const initialResource = createSearchResource("");

export default function App() {
  const [query, setQuery] = useState("");
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();

  // 現状: 入力のたびに同期的にリソースを更新
  // これにより、タイピングがもたつく可能性がある
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nextQuery = e.target.value;
    setQuery(nextQuery);
    startTransition(() => setResource(createSearchResource(nextQuery)));
  }

  return (
    <div>
      <h1>検索フォーム</h1>
      <p>useTransition を使って入力体験を改善してください</p>

      <div style={{ marginBottom: "16px" }}>
        <label>
          検索:
          <input
            type="text"
            value={query}
            onChange={handleChange}
            style={{ marginLeft: "8px", padding: "4px 8px" }}
          />
        </label>
      </div>

      <div
        style={{
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 150ms ease",
        }}
      >
        <Suspense fallback={<div>検索中...</div>}>
          <SearchResults resource={resource} />
        </Suspense>
      </div>
    </div>
  );
}
