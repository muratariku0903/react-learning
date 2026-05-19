# 01. Observer と Subscribe

## 目的

`Observable` が値を流す側、`Observer` が通知を受け取る側、`subscribe` が両者を接続する操作であることを、コンソール出力から確認します。

## 実行前に考える

`main.ts` を開き、実行前に `answer.md` へ予想を書いてください。

### Q1

`of("A", "B", "C")` を subscribe すると、`next` と `complete` はどの順番で呼ばれると思いますか。

### Q2

`subscribe` に渡している object は、なぜ `Observer` と呼べるのでしょうか。

### Q3

`complete` が呼ばれた後に、さらに `next` が呼ばれることはあると思いますか。理由も書いてください。

## 作業

1. 予想を書く
2. `npm run exercise:01` を実行する
3. 出力と予想を比較する
4. `main.ts` の TODO を 1 つずつ試す
