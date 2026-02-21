**force-cache/page.tsx を実装**
   - async コンポーネントとして定義する
   - fetch() の第2引数に { cache: 'force-cache' } を指定する
   - 取得時刻を表示して、リロード時にキャッシュが効いているか確認する


**no-store/page.tsx を実装**
   - async コンポーネントとして定義する
   - fetch() の第2引数に { cache: 'no-store' } を指定する
   - 取得時刻を表示して、リロードのたびに時刻が変わることを確認する


**revalidate/page.tsx を実装**
   - async コンポーネントとして定義する
   - fetch() の第2引数に { next: { revalidate: 10 } } を指定する
   - 取得時刻を表示して、10秒以内と10秒以降のリロードで時刻の変化を比較する

**posts/[id]/page.tsx を実装**
   - generateStaticParams 関数を export する
   - 個別の投稿データは https://jsonplaceholder.typicode.com/posts/[id] から取得する
   - params の型は Promise<{ id: string }> であることに注意（Next.js 15）

