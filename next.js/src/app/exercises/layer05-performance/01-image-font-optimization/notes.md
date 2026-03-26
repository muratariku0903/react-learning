 <li>
                srcset属性に複数の画像パスが指定されている
                <br />
                _next/image?url=%2FDRQnCm5UMAAeDYe.jpg&w=1080&q=75 2x
                <br />
                /_next/image?url=%2FDRQnCm5UMAAeDYe.jpg&w=640&q=75 1x
              </li>
              <li>
                閲覧するマシンの横幅に応じてリクエストクエリが切り替わっている。Macのディスプレイだと、wが1080で外付けディスプレイだとwが640となっていた
              </li>
              <li>レスポンスタブを見ると、拡張子が「webp」となっている</li>
              <li>
                「sizes」を指定すると、画面幅に応じてリクエストのwが切り替わる。768px以下だとwが1920になり、768以上だと1090が設定されている。また、srcsetがsizesを指定しない時よりも細かい幅の区切りで設定されていた。
              </li>
              <li>
                また、ブラウザの横幅を変えて時の初回のリクエストは200で通常のimgよりも時間がかかっていた。だが、それ以降は304でキャッシュの応答となり、ロード時間も一定だった。通常のimgは初回リクエスト以降は画面幅によらず常に304だったので、常に同じ画像を使い回してることがわかる。
              </li>
              <li>
                ブラウザでIphoneSEサイズで見たときに、通常のimgは70KBに対して、next/imageは16KBとコンパクト化されていた。ただ、ネットワークタブのsize項目では初期以降のリクエストは全て、0.2KBとなっていた。
              </li>


fontについて

まずセルフホスティングについてですが、ネットワークタブで見たところ、リクエスト先がローカルホストとなっておりました。なのでGoogle側にリクエストを飛ばしているのではなく、あくまで自分のオリジンからフォントを取得していることがわかります。
DisplaySwapとは、フォントがロードされるまではデフォルトで組み込まれているフォントを使って文字を表示し、ロードされた後にロードされたフォントに文字を切り替えるという仕組みになります。実際に動作確認をして通信を3Gでやったところ、最初はデフォルトの字体で文字が表示され、その後数秒後にGoogleのフォントが適用されているのを確認できました。その際にコンテンツの高さなどはほとんど変わらないので、そのことから、SizeAdjustっていうNextのCLSを下げる仕組みが裏で働いているっていうのが確認できました。
また、ElementsタブからCSSを確認したところ、Googleフォントを適用したpタグには、CSSとして、@font-faceっていうものが適用されてました。
また、また、ブラウザのソースタブから生成されたCSSを見たところ、このような以下のような定義がされていて、フォールバックするときのサイズのアジャストが定義されていることがわかります。

/* latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(@vercel/turbopack-next/internal/font/google/font?{%22url%22:%22https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2%22,%22preload%22:true,%22has_size_adjust%22:true}) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
    font-family: 'Inter Fallback';
    src: local("Arial");
    ascent-override: 90.44%;
descent-override: 22.52%;
line-gap-override: 0.00%;
size-adjust: 107.12%;

}
.className {
    font-family: 'Inter', 'Inter Fallback';
    font-style: normal;

}
