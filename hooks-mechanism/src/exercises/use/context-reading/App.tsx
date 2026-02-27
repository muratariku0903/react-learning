import { createContext, useState, use } from "react";

// --- Context定義 ---
const ThemeContext = createContext<"light" | "dark">("light");
const LocaleContext = createContext<"ja" | "en">("ja");

function UserGreeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (!isLoggedIn) return <p>コンテキストは読み取りません</p>;

  const theme = use(ThemeContext);
  const locale = use(LocaleContext);

  return (
    <div>
      <p>theme: {theme}</p>
      <p>locale: {locale}</p>
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
