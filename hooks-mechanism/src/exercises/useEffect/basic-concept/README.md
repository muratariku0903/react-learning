# useEffect 基本概念 - 副作用とレンダーの分離

## 目的

この演習では、以下を理解することを目指します：

- Reactにおける「純粋なレンダー」とは何か
- なぜレンダー中に副作用を実行してはいけないのか
- useEffectがどのタイミングで実行されるのか

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **「レンダー中に副作用を実行してはいけない」と言われますが、具体的にどんな問題が起こり得ますか？StrictModeの挙動と絡めて説明してください。**

2. **以下のコードには問題があります。何が問題で、どう修正すべきかを説明してください。**
   ```jsx
   function UserProfile({ userId }) {
     const [user, setUser] = useState(null)

     // ユーザー情報を取得
     fetch(`/api/users/${userId}`)
       .then(res => res.json())
       .then(data => setUser(data))

     return <div>{user?.name}</div>
   }
   ```

3. **render（レンダー）フェーズとcommit（コミット）フェーズの違いを、useEffectの実行タイミングと絡めて説明してください。**

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx` には、レンダー中に副作用（console.log）を実行している問題のあるコードがあります。

1. まず現状のコードを実行し、StrictModeでの挙動を確認してください
2. `design.md` に以下を記載してください：
   - 現状の問題点
   - 修正方針
3. useEffectを使って適切に修正してください

## 制約条件

- 修正後も同じ機能（カウントが変わるたびにログ出力）を維持すること
- console.logは1回のカウント変更につき1回だけ出力されるようにすること

## ヒント

- React DevToolsの「Highlight updates」機能で再レンダーを可視化できます
- StrictModeは開発時のみ有効で、本番ビルドでは無効になります
