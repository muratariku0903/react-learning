# Portals - 基本的な使い方

## 目的

ReactのPortalsが**なぜ必要なのか**を理解し、`createPortal`を使って**親のスタイル制約から解放されたUI**を実装できるようになる。

---

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1. Portalsが解決する問題

以下のようなコンポーネント構造があるとします。

```tsx
function App() {
  return (
    <div style={{ overflow: 'hidden', height: '200px' }}>
      <Button />
      <Modal>モーダルの内容</Modal>
    </div>
  );
}
```

この構造でモーダルを画面全体に表示しようとしたとき、どんな問題が起きますか？
また、なぜその問題が起きるのかを説明してください。

### Q2. createPortalの役割

`createPortal(children, container)` の2つの引数はそれぞれ何を表していますか？
自分の言葉で説明してください。

---

## 実装演習

### 現状の問題

`App.tsx` には、ボタンをクリックするとモーダルが表示される実装があります。
しかし、現在のモーダルは**親の `overflow: hidden` の影響を受けて**正しく表示されません。

### 課題

1. `design.md` に設計メモを書く
   - どのようにPortalを使ってこの問題を解決するか
   - モーダルの描画先をどこにするか

2. `components/Modal.tsx` を修正して、Portalを使ったモーダルを実装する
   - `createPortal` を使用すること
   - モーダルの描画先は `document.body` を使用すること

### 期待する動作

- ボタンをクリックするとモーダルが表示される
- モーダルは画面中央に表示され、親の `overflow: hidden` の影響を受けない
- 背景のオーバーレイが画面全体を覆う

---

## ヒント

<details>
<summary>ヒント1: createPortalのインポート</summary>

```tsx
import { createPortal } from 'react-dom';
```

</details>

<details>
<summary>ヒント2: 描画先の指定</summary>

`document.body` をそのまま描画先として使えます。

</details>
