import MountLogger from "@/lib/MountLogger";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Link href="/exercises/layer01-basics/01-app-router/dashboard">
          ダッシュボード
        </Link>
        <Link href="/exercises/layer01-basics/01-app-router/dashboard/settings">
          設定
        </Link>
      </nav>
      <div>{children}</div>
      <MountLogger name="DashboardLayout" />
    </div>
  );
}
