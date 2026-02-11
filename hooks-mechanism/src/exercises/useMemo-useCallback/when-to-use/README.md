# useMemo・useCallback の使いどころ - 過剰な最適化を避ける

## 目的

この演習では、以下を理解することを目指します：

- useMemo/useCallbackは「正しさ」ではなく「最適化」のためのものであること
- 過剰な最適化（premature optimization）がなぜ逆効果になるか
- 本当にuseMemo/useCallbackが必要な場面を見極める判断力

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **以下のコードでは、useMemo/useCallbackが使われていません。このコードにuseMemo/useCallbackを追加するべきですか？理由とともに答えてください。**

   ```jsx
   function Greeting({ name }) {
     const message = `Hello, ${name}!`
     const handleClick = () => {
       alert(message)
     }

     return <button onClick={handleClick}>{message}</button>
   }
   ```

2. **useState, useEffect, useMemo, useCallbackの4つのHooksは、内部的に共通する仕組みがあります。それは何ですか？ロードマップで学んだ内容を踏まえて、「hooks配列」「currentIndex」「deps比較」というキーワードを使って説明してください。**

3. **「useMemo/useCallbackは削除しても正しく動くべきである」とReact公式ドキュメントに書かれています。これはどういう意味ですか？useEffectとの対比で説明してください。**

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx` には、useMemo/useCallbackが**過剰に**使われているコードがあります。

1. まず現状のコードを読み、それぞれのuseMemo/useCallbackが本当に必要かどうかを判断してください
2. `design.md` に以下を記載してください：
   - 各useMemo/useCallbackについて「必要」「不要」の判断とその理由
   - 削除すべきものと残すべきものの整理
3. 不要なuseMemo/useCallbackを削除して、シンプルなコードにリファクタリングしてください

## 制約条件

- 機能は一切変更しないこと（見た目・動作が完全に同じであること）
- 本当に必要なuseMemo/useCallbackは残すこと（全削除が正解とは限りません）

## ヒント

- useMemo/useCallbackが効果的なのは、以下のいずれかに該当する場合です：
  - 計算コストが本当に高い処理
  - React.memoされた子コンポーネントにpropsとして渡す値/関数
  - useEffectの依存配列に含まれる値/関数
- プリミティブ値（文字列、数値）はそもそも参照の問題が起きません
