# 演習1-2: Server Component vs Client Component

## 目的
Next.js の最大の特徴である Server Component と Client Component の違いを理解する。
「何がデフォルトで、なぜそうなっているのか」「いつ "use client" を付けるべきか」を、
実際にエラーを体験しながら体得する。

---

## 言語化演習（answer.md に回答を記入）

### Q1: Server Component がデフォルトである理由
Next.js (App Router) では、コンポーネントはデフォルトで Server Component になる。
これはなぜか？以下の3つの観点からそれぞれ説明せよ:
- **バンドルサイズ**
- **セキュリティ**
- **データアクセス**

### Q2: "use client" の判断基準
以下の各ケースについて、Server Component のままでよいか、"use client" が必要か判断し、**その理由**を述べよ:

1. ユーザーの一覧をDBから取得して表示するコンポーネント
2. 「いいね」ボタン（クリックで数字が増える）
3. 現在の日時を表示するコンポーネント（サーバー側で取得）
4. フォームの入力値をリアルタイムにバリデーションするコンポーネント
5. `searchParams` を受け取って検索結果を表示するコンポーネント

### Q3: props の制約
Server Component から Client Component に props を渡す際、渡せるものと渡せないものがある。
**なぜ関数（コールバック）を渡せないのか**、データの流れ（サーバー→クライアント）の仕組みから説明せよ。

---

## 実装演習（design.md に設計を書いてから実装）

### 課題A: エラー体験 — Server Component で useState を使ってみる

`page.tsx` は現在 Server Component として実装されている。
ここに `useState` を追加してカウンターを実装しようとするとどうなるか、実際に試せ。

**やること:**
1. `page.tsx` に `useState` を追加して、エラーメッセージを確認する
2. エラーの内容を `notes.md` に記録する
3. 正しく動くように修正する（Client Component への分離）

### 課題B: Server / Client の適切な分離

以下の要件を満たすページを実装せよ:

**要件:**
- ページ上部に「ユーザー情報」を表示する（Server Component）
  - `{ name: "田中太郎", role: "エンジニア", joinedAt: "2024-01-15" }` をサーバー側で取得した体で表示
- ページ下部に「いいねボタン」を配置する（Client Component）
  - クリックするといいね数が増える
  - いいね数は `useState` で管理

**制約:**
- "use client" はページ全体につけてはいけない。必要最小限のコンポーネントだけを Client Component にすること
- Server Component 側にインタラクティブな要素を含めないこと

### 課題C: props の制約を体験する

Server Component から Client Component に以下を渡そうとしてみよ:
1. 文字列 → 渡せるか？
2. オブジェクト → 渡せるか？
3. 関数（`() => console.log("hello")`）→ 渡せるか？

**やること:**
1. 実際に試してエラーを確認する
2. 関数を渡せない場合、どう設計を変えるべきかを `notes.md` に記録する

### 現在の状態
骨格だけ用意してあります。上記の課題A → B → C の順に取り組んでください。
