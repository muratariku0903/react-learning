# React Hook Form 学習ロードマップ

## 概要

このロードマップは、React Hook Form を初めて学ぶ人が段階的に理解を深められるよう設計されている。
各セクションでは「何を学ぶか」だけでなく「なぜそれが重要なのか」を明示し、実務で使える知識の定着を目指す。

**前提知識**

- React の基本（コンポーネント、state、props、イベントハンドリング）
- TypeScript の基本的な型定義
- HTML フォーム要素の基礎（input, select, textarea など）

**このリポジトリの環境**

| ライブラリ | バージョン |
|---|---|
| React | 19.x |
| React Hook Form | 7.x |
| TypeScript | 5.x |
| Vite | 8.x |

**演習ディレクトリ構成**

```
src/exercises/react-hook-form/
  basic-usage/        ... セクション1: 基本的な使い方
  validation/         ... セクション2: バリデーション
  error-handling/     ... セクション3: エラーハンドリング
  advanced-forms/     ... セクション4: 応用的なフォーム
```

---

## セクション1: 基本的な使い方（basic-usage）

### このセクションで学ぶこと

React Hook Form の根幹となる3つの要素、`useForm`、`register`、`handleSubmit` を理解し、最小構成のフォームを構築できるようになる。

### なぜ重要なのか

React でフォームを扱う場合、`useState` で各フィールドの値を個別に管理するアプローチが一般的に思い浮かぶ。しかし、この方法ではフィールド数が増えるほど state の数が増え、入力のたびにコンポーネント全体が再レンダリングされるという課題がある。

React Hook Form は**非制御コンポーネント（Uncontrolled Components）** と `ref` をベースにすることで、React の state を介さずに DOM から直接値を取得する。これにより、入力時の再レンダリングを最小限に抑え、大規模なフォームでも高いパフォーマンスを維持できる。

### 学習項目

#### 1-1. useForm フック

`useForm` は React Hook Form の中核となるフックで、フォーム管理に必要なメソッドとオブジェクトを返す。

```tsx
import { useForm } from "react-hook-form";

// フォームで扱うデータの型を定義する
type FormValues = {
  username: string;
  email: string;
  age: number;
};

function BasicForm() {
  // useForm にジェネリクスで型を渡すことで、型安全にフォームを管理できる
  const {
    register,      // フィールドを React Hook Form に登録する関数
    handleSubmit,  // フォーム送信を処理するラッパー関数
    formState,     // フォームの状態（errors, isDirty, isValid 等）
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      age: 0,
    },
  });

  return <form>{/* ... */}</form>;
}
```

**ポイント**
- `defaultValues` を設定することで、フォームの初期値を宣言的に定義できる。
- ジェネリクスで型を渡すと、`register` や `formState.errors` などが型推論される。

#### 1-2. register 関数によるフィールド登録

`register` はフォームのフィールドを React Hook Form に登録するための関数である。呼び出すと `ref`、`name`、`onChange`、`onBlur` を含むオブジェクトを返し、これを input 要素にスプレッドする。

```tsx
function BasicForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register("username") は { name, ref, onChange, onBlur } を返す */}
      <input {...register("username")} placeholder="ユーザー名" />
      <input {...register("email")} type="email" placeholder="メールアドレス" />
      <input {...register("age", { valueAsNumber: true })} type="number" placeholder="年齢" />
      <button type="submit">送信</button>
    </form>
  );
}
```

**ポイント**
- `register` の第1引数はフィールド名で、`FormValues` の型で定義したキーが補完される。
- `valueAsNumber: true` を指定すると、input の値が自動的に `number` 型に変換される。
- `register` が返す `ref` によって、React Hook Form は DOM 要素に直接アクセスして値を取得する。

#### 1-3. handleSubmit によるフォーム送信処理

`handleSubmit` は、フォーム送信時にバリデーションを実行し、バリデーションが通った場合にのみコールバック関数を呼び出す。

```tsx
const onSubmit = (data: FormValues) => {
  // バリデーション成功時のみ呼ばれる
  console.log("送信データ:", data);
};

const onError = (errors: FieldErrors<FormValues>) => {
  // バリデーション失敗時に呼ばれる（省略可能）
  console.log("バリデーションエラー:", errors);
};

// 第1引数: 成功時のコールバック、第2引数: 失敗時のコールバック（任意）
<form onSubmit={handleSubmit(onSubmit, onError)}>
```

**ポイント**
- `handleSubmit` は非同期関数にも対応しており、`async/await` で API 呼び出しを含む処理もそのまま書ける。
- 第2引数の `onError` はデバッグ時に便利だが、通常はエラー表示を `formState.errors` で処理するため省略されることが多い。

#### 1-4. 非制御コンポーネントベースのアプローチ

React Hook Form がパフォーマンスに優れている理由を理解するには、制御コンポーネントと非制御コンポーネントの違いを把握する必要がある。

```tsx
// --- 制御コンポーネント（useState を使ったアプローチ）---
// 入力のたびに setState が呼ばれ、コンポーネント全体が再レンダリングされる
function ControlledForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </form>
  );
}

// --- 非制御コンポーネント（React Hook Form のアプローチ）---
// ref を通じて DOM から直接値を取得するため、入力時に再レンダリングが発生しない
function UncontrolledForm() {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("username")} />
      <input {...register("email")} />
      <button type="submit">送信</button>
    </form>
  );
}
```

| 観点 | useState（制御） | React Hook Form（非制御） |
|---|---|---|
| 値の管理場所 | React の state | DOM（ref 経由） |
| 入力時の再レンダリング | 毎回発生 | 発生しない |
| フィールド数が増えた場合 | state と handler が線形に増加 | register の呼び出しを追加するだけ |
| 初期コストの低さ | 低い（標準APIのみ） | やや高い（ライブラリ学習が必要） |

#### 1-5. なぜパフォーマンスに優れているのか

React Hook Form の設計思想をまとめると以下の3点になる。

1. **非制御コンポーネントベース**: `ref` で DOM から直接値を取得し、不要な再レンダリングを回避する。
2. **サブスクリプション方式の状態管理**: `formState` のプロパティは、実際にアクセスされたプロパティのみの変更で再レンダリングをトリガーする（Proxy ベースの最適化）。
3. **最小限のAPI設計**: `register` でフィールドを登録し、`handleSubmit` で値を取得するシンプルな設計により、余計な抽象化レイヤーがない。

---

## セクション2: バリデーション（validation）

### このセクションで学ぶこと

React Hook Form に組み込まれたバリデーション機能を使い、ユーザー入力を検証する方法を学ぶ。カスタムバリデーションや非同期バリデーション、バリデーションのタイミング制御も含む。

### なぜ重要なのか

フォームバリデーションはユーザー体験に直結する。適切なタイミングで適切なフィードバックを返すことで、ユーザーの入力ミスを早期に防ぎ、フォーム離脱率を下げることができる。React Hook Form は HTML 標準のバリデーション属性に準拠した API を提供しており、学習コストを最小限に抑えつつ柔軟なバリデーションを実現できる。

### 学習項目

#### 2-1. 組み込みバリデーションルール

`register` の第2引数にバリデーションルールをオブジェクトとして渡す。

```tsx
type SignupForm = {
  username: string;
  email: string;
  age: number;
  password: string;
  website: string;
};

function SignupFormComponent() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* required: 必須入力 */}
      <input
        {...register("username", {
          required: "ユーザー名は必須です",
          minLength: { value: 3, message: "3文字以上で入力してください" },
          maxLength: { value: 20, message: "20文字以内で入力してください" },
        })}
      />
      {errors.username && <span>{errors.username.message}</span>}

      {/* pattern: 正規表現によるパターンマッチ */}
      <input
        {...register("email", {
          required: "メールアドレスは必須です",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "有効なメールアドレスを入力してください",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* min / max: 数値の範囲チェック */}
      <input
        type="number"
        {...register("age", {
          valueAsNumber: true,
          required: "年齢は必須です",
          min: { value: 18, message: "18歳以上である必要があります" },
          max: { value: 120, message: "有効な年齢を入力してください" },
        })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">登録</button>
    </form>
  );
}
```

**組み込みルール一覧**

| ルール | 説明 | 値の例 |
|---|---|---|
| `required` | 必須入力 | `true` または `"エラーメッセージ"` |
| `min` | 最小値（数値） | `{ value: 0, message: "..." }` |
| `max` | 最大値（数値） | `{ value: 100, message: "..." }` |
| `minLength` | 最小文字数 | `{ value: 3, message: "..." }` |
| `maxLength` | 最大文字数 | `{ value: 50, message: "..." }` |
| `pattern` | 正規表現パターン | `{ value: /regex/, message: "..." }` |
| `validate` | カスタムバリデーション | 関数またはオブジェクト |

#### 2-2. カスタムバリデーション関数

`validate` ルールを使うことで、組み込みルールでは表現できない独自の検証ロジックを定義できる。

```tsx
type PasswordForm = {
  password: string;
  confirmPassword: string;
};

function PasswordFormComponent() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordForm>();
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        type="password"
        {...register("password", {
          required: "パスワードは必須です",
          // validate にオブジェクトを渡すと、複数のカスタムルールを定義できる
          validate: {
            hasUpperCase: (value) =>
              /[A-Z]/.test(value) || "大文字を1文字以上含めてください",
            hasNumber: (value) =>
              /\d/.test(value) || "数字を1文字以上含めてください",
            minLength: (value) =>
              value.length >= 8 || "8文字以上で入力してください",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        {...register("confirmPassword", {
          required: "確認用パスワードは必須です",
          // 単一のカスタムバリデーション: 他フィールドの値との比較
          validate: (value) =>
            value === password || "パスワードが一致しません",
        })}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      <button type="submit">設定</button>
    </form>
  );
}
```

**ポイント**
- `validate` に関数を直接渡すと1つのカスタムルールを定義できる。
- `validate` にオブジェクトを渡すと、キーごとに独立したカスタムルールを複数定義できる。
- カスタムバリデーション関数は `true` を返すと検証成功、文字列を返すとその文字列がエラーメッセージになる。

#### 2-3. 非同期バリデーション

`validate` 関数は `Promise` を返すことができるため、API 呼び出しを含むバリデーションも自然に書ける。

```tsx
<input
  {...register("username", {
    required: "ユーザー名は必須です",
    validate: {
      // サーバーに問い合わせてユーザー名の重複をチェック
      isUnique: async (value) => {
        const response = await fetch(`/api/check-username?name=${value}`);
        const { available } = await response.json();
        return available || "このユーザー名は既に使用されています";
      },
    },
  })}
/>
```

**ポイント**
- 非同期バリデーションは、ユーザーの入力が完了したタイミング（onBlur 等）で実行するのが一般的。onChange で実行すると API 呼び出しが過多になるため注意が必要。
- `debounce` の仕組みは React Hook Form には組み込まれていないため、必要に応じて自前で実装するか、バリデーションモードを `onBlur` にする。

#### 2-4. バリデーションモード

`useForm` の `mode` オプションで、バリデーションがトリガーされるタイミングを制御できる。

```tsx
const { register, handleSubmit } = useForm<FormValues>({
  mode: "onBlur", // バリデーションのトリガータイミングを指定
});
```

| モード | トリガータイミング | ユースケース |
|---|---|---|
| `onSubmit`（デフォルト） | フォーム送信時 | シンプルなフォーム、最小限のバリデーション |
| `onBlur` | フィールドからフォーカスが外れた時 | 入力完了後にフィードバック。非同期バリデーションとの相性が良い |
| `onChange` | 値が変更されるたび | リアルタイムフィードバック。頻繁な再レンダリングに注意 |
| `onTouched` | 最初の blur 以降は onChange で検証 | UX のバランスが良い。初回入力中はエラーを出さない |
| `all` | blur と change の両方 | 最も厳密だが、パフォーマンスへの影響が最も大きい |

**ポイント**
- `mode` はフォーム全体のデフォルトの挙動を決める。多くの場合 `onBlur` または `onTouched` が UX とパフォーマンスのバランスに優れている。
- `reValidateMode`（デフォルト: `onChange`）を併用すると、「初回バリデーションは submit 時、エラーが出た後は onChange で再検証」のような段階的な挙動を実現できる。

---

## セクション3: エラーハンドリング（error-handling）

### このセクションで学ぶこと

バリデーションエラーをユーザーに適切にフィードバックする方法を学ぶ。`formState.errors` の構造を理解し、エラーメッセージの表示パターンやフォーム全体の状態管理を習得する。

### なぜ重要なのか

バリデーションルールを定義しても、エラーをユーザーに分かりやすく伝えなければ意味がない。適切なエラーハンドリングは以下に貢献する。

- ユーザーがどのフィールドに問題があるかを即座に理解できる。
- フォーム送信の可否を明確にし、無駄な API 呼び出しを防ぐ。
- 送信中の二重送信防止など、堅牢なフォーム体験を実現する。

### 学習項目

#### 3-1. formState.errors の構造と使い方

`formState.errors` は、バリデーションに失敗したフィールドの情報をフィールド名をキーとしたオブジェクトで保持する。

```tsx
type ContactForm = {
  name: string;
  email: string;
  message: string;
};

function ContactFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>();

  // errors の構造の例:
  // {
  //   name: {
  //     type: "required",        // どのルールに違反したか
  //     message: "名前は必須です", // register で指定したメッセージ
  //     ref: HTMLInputElement,    // 対象の DOM 要素への参照
  //   },
  //   email: {
  //     type: "pattern",
  //     message: "有効なメールアドレスを入力してください",
  //     ref: HTMLInputElement,
  //   },
  // }

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <label>名前</label>
        <input {...register("name", { required: "名前は必須です" })} />
        {/* errors.name が存在する場合のみエラーメッセージを表示 */}
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label>メールアドレス</label>
        <input
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "有効なメールアドレスを入力してください",
            },
          })}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label>メッセージ</label>
        <textarea
          {...register("message", {
            required: "メッセージは必須です",
            minLength: { value: 10, message: "10文字以上で入力してください" },
          })}
        />
        {errors.message && <p role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit">送信</button>
    </form>
  );
}
```

**ポイント**
- `errors` オブジェクトにキーが存在するかどうかで、そのフィールドにエラーがあるかを判定する。
- `role="alert"` を付与すると、スクリーンリーダーがエラーメッセージを読み上げるためアクセシビリティが向上する。

#### 3-2. エラーメッセージの表示パターン

実務では、エラーメッセージの表示を共通コンポーネントに切り出すことが多い。

```tsx
import type { FieldError } from "react-hook-form";

// 汎用的なエラーメッセージ表示コンポーネント
type FieldErrorMessageProps = {
  error: FieldError | undefined;
};

function FieldErrorMessage({ error }: FieldErrorMessageProps) {
  if (!error) return null;
  return (
    <p role="alert" style={{ color: "red", fontSize: "0.85rem" }}>
      {error.message}
    </p>
  );
}

// 使用例
function ExampleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <label>名前</label>
        <input {...register("name", { required: "名前は必須です" })} />
        <FieldErrorMessage error={errors.name} />
      </div>
      {/* ... */}
    </form>
  );
}
```

#### 3-3. ErrorMessage コンポーネント（@hookform/error-message）

React Hook Form 公式が提供する `@hookform/error-message` パッケージを使うと、エラーメッセージの表示をさらに簡潔に書ける。

```bash
npm install @hookform/error-message
```

```tsx
import { ErrorMessage } from "@hookform/error-message";

function FormWithErrorMessage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <label>名前</label>
        <input {...register("name", { required: "名前は必須です" })} />
        {/* errors と name を渡すだけでエラーメッセージが表示される */}
        <ErrorMessage errors={errors} name="name" />
      </div>

      <div>
        <label>メール</label>
        <input
          {...register("email", { required: "メールアドレスは必須です" })}
        />
        {/* render prop でカスタム表示も可能 */}
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <p role="alert" style={{ color: "red" }}>{message}</p>
          )}
        />
      </div>

      <button type="submit">送信</button>
    </form>
  );
}
```

**ポイント**
- `ErrorMessage` コンポーネントは内部で `errors[name]` の存在チェックを行うため、条件分岐を自分で書く必要がない。
- `render` prop や `as` prop を使ってレンダリングをカスタマイズできる。

#### 3-4. フォーム全体のエラー状態管理

`formState` には、エラー情報以外にもフォーム全体の状態を把握するためのプロパティが多数ある。

```tsx
function FullStateForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,        // フィールドごとのエラー情報
      isDirty,       // いずれかのフィールドが初期値から変更されたか
      isValid,       // 全フィールドがバリデーションに通っているか
      isSubmitting,  // フォーム送信処理中か（非同期対応）
      isSubmitted,   // フォームが1回以上送信されたか
      submitCount,   // フォーム送信の試行回数
      dirtyFields,   // 変更されたフィールドの一覧
      touchedFields, // 一度でもフォーカスが当たったフィールドの一覧
    },
  } = useForm<ContactForm>({
    mode: "onChange", // isValid をリアルタイムに更新するために onChange モードを使用
  });

  const onSubmit = async (data: ContactForm) => {
    // isSubmitting は handleSubmit 内の非同期処理が完了するまで true になる
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "名前は必須です" })} />
      <input {...register("email", { required: "メールは必須です" })} />
      <textarea {...register("message", { required: "メッセージは必須です" })} />

      {/* isDirty: フォームが変更されていない場合はボタンを無効化 */}
      {/* isValid: バリデーションエラーがある場合はボタンを無効化 */}
      {/* isSubmitting: 送信中は二重送信を防止 */}
      <button
        type="submit"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        {isSubmitting ? "送信中..." : "送信"}
      </button>

      {/* デバッグ用: フォームの状態を可視化 */}
      <pre>
        {JSON.stringify(
          { isDirty, isValid, isSubmitting, isSubmitted, submitCount },
          null,
          2
        )}
      </pre>
    </form>
  );
}
```

**主要な formState プロパティ一覧**

| プロパティ | 型 | 説明 |
|---|---|---|
| `errors` | `FieldErrors` | フィールドごとのバリデーションエラー |
| `isDirty` | `boolean` | いずれかのフィールドが初期値から変更されたか |
| `isValid` | `boolean` | すべてのバリデーションに通っているか |
| `isSubmitting` | `boolean` | `handleSubmit` の処理が実行中か |
| `isSubmitted` | `boolean` | フォームが1回以上送信されたか |
| `isSubmitSuccessful` | `boolean` | 直近の送信が成功したか |
| `submitCount` | `number` | フォーム送信の試行回数 |
| `dirtyFields` | `object` | 変更されたフィールドを `true` で示すオブジェクト |
| `touchedFields` | `object` | フォーカスが当たったフィールドを `true` で示すオブジェクト |

**ポイント**
- `isValid` は `mode` が `onSubmit`（デフォルト）の場合、最初の送信前は常に `true` になる点に注意。リアルタイムに検証するには `mode: "onChange"` か `mode: "onBlur"` を使う。
- `isSubmitting` は `handleSubmit` に渡した関数が `Promise` を返す場合に自動で制御される。明示的な state 管理は不要。

---

## セクション4: 応用的なフォーム（advanced-forms）

### このセクションで学ぶこと

実務で頻出する応用的なフォームパターンを学ぶ。外部 UI ライブラリとの統合、動的なフィールドの追加・削除、フィールド値の監視、フォームのリセット処理を扱う。

### なぜ重要なのか

実際のプロダクト開発では、ネイティブの HTML input だけでフォームが完結することは少ない。MUI、Chakra UI、Radix などのコンポーネントライブラリと組み合わせたり、ユーザーの操作に応じてフィールド数が動的に変わるフォームを構築する場面がある。これらのパターンを理解しておくことで、どのような要件のフォームにも対応できるようになる。

### 学習項目

#### 4-1. Controller コンポーネント（外部UIライブラリとの統合）

`register` は `ref` を DOM 要素に直接渡すため、ネイティブ HTML 要素（`<input>`, `<select>` 等）では問題なく動作する。しかし、外部 UI ライブラリのコンポーネントは独自の value/onChange インターフェースを持つことがあり、`register` の `ref` を受け付けないケースがある。

`Controller` はこの問題を解決するラッパーコンポーネントで、React Hook Form と外部コンポーネントの間をつなぐ。

```tsx
import { useForm, Controller } from "react-hook-form";

type ProfileForm = {
  name: string;
  role: string;
  bio: string;
};

// 外部UIライブラリのセレクトコンポーネントを想定した例
type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
};

function CustomSelect({ value, onChange, options }: CustomSelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">選択してください</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function ProfileFormComponent() {
  const { control, handleSubmit, register } = useForm<ProfileForm>({
    defaultValues: {
      name: "",
      role: "",
      bio: "",
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      {/* ネイティブ input は register で十分 */}
      <input {...register("name", { required: "名前は必須です" })} />

      {/* 外部コンポーネントは Controller でラップする */}
      <Controller
        name="role"
        control={control}
        rules={{ required: "役割を選択してください" }}
        render={({ field, fieldState }) => (
          <div>
            <CustomSelect
              value={field.value}
              onChange={field.onChange}
              options={[
                { label: "エンジニア", value: "engineer" },
                { label: "デザイナー", value: "designer" },
                { label: "マネージャー", value: "manager" },
              ]}
            />
            {fieldState.error && <span>{fieldState.error.message}</span>}
          </div>
        )}
      />

      <button type="submit">保存</button>
    </form>
  );
}
```

**ポイント**
- `Controller` の `render` prop は `field`（value, onChange, onBlur, name, ref）と `fieldState`（error, isDirty, isTouched）を受け取る。
- `control` は `useForm` から取得し、`Controller` に渡す必要がある。
- ネイティブ HTML 要素に `Controller` を使うのは過剰であり、`register` を使うべきである。

#### 4-2. useFieldArray（動的フィールド管理）

ユーザーが項目を追加・削除できるフォーム（例: 連絡先リスト、スキル一覧）を構築するためのフック。

```tsx
import { useForm, useFieldArray } from "react-hook-form";

type SkillForm = {
  skills: {
    name: string;
    level: string;
  }[];
};

function SkillFormComponent() {
  const { control, register, handleSubmit } = useForm<SkillForm>({
    defaultValues: {
      skills: [{ name: "", level: "beginner" }], // 初期状態で1行
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "skills", // FormValues 内の配列フィールド名
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <h3>スキル一覧</h3>

      {fields.map((field, index) => (
        // key には field.id を使う（index ではなく）
        <div key={field.id} style={{ display: "flex", gap: "8px" }}>
          <input
            {...register(`skills.${index}.name`, {
              required: "スキル名は必須です",
            })}
            placeholder="スキル名"
          />
          <select {...register(`skills.${index}.level`)}>
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>
          <button type="button" onClick={() => remove(index)}>
            削除
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", level: "beginner" })}
      >
        スキルを追加
      </button>

      <button type="submit">保存</button>
    </form>
  );
}
```

**useFieldArray が提供するメソッド**

| メソッド | 説明 |
|---|---|
| `fields` | 現在のフィールド配列（各要素に一意の `id` が付与される） |
| `append` | 配列の末尾に要素を追加 |
| `prepend` | 配列の先頭に要素を追加 |
| `insert` | 指定インデックスに要素を挿入 |
| `remove` | 指定インデックスの要素を削除 |
| `move` | 要素の位置を入れ替え |
| `swap` | 2つの要素を交換 |
| `replace` | 配列全体を置換 |

**ポイント**
- `fields.map` の `key` には必ず `field.id` を使う。`index` を使うと、要素の追加・削除時に React の差分検出が正しく動作しない。
- `register` のフィールド名は `` `skills.${index}.name` `` のようにドット記法で指定する。

#### 4-3. useWatch / watch（フィールド値の監視）

フォームの値に応じて UI を動的に変更したい場合に使用する。

```tsx
import { useForm, useWatch } from "react-hook-form";

type OrderForm = {
  plan: "free" | "pro" | "enterprise";
  addOns: string[];
  couponCode: string;
};

// useWatch を使って特定フィールドの値を監視するコンポーネント
// useWatch はコンポーネント単位で再レンダリングをスコープできる
function PriceSummary({ control }: { control: any }) {
  const plan = useWatch({ control, name: "plan" });

  const priceMap = { free: 0, pro: 1980, enterprise: 9800 };
  const price = priceMap[plan] ?? 0;

  return (
    <div>
      <p>選択中のプラン: {plan}</p>
      <p>月額料金: {price.toLocaleString()}円</p>
    </div>
  );
}

function OrderFormComponent() {
  const { control, register, handleSubmit, watch } = useForm<OrderForm>({
    defaultValues: {
      plan: "free",
      addOns: [],
      couponCode: "",
    },
  });

  // watch は useForm を呼び出したコンポーネントの再レンダリングをトリガーする
  const selectedPlan = watch("plan");

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <select {...register("plan")}>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </select>

      {/* watch の値に応じて条件付きレンダリング */}
      {selectedPlan !== "free" && (
        <input
          {...register("couponCode")}
          placeholder="クーポンコード（任意）"
        />
      )}

      {/* useWatch を使ったコンポーネントは、監視対象の変更時のみ再レンダリングされる */}
      <PriceSummary control={control} />

      <button type="submit">注文する</button>
    </form>
  );
}
```

**watch と useWatch の使い分け**

| 特性 | `watch` | `useWatch` |
|---|---|---|
| 呼び出し場所 | `useForm` と同じコンポーネント内 | 任意の子コンポーネント |
| 再レンダリング範囲 | `useForm` を呼び出したコンポーネント全体 | `useWatch` を呼び出したコンポーネントのみ |
| 推奨用途 | 条件付きレンダリングなど同一コンポーネント内での利用 | 料金表示など、独立した子コンポーネントでの利用 |

**ポイント**
- パフォーマンスの観点から、値の監視が必要なのが子コンポーネントだけの場合は `useWatch` を使うことで、親コンポーネントの不要な再レンダリングを防げる。
- `watch()` を引数なしで呼ぶとフォーム全体の値を監視するが、特定のフィールドだけを監視する方がパフォーマンスに優れる。

#### 4-4. フォームのリセットとデフォルト値

フォームの値を初期状態に戻したり、API から取得したデータで上書きする方法。

```tsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type UserForm = {
  name: string;
  email: string;
  bio: string;
};

function UserEditForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<UserForm>({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  // API からデータを取得してフォームに反映
  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const userData: UserForm = await response.json();
      // reset でフォームの値とデフォルト値を一括更新
      // isDirty もリセットされる
      reset(userData);
    }
    fetchUser();
  }, [userId, reset]);

  const onSubmit = async (data: UserForm) => {
    await fetch(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    // 送信成功後、現在の値を新しいデフォルト値として設定
    reset(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "名前は必須です" })} />
      <input {...register("email", { required: "メールは必須です" })} />
      <textarea {...register("bio")} />

      <div>
        {/* 初期値に戻す */}
        <button type="button" onClick={() => reset()} disabled={!isDirty}>
          変更を元に戻す
        </button>
        <button type="submit">保存</button>
      </div>
    </form>
  );
}
```

**reset のオプション**

```tsx
reset(values, {
  keepErrors: false,       // true にするとエラー状態を維持
  keepDirty: false,        // true にすると isDirty を維持
  keepDirtyValues: false,  // true にするとユーザーが変更したフィールドの値を維持
  keepValues: false,       // true にすると現在の値を維持（formState のみリセット）
  keepTouched: false,      // true にすると touchedFields を維持
  keepIsSubmitted: false,  // true にすると isSubmitted を維持
  keepSubmitCount: false,  // true にすると submitCount を維持
});
```

**ポイント**
- `reset()` を引数なしで呼ぶと `defaultValues` に戻る。引数にオブジェクトを渡すと、そのオブジェクトが新しい値かつ新しい `defaultValues` になる。
- API レスポンスでフォームを初期化する場合、`useEffect` 内で `reset` を使うのが定番パターン。
- `keepDirtyValues: true` は、ユーザーが編集中にサーバーからデータが届いた場合に、ユーザーの入力を失わないようにするために有用。

---

## 学習の進め方

以下の順序で演習に取り組むことを推奨する。

| 順序 | セクション | 演習ディレクトリ | 到達目標 |
|---|---|---|---|
| 1 | 基本的な使い方 | `src/exercises/react-hook-form/basic-usage/` | useForm, register, handleSubmit で基本的なフォームを構築できる |
| 2 | バリデーション | `src/exercises/react-hook-form/validation/` | 組み込み・カスタム・非同期バリデーションを実装できる |
| 3 | エラーハンドリング | `src/exercises/react-hook-form/error-handling/` | ユーザーに分かりやすいエラーフィードバックを設計できる |
| 4 | 応用的なフォーム | `src/exercises/react-hook-form/advanced-forms/` | Controller, useFieldArray, useWatch を使った実践的なフォームを構築できる |

各セクションの演習に取り組む際は、まずロードマップの該当セクションを読み、概念を把握してから実装に進むこと。

## 参考リンク

- [React Hook Form 公式ドキュメント](https://react-hook-form.com/)
- [React Hook Form API リファレンス](https://react-hook-form.com/docs)
- [@hookform/error-message](https://www.npmjs.com/package/@hookform/error-message)
