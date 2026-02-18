# 演習1-3 実装レビュー

## 全体評価
3つの特殊ファイルが正しく実装されており、それぞれ意図通りに発火する構成になっています。

## 良い点
- **error.tsx**: `"use client"` を正しく指定し、`error` と `reset` の props を適切に受け取っている
- **slow-page/page.tsx**: `async` コンポーネント + `await` による遅延で、Server Component のまま loading.tsx を発火させている
- **users/[id]/page.tsx**: `params` を `Promise<{ id: string }>` として受け取っている（Next.js 15 の正しい型定義）

## 指摘事項

### 1. error-page/page.tsx について
現在の実装では Server Component 内でエラーを throw しています。これ自体は動作しますが、考えてみてください：**Client Component 内で throw した場合と、Server Component 内で throw した場合で、error.tsx の挙動に違いはあるでしょうか？** `reset` ボタンを押したときの動作に注目してみてください。

### 2. users/[id]/page.tsx の軽微な点
- 12行目: ID のバリデーション後に `users[id]` でユーザーを取得していますが、バリデーション済みなので 19-20行目の `?.` （オプショナルチェイニング）と `?? "不明"` は不要です。型安全性の観点では、バリデーションとデータ取得を1つの処理にまとめる方法も考えてみてください。
