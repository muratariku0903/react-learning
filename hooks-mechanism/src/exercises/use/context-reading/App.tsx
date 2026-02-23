import { createContext, useState } from "react";

// --- Context定義 ---
const ThemeContext = createContext<"light" | "dark">("light");
const LocaleContext = createContext<"ja" | "en">("ja");

// --- TODO: use フックを使って条件付きでContextを読み取るコンポーネント ---
function UserGreeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  // TODO: isLoggedIn が false の場合はContextを読み取らずに早期リターンする
  // TODO: isLoggedIn が true の場合のみ use(ThemeContext) と use(LocaleContext) を呼び出す
  // TODO: テーマに応じたスタイルと、ロケールに応じた挨拶メッセージを表示する

  return (
    <div>
      <p>ここに条件付きContext読み取りを実装してください</p>
    </div>
  );
}

// --- Provider とトグルUI（変更不要） ---
export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [locale, setLocale] = useState<"ja" | "en">("ja");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeContext.Provider value={theme}>
      <LocaleContext.Provider value={locale}>
        <div style={{ padding: "20px" }}>
          <h2>use × Context 演習</h2>

          <div style={{ marginBottom: "16px" }}>
            <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              テーマ切替: {theme}
            </button>
            <button
              onClick={() => setLocale(locale === "ja" ? "en" : "ja")}
              style={{ marginLeft: "8px" }}
            >
              言語切替: {locale}
            </button>
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              style={{ marginLeft: "8px" }}
            >
              {isLoggedIn ? "ログアウト" : "ログイン"}
            </button>
          </div>

          <UserGreeting isLoggedIn={isLoggedIn} />
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}
