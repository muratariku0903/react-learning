# 演習1-3: 特殊ファイル群の挙動理解

## 目的
Next.js App Router が提供する特殊ファイル（`loading.tsx`, `error.tsx`, `not-found.tsx`）の
挙動を理解する。それぞれがどのタイミングで発火し、ユーザー体験にどう影響するかを体験する。

---

## 言語化演習（answer.md に回答を記入）

### Q1: 特殊ファイルの発火条件
以下の各ファイルが表示される **具体的な条件** を説明せよ:

| ファイル | いつ表示される？ | 内部的に何が起きている？ |
|---------|-----------------|----------------------|
| `loading.tsx` | | |
| `error.tsx` | | |
| `not-found.tsx` | | |

### Q2: loading.tsx と Suspense の関係
`loading.tsx` を配置することは、内部的にはある React の機能を使っていることと同等である。
その React の機能とは何か？また、`loading.tsx` を使う場合と直接その機能を使う場合の違いは何か？

### Q3: error.tsx の制約
`error.tsx` は、同じディレクトリの `layout.tsx` で発生したエラーをキャッチ **できない**。
なぜか？レンダリングツリーの構造から説明せよ。
（ヒント: error.tsx が React のどの機能として動作するかを考えよ）

---

## 実装演習（design.md に設計を書いてから実装）

### 課題: 3つの特殊ファイルを意図的に発火させる

以下のサブページを完成させ、それぞれの特殊ファイルが発火する状況を作れ:

```
exercises/layer01-basics/03-special-files/
├── page.tsx            → 各サブページへのリンク一覧
├── loading.tsx         → TODO: 作成する
├── error.tsx           → TODO: 作成する
├── not-found.tsx       → TODO: 作成する
├── slow-page/
│   └── page.tsx        → 意図的に遅い処理を含むページ（loading.tsx の確認用）
├── error-page/
│   └── page.tsx        → 意図的にエラーを投げるページ（error.tsx の確認用）
└── users/
    └── [id]/
        └── page.tsx    → 存在しないユーザーで notFound() を呼ぶ（not-found.tsx の確認用）
```

### 要件

1. **loading.tsx を作成**
   - ローディング中であることがわかるUIを表示する

2. **slow-page/page.tsx を修正**
   - 意図的に2〜3秒の遅延を入れる（`await new Promise(resolve => setTimeout(resolve, 3000))`）
   - このページにアクセスしたとき `loading.tsx` が表示されることを確認

3. **error.tsx を作成**
   - エラーメッセージと「再試行」ボタンを表示する
   - `reset` 関数を使って再試行できるようにする
   - **注意: error.tsx は Client Component でなければならない**（なぜかも考えよ）

4. **error-page/page.tsx を修正**
   - 意図的にエラーを throw する
   - `error.tsx` が表示されることを確認

5. **not-found.tsx を作成**
   - 「ページが見つかりません」のUIを表示する

6. **users/[id]/page.tsx を修正**
   - 有効なユーザーIDは `1`, `2`, `3` のみとする
   - それ以外のIDでアクセスされたら `notFound()` を呼ぶ
   - `not-found.tsx` が表示されることを確認

### 現在の状態
ページの骨格だけ用意してあります。特殊ファイル（`loading.tsx`, `error.tsx`, `not-found.tsx`）と、
各サブページの中身を実装してください。
