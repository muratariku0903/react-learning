# RxJS Learning

RxJS の `Observer` と `subscribe` を、実際にコードを動かしながら学ぶための小さな TypeScript プロジェクトです。

参考記事: https://qiita.com/agajo/items/7942743a0130f7a0f30b

## 記事からの現代化メモ

記事内の考え方は学習に使えますが、コード例は古い RxJS の書き方を含みます。

- `Rx.Observable.of(...)` ではなく、`import { of } from "rxjs"` を使う
- `observable.subscribe(next, error, complete)` ではなく、まずは `observable.subscribe({ next, error, complete })` を使う
- `Observer` は「通知を受け取る側の形」、`Subscription` は「購読を止めるためのハンドル」として分けて考える

## セットアップ

```bash
cd rxjs
npm install
```

## 実行

```bash
npm run exercise:01
npm run exercise:02
npm run exercise:03
```

型チェック:

```bash
npm run typecheck
```

## 学習の進め方

各演習では、先に `README.md` を読み、コードを動かす前に `answer.md` に予想を書いてください。

Codex に質問するときは、いきなり答えを求めるよりも次の形を推奨します。

```text
exercise:01 の Q1 について、私の予想はこうです。考え方のヒントをください。
```

このディレクトリでは `AGENTS.md` により、Codex は学習用途の質問に対してすぐに答えを出さず、思考を促す進め方を優先します。

## Exercises

- `src/exercises/01-observer-subscribe`: Observer と subscribe の最小モデル
- `src/exercises/02-lazy-execution`: Observable が subscribe されるまで動かないこと
- `src/exercises/03-unsubscribe-cleanup`: Subscription と unsubscribe による停止処理
