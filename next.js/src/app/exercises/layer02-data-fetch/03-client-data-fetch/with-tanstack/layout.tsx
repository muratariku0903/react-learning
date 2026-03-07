import { QueryProvider } from "../components/SearchResultWithQuery";

export default function QueryLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
