## 各useMemo/useCallbackについて「必要」「不要」の判断とその理由
* title
  * useMemo不要
   * メモ化した値を小コンポーネントに渡してるわけではないから
   * 文字列を生成してるだけで、重たい処理ではない
* containerStyle
  * useMemo不要
   * メモ化した値を小コンポーネントに渡してるわけではないから
   * 文字列を生成してるだけで、重たい処理ではない
* allItems
  * useMemo必要
   * filteredItemsはuseMemo化されており、その依存として指定されているので、レンダーの度に配列が際生成され参照が変化すると、実質filteredItemsはメモ化されないことになるので、こちらはメモ化しておくべき。
* filteredItems
  * useMemo必要
   * メモ化が実施されてるExpensiveListコンポーネントのpropsとして指定されているので、ExpensiveListコンポーネントのレンダリングを効率化するのに役立つ
* handleItemClick
  * useMemo必要
   * メモ化が実施されてるExpensiveListコンポーネントのpropsとして指定されているので、ExpensiveListコンポーネントのレンダリングを効率化するのに役立つ
* handleIncrement
  * useMemo不要
   * メモ化した値を小コンポーネントに渡してるわけではないから
   * 重たい処理ではない
* queryLength
  * useMemo不要
   * メモ化した値を小コンポーネントに渡してるわけではないから
   * 重たい処理ではない



## 削除すべきものと残すべきものの整理
* 残す
　* allItems
　* filteredItems
　* handleItemClick
* 残さない
　* 上記以外

---

> **✅ 実装演習 評価: 概ね正しい** - 7つすべてについての判断と実装が整合しており、設計通りのリファクタリングが行われています。
>
> 各項目の評価：
> - **(1) title**: ✅ 不要 → 削除済み。文字列はプリミティブなので参照問題なし。正しい判断。
> - **(2) containerStyle**: ✅ 不要 → 削除済み。正しい判断。ただし補足すると、このオブジェクトはReact.memoされたExpensiveListには渡されておらず、親の`<div>`に直接使われているだけなので不要です。仮にReact.memoされた子に渡すなら、レンダーのたびに新しいオブジェクトが生成され参照が変わるため、useMemoの意味が出てきます。
> - **(3) allItems**: ✅ 必要 → 残し。filteredItemsのuseMemoの依存配列に含まれているため、参照を安定させる必要がある。正しい判断。ただしもう一つの選択肢として、allItemsをコンポーネントの外に定数として定義する（今回のようにstateに依存しないリテラル配列なので）方法もあります。その場合useMemoも不要になります。
> - **(4) filteredItems**: ✅ 必要 → 残し。React.memoされたExpensiveListのpropsに渡すため。正しい判断。
> - **(5) handleItemClick**: ✅ 必要 → 残し。同上。正しい判断。
> - **(6) handleIncrement**: ✅ 不要 → 削除済み。React.memoされた子に渡していない。正しい判断。
> - **(7) queryLength**: ✅ 不要 → 削除済み。`query.length`は単純な計算でプリミティブ値。正しい判断。
