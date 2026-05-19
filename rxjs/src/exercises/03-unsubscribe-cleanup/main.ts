import { Observable } from "rxjs";

const ticker$ = new Observable<number>((subscriber) => {
  console.log("ticker started");

  let count = 0;
  const timerId = setInterval(() => {
    count += 1;
    subscriber.next(count);
  }, 500);

  return () => {
    clearInterval(timerId);
    console.log("ticker cleanup");
  };
});

const subscription = ticker$.subscribe({
  next(value) {
    console.log("[next]", value);
  },
  complete() {
    console.log("[complete]");
  },
});

setTimeout(() => {
  console.log("unsubscribe");
  subscription.unsubscribe();
}, 1800);
