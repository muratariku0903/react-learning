# 設計メモ

## 問題の整理

Modalコンポーネントが親であるdiv要素のCSSによって表示領域が制限されている。


## 解決方針

Portalsを使って、Modelコンポーネントの描画先をdocument.bodyに差し替える


## 実装の詳細

```ts
return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "red",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          閉じる
        </button>
      </div>
    </div>,
    document.body,
  );
```

---

## 評価コメント

設計と実装の整合性は良好です。問題の把握、解決方針、実装詳細が一貫しています。

`stopPropagation()`を使ってモーダル内部のクリックがオーバーレイに伝播しないようにしているのも適切な実装です。

**完了とします。**
