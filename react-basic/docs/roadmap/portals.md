Portalsは一言で言うと、

> 「Reactのコンポーネントを“ツリーの外側のDOM”に描画する仕組み」
> 

---

## 1. なぜPortalsが必要なのか？

まず、Reactの基本原則を思い出します。

- Reactコンポーネントは **DOMツリー構造に沿って描画** される
- 親のDOMの制約（`overflow: hidden`、`z-index` など）を受ける

ここで問題になるのが **モーダル・トースト・ツールチップ**。

```
App
 └─ Main (overflow: hidden)
     └─ Button
         └─ Modal ❌ はみ出せない
```

- モーダルを画面全面に出したい
- でも親の `overflow: hidden` に切られる
- z-indexを上げても限界がある

👉 **DOMの場所を変えたい**

これを解決するのが **Portals**。

---

## 2. Portalsのイメージ

![image.png](attachment:1fab5fd4-136a-4705-ad12-1bab1bce30a0:image.png)

- **Reactの論理ツリー** はそのまま
- **実際のDOMの描画先だけ** を変える

これがPortalsの本質。

---

## 3. Portalsの基本構文

```tsx
ReactDOM.createPortal(children, container)
```

- `children`：描画したいReact要素
- `container`：描画先のDOMノード

---

## 4. 最小のサンプル（Modal）

### index.html

```html
<body>
	<div id="root"></div>
	<div id="modal-root"></div>
</body>
```

### Modalコンポーネント

```tsx
import { createPortal }from'react-dom'

export functionModal({ children }: { children: React.ReactNode }) {
const modalRoot =document.getElementById('modal-root')!

return createPortal(
	<div className="modal-backdrop">
		<div className="modal">
		        {children}
		</div>
	</div>,
	    modalRoot
	  )
	}
```

### 使用側

```tsx
functionApp() {
return (
		<div>
			<h1>App</h1>
			<Modal>
			<p>これはモーダルです</p>
			</Modal>
		</div>
  )
}
```

👉 Reactツリー上では `App → Modal`

👉 DOM上では `#modal-root` に描画される

---

## 5. Portalsの重要ポイント（ここ超大事）

### ① イベントバブリングは「Reactツリー基準」

これ、よく誤解される。

```tsx
functionApp() {
return (
	<div onClick={() => console.log('App clicked')}>
		<Modal />
	</div>
	  )
}
```

- ModalはDOM的には外にある
- **でもクリックイベントはAppまでバブリングする**

👉 **Reactのイベントシステムは論理ツリー基準**

これは設計上かなり美しいポイント。

---

### ② スタイルの制約から解放される

Portalsを使うと：

- `overflow: hidden` を無視できる
- `z-index` 戦争から解放される
- 画面全体UIが安定する

だから、

- モーダル
- ドロップダウン
- トースト
- ツールチップ

は **ほぼPortals前提**。

---

## 6. Context・Stateとの関係

Portalsは **見た目の描画先を変えるだけ**。

```
- props → そのまま
- state → そのまま
- context → そのまま
```

```tsx
<ThemeContext.Provider value="dark">
	<Modal /> {/* PortalでもContextは普通に使える */}
</ThemeContext.Provider>
```

👉 **ロジックは親と完全に共有**

ここが「別DOMに描画してるのにReact的には子」の理由。

---

## 7. よくある設計パターン

### ModalProvider × Portal

```
App
 └─ ModalProvider
     ├─ children
     └─ Portal描画領域
```

- モーダル管理ロジック：Context
- 実DOM描画：Portal

👉 中〜大規模Reactでよく見る構成

---

## 8. Portalsを使うべきケース・使わなくていいケース

### ✅ 使うべき

- モーダル
- トースト
- ツールチップ
- グローバルオーバーレイ

### ❌ 使わなくていい

- 普通の画面レイアウト
- 単なるコンポーネント分割
- 状態共有目的（Contextの役割）

---

## 9. まとめ（短く）

- Portals = **描画先DOMを切り替える仕組み**
- Reactツリーは維持される
- イベント・Context・Stateは通常通り
- UIの「レイヤー問題」を解決するための機能
