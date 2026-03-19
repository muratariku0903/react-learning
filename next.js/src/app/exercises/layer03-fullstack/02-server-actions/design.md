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
