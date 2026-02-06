# useEffect 依存配列 - 再実行条件の仕組み

## 目的

この演習では、以下を理解することを目指します：

- 依存配列がどのように動作するのか
- 依存配列の有無による挙動の違い
- ESLintが依存配列の不備を警告する理由

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **以下の3つのuseEffectは、それぞれどのタイミングで実行されますか？違いを説明してください。**
   ```jsx
   // パターンA
   useEffect(() => {
     console.log("A")
   })

   // パターンB
   useEffect(() => {
     console.log("B")
   }, [])

   // パターンC
   useEffect(() => {
     console.log("C")
   }, [count])
   ```

2. **依存配列に「空配列 `[]`」を渡すと「マウント時に1回だけ実行」されますが、これは偶然の結果です。なぜそうなるのか、依存配列の比較ロジックから説明してください。**

3. **以下のコードはESLintに警告されます。なぜ警告されるのか、そして無視するとどんな問題が起こり得るか説明してください。**
   ```jsx
   function SearchResults({ query }) {
     const [results, setResults] = useState([])

     useEffect(() => {
       fetch(`/api/search?q=${query}`)
         .then(res => res.json())
         .then(data => setResults(data))
     }, []) // ← ESLint: React Hook useEffect has a missing dependency: 'query'

     return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
   }
   ```

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx` にはタイマー機能があります。現在、以下の問題があります：

- 「開始」ボタンを押すと1秒ごとにカウントアップするはずが、正しく動作しない
- 依存配列の設定に問題がある

**タスク：**
1. 現状のコードを実行し、問題を確認してください
2. `design.md` に以下を記載してください：
   - なぜ現在のコードが正しく動作しないのか
   - どのように修正するか（複数のアプローチがあれば比較）
3. 適切に修正してください

## 制約条件

- setIntervalを使った実装を維持すること
- 「停止」ボタンでタイマーを止められること
- タイマー実行中に「開始」を複数回押しても、タイマーが重複しないこと

## ヒント

- 関数型アップデート `setCount(prev => prev + 1)` を思い出してみてください
- 依存配列に何を入れるかによって、effectの再実行タイミングが変わります
