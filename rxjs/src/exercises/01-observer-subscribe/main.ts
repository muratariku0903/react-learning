import { type Observer, of } from "rxjs";

const observer: Observer<string> = {
  next(value) {
    console.log("[next]", value);
  },
  error(error: unknown) {
    console.log("[error]", error);
  },
  complete() {
    console.log("[complete]");
  },
};

console.log("before subscribe");

of("A", "B", "C").subscribe(observer);

console.log("after subscribe");

// TODO:
// 1. of("A", "B", "C") の値を増やすと出力順はどう変わるか。
// 2. observer から complete を一時的に消すと何が起きるか。
// 3. subscribe の前後にある console.log は、なぜこの順番で表示されるか。
