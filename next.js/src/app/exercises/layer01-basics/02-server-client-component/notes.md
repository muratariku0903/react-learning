## 課題A
page.tsxにuseStateを呼び出すと、以下のエラーが発生した。
`"useState" is not allowed in Server Components.`
上記が発生する理由としては、サーバー側でReactの状態管理が提供されていないためと考えられるので、サーバー側でReactのHooksを使うことはできないと考えられる。


## 課題C
1. 文字列 → 渡せるか？
→渡せる
2. オブジェクト → 渡せるか？
→渡せる
3. 関数（`() => console.log("hello")`）→ 渡せるか？
→渡せない
`Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.
  <... name="test" obj={{...}} fn={function fn}>`
サーバコンポーネントからクライアントコンポーネントに直接関数を渡さず、関数の定義はクライアントコンポーネントで実施する。その関数で使いたいデータだけ、サーバーコンポーネントから受け取る。

