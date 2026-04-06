# React Hook Form 演習

実践的な React Hook Form の使い方を、段階的に学ぶ演習集です。
進める順番は基本的に下記の通りですが、興味のあるものから取り組んでも構いません。

| # | サブトピック | テーマ |
|---|---|---|
| 1 | [basic-usage](./basic-usage) | `register` / `Controller` / バリデーション基礎 |
| 2 | [nested-field-array](./nested-field-array) | `useFieldArray` のネスト（フォーム in フォーム） |
| 3 | [multi-step-wizard](./multi-step-wizard) | 複数ページにまたがるウィザードフォーム |
| 4 | [conditional-performance](./conditional-performance) | 条件分岐フィールドと再レンダリング最適化（アンチパターン修正） |

各演習を試す際は、ルートの `src/App.tsx` で対応する `App.tsx` を import してください。

```ts
import ExerciseApp from "./exercises/react-hook-form/basic-usage/App";

export default function App() {
  return <ExerciseApp />;
}
```
