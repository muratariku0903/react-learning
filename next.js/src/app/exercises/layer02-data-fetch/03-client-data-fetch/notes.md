# 演習2-3: 実装レビュー（Claude）

## 全体評価

全6ファイルの実装を確認。Server/Client Component の使い分け、各データ取得ライブラリの使い方、Provider の配置、すべて適切に実装されている。

---

## search-basic/page.tsx — 良い点

- **`ignore` フラグによるクリーンアップが正しく実装されている。** useEffect のクリーンアップで `ignore = true` にして、古いリクエストの結果を無視するパターン（Race Condition 防止）は React 公式ドキュメントでも推奨されているベストプラクティス。しっかり押さえている。
- useState で4つの状態（input, loading, error, result）を個別管理しているのは、この演習の目的に合致している。後で SWR がこれらを `useSWR` 一つで管理してくれることの恩恵を体感するための良い土台。

### 考えてほしいポイント

1. **`setLoading(true)` の位置**: 現在 `fetchData` 関数の中で `setLoading(true)` を呼んでいるが、`fetchData` は async 関数なので、`setLoading(true)` は同期的に呼ばれてからawaitに入る。動作としては問題ないが、「状態のセット」と「非同期処理の実行」が一つの関数に混在している。`fetchData` を純粋にデータ取得だけにして、`setLoading` は呼び出し側で管理するほうが責務が明確になる — このあたりは好みの範囲でもあるが、考えてみてほしい。

2. **`encodeURIComponent` の欠落**: `keyword` をそのまま URL に埋め込んでいるが、もしキーワードに `&` や `#` などの特殊文字が含まれたらどうなるか？ URLの安全性を考えると `encodeURIComponent(keyword)` で囲むのが定石。

3. **design.md の振り返り回答について**: 「入力するたびに毎回 fetch が走ることへの対処は？」に対して「画面がちらつく」と現象を書いてくれたが、対処方法そのものは考えたか？ debounce（一定時間入力が止まってから fetch）や、AbortController による前のリクエストのキャンセルなど、手段も考えてみてほしい。

---

## with-use/page.tsx + SearchResult.tsx — 良い点

- Server Component で `fetch()` を **await せず** Promise のまま保持し、Client Component に渡すパターンが正確に実装されている。
- `use(postsPromise)` の使い方、Suspense の配置、すべて正しい。

---

## with-swr/page.tsx + SearchResultWithSWR.tsx — 良い点

- `useSWR` の基本パターン（key, fetcher）が正確。
- ローディング・エラー・データの3状態のハンドリングもできている。

---

## with-tanstack/page.tsx + layout.tsx + SearchResultWithQuery.tsx — 良い点

- **`useState(() => new QueryClient())` で QueryClient を初期化している点が優秀。** `new QueryClient()` を直接書くとレンダリングのたびに新しいインスタンスが作られるが、`useState` の初期化関数にすることで1回だけ生成される。これは TanStack Query の公式でも推奨されているパターン。
- layout.tsx に Provider を配置する判断が正確。「Server Component の layout.tsx から Client Component の Provider をインポートして使う」というパターンを正しく実践できている。

---

## search/page.tsx + SearchResultSWRWithSearchParams — 良い点

- **探索クエリ（searchParams）を使って URL にキーワードを含めている。** `router.replace` で URL を更新し、`useSearchParams` で取得するパターンが正しく実装されている。
- SWR のキーに `keyword` を含めることで、キーワード変更 → URL 更新 → searchParams 変更 → SWR キー変更 → 自動再取得、という流れが実現できている。

### 考えてほしいポイント

1. **`defaultValue` の未設定**: input に `defaultValue={keyword}` を設定していないので、URL に `?keyword=xxx` がある状態でページをリロードすると、検索結果は `xxx` で表示されるが input 欄は空になる。search-basic との違いとして「URL にキーワードが残るからリロードしても検索結果が保持される」のが利点のはずだが、input 欄と URL の整合性が取れていない。これを修正するとしたらどうするか？

2. **search-basic vs search の比較振り返り**: 実際に両方実装してみて、以下の違いを体感できたか？
   - URL にキーワードが含まれることで共有・ブックマーク可能になった
   - SWR のキャッシュにより、同じキーワードの再検索が瞬時に表示される
   - useState × 4 が `useSWR` 1行に置き換わりコード量が大幅に削減された
   - `ignore` フラグのような Race Condition 対策を自分で書く必要がなくなった
