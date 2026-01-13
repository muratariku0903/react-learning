/* eslint-disable react-hooks/refs */
// keyと同一性 演習
// この演習では、リストのkeyがReconciliationに与える影響を観察します

import { useEffect, useRef, useState } from "react";

export default function App() {
  return (
    <div>
      <h1>keyと同一性</h1>
      <p>README.mdの要件に従って実装してください。</p>
      {/* ここにTODOリストを実装 */}
      <Todo />
    </div>
  );
}

const Todo = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [useIndexForKey, setUseIndexForKey] = useState(false);

  // 追加：mount/unmount 集計（全体 + item.keyごと）
  const [mountTotal, setMountTotal] = useState(0);
  const [unmountTotal, setUnmountTotal] = useState(0);
  const [mountByItemKey, setMountByItemKey] = useState<Record<string, number>>({});

  const addTodo = () => {
    const nextKey = makeRandomKey();
    setTodos((prev) => [...prev, { key: nextKey, title: `test${nextKey}` }]);
  };
  const prependTodo = () => {
    const nextKey = makeRandomKey();
    setTodos((prev) => [{ key: nextKey, title: `test${nextKey}` }, ...prev]);
  };
  const updateTodoTitle = (itemKey: string, nextTitle: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.key === itemKey ? { ...t, title: nextTitle } : t))
    );
  };
  const handleItemMount = (itemKey: string) => {
    setMountTotal((n) => n + 1);
    setMountByItemKey((prev) => ({
      ...prev,
      [itemKey]: (prev[itemKey] ?? 0) + 1,
    }));
  };

  const handleItemUnmount = () => {
    setUnmountTotal((n) => n + 1);
  };

  return (
    <div>
      <label style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={useIndexForKey}
          onChange={(e) => setUseIndexForKey(e.target.checked)}
        />
        useIndexForKey（index を key に使う）
      </label>
      <div style={{ marginTop: 8, fontFamily: "monospace" }}>
        mounts:{mountTotal} / unmounts:{unmountTotal}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button type="button" onClick={addTodo}>
          TODOを追加（末尾）
        </button>
        <button type="button" onClick={prependTodo}>
          TODOを追加（先頭）
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => {
          const key = useIndexForKey ? index : todo.key;
          const mountedCountForThisItem = mountByItemKey[todo.key] ?? 0;

          return (
            <TodoItem
              key={key}
              item={todo}
              reactKey={key}
              mountedCountForThisItem={mountedCountForThisItem}
              onMount={() => handleItemMount(todo.key)}
              onUnmount={() => handleItemUnmount()}
              onCommitTitle={(nextTitle) => updateTodoTitle(todo.key, nextTitle)}
            />
          );
        })}
      </ul>
    </div>
  );
};

type TodoItemProps = {
  reactKey: string | number;
  item: TodoItem;
  // 追加：表示用（この「データ(item.key)」が過去に何回mountされたか）
  mountedCountForThisItem: number;

  // 追加：親へ通知
  onMount: () => void;
  onUnmount: () => void;

  // 追加：タイトル更新
  onCommitTitle: (nextTitle: string) => void;
};
const TodoItem = ({
  reactKey,
  item,
  mountedCountForThisItem,
  onMount,
  onUnmount,
  onCommitTitle,
}: TodoItemProps) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // 「このTodoItemインスタンス固有のID」（マウント中ずっと同じ）
  const instanceIdRef = useRef(makeRandomKey());
  // 実DOMの参照（同じDOMノードが維持されているか観測）
  const liRef = useRef<HTMLLIElement | null>(null);

  // uncontrolled: 入力値はDOMが保持。必要なときにrefから読む
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 表示用（入力そのものは制御しない）
  const [draftPreview, setDraftPreview] = useState(item.title);

  useEffect(() => {
    onMount();

    // mount
    console.log("[mount]", {
      reactKey,
      itemKey: item.key,
      title: item.title,
      instanceId: instanceIdRef.current,
    });

    return () => {
      onUnmount();
      // unmount
      console.log("[unmount]", {
        reactKey,
        itemKey: item.key,
        title: item.title,
        instanceId: instanceIdRef.current,
      });
    };
    // reactKey / item は変わりうるので、mount/unmount観測に絞って初回だけにする
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // DOMノードが同一かどうかは「参照が変わるか」でざっくり観測できる
    // （正確にはDOMが再利用されてもrefは同じノードを指し続けます）
    console.log("[commit]", {
      reactKey,
      itemKey: item.key,
      title: item.title,
      instanceId: instanceIdRef.current,
      domNode: liRef.current,
    });
  });

  const handleSave = () => {
    const nextTitle = inputRef.current?.value ?? "";
    onCommitTitle(nextTitle);
  };

  const handleReset = () => {
    if (!inputRef.current) return;
    inputRef.current.value = item.title; // DOMの値を書き換える
    setDraftPreview(item.title); // 表示用プレビューも合わせる
  };

  return (
    <li ref={liRef} style={{ marginTop: 8 }}>
      <div>
        key:{String(reactKey)} --- <b>{item.title}</b>{" "}
        <span style={{ fontFamily: "monospace" }}>
          （render:{renderCountRef.current} / instance:{instanceIdRef.current} /
          itemMounted:
          {mountedCountForThisItem}）
        </span>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
        <input
          ref={inputRef}
          defaultValue={item.title}
          onChange={(e) => setDraftPreview(e.target.value)}
          placeholder="タイトルを編集（uncontrolled）"
        />
        <button type="button" onClick={handleSave}>
          保存
        </button>
        <button type="button" onClick={handleReset}>
          リセット
        </button>
        <span style={{ fontFamily: "monospace" }}>draft:{draftPreview}</span>
      </div>
    </li>
  );
};

const makeRandomKey = () => {
  const time = Date.now().toString(36).slice(-2); // 末尾2桁だけ使う
  const rand = Math.random().toString(36).slice(2, 8); // 6桁
  return `k${time}${rand}`;
};

const initialTodos: TodoItem[] = [
  { key: makeRandomKey(), title: "test1" },
  { key: makeRandomKey(), title: "test2" },
  { key: makeRandomKey(), title: "test3" },
];

type TodoItem = {
  key: string;
  title: string;
};
