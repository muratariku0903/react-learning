# useMemo 基本概念 - 参照の同一性と値のキャッシュ

## 目的

この演習では、以下を理解することを目指します：

- レンダーのたびにオブジェクトや配列の参照が変わることの意味
- useMemoが「何を保存しているか」「いつ再計算するか」
- useMemoの依存配列がuseEffectと同じ比較ロジックであること

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **以下の2つのコードを比較してください。Parentコンポーネントのstateであるcountがインクリメントされたとき、それぞれの`expensiveResult`はどうなりますか？その理由も説明してください。**

   ```jsx
   // パターンA
   function Parent() {
     const [count, setCount] = useState(0)
     const [text, setText] = useState("")

     const expensiveResult = heavyCalc(text)

     return (
       <>
         <button onClick={() => setCount(c => c + 1)}>+1</button>
         <input onChange={(e) => setText(e.target.value)} />
         <p>{expensiveResult}</p>
       </>
     )
   }

   // パターンB
   function Parent() {
     const [count, setCount] = useState(0)
     const [text, setText] = useState("")

     const expensiveResult = useMemo(() => heavyCalc(text), [text])

     return (
       <>
         <button onClick={() => setCount(c => c + 1)}>+1</button>
         <input onChange={(e) => setText(e.target.value)} />
         <p>{expensiveResult}</p>
       </>
     )
   }
   ```

2. **useMemoとuseEffectは内部的に同じ依存配列の比較ロジックを持っています。では、この2つの決定的な違いは何ですか？「いつ実行されるか」「何を返すか」の観点から説明してください。**

3. **以下のコードで、`userInfo`をuseMemoでラップする意味はありますか？理由を説明してください。**

   ```jsx
   function Profile({ userId }) {
     const [user, setUser] = useState(null)

     useEffect(() => {
       fetchUser(userId).then(setUser)
     }, [userId])

     const userInfo = useMemo(() => ({
       name: user?.name,
       email: user?.email,
     }), [user])

     return <UserCard info={userInfo} />
   }
   ```

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx` には、フィルタリング処理をレンダーのたびに毎回実行している非効率なコードがあります。

1. まず現状のコードを実行し、カウンターのボタンを押すたびにコンソールにどんなログが出るか確認してください
2. `design.md` に以下を記載してください：
   - なぜカウンターの変更でフィルタリングが再実行されるのか
   - useMemoを使ってどう最適化するか
3. useMemoを使って、フィルタリング処理がqueryの変更時のみ実行されるよう修正してください

## 制約条件

- 修正後もフィルタリング機能が正常に動作すること
- `console.log("フィルタリング実行")` はそのまま残し、実行タイミングの確認に使うこと

## ヒント

- useMemoの第二引数（依存配列）に何を入れるかが鍵です
- useEffectの依存配列と同じ考え方で判断できます
