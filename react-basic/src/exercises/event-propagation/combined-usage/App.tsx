import { useState, useEffect, type MouseEvent } from "react";

type MenuItem = {
  label: string;
  href: string;
  isSpaLink: boolean; // trueならSPA的に処理、falseなら通常のページ遷移
};

const menuItems: MenuItem[] = [
  { label: "ダッシュボード", href: "/dashboard", isSpaLink: false },
  { label: "プロフィール", href: "/profile", isSpaLink: true },
  { label: "設定", href: "/settings", isSpaLink: true },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  // ドキュメント全体のクリックでメニューを閉じる
  useEffect(() => {
    const handleDocumentClick = () => {
      if (isMenuOpen) {
        console.log("ドキュメントクリック: メニューを閉じます");
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [isMenuOpen]);

  const handleMenuButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ドキュメントのクリックイベントを発火させない
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (e: MouseEvent<HTMLAnchorElement>, item: MenuItem) => {
    // e.stopPropagation();
    // SPAリンクの場合はページ遷移を止めて、コンソールに出力後、メニューを閉じる
    if (item.isSpaLink) {
      e.preventDefault();
    }

    // 通常リンクの場合はそのままページ遷移させる
    console.log(`ナビゲート: ${item.href}`);
    setCurrentPath(item.href);
    setIsMenuOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
        }}
      >
        <span>MyApp</span>

        <div style={{ position: "relative" }}>
          <button
            onClick={handleMenuButtonClick}
            style={{
              padding: "8px 16px",
              backgroundColor: "#555",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            メニュー ▼
          </button>

          {isMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                minWidth: "150px",
                zIndex: 1000,
              }}
            >
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleMenuItemClick(e, item)}
                  style={{
                    display: "block",
                    padding: "10px 15px",
                    color: "#333",
                    textDecoration: "none",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.label}
                  {item.isSpaLink && (
                    <span style={{ fontSize: "12px", color: "#999", marginLeft: "5px" }}>
                      (SPA)
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div style={{ marginTop: "20px", padding: "20px", backgroundColor: "#f5f5" }}>
        <h2>現在のパス: {currentPath}</h2>
        <p>メニューから項目を選択してください。</p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          ※ 「ダッシュボード」は通常のページ遷移、それ以外はSPA的な処理をします。
        </p>
      </div>
    </div>
  );
}
