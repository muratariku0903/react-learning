# Render PhaseとCommit Phase

## 目的
Reactのレンダリングが「Render phase（計算フェーズ）」と「Commit phase（反映フェーズ）」の2段階で構成されていることを理解する。

## 要件

### 言語化演習（answer.mdに回答）

以下の質問に答えてください。

1. Render phaseとCommit phaseの役割の違いを説明してください。
2. 「再レンダリング」とは具体的に何を指しますか？また、再レンダリングが発生しても必ずしもDOMが更新されるとは限らない理由を説明してください。
3. `useLayoutEffect`と`useEffect`はそれぞれどのタイミングで実行されますか？Commit phaseとの関係で説明してください。

### 実装演習（design.mdに設計を記載してから実装）

以下の仕様を満たすコンポーネントを実装してください。

**仕様:**
- カウンターコンポーネントを作成する
- ボタンをクリックするとカウントが増加する
- **console.logを使って、以下のタイミングを可視化する:**
  - コンポーネント関数の実行開始時（Render phase）
  - useLayoutEffect内（Commit phase直後）
  - useEffect内（描画後）
- 実行順序をコンソールで確認し、notes.mdに観察結果を記録する

## 制約条件
- React.StrictModeが有効な環境で動作確認すること（開発時に2回実行される挙動も観察対象）

## ヒント
- `console.log`に明確なラベルをつけると、実行順序が分かりやすくなります
- React DevToolsの「Highlight updates when components render」機能も活用できます
