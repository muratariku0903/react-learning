"use client";

import { useEffect, useState } from "react";

// この課題の目的:
//   SWR や探索クエリ（searchParams）を使わず、
//   React の基本フック（useState + useEffect）だけで検索機能を実装することで、
//   後に SWR + 探索クエリ版と比較し、それらの恩恵を体感する。
//
// 要件:
//   1. "use client" を付けて Client Component として実装する
//   2. useState でキーワード・データ・ローディング・エラーの各状態を管理する
//   3. useEffect でキーワードの変更に応じて fetch を実行する
//   4. API: https://jsonplaceholder.typicode.com/posts?_limit=10&q={keyword}
//   5. ローディング中・エラー時・データ表示の3状態をハンドリングする
//
// 実装後に考えてほしいこと:
//   - URLにキーワードが含まれないため、共有やブラウザバックで何が起きるか？
//   - ページをリロードしたら検索状態はどうなるか？
//   - キャッシュの仕組みがないことで、どんな無駄が発生するか？
//   - 入力するたびに毎回 fetch が走ることへの対処は？
//   - これらの課題が SWR + 探索クエリでどう解消されるかを、後の演習で体感しよう
type SearchResult = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

export default function SearchBasicPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    let ignore = false;

    async function fetchData(keyword: string) {
      setLoading(true);
      setError(null);

      const result = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&q=${keyword}`,
      );

      return await result.json();
    }

    fetchData(input)
      .then((data) => {
        console.log("fetch data: ", data);
        if (!ignore) {
          setResult(data);
        }
      })
      .catch((e) => {
        console.log("error occur: ", e);
        if (!ignore) {
          setError("エラーが発生しました。");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [input]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">検索付き一覧（useState + useEffect）</h1>
      <p className="text-zinc-500 mb-4">
        まずは React の基本フックだけで実装し、後で SWR + 探索クエリ版と比較する
      </p>

      <div className="bg-white p-4">
        <input
          type="text"
          className="text-black border-black"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {loading && <div className="bg-yellow p-4">loading...</div>}

      {error && <div className="bg-red p4">{error}</div>}

      <ul className="p-4">
        {!loading &&
          !error &&
          result.map((data) => (
            <li className="pb-2" key={data.id}>
              title: {data.title}
              <br />
              body: {data.body}
            </li>
          ))}
      </ul>
    </div>
  );
}
