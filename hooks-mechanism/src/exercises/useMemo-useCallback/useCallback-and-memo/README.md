# useCallback と React.memo - 子コンポーネントの不要な再レンダー防止

## 目的

この演習では、以下を理解することを目指します：

- useCallbackが「関数を返すuseMemo」であること
- React.memoと組み合わせることで子コンポーネントの再レンダーを防げること
- 関数の参照が変わることがなぜ問題になるのか

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **`useCallback(fn, deps)` は `useMemo(() => fn, deps)` と等価と言われます。これはどういう意味ですか？「useMemoが値をキャッシュする」という前提をもとに、自分の言葉で説明してください。**

2. **以下のコードで、ボタンを押してcountが変わるたびにChildが再レンダーされます。なぜですか？React.memoをつけているのに再レンダーされる理由を、「参照」という言葉を使って説明してください。**

   ```jsx
   const Child = React.memo(({ onClick }: { onClick: () => void }) => {
     console.log("Child rendered")
     return <button onClick={onClick}>子ボタン</button>
   })

   function Parent() {
     const [count, setCount] = useState(0)

     const handleClick = () => {
       console.log("clicked")
     }

     return (
       <>
         <button onClick={() => setCount(c => c + 1)}>+1: {count}</button>
         <Child onClick={handleClick} />
       </>
     )
   }
   ```

3. **useCallbackを使えば常にパフォーマンスが良くなるわけではありません。useCallbackを使うこと自体にもコストがあります。どんなコストですか？**

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx` には、親コンポーネントのstate変更のたびに子コンポーネントが不要に再レンダーされる問題があります。

1. まず現状のコードを実行し、「親カウント+1」ボタンを押したときのコンソール出力を確認してください
2. `design.md` に以下を記載してください：
   - なぜ親のstate変更で子が再レンダーされるのか
   - どのHook/APIを使ってどう修正するか
3. `useCallback` と `React.memo` を適切に使い、親のcountが変わっても子コンポーネントが再レンダーされないように修正してください

## 制約条件

- 子コンポーネントの「子ボタン」をクリックしたときの機能はそのまま維持すること
- `console.log` はそのまま残し、再レンダーの確認に使うこと
- 子コンポーネントの定義は別コンポーネントとして維持すること（インライン化しない）

## ヒント

- React.memoはpropsが変わらない場合にレンダーをスキップします
- 「propsが変わらない」とは、参照が同じであることを意味します
