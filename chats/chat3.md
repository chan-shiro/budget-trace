# 都道府県から市区町村への遷移

_Started 2026-07-11 00:48 UTC_

---

## User

都道府県のズームインから、都道府県内の市区町村ビューへの遷移をなめらかにして。

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

都道府県→市区町村の遷移をなめらかにしました。ズームインの動きに重ねて、全国地図がフェードアウトしつつ市区町村ビューがスケールしながらフェードインするクロスフェードに。戻る操作も逆再生の退場アニメーション付きです。

## User

東京都が離島が含まれていて表示が難しいですね。「東京都」文字は、本土側に表示したいですね。また、ズームインした時は、離島は、沖縄みたいに区切って表示して良いかと思います。

## Assistant

_[tool: read_file]_

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

対応しました。

- 「東京都」ラベル（と地域ズーム・ズームイン先）は本土側の最大陸塊のbboxを基準に配置
- 東京都の市区町村ビューでは、北緯35度未満の島しょ部を左側の枠に沖縄式で区切り、町村ごとに別縮尺のセルで表示（沖ノ鳥島・南鳥島などの遠隔孤島は省略）

## User

政令指定都市とかだときついね。離れている地域は、さらにズームインを追加しても良いかも。たとえば、大阪市で一回ズームイン、23区でズームイン。東京の離島も伊豆諸島など。鹿児島の奄美の辺も同じようにエリアで分けられた方が使いやすそうかも。

## User

こんな感じになっちゃうのでここは前の見た目の方が良かったね。23区内の区を選択するのが大変だったから23区だけズームする形でよかった。

## Assistant

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

戻しました。エリアズームは東京の「特別区（23区）」だけに限定 — 政令市の区や島しょ部は前のとおり地図上で直接選択・ラベル表示に戻しています（島しょ部の別縮尺枠と奄美群島の枠は維持）。

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

修正しました。「所属未定地」のように本土と島しょの境界をまたぐフィーチャは、自治体単位ではなくリング単位で島しょ判定するようにし、東京都の本土側が潰れる問題を解消しています（鹿児島も同様）。

## User

島しょ部は、それぞれ別れ過ぎているので前みたいにそれぞれ分割して表示にして良いよ。

北海道も分割表示してほしい。

## Assistant

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

変更しました。

- 島しょ部の枠は前のように町村ごとに1セルずつ分割表示（遠隔孤島は引き続き省略）
- 北海道は14の振興局エリア（石狩・十勝・オホーツクなど）に分割し、エリアクリックでもう一段ズームして市町村を選択する形に

## User

エリア分割を追加: 政令市の区

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

追加しました。政令指定都市（大阪市・札幌市・名古屋市など）の区もエリアとしてまとめ、市をクリックでズームしてから区を選択する形になりました。札幌市は石狩振興局とは別の独立エリアになります。

## User

九州沖縄はそれぞれ分割しましょう。

エリア分割に長崎、沖縄、新潟、島根の離島も同様に対応してください。

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

対応しました。

- 全国地図の地域を「九州」と「沖縄」に分割（沖縄は独自の色・単独ズーム）
- 島しょ枠を追加: 新潟（佐渡・粟島）、島根（隠岐諸島）、長崎（対馬・壱岐・五島・新上五島・小値賀）、沖縄（宮古・八重山・久米島・大東諸島など本島から離れた自治体）

## User

九州地方を表示する際に鹿児島の離島のせいで九州本土が小さくなり全体のバランスが崩れるので、鹿児島離島を区切って表示しましょう。

## Assistant

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

修正しました。原因は、鹿児島など多角形（polygon）で描かれた県で「本土の陸塊」の判定が効いておらず、地図右上の奄美・離島枠まで含めた巨大な範囲にズームを合わせていたことでした。polygonも陸塊判定の対象にしたので、九州の地域ズームは本土に合わせてバランスよく収まります（奄美はもともと地図右上の区切り枠に描画されており、鹿児島の市町村ビューでも島しょ枠から選択できます)。

## User

それぞれの都道府県、市区町村の基本情報をどっかに表示したいね。人口動態、面積、産業、歴代首長、気候（特筆すべきところがあれば）など。ダッシュボードとかが表示されているタブの同じ並びで良さそうかな。

## Assistant

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

「基本情報」タブを追加しました。ダッシュボードと同じタブ列の2番目にあり、甲府市・山梨県全体それぞれで、面積・人口・世帯数などのファクトカード、人口推移バー＋高齢化率などの人口動態、産業構成と地場産業、歴代首長（市長／知事）、気候の平年値と特記事項を表示します。数値は国勢調査等ベースのダミーを含む旨を明記しています。

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

修正しました。人口推移バーを固定高さ100pxの枠内で描画するようにして全バー同一高さになる問題を解消し、あわせて最小値基準の相対スケール（35〜100%）にして増減が読み取れるようにしました。

## User

基本情報をダッシュボードにも要約表示

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

ダッシュボード上部（予算の変遷の下）に基本情報の要約ストリップを追加しました。総人口・面積・高齢化率・首長・特色ある産業を1行で表示し、「基本情報を見る →」で詳細タブに飛べます。

## User

スマホ表示を最適化して

## Assistant

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

スマホ表示（幅640px以下）を最適化しました。基本情報の要約ストリップは2列グリッドに、基本情報タブのファクトカードも2列＋コンパクト表示に、歴代首長の行は折り返し対応に。あわせて全画面共通で見出し（h1）と予算総額の数字をモバイル向けに縮小しました。

## User

甲府市のデータを実データにして。

## Assistant

_[tool: grep]_

_[tool: web_search]_

_[tool: web_fetch]_

_[tool: snip]_

_[tool: read_file]_

_[tool: grep]_

_[tool: dc_js_str_replace]_

_[tool: web_fetch]_

_[tool: web_fetch]_

_[tool: snip]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

甲府市の予算データを公表値（甲府市サイト）の実データに更新しました。

- 令和8年度当初予算: 総額918億円（過去最大）、歳出11款（民生389・総務135・衛生101・教育88・公債80・土木67…労働2）と歳入（市税317・国庫173・交付税111・県支出金79・地方消費税交付金60・繰入金51・寄附金45・市債33）を実額に
- 前年比較の増減率も令和7年度（881億円）との実比較に、過年度実績のスケールもR7:881億/R6:808億の実データ比に、類似自治体表の甲府市行（1人あたり49.4万円）も更新

残るダミー: 項・目・節の内訳（款からの按分推計）、補正予算、執行率、議会の会派別賛否。当初予算書PDFを取り込めば項レベルまで実データ化できます。

## User

Found issues — fixing…

## Assistant

_[tool: grep]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

データ来歴の注記を更新しました。フッター・前年比較・款内訳の出典表記を「款レベルは甲府市公表の実データ、項以下・補正・執行率は推計/ダミー」という実態に合わせています。

