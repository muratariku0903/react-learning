# Portals - イベントバブリングの挙動

## 目的

Portalで描画されたコンポーネントのイベントが**ReactツリーとDOMツリーのどちらを基準にバブリングするか**を理解する。
これはPortalsを正しく使う上で**最も誤解されやすいポイント**。

---

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1. バブリングの基準

以下のコードがあるとします。

```tsx
function App() {
  return (
    <div onClick={() => console.log('App clicked')}>
      <Modal>
        <button onClick={() => console.log('Button clicked')}>
          クリック
        </button>
      </Modal>
    </div>
  );
}

function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.body
  );
}
```

ボタンをクリックしたとき、コンソールにはどのような順番でログが出力されますか？
また、なぜそうなるのかを説明してください。

### Q2. DOM上の位置とReactツリーの違い

上記の例で、DOM上ではModalはどこにありますか？
Reactの論理ツリー上ではModalはどこにありますか？
この「DOM上の位置」と「Reactツリー上の位置」の違いを意識することが、なぜ重要なのか説明してください。

---

## 実装演習

### 現状

`App.tsx` には以下の構造があります：
- 親コンテナにクリックイベントがある
- 子としてPortalを使ったモーダルがある
- モーダル内にボタンがある

### 課題

1. まず現状のコードを動かして、イベントバブリングの挙動を確認してください

2. `design.md` に以下を記録してください：
   - ボタンをクリックしたときのイベントの流れ
   - モーダルの背景（オーバーレイ）をクリックしたときの挙動
   - これがDOMベースのバブリングだった場合との違い

3. **追加課題**: モーダルの背景をクリックしたときに**親コンテナのonClickが発火しないように**修正してください
   - ヒント: イベントの伝播を制御する方法を考えてみてください

---

## ヒント

<details>
<summary>ヒント1: イベントバブリングの順序</summary>

Reactのイベントは**Reactツリーを上向きに**伝播します。
DOMツリーではなく、Reactのコンポーネントツリーが基準です。

</details>

<details>
<summary>ヒント2: イベント伝播の制御</summary>

`e.stopPropagation()` はReactのイベント伝播を止めます。

</details>
