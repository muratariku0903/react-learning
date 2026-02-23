`use`は、React 19以降で導入が予定されている（または既に利用可能な環境がある）新しいAPIで、主に**Promise（非同期リソース）やContext**の値を、コンポーネント内でより簡潔かつ柔軟に読み取れるようにするもの。

---

## 💡 `use`フックの主な役割と特徴

`use`の最も重要な役割は、コンポーネントのレンダリングをブロックせずに非同期データを取得し、**`<Suspense>`とシームレスに連携**すること、そして従来の`useContext`よりも柔軟な方法でContextを読み取ること。

### 1. Promise（非同期リソース）の読み取り

`use`にPromiseを渡すことで、コンポーネント内で非同期処理の結果を**同期的な値**として直接取得できる。

- **動作:** `use(promise)`を呼び出すと、Promiseが解決されるまでコンポーネントのレンダリングが中断される（サスペンド）。
- **Suspenseとの連携:** コンポーネントがサスペンドすると、最も近い親の`<Suspense>`コンポーネントの`fallback`が表示。Promiseが解決されると、コンポーネントは再開し、データを利用してレンダリングされる。
- **従来の`await`との違い:** サーバーコンポーネントでは`async/await`を使うことが推奨されますが、**クライアントコンポーネント**でPromiseを処理し、`<Suspense>`と連携させる主要な方法となる。

### 2. Contextの柔軟な読み取り

`useContext`と同様にContextの値を読み取ることができるが、`use`には**React Hooksのルール（トップレベルでの呼び出し）が適用されない**。

- **柔軟性:** `useContext`はコンポーネントのトップレベルでのみ呼び出せますが、**`use`は`if`文やループなどの条件分岐やブロック内でも呼び出すことが可能**。

```jsx
// 従来の useContext は条件分岐内では使えない
// function Component() {
//   if (condition) {
//     const theme = useContext(ThemeContext); // ❌ ルール違反
//   }
// }

// use フックは条件分岐内で使える
import { use } from 'react';

function Component({ condition }) {
  if (condition) {
    // ✅ use は条件分岐内でも呼び出し可能
    const theme = use(ThemeContext);
    return <div className={theme}>...</div>;
  }
  return null;
}
```

# ⚙️ 基本的な使い方

`use`フックのAPIは非常にシンプルです。

```jsx
import { use } from 'react';

// Promiseを返す非同期関数
const fetchData = () => new Promise(resolve => setTimeout(() => resolve('Hello Data!'), 1000));

// データ取得と表示を行うコンポーネント
function DataComponent() {
  // ① Promiseを直接渡す
  const data = use(fetchData()); 

  // ② Contextを直接渡す
  const theme = use(ThemeContext); 
  
  return <div className={theme}>{data}</div>;
}

function App() {
  return (
    // <Suspense> で囲むことで、データ取得中にローディングを表示
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}
```

---

## ⚠️ 注意点

- **呼び出し元:** `use`は、通常のReact Hookと同様に**コンポーネントまたはカスタムフック内**で呼び出す必要がある。
- **サーバーコンポーネント:** サーバーコンポーネント（`async function`で定義されたコンポーネント）で非同期データを取得する場合は、`use`ではなく**`await`を使用する**ことが推奨。`await`はレンダリングを中断した場所から再開しますが、`use`はデータ解決後にコンポーネント全体を再レンダリングする可能性があるため。
