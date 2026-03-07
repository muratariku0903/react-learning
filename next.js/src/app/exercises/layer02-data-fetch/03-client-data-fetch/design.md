**search-basic/page.tsx を実装**
UseStateで入力された検索ワードと検索結果、そしてローディング状態、エラー状態、この4つを管理する。
UseEffect を使って検索ワードの変更を検知し、API の呼び出しを実行する。API を呼び出している間はローディング中にし、完了となったらローディングを解除し、検索結果を表示する。

**実装後に考えてほしいこと**
- URLにキーワードが含まれないため、共有やブラウザバックで何が起きるか？
  - 検索結果が初期化されます。 
- ページをリロードしたら検索状態はどうなるか？
  - 検索結果が初期化されます。
- キャッシュの仕組みがないことで、どんな無駄が発生するか？
  - すでに同じキーワードで検索したにもかかわらず、毎回オリジンにデータを検索しに行きます。
- 入力するたびに毎回 fetch が走ることへの対処は？
  - 入力文字ごとに毎回検索が走り、その検索ごとに毎回レンダリングが実施されるので画面がちらつく。
- これらの課題が SWR + 探索クエリでどう解消されるかを、後の演習で体感しよう


**with-use/page.tsx を実装**
//   1. Server Component (このファイル) で fetch() を呼ぶが、await しない → Promise のまま保持
//   2. その Promise を Client Component に props として渡す
//   3. Client Component 側で use(promise) を呼び、Promise の値を読み取る
//   4. use() は Promise が解決するまでコンポーネントを suspend させるため、Suspense が必要

**with-swr/page.tsx を実装**
//   - useSWR(key, fetcher) の形で使う
//   - fetcher: (url: string) => fetch(url).then(res => res.json())
//   - data, error, isLoading を使ってローディング/エラー/データ表示を分岐

**with-tanstack/page.tsx を実装**
//   - QueryClientProvider のセットアップが必要（layout.tsx で囲むパターンが一般的）
//   - useQuery({ queryKey: ['posts'], queryFn: ... }) の形で使う
//   - isPending, error, data を使って表示を分岐

