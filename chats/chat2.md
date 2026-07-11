# モバイルの見た目最適化

_Started 2026-07-10 11:29 UTC_

---

## User

モバイルの見た目を最適化して。

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Quick check of the compacted mobile header:

_[tool: multi_screenshot]_

Stale preview — reloading and re-checking:

_[tool: show_html]_

_[tool: multi_screenshot]_

Mobile view is fixed. Done — handing off for verification.

_[tool: ready_for_verification]_

_[tool: snip]_

モバイル最適化を強化しました。

- **固定ヘッダーを大幅にコンパクト化** — 従来は切替ボタン類が3段に折り返して画面の半分近くを占有。単位・予算段階・年度の切替を横スクロール1行に集約
- **タブ・切替行のスクロールバーを非表示に**（太いグレーのバーが常時出ていたのを解消）
- ついでにバグ修正:「1人あたり」「/人」の後ろが空欄になっていた箇所(款ドリルダウン・テーマカード・注目事業・事業詳細など約9箇所)で、正しい1人あたり金額が表示されるようにしました

デスクトップ表示には影響ありません。

## User

ダッシュボードの右上の「令和8年度 当初予算」から年度を切り替えられるようにして。

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

年度切替を追加しました。動作確認は上記の通りです。

## User

グラフをアニメーションさせて

## Assistant

グラフにエントランスアニメーションを追加します(ドーナツは時計回りスイープ、バーは伸長、年度切替時はスムーズに遷移)。

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

完了です。画面を移動するたびにチャートが描画アニメーションで表示されます。

## User

グラフで、マウスオーバーしたところを強調することできる？

## Assistant

できます。ホバー中のセグメントを残して他を淡色化する連動ハイライトを、ドーナツ(凡例とも相互連動)・議会構成バー・類似自治体の構成バーに実装します。

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

完了です。ダッシュボードのドーナツや款ドリルダウンで試してみてください。

## User

ずれてない？

## Assistant

確認します。実際にドーナツ上でホバーを再現して、検出セグメントとカーソル位置の対応を検証します。

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: multi_screenshot]_

描画文字列と判定結果をプログラムで照合します。

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

_[tool: multi_screenshot]_

判定は正常(真上起点)で、描画修正はページ再読込で反映されます。再読込して最終確認:

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: ready_for_verification]_

_[tool: snip]_

修正完了です。ホバー位置とハイライト・ツールチップの対応が正確になりました(ドーナツの開始位置が真上からになったため、セグメントの並び位置が90度回転しています — 12時起点の標準的な表示です)。

## User

都道府県の中の市区町村になったときに、市区町村名を小さめでもいいのでマップ上に表示して欲しい。

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: ready_for_verification]_

完了です。都道府県を開いて市区町村ズームに入ると、各市区町村の重心位置に名前が表示されます。

- 面積の大きい自治体ほど大きめの文字(9.5〜15px)、白フチ付きで地色の上でも読めます
- 甲府市(収録済・青塗り)は白文字で表示
- ラベルはクリックを妨げません(ホバー・選択はそのまま動作)

小さい町村はかなり小さい文字になるので、もし見づらければ「一定面積未満はラベル省略してホバー時のみ表示」にも変更できます。

## User

いいね。ホバーしたら文字を大きくするようにしてみて。

## Assistant

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

追加しました。市区町村(または下のチップ)にホバーすると、ラベルが拡大(最低16px)・太字化し、白フチを強めて最前面に浮き上がります。0.18秒のスムーズな遷移付きです。

## User

もうちょっと大きくしてもいいかも

## Assistant

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: ready_for_verification]_

拡大率を1.4倍→1.8倍(最低20px)に上げました。

## User

ダッシュボードに追加: 数値のカウントアップ演出

## Assistant

カウントアップコンポーネントを追加し、ダッシュボードの主要数値(総額・ドーナツ中央・予算の変遷カード)に適用します。

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

カウントアップ演出を追加しました。

- **総額(831億円)・歳入/歳出ドーナツ中央・予算の変遷3カード**が表示時に0から、年度・補正切替時は旧値から新値へイージング付きでカウントアップ(約1秒)
- 総額/1人あたり切替は即時反映(不要なアニメを避けるため)
- `prefers-reduced-motion` では無効

他の数値(執行率、凡例の金額など)にも広げられますが、うるさくなるので主要数値に絞っています。

## User

事業までエビデンスを集めているので、節の下の目や事業単位まで掘り下げたいね。

## Assistant

款→項→目→節の下に「事業」レベルを追加します(収録済み事業がある目のみ節から掘り下げ可能、事業クリックで詳細・エビデンスへ)。

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

ドリルダウンを「款 → 項 → 目 → 節 → **事業**」まで拡張しました。

- 収録済み事業がある目では、節の行がクリック可能になり、その下の**事業一覧**(予算額・構成比のドーナツ付き)へ
- 事業行をクリックすると事業詳細(契約・支出先・KPI・エビデンス)へ移動
- 階層バッジは「この階層:事業」と表示、エビデンス欄も事業件数の案内に切替
- 例: 歳出 → 民生費 → 児童福祉費 → 児童福祉総務費 → 節 → 事業2件

注意: 節と事業の対応データは実際には持っていないため、目レベルの紐付けで表示しています(実運用では節×事業のマッピングが必要です)。

## User

節×事業のマッピングを追加

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: snip]_

_[tool: ready_for_verification]_

節×事業マッピングを追加しました。

- 全8事業に節別の予算配分(`PROJ_SETSU`)を定義 — 例: 道路橋りょう長寿命化は「工事請負費78% / 委託料17% / 需用費5%」
- 節の行は、**その節に配分がある事業が存在する場合のみ**クリック可能に
- 事業レベルでは配分後の金額を表示し、金額の下に「事業予算の◯%を配分」と明記
- 配分率はダミーである旨をエビデンス欄に注記(実運用では予算書の節内訳から取得)

## User

日本地図の段階で、中部とか地域名を都道府県の表示と同じように表示して。中間の都道府県選ぶときも同じ。

## Assistant

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: multi_screenshot]_

_[tool: ready_for_verification]_

追加しました。

- **全国表示**: 8地域名(北海道・東北・関東・中部・近畿・中国・四国・九州・沖縄)を各地域の中心に表示
- **地域ズーム時**: その地域の都道府県名を各県の中心に表示
- 市区町村ラベルと同じスタイル(白フチ・ホバーで拡大)で、ズームアニメーションにも滑らかに追従
- 離島による位置ずれを避けるため、地域中心の計算から沖縄・東京の離島分を除外

## User

地図ラベルを都道府県面積で大小調整

## Assistant

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: ready_for_verification]_

調整しました。地域ズーム時の都道府県ラベルが、県の面積(地図上の占有域)に応じて10.5〜16pxで変化します(地域内最大の県を基準に平方根スケール)。ホバー時の拡大はそのまま有効です。

## User

スマホで地図操作を最適化

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

スマホ向けに地図操作を最適化しました。

- **市区町村の2段階タップ**: 1回目のタップで名前を拡大表示+ステータスピルに「もう一度タップで選択」と案内、2回目で決定(小さい町村の誤タップで画面遷移してしまうのを防止)
- **チップ(下の自治体ボタン)**: タッチ端末では44px級のタップターゲットに拡大、リストの表示高さも拡大
- **検索欄**: タッチ端末ではフォント16pxにして、iOSのフォーカス時自動ズームを防止
- マウス操作(PC)は従来どおり1クリック選択・ホバー表示のまま

地域・都道府県のタップは元々ズームするだけで戻れるため、1タップのままにしています。

