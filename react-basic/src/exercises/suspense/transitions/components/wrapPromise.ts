/**
 * Promiseを Suspense 対応のリソースに変換するユーティリティ
 */

type Status = "pending" | "success" | "error";

type SuspenseResource<T> = {
  read: () => T;
};

export function wrapPromise<T>(promise: Promise<T>): SuspenseResource<T> {
  let status: Status = "pending";
  let result: T;
  let error: Error;

  const suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (err) => {
      status = "error";
      error = err;
    }
  );

  return {
    read() {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw error;
        case "success":
          return result;
      }
    },
  };
}
