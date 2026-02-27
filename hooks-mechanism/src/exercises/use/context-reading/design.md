- `use`を使ってどのようにContextの値を読み取るか
  const theme = use(ThemeContext);
  const locale = use(LocaleContext);


- `isLoggedIn`が`false`のときにContextを読まないようにする設計
isLoggedIn が false の場合はContextを読み取らずに早期リターンする
isLoggedIn が true の場合はContextを読み取る
