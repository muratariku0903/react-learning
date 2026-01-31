# ErrorBoundaryとSuspenseの組み合わせ

## 目的

この演習では、SuspenseとErrorBoundaryを組み合わせて、非同期UIの「完成形」を実装します。
「待つ」と「失敗を受け止める」を適切に分離し、堅牢なUIを構築する方法を学びます。

## 背景

非同期処理には2つの状態があります：

- **待機中（pending）**: データやコンポーネントがまだ準備できていない
- **失敗（error）**: 何らかの理由で処理が失敗した

Suspenseは「待つ」ことを担当しますが、「失敗」には対応しません。
失敗を受け止めるには ErrorBoundary が必要です。

```tsx
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Content />
  </Suspense>
</ErrorBoundary>
```

この組み合わせで：
- Promise throw → Suspense が受け止める
- Error throw → ErrorBoundary が受け止める

---

## 要件

### 言語化演習

以下の質問に `answer.md` で回答してください。

1. SuspenseとErrorBoundaryはそれぞれ何を「キャッチ」しますか？両者の役割の違いを説明してください。

2. ErrorBoundaryとSuspenseを組み合わせるとき、一般的にどちらを外側に配置しますか？その理由は何ですか？

3. ReactにはErrorBoundary用のビルトインコンポーネントがありません。なぜクラスコンポーネントで実装する必要があるのですか？

---

### 実装演習

現在の `App.tsx` には、Suspenseのみが実装されています。
データ取得が失敗する可能性を考慮して、ErrorBoundaryを追加してください。

#### やること

1. `design.md` に設計メモを記載する
   - ErrorBoundaryの配置場所と理由
   - エラー発生時のユーザー体験をどうするか

2. 以下を実装する
   - `components/ErrorBoundary.tsx` に ErrorBoundary を実装
   - `App.tsx` で Suspense と ErrorBoundary を適切に組み合わせる
   - エラー時のリトライ機能を実装（ボタンクリックで再取得）

#### 確認方法

`fetchUser` 関数内の `shouldFail` を `true` に変更すると、
データ取得が失敗するようになります。これを使ってエラー処理をテストしてください。

---

## 制約条件

- ErrorBoundaryはクラスコンポーネントで実装すること
- try-catchでエラーを握りつぶさないこと

---

## ヒント

- ErrorBoundaryは `static getDerivedStateFromError()` と `componentDidCatch()` を使います
- リトライ機能は ErrorBoundary の state をリセットすることで実現できます
- `key` プロパティを変更すると、子コンポーネントを強制的に再マウントできます
