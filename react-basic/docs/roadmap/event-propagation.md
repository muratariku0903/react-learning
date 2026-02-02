## 前提：Reactのイベントはどう動いている？

Reactのイベントは **SyntheticEvent（合成イベント）** 。

- 実体は **ブラウザのネイティブイベント**
- でも **Reactがラップ**して統一的に扱っている
- 基本的な挙動（伝播・preventDefaultなど）は **DOMと同じ**

👉 なので「DOMの知識」がそのまま活きる。

---

## 1️⃣ バブリングの停止（stopPropagation）

### 🔁 そもそもバブリングとは？

イベントは **内側 → 外側** に伝播します。

```html
<button>
	<div>
		<span>Click</span>
	</div>
</button>
```

`span` をクリックすると：

```
span →div →button → document
```

この流れを **バブリング（bubbling）** と呼ぶ。

---

### 🛑 バブリングを止めたいとき

Reactでは以下を使う：

```tsx
event.stopPropagation()
```

### 例：ボタン内の要素だけクリックさせたい

```tsx
function App() {
	return (
		<div
		onClick={() => {
		        console.log('親がクリックされた')
		      }}
		    >
			<button
			onClick={(e) => {
			          e.stopPropagation()
			          console.log('ボタンだけ反応')
			        }}
			      >
			        クリック
			</button>
		</div>
	  )
}
```

### 実行結果

- ボタンをクリック →
    
    ✅「ボタンだけ反応」
    
    ❌「親がクリックされた」は **出ない**
    

---

### 💡 なぜ止める必要がある？

よくあるケース👇

- モーダルの中身をクリックしても **背景クリックは発火させたくない**
- リストアイテムの中のボタンだけ別挙動にしたい

```tsx
<div onClick={closeModal}>
	<div onClick={(e) => e.stopPropagation()}>
	    モーダル本体
	</div>
</div>
```

---

## 2️⃣ デフォルト動作の阻止（preventDefault）

### ⚙️ デフォルト動作とは？

ブラウザが **最初から持っている挙動** のことです。

例：

- `<a>` → ページ遷移
- `<form>` → 送信 & リロード
- 右クリック → コンテキストメニュー

---

### 🛑 デフォルト動作を止める

Reactでは：

```tsx
event.preventDefault()
```

---

### 例：フォーム送信時にページリロードを防ぐ

```tsx
function App() {
	return (
		<form
		onSubmit={(e) => {
		        e.preventDefault()
		        console.log('フォーム送信処理')
		      }}
		    >
			<button type="submit">送信</button>
		</form>
	)
}
```

### これをしないと？

- ページがリロードされる
- Reactの状態（state）が消える
- SPAとして破綻 😇

---

### 例：aタグを「ボタン的」に使う

```tsx
<a
  href="https://example.com"
  onClick={(e) => {
    e.preventDefault()
console.log('リンク遷移させない')
  }}
>
  クリック
</a>
```

---

## 3️⃣ stopPropagation と preventDefault の違い（超重要）

| 項目 | stopPropagation | preventDefault |
| --- | --- | --- |
| 何を止める？ | イベントの伝播 | ブラウザの標準動作 |
| 親のイベント | ❌ 発火しない | ✅ 発火する |
| ページ遷移 | ✅ 起きる | ❌ 起きない |
| 主な用途 | UIの衝突防止 | SPA制御 |

### 両方使うケースもある

```tsx
onClick={(e) => {
  e.preventDefault()
  e.stopPropagation()
}}
```

---

## 4️⃣ React的に一段深い理解

### なぜReactはバブリングを使う？

Reactは **イベント委譲** を使っています。

- すべてのイベントを **documentレベル**で一括管理
- パフォーマンスが良い
- コンポーネントが増えても管理が楽

👉 だから **stopPropagationが効く**

---

## まとめ（ここ押さえればOK）

- **バブリングの停止**
    - `event.stopPropagation()`
    - 親へのイベント伝播を止める
- **デフォルト動作の阻止**
    - `event.preventDefault()`
    - ブラウザ本来の挙動を止める
- Reactでも **DOMと同じ考え方**でOK
- モーダル・フォーム・リンクで超頻出
