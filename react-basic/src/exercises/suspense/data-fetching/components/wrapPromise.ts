/**
 * Promiseを Suspense 対応のリソースに変換するユーティリティ
 *
 * 注意: これは教育目的のシンプルな実装です。
 * 本番環境では TanStack Query や SWR などのライブラリを使用してください。
 *
 * 使い方:
 * const resource = wrapPromise(fetchData());
 * // コンポーネント内で
 * const data = resource.read(); // データの準備状況に応じて動作が変わる
 */

type Status = "pending" | "success" | "error";

type SuspenseResource<T> = {
  read: () => T;
};

export function wrapPromise<T>(promise: Promise<T>): SuspenseResource<T> {
  let status: Status = "pending";
  let result: T;
  let error: Error;

  // Promiseの実行を開始
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
          // Suspenseに「まだ準備中」と伝えるためにPromiseをthrow
          throw suspender;
        case "error":
          // ErrorBoundaryにキャッチさせるためにErrorをthrow
          throw error;
        case "success":
          // 準備完了、データを返す
          return result;
      }
    },
  };
}
