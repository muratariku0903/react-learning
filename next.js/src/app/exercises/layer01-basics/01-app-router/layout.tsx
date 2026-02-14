// TODO: 演習全体の共通レイアウトを実装する
// - ページ上部にナビゲーションバーを配置
// - 「ホーム」「ダッシュボード」「プロフィール」へのリンク
// - layout.tsxが再マウントされないことを確認する仕組みを入れる

import MountLogger from "@/lib/MountLogger";
import Link from "next/link";

export default function ExerciseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Link key="01-app-router" href="/exercises/layer01-basics/01-app-router">
          ホーム
        </Link>
        <Link
          key="01-app-router/dashboard"
          href="/exercises/layer01-basics/01-app-router/dashboard"
        >
          dashboard
        </Link>
        <Link
          key="01-app-router/profile"
          href="/exercises/layer01-basics/01-app-router/profile"
        >
          profile
        </Link>
      </nav>
      <main>{children}</main>
      <MountLogger name="ExerciseLayout" />
    </div>
  );
}
