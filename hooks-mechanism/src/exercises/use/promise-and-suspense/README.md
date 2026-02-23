# use フック - Promiseの読み取りとSuspense連携

## 目的

この演習では、以下を理解することを目指します：

- `use`フックがPromiseをどのように扱うのか
- `use(promise)`とSuspenseの連携の仕組み
- クライアントコンポーネントにおける非同期データ取得のパターン

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **`use(promise)`を呼び出したとき、Promiseがまだ解決されていない場合、コンポーネントはどうなりますか？その後、Promiseが解決されたときにどのようなプロセスを経てデータが表示されますか？**

2. **以下のコードには重大なパフォーマンス問題があります。何が問題で、どう修正すべきかを説明してください。**

   ```jsx
   import { use, Suspense } from 'react';

   function UserProfile() {
     const user = use(fetch('/api/user').then(res => res.json()));
     return <div>{user.name}</div>;
   }

   function App() {
     return (
       <Suspense fallback={<p>Loading...</p>}>
         <UserProfile />
       </Suspense>
     );
   }
   ```

3. **`use`フックには「Hooksのルール（トップレベルでのみ呼び出す）」が適用されないと言われています。とはいえ、`use`に渡すPromiseの扱いには注意が必要です。「レンダーのたびに新しいPromiseを作ってはいけない」のはなぜですか？**

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx`には、ユーザー一覧を取得して表示するコンポーネントがありますが、データ取得部分が未実装です。

1. `design.md` に以下を記載してください：
   - `use`フックを使ってどのようにデータを取得・表示するか
   - Suspenseのfallbackをどこに配置するか
2. `use`フックと`<Suspense>`を使って、データ取得と表示を実装してください
3. 実装後、ブラウザでローディング表示→データ表示の切り替わりを確認してください

## 制約条件

- データ取得には `use` フックを使用すること（useEffect + useState パターンは使わない）
- Promiseは**コンポーネントの外側**で作成すること（レンダーのたびに新しいPromiseを生成しない）
- `<Suspense>` を適切に配置すること

## ヒント

- Promiseをコンポーネントの外で定義する（モジュールスコープ）か、親コンポーネントから渡すことで、再レンダー時に新しいPromiseが生成されるのを防げます
- React DevToolsのComponentsタブで、Suspenseの状態を確認できます
