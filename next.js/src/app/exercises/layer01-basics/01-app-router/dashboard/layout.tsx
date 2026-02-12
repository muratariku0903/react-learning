// TODO: ダッシュボード用レイアウトを実装する
// - 左側にサイドバーを配置
// - 「ダッシュボード」「設定」へのリンク

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: サイドバーをここに実装 */}
      <div>{children}</div>
    </div>
  );
}
