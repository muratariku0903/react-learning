// 意図的に遅いデータ取得関数群（演習用）

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchUserInfo() {
  await delay(500);
  return {
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "管理者",
  };
}

export async function fetchPosts() {
  await delay(2000);
  return [
    { id: 1, title: "Next.js入門", summary: "App Routerの基本を学ぶ" },
    { id: 2, title: "データフェッチ", summary: "Server Componentでのfetch" },
    { id: 3, title: "Suspenseの活用", summary: "段階的レンダリングを実現する" },
  ];
}

export async function fetchComments() {
  await delay(4000);
  return [
    { id: 1, author: "鈴木", text: "とても参考になりました" },
    { id: 2, author: "佐藤", text: "わかりやすい解説ですね" },
    { id: 3, author: "山田", text: "次の記事も楽しみにしています" },
    { id: 4, author: "中村", text: "実践的で助かります" },
  ];
}
