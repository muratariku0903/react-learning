# 演習3-2: Server Actions

## 目的
Server Actions（`"use server"`）を使って、フォーム送信からデータ更新・UI反映までの一連のフローを理解する。
`useActionState` によるフォーム状態管理、`useOptimistic` による楽観的更新、
`zod` によるバリデーションを組み合わせた実践的な実装パターンを習得する。

---

## 事前準備

この演習ではバリデーションライブラリを使用する。以下のコマンドでインストールすること:

```bash
npm install zod
```

---

## 言語化演習（answer.md に回答を記入）

### Q1: Server Actions の仕組み
`"use server"` を付けた関数は、裏側でどのように動作するか？
以下の観点で説明せよ:

- クライアント側から Server Action を呼び出したとき、HTTP レベルでは何が起きているか？
- なぜ関数を「直接呼び出す」ように書けるのに、実際にはネットワークリクエストが発生するのか？
- Server Actions で扱える引数・戻り値に制約はあるか？（シリアライズの観点で）

### Q2: form の action 属性と Server Actions
React 19 / Next.js では、`<form action={serverAction}>` のように form の action に Server Action を渡せる。
以下の観点で説明せよ:

- 従来の `onSubmit` + `preventDefault` + `fetch` パターンと比べて何が違うか？
- JavaScript が無効な環境でも動作するか？ それはなぜか？
- `useActionState` を使うメリットは何か？（pending 状態、エラーハンドリング等）

### Q3: Optimistic UI
`useOptimistic` を使った楽観的更新について、以下の観点で説明せよ:

- 楽観的更新とは何か？ なぜ UX の向上につながるのか？
- サーバー側の処理が失敗した場合、楽観的に更新した UI はどうなるか？
- どのような操作に楽観的更新が向いていて、どのような操作には向いていないか？

### Q4: Server Actions と Route Handlers の比較
演習3-1 で Route Handlers を実装した。Server Actions と比較して:

- 演習3-1 のメモ帳で行ったような CRUD 操作を Server Actions で実装する場合、何が変わるか？
- Route Handlers で実装すべきケースと Server Actions で実装すべきケースを、具体例を挙げて説明せよ

### Q5: Server Actions のセキュリティ
`"use server"` を付けた関数について、セキュリティの観点で以下を説明せよ:

- Server Actions は裏側でどのような HTTP エンドポイントを生成するか？
- そのエンドポイントは、自アプリのフォーム以外から（例: curl やブラウザの DevTools から）呼び出せるか？
- 上記を踏まえると、Server Actions 内でのバリデーションや認証チェックはどの程度重要か？
- 「フォームからしか呼ばれないから入力チェックは不要」という考え方は正しいか？ その理由は？

---

## 実装演習（design.md に設計を書いてから実装）

### 課題: Todo アプリの実装（Server Actions + Optimistic UI）

Server Actions を使って、フォーム送信 → データ更新 → UI反映の一連のフローを実装せよ。

```
exercises/layer03-fullstack/02-server-actions/
├── page.tsx                → Todo アプリのメインページ（Server Component）
├── _actions/
│   └── todo.ts             → Server Actions（"use server"）
├── _lib/
│   └── store.ts            → インメモリデータストア
└── components/
    ├── TodoList.tsx         → Todo 一覧表示（Client Component）
    ├── AddTodoForm.tsx      → Todo 追加フォーム（Client Component）
    ├── TodoItem.tsx         → 個別 Todo アイテム（Client Component）
    └── SubmitButton.tsx     → 送信ボタン（useFormStatus を使用）
```

### 要件

1. **データストア（`_lib/store.ts`）を実装**
   - Todo の型: `{ id: string; title: string; completed: boolean; createdAt: string }`
   - インメモリ（配列）でデータを保持する
   - 初期データとして2〜3件のサンプル Todo を入れておく

2. **Server Actions（`_actions/todo.ts`）を実装**
   - `addTodo(formData: FormData)`: Todo を追加する
   - `toggleTodo(id: string)`: Todo の完了状態を切り替える
   - `deleteTodo(id: string)`: Todo を削除する
   - 各アクションの後に `revalidatePath` でキャッシュを無効化する
   - `addTodo` では `zod` を使って `title` のバリデーションを行う（空文字、長すぎる文字列を拒否）
   - バリデーションエラーの場合はエラーメッセージを返す

3. **Todo 追加フォーム（`AddTodoForm.tsx`）を実装**
   - `<form action={...}>` で Server Action と連携する
   - `useActionState` で送信中の状態とバリデーションエラーを管理する
   - **送信ボタンは `SubmitButton` として別コンポーネントに切り出す**
   - `SubmitButton` 内で `useFormStatus` を使い、送信中はボタンを無効化+テキスト変更する
   - バリデーションエラーがある場合はエラーメッセージを表示する

4. **Todo 一覧と個別アイテムを実装**
   - 完了/未完了の切り替え（`toggleTodo`）
   - 削除機能（`deleteTodo`）
   - **`useOptimistic`** を使って、完了状態の切り替えを楽観的に更新する
     - トグルをクリックした瞬間に UI が切り替わり、サーバー処理を待たない

5. **メインページ（`page.tsx`）を実装**
   - Server Component としてデータストアから Todo 一覧を取得
   - Client Component（TodoList, AddTodoForm）に props として渡す

### ヒント
- Server Actions は `"use server"` をファイルの先頭に記述する
- `revalidatePath('/exercises/layer03-fullstack/02-server-actions')` でページのキャッシュを無効化する
- `useActionState` は `const [state, formAction, isPending] = useActionState(action, initialState)` の形で使う
- `useOptimistic` は `const [optimisticTodos, addOptimistic] = useOptimistic(todos, updateFn)` の形で使う
- `useFormStatus` は `react-dom` からインポートする。**form の子コンポーネント内**でのみ動作する（form と同じコンポーネントでは動かない）
- `const { pending } = useFormStatus()` で送信中かどうかを取得できる
- `useActionState` の `isPending` と `useFormStatus` の `pending` の違い: 前者はそのフォーム専用、後者は汎用ボタンコンポーネントとして使い回せる
- `zod` のバリデーション: `z.string().min(1, "タイトルは必須です").max(100, "タイトルは100文字以内で入力してください")`
