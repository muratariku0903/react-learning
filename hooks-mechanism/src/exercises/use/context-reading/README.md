# use フック - Contextの柔軟な読み取り

## 目的

この演習では、以下を理解することを目指します：

- `use(Context)`と`useContext(Context)`の違い
- `use`がHooksのルールに縛られない点の意味と利点
- 条件分岐内でContextを読み取るパターン

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に回答してください：

1. **`useContext`はコンポーネントのトップレベルでしか呼び出せませんが、`use`は条件分岐やループ内でも呼び出せます。この違いが具体的に役立つのはどんな場面ですか？自分なりの具体例を1つ挙げて説明してください。**

2. **以下のコードで、`useContext`を使った場合と`use`を使った場合の動作の違いを説明してください。特に、`showTheme`が`false`のときの挙動に注目してください。**

   ```jsx
   // パターンA: useContext
   function ComponentA({ showTheme }) {
     const theme = useContext(ThemeContext); // 常に呼び出される
     if (!showTheme) return <p>テーマ非表示</p>;
     return <p>テーマ: {theme}</p>;
   }

   // パターンB: use
   function ComponentB({ showTheme }) {
     if (!showTheme) return <p>テーマ非表示</p>;
     const theme = use(ThemeContext); // 必要なときだけ呼び出される
     return <p>テーマ: {theme}</p>;
   }
   ```

3. **`use`がHooksのルールに縛られないからといって、何でも自由に書いてよいわけではありません。`use`を使うときに守るべきルールや注意点は何ですか？**

### 実装演習（design.mdに設計を記載後、実装）

`App.tsx`には、テーマ（light/dark）とロケール（ja/en）の2つのContextが用意されています。しかし、`UserGreeting`コンポーネントの実装が不完全です。

1. `design.md` に以下を記載してください：
   - `use`を使ってどのようにContextの値を読み取るか
   - `isLoggedIn`が`false`のときにContextを読まないようにする設計
2. `use`フックを使って、条件に応じたContext読み取りを実装してください
   - ログイン状態（`isLoggedIn`）が`true`のときだけテーマとロケールを適用する
   - ログアウト状態では、Context読み取りをスキップしてシンプルな表示にする

## 制約条件

- Contextの読み取りには`use`を使うこと（`useContext`は使わない）
- 条件分岐内での`use`呼び出しを少なくとも1箇所は含めること
- 既存のContext定義やProviderの構造は変更しないこと

## ヒント

- `use`は早期リターンの後でも呼び出せます。これは`useContext`にはない特徴です
- Contextの値が不要なケースでは、読み取り自体をスキップすることでパフォーマンスの意図を明確にできます
