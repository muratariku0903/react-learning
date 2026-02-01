# 言語化演習の回答

## 1. SuspenseとErrorBoundaryの役割の違い

<!--
それぞれ何を「キャッチ」するのか、役割の違いを説明してください。
-->
SuspenseはPromiseをキャッチしコンポーネントのローディング状態を管理する。ErrorBoundaryは例外をキャッチしエラーが発生した際の表示を管理する。

✅ 正しい理解です。簡潔に本質を捉えています。



## 2. ErrorBoundaryとSuspenseの配置順序

<!--
一般的にどちらを外側に配置するか、その理由を説明してください。
-->
ErrorBoundaryを外側に配置する。
ErrorBoundaryをSuspenseの内側に設置してしまうと、Suspense内のErrorBoundaryを含めたコンポーネントは描画可能になるまで、fallbackで指定されたコンポーネントが表示されることになり、仮にラップしたコンポーネント内でエラーが生じた場合、ErrorBoundaryでそのエラーを検知できない状態となってしまう。また、ErrorBoundaryを外に設置することで、Suspenseで指定したfallback内で発生したエラーもErrorBoundaryで拾えるので、エラーの取りこぼしが減るという意味で外側に設置するべき。

✅ 正しい理解です。Suspense内でエラーが発生した場合の挙動まで考慮した説明ができています。


## 3. ErrorBoundaryがクラスコンポーネントで実装される理由

<!--
なぜReactは関数コンポーネント用のエラーハンドリングフックを提供していないのか、
考えられる理由を説明してください。
-->
ErrorBoundaryとして「子孫コンポーネントのレンダー中に発生した例外を捕捉して、同じ境界の中でfallback UIに切り替える」という仕組みは、Reactの仕様としてクラスコンポーネントのライフサイクル（static getDerivedStateFromError / componentDidCatch）に組み込まれている。
関数コンポーネントのtry/catchで子を包む方法は、子のレンダーはReact内部で進むため親のtry/catchのスコープで例外を安定して捕捉できず、さらにChild()のように直接呼ぶとHooksの前提（Reactがレンダー中に呼び出す）が崩れてしまう。結果として、Reactが保証する形でのエラー境界はクラスで提供されている。

✅ 正しい理解です。Reactの内部的なレンダリングの仕組みと、Hooksの前提条件まで踏み込んだ説明ができています。

