import { createContext, useContext, useState } from 'react';
import { Modal } from './components/Modal';

// テーマ用のContext
type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// テーマ切り替えボタン
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        background: theme === 'light' ? '#333' : '#fff',
        color: theme === 'light' ? '#fff' : '#333',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {theme === 'light' ? 'ダークモードに切り替え' : 'ライトモードに切り替え'}
    </button>
  );
}

// メインコンテンツ
function MainContent() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    container: {
      padding: '30px',
      minHeight: '100vh',
      background: theme === 'light' ? '#fff' : '#1a1a2e',
      color: theme === 'light' ? '#333' : '#eee',
      transition: 'all 0.3s ease',
    },
    card: {
      padding: '20px',
      borderRadius: '8px',
      background: theme === 'light' ? '#f5f5f5' : '#2d2d44',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Portals - Context・Stateとの連携</h1>

      <div style={{ marginTop: '20px' }}>
        <ThemeToggleButton />
      </div>

      <div style={styles.card}>
        <p>現在のテーマ: <strong>{theme}</strong></p>
        <p>このカードはテーマに応じて色が変わります。</p>

        <button
          onClick={() => setIsOpen(true)}
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          モーダルを開く
        </button>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <ThemedModalContent />
        </Modal>
      )}

      <div style={{ ...styles.card, marginTop: '30px' }}>
        <h3>確認ポイント</h3>
        <ul>
          <li>モーダル内でもテーマが正しく反映されているか</li>
          <li>Portal化しても同じ動作になるか</li>
          <li>モーダル内からテーマを切り替えられるか</li>
        </ul>
      </div>
    </div>
  );
}

// モーダル内のコンテンツ（テーマを使用）
function ThemedModalContent() {
  const { theme } = useTheme();

  return (
    <div>
      <h2>モーダルの内容</h2>
      <p>
        現在のテーマ: <strong>{theme}</strong>
      </p>
      <p>このモーダルはPortalで描画されていますが、Contextは正しく機能していますか？</p>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          background: theme === 'light' ? '#e8f4fd' : '#2d3748',
          borderRadius: '4px',
          color: theme === 'light' ? '#1a5f7a' : '#90cdf4',
        }}
      >
        このボックスもテーマに応じた色になっています
      </div>

      {/* TODO: 追加課題 - ここにテーマ切り替えボタンを追加 */}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
