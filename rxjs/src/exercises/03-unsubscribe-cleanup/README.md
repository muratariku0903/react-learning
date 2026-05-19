# 03. Unsubscribe と Cleanup

## 目的

`subscribe` の戻り値である `Subscription` を使って購読を止めること、そして Observable 側の cleanup が呼ばれることを確認します。

## 実行前に考える

### Q1

`unsubscribe()` を呼ばないと、このプログラムは自然に終わるでしょうか。

### Q2

`unsubscribe()` を呼んだ後、`next` はまだ呼ばれるでしょうか。

### Q3

Observable の中で返している関数は、どのタイミングで実行されるでしょうか。

## 作業

1. まずそのまま `npm run exercise:03` を実行する
2. `unsubscribe()` を呼ぶ秒数を変える
3. cleanup のログがいつ出るか確認する
