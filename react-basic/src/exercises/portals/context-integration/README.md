# Portals - Context・Stateとの連携

## 目的

Portalで描画されたコンポーネントが**親のContext・Stateを問題なく利用できる**ことを理解し、実際にContextと組み合わせたモーダルを実装できるようになる。

---

## 言語化演習

以下の質問に `answer.md` で回答してください。

### Q1. なぜPortalでもContextが使えるのか

Portalを使うと、コンポーネントはDOM上では完全に別の場所に描画されます。
それにもかかわらず、親で提供されたContextを子のPortalコンポーネントで使えるのはなぜですか？

### Q2. Portalの「変わること」と「変わらないこと」

Portalを使ったとき、以下のそれぞれについて「変わる」か「変わらない」かを答え、その理由を説明してください。

- DOMツリー上の位置
- Reactコンポーネントツリー上の位置
- propsの受け渡し
- stateの共有
- Contextの継承
- CSSの継承（親要素のスタイル）

---

## 実装演習

### 現状

`App.tsx` には以下の構造があります：
- ThemeContextでテーマ（light/dark）を管理
- テーマを切り替えるボタン
- モーダル（まだPortalを使っていない）

現在のモーダルはPortalを使っていないため、正しく動作しています。

### 課題

1. `components/Modal.tsx` をPortalを使う実装に変更してください

2. **重要な確認**: Portal化した後も、モーダル内でテーマが正しく反映されることを確認してください

3. `design.md` に以下を記録してください：
   - Portal化によってContextの動作が変わったかどうか
   - なぜ変わらなかったのか（または変わったのか）の考察

4. **追加課題**: モーダル内にテーマ切り替えボタンを追加し、モーダル内からでもテーマを変更できることを確認してください

---

## ヒント

<details>
<summary>ヒント1: Portalの本質</summary>

Portalは「描画先のDOMを変える」だけ。
Reactのコンポーネントツリーは一切変わりません。

</details>

<details>
<summary>ヒント2: Contextの仕組み</summary>

ContextはReactのコンポーネントツリーを基準に値を探します。
DOMツリーは関係ありません。

</details>
