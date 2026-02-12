// TODO: 演習全体の共通レイアウトを実装する
// - ページ上部にナビゲーションバーを配置
// - 「ホーム」「ダッシュボード」「プロフィール」へのリンク
// - layout.tsxが再マウントされないことを確認する仕組みを入れる

export default function ExerciseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: ナビゲーションバーをここに実装 */}
      <main>{children}</main>
    </div>
  );
}
