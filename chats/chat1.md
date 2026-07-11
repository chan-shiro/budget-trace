# 地方予算執行追跡サイト

_Started 2026-07-10 06:23 UTC_

---

## User

地方公共団体の予算とその執行までを確認できるサイトを作りたいです。詳細なデザインを落とし込みたい。

どの地域？をはじめに選択して、歳入、歳出の予算が大体わかる。そして、予算枠別にドリルダウンできる。たとえば、インフラとかくらしとしその自治体の分け方で良い。

他にも政策テーマ別というのもあって、子育て支援、少子化対策などをゆるく分類実際に予算がどう配分されているかがわかる。

そして、このアプリのキモだけど予算の執行まで追えるようになっている。予算はこうでした、執行率はこんな感じで実際にこう言ったものに使われましたという感じ。

トップページは、日本地図で地方を選択すると都道府県レベルで選択できるようになって都道府県を選択すると今度は市区町村を選択できる。ただし都道府県全部というレベルもあるのでこれはこれで選べるようになっている。

たとえば、今回は、山梨県甲府市をターゲットにしてみよう。

すると、甲府市の予算（歳入・歳出）をドリルダウンで詳細を見られるようになっているのと、詳細へのエビデンス（書類）を確認できるようになっています。款・項・目・節でわかるとわかりやすいかな。

政策意図と会計項目は違うので、逆でも集計表示できるようになっていて欲しい。それぞれの事業名と施策、内容、目的がわかるようになっている。

さらに、公開されているものについては進捗が分かり過年度分については執行内容がわかるようになっている。全てエビデンス付き。具体的な事業報告のPDFやページ、そのスクリーンショットなども見られる。

自治体ごとの政策意図のサマリーも見られる。

参考：予算のサイト：https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r8yosan.html

## Assistant

_[tool: set_project_title]_

_[tool: web_fetch]_

_[tool: questions_v2]_

## User

Questions answered:
- audience: 両方バランスよく
- scope: トップ（日本地図→都道府県→市区町村選択）, 自治体ダッシュボード（歳入・歳出の全体像）, 款・項・目・節ドリルダウン, 政策テーマ別ビュー（子育て支援など）, 事業詳細（目的・内容・執行率・エビデンス）, 過年度の執行実績ページ, 全部通しで
- tone: ミニマルでモダン
- chart_style: ドリルダウン型の円/ドーナツ
- fidelity: ハイファイのクリック可能なプロトタイプ
- variations: トップページのみ2〜3案
- data: 甲府市R8予算をベースにした現実的なダミーデータ
- execution_focus: 執行率のプログレス表示, 四半期ごとの執行推移, 契約・支出先の内訳, エビデンス書類（PDF・スクショ）への導線, 過年度との比較
- policy_summary: 政策テーマ別ビューの中に
- device: 両方（レスポンシブ）

## Assistant

_[tool: read_skill_prompt]_

_[tool: read_skill_prompt]_

_[tool: update_todos]_

_[tool: dc_write]_

_[tool: update_todos]_

_[tool: ready_for_verification]_

できました。`予算トレース.dc.html` — 甲府市R8予算ベースのクリック可能なプロトタイプです。

- トップ：3案切替（A タイル地図 / B 検索リスト / C スプリット）→ 山梨県 → 市区町村（県全体も選択可）
- ダッシュボード：歳入・歳出ドーナツ → 款・項・目・節ドリルダウン（歳入側も可）
- 政策テーマ別ビュー（政策意図サマリー＋款との相互集計）⇄ 事業詳細（目的・内容・執行率・四半期推移・契約先・エビデンス・過年度比較）
- 過年度実績（R6決算 / R7決算見込、款別執行率＋不用額）

注意：数値・資料名はすべてダミー。詳細な款項目節は民生費→児童福祉費、土木費→道路橋りょう費の系統のみ実データ風で、他階層は自動生成値です（画面上にも明記）。次はエビデンスに実PDFのスクショを入れる、他自治体の追加などができます。

## User

* トップの地図をもっとリアルにできる？
* 地域（北海道、東北、関東など）をクリックするとズームインして、都道府県が選択できるような演出が欲しいい
* 色味は、白黒に水色で信頼感があるような感じにしたい
* また、予算作成時の議員（政党含め）の構成も見られるようになっていると面白い

## Assistant

_[tool: run_script]_

_[tool: write_file]_

_[tool: web_search]_

_[tool: list_files]_

_[tool: update_todos]_

_[tool: copy_files]_

## Assistant

_[tool: run_script]_

## Assistant

_[tool: copy_files]_

## User

Found issues — fixing…

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

修正しました — 地図コンポーネントでReact管理下のDOMを直接書き換えていたのが原因のクラッシュでした。ローディング表示をオーバーレイに分離して解消しています。

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

ズーム座標の計算を修正しました（都道府県グループが持つ内部transformを無視していたため、ズーム先が画面外に飛んでいた）。マウント直後に画面座標→viewBox座標へ変換したbboxをキャッシュし、それを使ってズームするようにしています。地域クリック→ズームイン→都道府県選択、「← 全国」で戻る、が正しく動くはずです。

## User

アニメーションはいい感じ。都道府県→市区町村のズームインもできる？この地図の形のデータってどっかから取ってきている？そうじゃないと他の46都道府県とかもしんどそうだな。

青でいいんだけど、みんなに見やすいようにカラフルにしようか。お年寄りとかは、同系色だと色の違いに鈍感になるので。一旦カラフルモードでいこう。

## Assistant

_[tool: write_file]_

_[tool: web_search]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

_[tool: ready_for_verification]_

できました。

**都道府県→市区町村ズーム**：できます。県をクリックすると県にズームインしながら市区町村の境界データを取得し、市区町村地図に切り替わります（クリックで選択、下に市区町村チップ一覧も表示）。「← 中部」「← 全国」で戻れます。

**データの出どころ**：はい、両方ともオープンデータです。
- 都道府県の形：geolonia/japanese-prefectures（GFDL）
- 市区町村の形：国土数値情報（国土交通省）を加工した smartnews-smri/japan-topography — **全47都道府県・全1,741市区町村分が同じ形式で公開されている**ので、他県への横展開はURLの県コードを変えるだけです（実際、地図上はどの県でも市区町村ズームまで動きます。予算データが甲府市のみ）

**カラフルモード**：デフォルトをカラフルに変更。単なる原色ではなく、色覚多様性に配慮した Okabe-Ito パレットをベースにしたので、高齢の方や色弱の方でも区別しやすい配色です。地図・ドーナツ・款別バー・議会構成すべてに適用。Tweaksパネルで「青系」にも戻せます。

## User

予算の前年比較ビューを追加

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

「前年比較」タブを追加しました。ダッシュボードのナビ（款・項・目・節 と 政策テーマの間）にあります。

- サマリー：R7当初 → R8当初の総額と増減額・増減率
- 款ごとの比較：前年（グレー）／今年（カラー）のペアバー、増減額＋増減率（増=青、減=オレンジ）
- 歳出／歳入切替、行クリックでその款の内訳へ
- 増減率は款ごとのダミー値（民生費+3.4%、土木費+4.2%、商工費+6.5%など政策意図と整合させています）

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

修正しました — `compare` 画面がアプリ共通シェルの表示条件に含まれておらず白画面になっていたのを直しています。前年比較タブが正しく表示されるはずです。

## User

トップページは、C案固定にしよう。

POLICY INTENT の部分が黒背景になっていてかっこいいけど、デザイン的に見にくいので、概要プラス箇条書きで明るめに記載しよう。

## Assistant

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

_[tool: ready_for_verification]_

対応しました。

- **トップページはC案（スプリット）に固定**：A/B案と切替ピルを削除し、Tweaksからも「トップページ」項目を撤去
- **POLICY INTENT を明るく**：黒背景カード → 白カードに変更。概要1文＋重点3本柱の箇条書き（こども・若者への投資／災害に強いまちづくり／中心市街地のにぎわい再生）に再構成し、出典チップはそのまま残しています

## User

九州と沖縄は地域を分けよう。

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

分けました。地図の地域チップ・ホバー・ズームともに「九州」（福岡〜鹿児島）と「沖縄」が別地域になり、沖縄は独自の色（水色系）で表示されます。

## User

そうか、奄美があるから・・・やっぱり戻して。。。

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

戻しました。「九州・沖縄」で一つの地域です（鹿児島の奄美群島が沖縄との間に伸びるので、分けるとズーム範囲が不自然になるんですよね）。

## User

トップの地図のところでフリーワードで検索できるようにもしておいて。

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

地図の上にフリーワード検索を追加しました。

- 都道府県名の部分一致（例:「山」→ 山梨県・山形県・山口県・富山県・岡山県・和歌山県）で候補表示、選ぶと該当県へズームイン
- 「甲府」など収録済み市区町村は常に検索でき、「● 収録済」バッジ付き。選ぶと直接ダッシュボードへ
- 一度開いた県の市区町村名も検索対象に追加されます（全国の市区町村名インデックスは形状データ読込時に増えていく仕組み）

## User

グラフのホバーで、何の項目で数字はこれこれっていうのをホバーした要素のすぐ近くに表示したい。Legendを見たら書いてあるんだけど、その方がわかりやすいでしょ。スマホの場合はタップ。

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

追加しました。カーソル（スマホはタップ）した場所のすぐ上に、項目名＋金額＋構成比の黒いツールチップが出ます。

- 対象：ダッシュボードの歳入・歳出ドーナツ、ドリルダウンのドーナツ、議会構成の議席バー（会派名＋議席数＋割合）
- ドーナツはポインタの角度からセグメントを判定するので、リング上をなぞると項目が切り替わります
- タップの場合は約3秒で自動的に消えます

## User

予算って、当初予算に補正予算（追加、減額、組み換え）もあるけど予算の変遷っていうのも追えるようにするといいかな。ダッシュボードの右上のがそれかな。そこで切り替えられるようにしてみて。

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Template: header switcher + 変遷 timeline card.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

予算の変遷を追えるようにしました。

- **右上（ヘッダー）に切替**：「当初予算／補正後（現額）」のトグルを追加。切り替えるとダッシュボードのドーナツ・凡例・総額と、ドリルダウンの款レベルの数字が予算現額（831.0億→835.2億）に変わります
- **ダッシュボードに「予算の変遷」カード**：当初予算（3月議決）→ 第1号補正 +4.2億（6月議決、物価高騰対策・国庫内示対応）→ 予算現額、のタイムライン。カードクリックでも切替可能、補正予算書へのエビデンスチップ付き
- 補正の増減は款レベルで反映（民生費+2.6億、衛生費+0.8億など）。補正データは甲府市のみ収録で、山梨県全体では従来どおり当初のみ表示

補正が複数回（第2号以降）や減額・組み換えのケースは、同じタイムラインにノードを足していく想定です。必要なら第2号補正（減額含む）のサンプルも追加できます。

## User

事業詳細に補正の影響を反映

## Assistant

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

事業詳細に補正を反映しました。

- **補正対象の4事業**（保育所等運営支援 +1.8億、子育て応援金 +0.8億、にぎわい創出 +0.5億、ごみ処理施設 +0.8億 ＝ 款別補正額と整合）に「補正あり」バーを表示：補正理由、議決日、「当初◯◯億 → 現額◯◯億」、補正予算書チップ
- **ヘッダーの当初／補正後トグルと連動**：補正後表示では予算額が現額になり、執行率の分母も現額に切り替わります（ラベルも「予算現額（補正後）」に）
- ダッシュボードの注目事業・テーマ内事業・ドリルダウンの紐づく事業の予算額／執行率も同様に連動します

## User

オッケー。他に入れておいた方がいいことあるかな。

## Assistant

いくつか候補を。効果が大きそうな順です。

**市民目線の理解を助ける**
1. **「1人あたり」「1世帯あたり」換算** — 831億円と言われてもピンとこない。人口18.6万人で割って「市民1人あたり44.7万円」表示
2. **用語のインラインヘルプ** — 款・項・目・節、扶助費、予算現額…を初見の人向けにホバー/タップで一言解説
3. **財政健全性の指標カード** — 経常収支比率・実質公債費比率・基金残高の推移。「うちのまち、大丈夫？」に答える

**トレーサビリティの強化（このアプリのキモの延長）**
4. **入札・契約の詳細リンク** — 契約行から落札率・応札者数・入札結果ページへ
5. **成果指標（KPI）と決算の突き合わせ** — 事業に「待機児童数」「通行量」などの目標→実績を付け、金額と成果をセットで見せる
6. **決算での不用額・繰越の理由** — 執行率が低い款・事業に「なぜ余ったか」の注記

**継続利用のための機能**
7. **共有・通知** — 画面のURL共有（ドリル状態含む）、「この事業をフォローして補正・決算が出たら通知」
8. **自治体間比較** — 同規模自治体（人口15〜25万）と款構成・1人あたり額を並べる

**信頼性**
9. **データ出典・更新日の一覧ページ** — 全エビデンスの元資料と取得日をまとめた透明性ページ

どれを入れますか？プロトタイプ映えするのは 1・5・8 あたりです。

## User

1, 2, 4, 5, 8, 9 入れよう

## Assistant

This is a big batch — adding all six. Starting with data + logic:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now KPI data + contract bid info:

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

Now renderVals wiring:

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

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

6つすべて入れました。

1. **1人あたり換算**：ダッシュボード右上の総額の下に「市民1人あたり44.7万円・1世帯あたり93.4万円」（補正後表示にも連動）
2. **用語ヘルプ**：歳入・歳出・款項目節・予算現額・執行率・不用額に「?」ボタン。ホバー/タップで既存のツールチップに解説が出ます
3. **入札・契約の詳細**：契約テーブルの契約方法の下に「落札率 92.4%・応札6者」を表示（競争入札案件）
4. **KPI**：事業詳細に「成果指標（KPI）」テーブル（目標／R7実績／達成・未達バッジ）。全8事業に2指標ずつ、成果報告書の出典チップ付き
5. **類似自治体比較**：新タブ「類似自治体」。松本・沼津・上田＋類似団体平均と、人口・総額・1人あたり歳出・歳出構成の積み上げバー（ホバーで内訳）。甲府市の行をハイライト
6. **出典一覧**：フッターの「データ出典・更新日一覧 →」から。全13資料の種別・発行元・最終確認日・使用箇所

補足：類似比較タブは甲府市表示のときのみ出ます（県レベルでは非表示）。

## User

基本的に一人当たりが全体のどこでもわかるようにしたい。たとえば、政策テーマごとに一人当たりにどのくらいかけているのかがわかるようにしたい。

## Assistant

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

Now the template display points:

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

1人あたり表示を全画面に展開しました。

- **政策テーマ**：テーマカード「◯事業・◯円/人」、テーマ詳細の合計に「市民1人あたり◯円」、テーマ内の各事業にも◯円/人
- **ドリルダウン**：各行の金額の下に◯円/人、ドーナツ中央にも1人あたり額
- **ダッシュボード**：テーマカード・注目事業カードに追加、ドーナツのホバーツールチップにも「1人あたり◯円」が出ます
- **事業詳細**（予算現額の下）、**前年比較**（今年度総額の下）、**過年度実績**（支出済1人あたり）にも追加
- 金額は1万円以上は「44.7万円」、未満は「26,774円」形式。補正後表示や県レベル（人口79万人）にも連動します

例：子育て・教育テーマは市民1人あたり約3.2万円、といった見方がどこでもできるようになっています。

## User

一人当たりっていうのをタブとかで切り替えられるように全部のデータに反映させる方式はどうだろう。今の補助的な表示はそのままでも良いです。

## Assistant

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

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Template: header toggle + sub-label holes:

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

## Assistant

