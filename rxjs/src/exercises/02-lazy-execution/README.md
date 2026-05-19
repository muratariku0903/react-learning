# 02. Lazy Execution

## 目的

`Observable` は作っただけでは動かず、`subscribe` された時に処理が始まることを確認します。

## 実行前に考える

### Q1

`new Observable(...)` の中にある `console.log` は、ファイルを実行しただけで表示されるでしょうか。

### Q2

同じ Observable に 2 回 subscribe すると、Observable 内の処理は何回実行されるでしょうか。

### Q3

この性質は、通常の配列や Promise と比べてどこが違うでしょうか。

## 作業

1. `main.ts` の `second subscription` をコメントアウトしたまま実行する
2. コメントアウトを外してもう一度実行する
3. 何が「subscribe ごと」に起きているかを `answer.md` に書く
