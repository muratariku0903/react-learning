- **loading.tsx を作成**

- 「03-special-files」直下に配置
  **slow-page/page.tsx を修正**
- 下記の内容を追記
- `await new Promise(resolve => setTimeout(resolve, 3000))`
  **error.tsx を作成**
- 「03-special-files」直下に配置
- ボタンを配置し、クリックしてリロードできるようにする
- ユーザーがリセットボタンを押下した際に再試行させる必要があるため、ブラウザ機能のを活用するので、「Client Component」で実装する

> **レビュー（設計）:**
> 全体的にシンプルで良い設計です。
>
> 1点、error.tsx を Client Component にする理由について再考してください。「ブラウザ機能を活用するから」と書かれていますが、もしボタンの onClick だけが理由なら、他の特殊ファイルにもボタンを追加したら全て Client Component になるはずですよね？ error.tsx が **必ず** Client Component でなければならない本質的な理由は別のところにあります。error.tsx が内部的に **React のどの機能** として動作するかを考えると、ヒントになります。

error.tsx では内部的にError Boundary という React の機能を利用するので、その機能がブラウザ上、クライアントでしか動かないものになるので、サーバーコンポーネントでは機能しないというのが理由かなと思います。より詳しく説明すると、Error Boundary は内部的にステートの状態を管理してフォールバックUIを表示するという挙動をするので、そもそもサーバーコンポーネントにはステートが存在しないので、エラーバウンダリを必要とする error.tsx はクライアントコンポーネントで定義しなければいけない。

> **最終レビュー（設計）:** 合格です。Error Boundary がステート管理を必要とし、Server Component にはステートが存在しないから、という本質的な理由を正確に説明できています。

**not-found.tsx を作成**

- 「03-special-files」直下に配置

**users/[id]/page.tsx を修正**

- 有効なユーザーIDは `1`, `2`, `3` のみとする
- それ以外のIDでアクセスされたら `notFound()` を呼ぶ
