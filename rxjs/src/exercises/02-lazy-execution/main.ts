import { Observable } from "rxjs";

const source$ = new Observable<number>((subscriber) => {
  console.log("Observable body started");

  subscriber.next(Math.random());
  subscriber.complete();
});

console.log("Observable was created");

console.log("first subscription");
source$.subscribe({
  next(value) {
    console.log("[first next]", value);
  },
  complete() {
    console.log("[first complete]");
  },
});

// TODO: コメントアウトを外して、Observable body started が何回出るか確認する。
// console.log("second subscription");
// source$.subscribe({
//   next(value) {
//     console.log("[second next]", value);
//   },
//   complete() {
//     console.log("[second complete]");
//   },
// });
