// 「調べたが収録できなかった」記録の台帳。
//
// これまで docs/data-sources.md にしか無かった判定を構造化して `/coverage` に出す。
// **読者にとって「まだ調べていない（×）」と「調べたが収録できない」は意味が全然違う** —
// 前者は ToDo、後者は一次資料そのものの事情なので、区別できないと空欄の意味が読めない。
//
// ---- 書くときのルール（守らないと台帳が嘘になる）----------------------------
//
// 1. **理由を創作しない。** docs/data-sources.md に書いてあることの転記だけにする。
//    「たぶんスキャンだから」のような推測を断定で書かない。理由が特定できていない年度は
//    **この台帳に載せない**（載せなければ `/coverage` では通常の × ＝ まだ調べていない扱いになる）。
//
// 2. **「できない」を永久の事実として書かない。** これは `checkedOn` 時点の実測記録である。
//    判定は実際にくつがえっている — 豊島区 R4・R2 と大田区 H27 は「ToUnicode 全面欠落で
//    修復不可」と書かれていたのが、共通の復号層（#159）でのちに収録できた。
//    → 文面は「この方法では取れなかった」であって「未来永劫取れない」ではない。
//
// 3. **団体コードは総務省の一次資料から引く**（`data/normalized/municipal-accounts/R6.json`）。
//    記憶や推測で書かない。実在する別自治体のコードを書いても誰も気づけない
//    （浜松市を静岡市のコードで登録して1人あたりを16.5%狂わせた前科がある）。
//    → derive が `name` と総務省台帳を突合し、食い違えば throw する。
//    都道府県エンティティは市区町村台帳に居ないので、**JIS X 0402 の検査数字**で検算する。
//
// 4. **収録できたらこの記録を消す。** derive が「その団体・その年度・そのデータ種別を
//    実際に収録していないか」を機械的に照合し、収録済みなら **throw して derive を止める**。
//    記録が静かに腐ることは無い（＝ルール2 の担保）。
//
// 5. 件数は書かない。`/coverage` の集計は derive がこの配列から算出する。

/**
 * 収録できなかった原因の分類。**原因の型が違えば打ち手も違う**ので分けている:
 * - `no-material` … そもそも該当する資料がウェブに無い（発行元が公開していない／消えている）
 * - `scanned-image` … 紙をスキャンした画像で、機械可読なテキストが無い
 * - `broken-text-layer` … テキスト層はあるが壊れている（ToUnicode 欠落・OCR レイヤの重なり等）
 * - `format-mismatch` … 資料はあるが様式が要件を満たさない（款別でない／前年度額の列が無い等）
 * - `parser-unsupported` … 原典は健全だが、こちらの抽出が対応していない（＝我々の側の事情）
 */
export type UnrecordableCategory =
  | "no-material"
  | "scanned-image"
  | "broken-text-layer"
  | "format-mismatch"
  | "parser-unsupported";

/** 画面に出す分類名。**この順で並べる**（原因が発行元側 → こちら側 の順） */
export const UNRECORDABLE_CATEGORIES: { key: UnrecordableCategory; label: string; note: string }[] = [
  { key: "no-material", label: "資料が存在しない", note: "該当する資料がウェブ上に見つからない（発行元が公開していない・掲載が消えている）" },
  { key: "scanned-image", label: "スキャン画像", note: "紙をスキャンした画像で、機械可読なテキストが入っていない" },
  { key: "broken-text-layer", label: "テキスト層の破損", note: "テキストは入っているが壊れている（文字化け・数字の脱落・二重レイヤ）" },
  { key: "format-mismatch", label: "様式が要件を満たさない", note: "資料はあるが、款別でない・前年度額の列が無いなど、収録に必要な形になっていない" },
  { key: "parser-unsupported", label: "パーサ未対応", note: "原典は健全だが、こちらの抽出処理が対応していない（＝我々の側の事情）" },
];

export interface UnrecordableRecord {
  /** 団体コード6桁。市区町村は総務省台帳から実引き、都道府県はエンティティコード（例 280003 = 兵庫県） */
  code: string;
  /** 団体名。derive が総務省台帳／都道府県名と突合する（取り違えの検出） */
  name: string;
  /** `/coverage` のデータセット列の key（budget / projects / report / evaluation …） */
  dataset: string;
  /** 対象年度。列挙できるものはすべて列挙する（derive が収録済みでないことを年度単位で照合する） */
  fiscalYears: string[];
  /** 「〜以前」で線を引くしかない場合の下限側の境界（この年度を含む）。fiscalYears と併用可 */
  fyUpTo?: string;
  /** 年度を特定できない場合の表記（原典の言い方をそのまま）。fiscalYears が空のときだけ使う */
  fyNote?: string;
  /** 分類（複数該当する場合は該当するものを全部。先頭を主分類として並べに使う） */
  categories: UnrecordableCategory[];
  /** 理由（docs からの転記。1〜3文） */
  reason: string;
  /** 根拠 URL（判定の対象になった資料そのもの、または年度一覧）。無ければ省略する */
  url?: string;
  /** 確認日（YYYY-MM-DD）。この記録は「この日の実測」であって恒久の事実ではない */
  checkedOn: string;
  /** 詳細の在り処（docs のセクション） */
  ref: string;
}

export const UNRECORDABLE: UnrecordableRecord[] = [
  // ==== 中核市 第5弾（2026-08-23・loop.md 第6巡・docs §13-6）==================================
  {
    code: "232114", name: "豊田市", dataset: "budget", fiscalYears: ["R3", "R2", "H31"],
    categories: ["scanned-image"],
    reason:
      "当初予算関連資料・予算説明書とも CCITT スキャンで pdftotext が0〜43文字しか返さない（発行元からは削除済みで、" +
      "Wayback とオープンデータカタログの写しも同一のスキャン）。H30〜H28 は Wayback にテキスト層つきで残り同じ設定で" +
      "読めるが、R3・R2 が埋まらないので年度の鎖が切れる。R8〜R4 は同じ資料の健全な版で収録済み。",
    url: "https://www.city.toyota.aichi.jp/shisei/yosan/1073321/1004776.html",
    checkedOn: "2026-08-23", ref: "docs/data-sources.md §13-6",
  },
  {
    code: "272035", name: "豊中市", dataset: "budget", fiscalYears: ["R2"],
    categories: ["scanned-image"],
    reason:
      "款別歳入歳出＋前年当初比較の資料がウェブに無い。年度ページが載せる予算書・予算説明書の総括は本文が CCITT スキャン画像で" +
      "pdftotext がノンブルしか返さず、R3〜R8 と R1・H30 にある「各会計款別内訳」（議案参考資料／単体 PDF）は R2 だけ掲載が無い" +
      "（予算ページ・議会の令和2年案件ページとも）。この欠落で年度間クロスチェーンが R3〜R8 と R1・H30 の2本に割れる。",
    url: "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/reiwa2yosan.html",
    checkedOn: "2026-08-23", ref: "docs/data-sources.md §13-6",
  },
  {
    code: "162019", name: "富山市", dataset: "budget", fiscalYears: ["H26", "H25"],
    categories: ["broken-text-layer"],
    reason:
      "議案概要の「歳入 款別構成」は、款10 地方交付税の金額が原典のテキスト層でセル内2行に分断されており" +
      "（21 400 ＋ ,400,000）、歳入Σが 21,399,979千円（H25 は 21,649,979千円）不足する。既存の joinWrappedAmounts は" +
      "末尾がカンマのトークンを前提にしているので効かない。歳出側は健全。H24 以前の議案概要には款別構成の表そのものが" +
      "無い（H24〜H18 を全部取って実測）。R8〜H27 は同じ資料で収録済み。",
    url: "https://www.city.toyama.lg.jp/shisei/yosan/1010829/1003081.html",
    checkedOn: "2026-08-23", ref: "docs/data-sources.md §13-6",
  },
  {
    code: "212016", name: "岐阜市", dataset: "budget", fiscalYears: ["R5", "R4", "R3", "R2", "H31", "H30"],
    categories: ["scanned-image"],
    reason:
      "予算説明書が R5 はスキャン＋OCR で、-layout は数字の並びが崩れ -raw は1文字ずつ空白区切り（6 7 , 1 3 5 , 9 6 2）に" +
      "なるため金額として読めず、款名にも OCR 誤りがある（利子割交付金 → 利 子 割 父 『 付 金）。R4 以前はテキスト層が無い" +
      "（CCITT の画像のみ）。年度ページ本文には HTML の款別表があるが金額が「634億3,349万5千円」形式で既存パーサでは読めず、" +
      "さらに R1 の前年度列は原典自身が「当初＋6月補正」と注記している（H30 が骨格予算）。R8・R7・R6 は健全な版で収録済み。",
    url: "https://www.city.gifu.lg.jp/info/zaisei/1007720/index.html",
    checkedOn: "2026-08-23", ref: "docs/data-sources.md §13-6",
  },
  // ==== 中核市 第4弾（2026-08-23・loop.md 第5巡・docs §13-5）==================================
  {
    code: "172014", name: "金沢市", dataset: "budget", fiscalYears: ["R8", "R7", "R6", "H30"],
    categories: ["scanned-image"],
    reason:
      "「金沢市予算概要」の一般会計款別表が R8・R7・R6 は CCITT スキャン＋OCR のテキスト層で、金額が壊れて読めない" +
      "（84,497,1801・46.フ など）。H30 は文字が図形化されていて pdftotext が款別表のページから何も返さない。" +
      "代替の「予算のあらまし」は歳入が原典の時点で12区分に集約されており（交付金＝款3〜11の合計、その他＝寄附金・" +
      "繰越金・諸収入等の合計）款別歳入ではないため採らない。R6 はあらまし自体が発行元から消え魚拓にも無い。" +
      "R5・R4 は同じ資料の健全な版で収録済み。",
    url: "https://www4.city.kanazawa.lg.jp/shiseijoho/gyozaisei/zaisei_yosan_kessan/2/13057.html",
    checkedOn: "2026-08-23", ref: "docs/data-sources.md §13-5",
  },
  {
    code: "132098", name: "町田市", dataset: "budget", fiscalYears: ["R7", "R6", "R5", "R4", "R3", "R2"],
    categories: ["parser-unsupported"],
    reason:
      "予算書がウェブに載っているのは R8 の年度ページだけで、R7 以前は「予算概要説明書」しか無い。" +
      "その歳出（目的別）内訳表が「金額行 → 款番号＋款名行 → 構成比行」の3行組みで、款名行に整数が1つも無いため" +
      "既存パーサが款を1件も抽出できず throw する（R7・R6・R5・R4・R3・R2 の各歳出ページに try-parse を当てて実測）。" +
      "歳入側は単行なので読める。倉敷 R7 と同じ「3行組み」の型で、パーサに opt-in を足せば開く見込み。",
    url: "https://www.city.machida.tokyo.jp/shisei/gyouzaisei/siyosan/index.html",
    checkedOn: "2026-08-23", ref: "docs/data-sources.md §13-5",
  },
  // ==== 中核市 第3弾（2026-08-22・loop.md 第4巡・docs §13-4）==================================
  {
    code: "332020", name: "倉敷市", dataset: "budget", fiscalYears: ["R7"],
    categories: ["parser-unsupported"],
    reason:
      "当初予算概要版 p.5 の歳出（目的別）だけが「前年度額の行 → 款名＋当年度額の行 → 括弧書きの補正後比較の行」の3行組みで、" +
      "款行が整数1個・前年度行が名前なし整数1個になり、既存パーサでは款行が1件も取れない（歳入 p.3 は読める）。" +
      "他の年度（R8・R6〜R3）は同じ資料の通常の1行組みで収録済み。",
    url: "https://www.city.kurashiki.okayama.jp/cityinfo/finance/1011778/1015416.html",
    checkedOn: "2026-08-22", ref: "docs/data-sources.md §13-4",
  },
  {
    code: "272272", name: "東大阪市", dataset: "budget", fiscalYears: ["R6", "R5", "R4"],
    categories: ["scanned-image"],
    reason:
      "一般会計予算書の事項別明細書 総括（R6/R5/R4 とも p.17〜）は本文がアウトライン化された図形で、" +
      "PDF の内容ストリームがパス（m/l/c）だけ・文字は各ページのノンブル1個・画像0枚＝テキスト層が無く決定的パース不可。" +
      "R4 の予算書は現行サイトから消えており WARP（2024-08）にしか無い。R3 以前は予算書が未掲載で、" +
      "「予算の概要」は性質別・財源別の表のみ＝款別資料が存在しない。R8・R7 は同じ資料で収録済み。",
    url: "https://www.city.higashiosaka.lg.jp/0000000529.html",
    checkedOn: "2026-08-22", ref: "docs/data-sources.md §13-4",
  },
  {
    code: "272272", name: "東大阪市", dataset: "budget", fiscalYears: ["R3"],
    categories: ["format-mismatch"],
    reason:
      "R3 以前は予算書（事項別明細書の総括）がウェブ未掲載で、掲載されている「予算の概要」は性質別・財源別の表のみ" +
      "（市税・地方交付税など款名に似た行が並ぶが款別ではない）。R3 の概要は Wayback と WARP にも同じ構成で残っており、" +
      "款別＋前年当初比較の資料が存在しない。R2 以前は未確認。",
    url: "https://www.city.higashiosaka.lg.jp/0000000529.html",
    checkedOn: "2026-08-22", ref: "docs/data-sources.md §13-4",
  },
  {
    code: "442011", name: "大分市", dataset: "budget", fiscalYears: ["H28", "H27", "H26", "H25", "H24"],
    categories: ["scanned-image", "broken-text-layer"],
    reason:
      "「当初予算（案）の概要」PDF が H28・H27・H24 は複合機スキャン（テキスト層なし）、H26・H25 は Canon の OCR で" +
      "見出し〈歳入〉や金額が壊れている（「苗日」「∠ゝ 12,770,000」）。R8〜H29 は同じ資料で収録済み。",
    url: "https://www.city.oita.oita.jp/shisejoho/kekakuzaise/shinozaise/yosan/index.html",
    checkedOn: "2026-08-22", ref: "docs/data-sources.md §13-4",
  },
  // ==== 中核市 第2弾（2026-08-22・loop.md 第2巡→第3巡・docs §13-3）=========================
  // 宇都宮・西宮の parser-unsupported は #226 の改修で収録できたため外した（第3巡）。残るのは原典側の事情だけ。
  {
    code: "092011", name: "宇都宮市", dataset: "budget", fiscalYears: ["R3"],
    categories: ["format-mismatch"],
    reason:
      "「当初予算案の大綱」は議会修正前の「案」（一般会計 229,000,000千円）で、可決された当初予算は修正後の 229,140,000千円" +
      "（同ページの「令和３年第２回市議会定例会予算（修正案）総括表」）。R4 の大綱の前年度列と市統計書 17-3 はどちらも" +
      "修正後なので、案のまま収録すると年度間のクロスチェックが R4↔R3 で食い違う（歳入4款・歳出 教育費 +140,000）。" +
      "修正後の款別は統計書 17-3 XLSX（CC BY）にあるが別様式で未収録。R8〜R4・R2〜H28 は同じ資料で収録済み。",
    url: "https://www.city.utsunomiya.lg.jp/shisei/johokokai/zaisei/1010664.html",
    checkedOn: "2026-08-22", ref: "docs/data-sources.md §13-3",
  },
  // ==== 中核市（2026-08-22・loop.md 第1巡・docs §13）==============================
  {
    code: "112038", name: "川口市", dataset: "budget", fiscalYears: ["R7", "R6", "R5", "R4", "R3"],
    categories: ["scanned-image"],
    reason:
      "年度ページの「予算概要」PDF（R7_yosanngaiyou.pdf ほか）は DocuWorks 出力の非テキスト PDF で、" +
      "pdftotext の全文が 55〜63 文字しか無い（R7 63・R6 57・R5 55・R4 59・R3 61）。" +
      "R7 の「当初予算書 一般会計」（426p）も同様で、Wayback の R7 写しも同一バイナリ。" +
      "R8 は同名の PDF にテキスト層があり収録済み。R2 以前は年度一覧に無い。",
    url: "https://www.city.kawaguchi.lg.jp/soshiki/01020/030/3/index.html",
    checkedOn: "2026-08-22", ref: "docs/data-sources.md §13",
  },
  // ==== 横浜市の款項目節（2026-08-02・#191・docs §8d-2）=============================
  {
    code: "141003", name: "横浜市", dataset: "detail", fiscalYears: ["R7"],
    categories: ["format-mismatch"],
    reason:
      "款項目節 CSV の歳入だけが歳出より 379,539千円 大きく、同じ CSV の中で歳入 Σ ≠ 歳出 Σ になっている" +
      "（一般会計 1,984,787,527 対 1,984,407,988）。予算は均衡編成なので資料内部で矛盾している。" +
      "既収録の款別・R8 の前年度列とは歳出側だけが一致するため、歳入 CSV が単独で外れていると考えられる。" +
      "原因は未確認。R8・R6 は同じ資料で差0 なので収録済み。",
    url: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7sainyu_saisyutsu.zip",
    checkedOn: "2026-08-02", ref: "docs/data-sources.md §8d-2",
  },
  // ==== 横浜市の款項目（XLSX 版・2026-08-03・#192・docs §8d-3）======================
  {
    code: "141003", name: "横浜市", dataset: "detail", fiscalYears: ["R2", "H31"],
    categories: ["format-mismatch"],
    reason:
      "予算に関する説明書 XLSX の「前年度」列が、歳入と歳出で合計が食い違っている" +
      "（R2 は歳入 1,759,429,383 対 歳出 1,761,506,383 で差 2,077,000、" +
      "H31 は歳入 1,713,697,299 対 歳出 1,726,435,299 で差 12,738,000）。" +
      "当年度の列は両側とも一致し既収録の款別とも差0 なので、前年度列だけが外れている。" +
      "前年度列こそがこの資料を CSV 版より優先して収録する理由なので、そこが検証できない年度は入れない。" +
      "原因は未確認。R5・R4・R3 は同じ資料で両列とも差0 なので収録済み。",
    url: "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r2/r2.files/r2ippan.zip",
    checkedOn: "2026-08-03", ref: "docs/data-sources.md §8d-3",
  },
  // ==== 山梨県内の市（2026-07-14・docs §「山梨県内 budget 市を横に拡大」）===========
  {
    code: "192074", name: "韮崎市", dataset: "budget", fiscalYears: ["R8"],
    categories: ["format-mismatch"],
    reason: "当初予算の一般会計は円グラフのみで、款別の表が資料に無い。",
    checkedOn: "2026-07-14", ref: "docs/data-sources.md 山梨県内 budget 市を横に拡大",
  },
  {
    code: "192104", name: "甲斐市", dataset: "budget", fiscalYears: ["R8"],
    categories: ["format-mismatch"],
    reason: "当初予算の一般会計は円グラフのみで、款別の表が資料に無い。",
    checkedOn: "2026-07-14", ref: "docs/data-sources.md 山梨県内 budget 市を横に拡大",
  },
  {
    code: "192058", name: "山梨市", dataset: "budget", fiscalYears: ["R8"],
    categories: ["scanned-image"],
    reason: "当初予算の概要がスキャン画像 PDF でテキスト層が無い（R8 は未公開）。",
    checkedOn: "2026-07-14", ref: "docs/data-sources.md 山梨県内 budget 市を横に拡大",
  },
  {
    code: "192147", name: "中央市", dataset: "budget", fiscalYears: ["R8"],
    categories: ["format-mismatch"],
    reason: "公開されているのは269ページの予算説明書のみで、款別の概況表が無い。",
    checkedOn: "2026-07-14", ref: "docs/data-sources.md 山梨県内 budget 市を横に拡大",
  },
  {
    code: "192121", name: "上野原市", dataset: "budget", fiscalYears: ["R8"],
    categories: ["format-mismatch"],
    reason: "款別＋前年比較はあるが HTML のみで PDF が無く、かつ前年（R7）が骨格予算。",
    checkedOn: "2026-07-14", ref: "docs/data-sources.md 山梨県内 budget 市を横に拡大",
  },
  {
    code: "192082", name: "南アルプス市", dataset: "projects", fiscalYears: ["R8"],
    categories: ["no-material"],
    reason: "公開されているのは377ページの予算書本編（事項別明細書）のみで、主な事業の一覧が無い。",
    checkedOn: "2026-07-14", ref: "docs/data-sources.md §7",
  },

  // ==== 東京特別区（docs §10 の「収録できなかった年度と理由」）=====================
  {
    code: "131016", name: "千代田区", dataset: "budget", fiscalYears: ["R3"],
    categories: ["parser-unsupported"],
    reason:
      "pdftotext -layout が款を静かに落とす（保健福祉費が丸ごと消える）。原典は壊れておらず -tsv には座標付きで存在するが、" +
      "読むには抽出モード・行の許容幅・括弧付きの第2系列の3つのオプションが要り、1年度のために足すには割に合わないと判断して見送った。" +
      "別の資料が同じ仕組みを要求したら再開する。",
    url: "https://web.archive.org/web/20210620211256if_/https://www.city.chiyoda.lg.jp/documents/27081/r3yosangaikyo_1.pdf",
    checkedOn: "2026-07-17", ref: "docs/data-sources.md §10・registry の千代田ブロック",
  },
  {
    code: "131130", name: "渋谷区", dataset: "budget", fiscalYears: [], fyUpTo: "R4",
    categories: ["format-mismatch"],
    reason:
      "予算説明書 PDF の公表が R5 開始。R4 以前の HTML は款別はあるが前年度額の列が無く（増減率のみ）、" +
      "当初予算（款別＋前年当初比）の要件を満たさない。消えたのではなく最初から無いことを Wayback で確認済み。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §10",
  },
  {
    code: "131164", name: "豊島区", dataset: "budget", fiscalYears: ["R7"],
    categories: ["broken-text-layer"],
    reason:
      "原本のレイヤに OCR のレイヤが重なり数字が壊れる（ー70,593,082 ＝ 170,593,082）。置換が一貫しておらず、" +
      "同じ区の R4・R2 を救った復号（決定論的な文字マップ）でも直せなかった。",
    checkedOn: "2026-07-22", ref: "docs/data-sources.md §10d・§10e",
  },
  {
    code: "131164", name: "豊島区", dataset: "budget", fiscalYears: [], fyUpTo: "H28",
    categories: ["scanned-image"],
    reason: "分冊の総括表にテキスト層が無い（画像）。",
    checkedOn: "2026-07-22", ref: "docs/data-sources.md §10d",
  },
  {
    code: "131059", name: "文京区", dataset: "budget", fiscalYears: ["H25"],
    categories: ["scanned-image"],
    reason:
      "現行サイトの H25 がスキャン＋OCR で、歳入合計の行が見つからず parse が止まる。Wayback の捕捉も0件で別版が無い。" +
      "前後の H26・H24 は収録済み。",
    checkedOn: "2026-07-17", ref: "docs/data-sources.md §10j",
  },
  {
    code: "131172", name: "北区", dataset: "budget", fiscalYears: ["H25"],
    categories: ["parser-unsupported"],
    reason:
      "-layout は款15 都支出金を2行に割り（Σ が 7,249,317 千円不足）、-raw は合計行の金額がラベルより前に出て止まる。" +
      "どちらの抽出モードでも取れなかった。前後の H24・H26 は収録済み。",
    checkedOn: "2026-07-17", ref: "docs/data-sources.md §10l",
  },
  {
    code: "131024", name: "中央区", dataset: "budget", fiscalYears: [], fyUpTo: "H28",
    categories: ["no-material"],
    reason: "現行サイトに存在しない（年度一覧の最古が H29）。Wayback／WARP は未探索。",
    checkedOn: "2026-07-17", ref: "docs/data-sources.md §10・§10f",
  },
  {
    code: "131083", name: "江東区", dataset: "budget", fiscalYears: [], fyUpTo: "H27",
    categories: ["no-material"],
    reason: "現行サイトに存在しない（年度一覧の最古が H28）。Wayback／WARP は未探索。",
    checkedOn: "2026-07-17", ref: "docs/data-sources.md §10・§10f",
  },
  {
    code: "131113", name: "大田区", dataset: "budget", fiscalYears: [], fyUpTo: "H19",
    categories: ["no-material"],
    reason: "現行サイトに存在しない（年度一覧の最古が H20）。Wayback／WARP は未探索。",
    checkedOn: "2026-07-17", ref: "docs/data-sources.md §10・§10f",
  },
  {
    code: "131229", name: "葛飾区", dataset: "budget", fiscalYears: [], fyUpTo: "H27",
    categories: ["no-material"],
    reason:
      "現行サイトに存在しない（年度インデックスの予算概要の最古が H28。2026-07-22 に全件を実際に辿って確認）。" +
      "Wayback／WARP は未探索。",
    checkedOn: "2026-07-22", ref: "docs/data-sources.md §10・§10f",
  },
  {
    code: "131091", name: "品川区", dataset: "budget", fiscalYears: ["R3", "H31", "H30"],
    categories: ["scanned-image"],
    reason: "スキャン＋OCR で崩れている。発行元が近年までスキャン入稿のため、WARP を掘っても同じスキャンしか出ない見込み。",
    checkedOn: "2026-07-23", ref: "docs/data-sources.md §10s",
  },
  {
    code: "131091", name: "品川区", dataset: "budget", fiscalYears: ["R2"],
    categories: ["broken-text-layer", "scanned-image"],
    reason:
      "歳出の総括は豊島区と同型のガーブルで復号できるが、歳入の総括はスキャン＋OCR の崩れ（数字が行割れ・l／I の混入）で別の破損型。" +
      "片側だけでは収録できない。",
    checkedOn: "2026-07-23", ref: "docs/data-sources.md §10s",
  },
  {
    code: "131091", name: "品川区", dataset: "budget", fiscalYears: ["H29"],
    categories: ["scanned-image"],
    reason: "OCR の無いスキャン。",
    checkedOn: "2026-07-23", ref: "docs/data-sources.md §10s",
  },
  {
    code: "131091", name: "品川区", dataset: "budget", fiscalYears: [], fyUpTo: "H28",
    categories: ["no-material"],
    reason: "事項別明細書が未掲載。",
    checkedOn: "2026-07-23", ref: "docs/data-sources.md §10s",
  },
  {
    code: "131199", name: "板橋区", dataset: "budget", fiscalYears: ["R4", "R3", "R2"],
    categories: ["scanned-image", "broken-text-layer"],
    reason:
      "予算の概要を含め、その年度の資料がすべてスキャン画像または ToUnicode 欠落で、テキストとして取り出せない" +
      "（Wayback の捕捉でも実測）。H31 以前は実ファイル未検査。",
    checkedOn: "2026-07-23", ref: "docs/data-sources.md §10t",
  },
  {
    code: "131032", name: "港区", dataset: "budget", fiscalYears: ["H29", "H24"],
    categories: ["parser-unsupported"],
    reason: "震災復興基金の括弧2段組で合計行が割れる（どちらの年度も抽出が止まる）。",
    checkedOn: "2026-07-18", ref: "docs/data-sources.md §10n",
  },
  {
    code: "131237", name: "江戸川区", dataset: "report", fiscalYears: ["R6"],
    categories: ["broken-text-layer"],
    reason:
      "主要施策の成果の R6 は、R5 版が丸ごと不可視のレイヤで重なっており、pdftotext が -layout／-tsv とも2版を混ぜて返す。" +
      "可視レイヤだけを抜く一般的な方法は見つかっていない。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §10h",
  },
  {
    code: "131237", name: "江戸川区", dataset: "report", fiscalYears: ["H30", "H29"],
    categories: ["broken-text-layer"],
    reason:
      "主要施策の成果の ToUnicode が部分破損しており、事業名・所管課は読めるが表の半角数字が丸ごと欠落する" +
      "（成果指標の実績値が取れない）。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §10h",
  },

  // ==== 政令指定都市（docs §8）====================================================
  {
    code: "271403", name: "堺市", dataset: "budget", fiscalYears: ["R5"],
    categories: ["broken-text-layer"],
    reason: "歳入だけがフォントの ToUnicode を持たず数字が丸ごと脱落する（歳出のページは無傷）。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §8m",
  },
  {
    code: "271403", name: "堺市", dataset: "budget", fiscalYears: ["R4"],
    categories: ["broken-text-layer"],
    reason: "全面が文字化けし（➨ࠉ㈈ᨻつᶍẚ㍑⾲）、数字も脱落する。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §8m",
  },
  {
    code: "341002", name: "広島市", dataset: "report", fiscalYears: ["R6", "R5", "R4", "R3", "R2", "R1"],
    categories: ["scanned-image"],
    reason:
      "「主要な施策の成果」はウェブ掲載されているがスキャン OCR で、同一の数値が 489,884 と 489,384 に化ける（R6 民生関係で実測）。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §8g",
  },
  {
    code: "121002", name: "千葉市", dataset: "report", fiscalYears: [], fyNote: "ウェブ掲載されている年度",
    categories: ["broken-text-layer"],
    reason:
      "成果説明書はウェブ掲載されているが、ToUnicode 欠落で金額セルの数字が丸ごと脱落する一方、本文の説明文中の数字は出るため" +
      "「一部だけ正しい」状態になる。",
    checkedOn: "2026-07-16", ref: "docs/data-sources.md §8k",
  },

  // ==== 都道府県エンティティ（docs §11）===========================================
  {
    code: "280003", name: "兵庫県", dataset: "budget", fiscalYears: ["R8"],
    categories: ["no-material", "format-mismatch"],
    reason:
      "歳入の款別がウェブ上に存在しない。当初予算の別冊は歳出13款＋前年当初を持つが、歳入は「県税等／地方特例交付金等／" +
      "地方交付税等／国庫支出金／県債／その他の収入」の6財源区分だけで、予算書・予算に関する説明書はウェブ公開されていない" +
      "（県議会の議案ページ・予算特別委員会・会計課の決算書ページをすべて確認）。6区分を款として載せることはしない。",
    checkedOn: "2026-07-25", ref: "docs/data-sources.md §11b",
  },
  {
    // 山形県 060003（⚠ 山形市 062014 と別物）。**資料は要件を形式上すべて満たしているのに、
    // 発行元の PDF 化工程だけが理由で機械可読でない**という型。**手で OCR の破損を直せば
    // Σ が4系統とも差0 で閉じる**＝原典の数字自体は正しい。
    code: "060003", name: "山形県", dataset: "budget",
    fiscalYears: ["R8", "R7", "R6", "R5", "R3"],
    categories: ["scanned-image", "broken-text-layer"],
    reason:
      "当初予算の款別資料（予算に関する説明書の総括4ページ）は款別・前年度当初列・単位千円をすべて備えているが、" +
      "全年度が複合機スキャン（pdfinfo の Creator が Apeos C7580 等）で、OCR のテキスト層が壊れている。" +
      "款名が9件破損し（利子割清算金→「利子生ι?圭算金」・土木費→「士木費」・農林水産業費→「辰林水産業費」・" +
      "議会費→「会議費」など）、款が4件丸ごと落ちる（款番号 11 がローマ数字 Ⅱ に化けて款行と判定されない・" +
      "繰越金は行ごと消失・労働費は「5,斗働費」のカンマで番号検出が壊れる）。金額も破損する" +
      "（125,477,109 → 125,47フ,109 とカタカナのフになる。R5〜R7 では前年度列の款金額まで壊れる）。" +
      "誤植のピンポイント指定（amountTypos）では年度ごとに数十箇所を列挙することになり、" +
      "原典の写しではなく人手の再入力になるため採らなかった。R3 はテキスト層自体が無い（pdftotext が4バイト）。",
    checkedOn: "2026-07-27", ref: "docs/data-sources.md §11j",
  },
  {
    code: "470007", name: "沖縄県", dataset: "budget", fiscalYears: ["R8"],
    categories: ["no-material", "format-mismatch"],
    reason:
      "歳入の款別＋前年当初がウェブ上に存在しない。説明資料の歳入表は9区分＋その他の再分類表で、16款のうち7款が「その他」に" +
      "丸められている（合計は一致してしまうため、合計が合うことは款別である証明にならない）。歳出は款別＋前年当初があるが" +
      "単位が億円で、前年度の合計が丸めにより1ずれる。",
    checkedOn: "2026-07-26", ref: "docs/data-sources.md §11f",
  },
  {
    code: "010006", name: "北海道", dataset: "budget", fiscalYears: ["R7"],
    categories: ["scanned-image"],
    reason: "予算の概要 PDF がスキャン画像。",
    checkedOn: "2026-07-25", ref: "docs/data-sources.md §11b",
  },
  {
    code: "460001", name: "鹿児島県", dataset: "budget", fiscalYears: ["R7", "R6", "R5"],
    categories: ["broken-text-layer"],
    reason:
      "予算に関する説明書は born-digital だがテキスト層が無く、pdftotext が 30〜50バイトしか返さない。R8 が初のテキスト層あり。",
    checkedOn: "2026-07-26", ref: "docs/data-sources.md §11f",
  },
  {
    code: "330001", name: "岡山県", dataset: "report", fiscalYears: [], fyNote: "全年度",
    categories: ["no-material"],
    reason: "事業単位の成果がウェブに無い（施策評価シートに事業費が1つも載らない）。情報公開請求の領域。",
    checkedOn: "2026-07-25", ref: "docs/data-sources.md §11c",
  },
];
