### どの状態更新を transition でラップするか
setResourceをtransitionでラップする。

### `isPending` をどのようにUIに反映するか
isPendingを使用して、更新中は検索結果にスタイルを適応し、更新中であることをアピールする

---
## 評価コメント

✅ 設計と実装が一致しています。

### 良い点
- `setQuery`（入力欄）は即時更新、`setResource`（検索結果）はtransition内で更新、と適切に分離
- `isPending`で`opacity`を変える実装はシンプルかつ効果的
- `transition: "opacity 150ms ease"`でスムーズな視覚効果を追加している点も良い

### 補足
この実装では、入力のたびに新しいリソースが作成されますが、`startTransition`により前のtransitionは自動的にキャンセルされ、最新のものだけが反映されます。これにより、debounce/throttleなしでも自然な挙動になります。
