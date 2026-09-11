// 「その年度の当初予算は骨格予算だった」記録の台帳。
//
// 2026-09-10 の全団体棚卸し（docs/data-sources.md §13-32）で、**「前年度側が骨格なら
// `parserOptions.prevNote` に書く」規約（§11k・弘前 §13-25）が14件落ちていた**。落ちる理由は
// 毎回同じで、前年度列が当初額であることを確かめた時点で終わりにしてしまう — 列の基準の話と、
// その基準値が骨格かどうかの話は別。しかも `prevNote` はどの機械ゲートの走査対象にも入って
// おらず、Σ も validate も掛からない。**人が全団体を読み直す以外に見つける手が無かった。**
//
// この台帳はそれをゲートに変える。derive が次の2方向を機械的に照合し、食い違えば throw する:
//
//   ① 順方向: ここに載っている年度 Y の**翌年度 Y+1 が収録済み**で、その parsed が
//      `prevBasis === "当初"` かつ `prevNote` が空 → **落ちている**（弘前 R5・平塚 R6 の型）
//   ② 逆方向: `prevNote` が骨格に触れているのに、その年度（当年度側）も前年度（前年度側）も
//      ここに無い → **台帳が腐っている**（注記を足したら台帳にも書く）
//
// ---- 書くときのルール ----------------------------------------------------------
//
// 1. **原典で確かめた年度だけを書く。** 市長選の周期・首長の交代から生成しない（§13-32 の反例:
//    茅ヶ崎 R1 は市長死去の臨時選挙、下関 H21 は暫定予算、伊丹は再選の年に2回骨格で交代の年は通常、
//    安城 R5 は交代でも通常）。**当初予算は選挙の前に編成される**ので、編成時に交代か再選かは
//    決まっていない。
// 2. **語彙は団体で違う。** 骨格予算／骨格的予算／第一次編成（京都市）／準骨格予算（千葉市・守口）。
//    `evidence` には原典の言い方を写す。
// 3. **団体コードは総務省の一次資料から引く**（`data/normalized/municipal-accounts/R6.json`）。
//    derive が `name` と突合して食い違えば throw する（unrecordable.ts と同じ）。
// 4. **年度そのものが未収録でも書く。** 伊丹 H29・八千代 H29 のように骨格の年度が未収録だと、
//    raw 走査にも選挙費からの洗い出しにも映らない（§13-32 の盲点【A】）。台帳に書いておけば、
//    その翌年度を収録した瞬間に ① が鳴る。
// 5. **翌年度の注記の書き方は台帳で決めない。** ① は「説明があるか」だけを見る。前年度列が
//    肉付け後なら `prevBasis:"補正後"`、当初のままなら `prevNote`（§11k）。
// 6. 「H31」と「R1」は同じ年度（fySeq が両方 31 に写る）。資料の呼称に合わせてどちらで書いてもよい。

export interface SkeletonBudget {
  /** 団体コード6桁。市区町村は総務省台帳から実引き、都道府県はエンティティコード（例 120006 = 千葉県） */
  code: string;
  /** 団体名。derive が総務省台帳／都道府県名と突合する */
  name: string;
  /** 骨格予算として編成された年度（当初予算） */
  fy: string;
  /** 根拠（原典の名前と、できれば言い回し。推測を書かない） */
  evidence: string;
  /** 詳細の在り処（docs のセクション） */
  ref: string;
}

export const SKELETON_BUDGETS: SkeletonBudget[] = [
  // ==== 都道府県 ============================================================================
  { code: "120006", name: "千葉県", fy: "R7", evidence: "県プレス「令和7年度当初予算案について」に「3月に知事選挙を控えていることから、「骨格予算」として編成しました。」", ref: "docs/data-sources.md §13-32" },
  { code: "050008", name: "秋田県", fy: "R7", evidence: "「令和7年度当初予算の概要」p.5「４月に知事改選期を迎えることから骨格予算とするが…」", ref: "docs/data-sources.md §11k" },
  { code: "260002", name: "京都府", fy: "R8", evidence: "原典 p.1「骨格的な予算として編成」（2026年4月の知事選前）", ref: "docs/data-sources.md §11k" },
  { code: "420000", name: "長崎県", fy: "R8", evidence: "別資料「令和8年度当初予算（案）の概要」の「いわゆる骨格予算としております」（収録した総括 PDF には無い）", ref: "docs/data-sources.md §11k" },
  { code: "170003", name: "石川県", fy: "R8", evidence: "「令和８年度当初予算 基本方針」物理 p.2「新規事業などは6月補正予算で対応する「骨格予算」として編成」（収録 PDF には無い）", ref: "docs/data-sources.md §11k" },
  { code: "360007", name: "徳島県", fy: "R5", evidence: "R6 資料の前年度列見出しが「通年予算(B)」（＝R5 の6月現計。registry の徳島県ブロックが実測）。R8 資料の脚注「過去の骨格予算編成年度は６月補正（肉付け）後の額」は年度を列挙しない", ref: "pipeline/registry/sources.ts 徳島県" },
  { code: "310000", name: "鳥取県", fy: "R5", evidence: "R8 資料の推移表「（注）（ ）は骨格予算である。」で括弧付き（R6 の前年度列 335,026,692 は R5 骨格）", ref: "pipeline/registry/sources.ts 鳥取県" },
  { code: "310000", name: "鳥取県", fy: "H27", evidence: "R8 資料 p.4 の推移表で括弧付き (333,569,000)・脚注「（注）（ ）は骨格予算である。」", ref: "pipeline/registry/sources.ts 鳥取県" },
  { code: "310000", name: "鳥取県", fy: "H23", evidence: "R8 資料 p.4 の推移表で括弧付き (322,262,000)・脚注「（注）（ ）は骨格予算である。」", ref: "pipeline/registry/sources.ts 鳥取県" },
  { code: "310000", name: "鳥取県", fy: "R1", evidence: "R8 資料 p.4 の推移表で括弧付き (318,277,000)・脚注「（注）（ ）は骨格予算である。」", ref: "pipeline/registry/sources.ts 鳥取県" },
  { code: "180009", name: "福井県", fy: "R5", evidence: "「予算の概要」物理 p.2 の推移グラフ注記「下線年度は当初予算が骨格予算」で下線が H27・R元・R5", ref: "pipeline/registry/sources.ts 福井県" },
  { code: "180009", name: "福井県", fy: "R1", evidence: "「予算の概要」推移グラフの下線（骨格）が R元に付く（registry 福井県ブロックの実測）", ref: "pipeline/registry/sources.ts 福井県" },
  { code: "180009", name: "福井県", fy: "H27", evidence: "「予算の概要」推移グラフの下線（骨格）が H27 に付く（registry 福井県ブロックの実測）", ref: "pipeline/registry/sources.ts 福井県" },

  // ==== 政令市 ==============================================================================
  { code: "011002", name: "札幌市", fy: "R5", evidence: "R6 資料「この資料中の前年度予算額は、令和５年第２回定例市議会補正（肉付補正）後の予算額です。」（市長選の年）", ref: "docs/data-sources.md §8" },
  { code: "011002", name: "札幌市", fy: "R1", evidence: "R2 資料「…令和元年第２回定例市議会補正（肉付補正）後の予算額です。」", ref: "docs/data-sources.md §8" },
  { code: "121002", name: "千葉市", fy: "R7", evidence: "「令和7年度6月補正予算の概要」p.1「政策的判断を要する施策などを計上する「肉付け予算」として…」。R8 の会計別・款別予算額 p.1 推移表「※（）内数字は肉付け補正後」", ref: "docs/data-sources.md §13-32" },
  { code: "121002", name: "千葉市", fy: "R3", evidence: "「令和3年度当初予算の概要」p.1「（１）準骨格予算の編成」", ref: "docs/data-sources.md §13-32" },
  { code: "261009", name: "京都市", fy: "R6", evidence: "「令和6年度予算の概要」p.1「当初予算の「第一次編成」と位置付け…「第二次編成」として５月市会に提案を行う」（市長交代）", ref: "docs/data-sources.md §13-32" },

  // ==== 市区町村（骨格の年度・原典に明記）=====================================================
  { code: "192015", name: "甲府市", fy: "R5", evidence: "R5 当初予算資料「年度当初から対応すべき事業の経費などを計上し、「骨格的な予算」として編成」", ref: "docs/data-sources.md §8" },
  { code: "012076", name: "帯広市", fy: "R8", evidence: "「予算編成について」の「改選期にあたることから…骨格予算を編成」", ref: "docs/data-sources.md §13-25" },
  { code: "012076", name: "帯広市", fy: "R4", evidence: "R5 概要の列見出し「令和４年度６月補正後」＋同上", ref: "docs/data-sources.md §13-25" },
  { code: "012076", name: "帯広市", fy: "H30", evidence: "H31 概要の脚注「平成22年度、平成26年度、平成30年度は骨格予算を編成した年度であり、６月補正後の金額である」", ref: "docs/data-sources.md §13-25" },
  { code: "012076", name: "帯広市", fy: "H26", evidence: "H31 概要の脚注「平成22年度、平成26年度、平成30年度は骨格予算を編成した年度」", ref: "docs/data-sources.md §13-25" },
  { code: "012076", name: "帯広市", fy: "H22", evidence: "H31 概要の脚注「平成22年度、平成26年度、平成30年度は骨格予算を編成した年度」", ref: "docs/data-sources.md §13-25" },
  { code: "022012", name: "青森市", fy: "R5", evidence: "R5 概要の表紙【骨格予算】・本文「政策的経費の一部を計上しない「骨格予算」として編成した」", ref: "docs/data-sources.md §13-13" },
  { code: "022021", name: "弘前市", fy: "R8", evidence: "概要 p.6「本年４月に実施される市長選を踏まえ「骨格予算」として編成」", ref: "docs/data-sources.md §13-25" },
  { code: "022021", name: "弘前市", fy: "R4", evidence: "「令和４年５月補正予算案の概要（一般会計補正予算第１号）」の「令和４年度当初予算は…骨格予算」", ref: "docs/data-sources.md §13-25" },
  { code: "022021", name: "弘前市", fy: "H30", evidence: "偵察報告（2026-09-09・引用なし）。自分では原典を開いていない", ref: "docs/data-sources.md §13-25" },
  { code: "022021", name: "弘前市", fy: "H26", evidence: "偵察報告（2026-09-09・引用なし）。自分では原典を開いていない", ref: "docs/data-sources.md §13-25" },
  { code: "052019", name: "秋田市", fy: "R7", evidence: "「令和7年度当初予算案の概要」に明記（市長選 4年周期 H29/R3/R7）", ref: "docs/data-sources.md §13-12" },
  { code: "052019", name: "秋田市", fy: "R3", evidence: "「令和3年度当初予算案の概要」に明記", ref: "docs/data-sources.md §13-12" },
  { code: "072036", name: "郡山市", fy: "R7", evidence: "R8 概要の脚注（R7 当初＋6月送り分）・registry「R7 は市長選（2025年4月）の骨格予算」", ref: "docs/data-sources.md §13-10" },
  { code: "072036", name: "郡山市", fy: "R3", evidence: "R3 概要「令和３年度は骨格予算となりますが」", ref: "docs/data-sources.md §13-10" },
  { code: "112275", name: "朝霞市", fy: "R7", evidence: "第30巡で確認（R8 の prevNote に記載。発行元は肉付後基準の +8.1% を公表）", ref: "docs/data-sources.md §13-30" },
  { code: "122122", name: "佐倉市", fy: "R5", evidence: "R6 資料の列見出し「令和５年度６月補正後」と注記", ref: "docs/data-sources.md §13-24" },
  { code: "122122", name: "佐倉市", fy: "R1", evidence: "R2 資料「※前年度予算額は、令和元年度6月補正後（肉付け後）の額となっています。」", ref: "docs/data-sources.md §13-24" },
  { code: "122122", name: "佐倉市", fy: "H27", evidence: "H28 資料「前年度予算額は、平成２７年度６月補正後（肉付け後）の額」", ref: "docs/data-sources.md §13-24" },
  { code: "122122", name: "佐倉市", fy: "H23", evidence: "未収録の H24 資料の列見出しが「6月補正後」と registry に記録（原典の引用は無い・伝聞の水準）", ref: "pipeline/registry/sources.ts 佐倉市" },
  { code: "122122", name: "佐倉市", fy: "H19", evidence: "H20 資料「平成19年度当初予算が市長及び市議会議員選挙を直前にした骨格的編成であっため」", ref: "docs/data-sources.md §13-24" },
  { code: "122211", name: "八千代市", fy: "R7", evidence: "R7 概要「「骨格予算」として編成し，これ以外の政策的な経費などは，選挙後の補正予算」", ref: "docs/data-sources.md §13-19" },
  { code: "122211", name: "八千代市", fy: "R3", evidence: "R3 概要「④ 骨格予算 …「骨格予算」として編成し」", ref: "docs/data-sources.md §13-19" },
  { code: "122211", name: "八千代市", fy: "H29", evidence: "H30 概要 p.44「骨格予算による編成であったことから，総額についても大幅な減となっている」（H29 自体は未収録）", ref: "docs/data-sources.md §13-32" },
  { code: "122271", name: "浦安市", fy: "R7", evidence: "R8 概要 p.6「令和７年度当初予算は骨格予算であったため、６月補正後予算額と比較」", ref: "docs/data-sources.md §13-23" },
  { code: "122271", name: "浦安市", fy: "R3", evidence: "R4 概要「令和３年度当初予算は骨格予算であったため」", ref: "docs/data-sources.md §13-23" },
  { code: "131113", name: "大田区", fy: "H27", evidence: "H28 概要 p.9【参考】「平成 27 年度一般会計当初予算は骨格予算であり…第１次補正予算で計上している」", ref: "docs/data-sources.md §13-32" },
  { code: "132012", name: "八王子市", fy: "R6", evidence: "R6 総括「令和 6 年度（2024 年度）当初予算はいわゆる「骨格予算」とする。」", ref: "docs/data-sources.md §13-32" },
  { code: "132047", name: "三鷹市", fy: "H27", evidence: "H27 概要 p.11「「骨格予算」の考え方を基本に据えて編成」", ref: "docs/data-sources.md §13-21" },
  { code: "132063", name: "府中市", fy: "H24", evidence: "H25 資料「※平成２４年度の当初予算は骨格予算のため、６月補正後の予算とその比較を記載しています。」", ref: "docs/data-sources.md §13-18" },
  { code: "132098", name: "町田市", fy: "R8", evidence: "市長選（2026-02-15）を受けた骨格的予算（registry の町田ブロック）", ref: "pipeline/registry/sources.ts 町田市" },
  { code: "132110", name: "小平市", fy: "R3", evidence: "R3 概要に明記（registry の小平ブロック）", ref: "docs/data-sources.md §13-20" },
  { code: "142034", name: "平塚市", fy: "R5", evidence: "2月定例市長記者会見「令和5年度当初予算（案）を編成」の「４月に統一地方選挙を迎えるため…骨格予算として編成した」", ref: "docs/data-sources.md §13-32" },
  { code: "142034", name: "平塚市", fy: "H31", evidence: "H31 概要 p.1「＊平成31年度は骨格的予算」（H31 自体は unrecordable）", ref: "docs/data-sources.md §13-14" },
  { code: "142077", name: "茅ヶ崎市", fy: "R1", evidence: "R2 総括表の列見出し「令和元年度当初予算額(B)【骨格予算】」（市長死去に伴う臨時選挙。4年周期ではない）", ref: "docs/data-sources.md §13-15" },
  { code: "142123", name: "厚木市", fy: "R5", evidence: "R5 概要「「骨格予算」として編成」（市長選 2023-02-12）", ref: "docs/data-sources.md §13-18" },
  { code: "202029", name: "松本市", fy: "R6", evidence: "「令和6年度当初予算の概要」p.2", ref: "docs/data-sources.md §13-16" },
  { code: "202029", name: "松本市", fy: "R2", evidence: "R2 資料 印字 p.2「市長選挙の年に当たるため骨格での予算編成」", ref: "docs/data-sources.md §13-16" },
  { code: "202029", name: "松本市", fy: "H28", evidence: "H31 資料の推移表「骨格予算+６月補正後」の印（H16・H20・H24・H28）", ref: "docs/data-sources.md §13-32" },
  { code: "202029", name: "松本市", fy: "H24", evidence: "H31 資料の推移表「特記」行に「骨格予算+６月補正後」", ref: "docs/data-sources.md §13-32" },
  { code: "202029", name: "松本市", fy: "H20", evidence: "H31 資料の推移表「特記」行に「骨格予算+６月補正後」", ref: "docs/data-sources.md §13-32" },
  { code: "202029", name: "松本市", fy: "H16", evidence: "H31 資料の推移表「特記」行に「骨格予算+６月補正後」", ref: "docs/data-sources.md §13-32" },
  { code: "202037", name: "上田市", fy: "R8", evidence: "原典 p.4 の脚注「※H22、H26、H30、R4、R8は骨格予算編成」", ref: "docs/data-sources.md §13-29" },
  { code: "202037", name: "上田市", fy: "R4", evidence: "R8 資料 p.4 の脚注「※H22、H26、H30、R4、R8は骨格予算編成」", ref: "docs/data-sources.md §13-29" },
  { code: "202037", name: "上田市", fy: "H30", evidence: "R8 資料 p.4 の脚注「※H22、H26、H30、R4、R8は骨格予算編成」", ref: "docs/data-sources.md §13-29" },
  { code: "202037", name: "上田市", fy: "H26", evidence: "R8 資料 p.4 の脚注「※H22、H26、H30、R4、R8は骨格予算編成」", ref: "docs/data-sources.md §13-29" },
  { code: "202037", name: "上田市", fy: "H22", evidence: "R8 資料 p.4 の脚注「※H22、H26、H30、R4、R8は骨格予算編成」", ref: "docs/data-sources.md §13-29" },
  { code: "212016", name: "岐阜市", fy: "H30", evidence: "年度ページの注記「R1 の前年度列は「当初＋6月補正」（H30 が骨格予算）」", ref: "pipeline/registry/sources.ts 岐阜市" },
  { code: "212024", name: "大垣市", fy: "R3", evidence: "「令和３年度大垣市当初予算の概要」p.1「本年４月に市長選挙を控えていることから…骨格予算として編成した」", ref: "docs/data-sources.md §13-27" },
  { code: "242071", name: "鈴鹿市", fy: "R5", evidence: "R5 資料 p.3 に明記・R6 資料も「肉付けを行った第３号補正後」", ref: "docs/data-sources.md §13-20" },
  { code: "242071", name: "鈴鹿市", fy: "H31", evidence: "H31 資料 p.3・R2 資料 p.5 に明記", ref: "docs/data-sources.md §13-20" },
  { code: "272035", name: "豊中市", fy: "R8", evidence: "報道提供資料に明記（市長選を控えた骨格予算）", ref: "pipeline/registry/sources.ts 豊中市" },
  { code: "272078", name: "高槻市", fy: "R5", evidence: "発行元が「骨格」と「肉付け（6月補正後）」の2本を公表（当初は骨格のほうを収録）", ref: "docs/data-sources.md §13-9" },
  { code: "272094", name: "守口市", fy: "R5", evidence: "「令和5年度当初予算案の概要」p.1「…「準骨格予算」として編成しました」", ref: "docs/data-sources.md §13-33" },
  { code: "272108", name: "枚方市", fy: "R5", evidence: "R5 概要「市議会議員選挙、市長選挙が予定されていることから骨格的予算」", ref: "docs/data-sources.md §13-7" },
  { code: "282073", name: "伊丹市", fy: "R3", evidence: "「令和3年度当初予算（案）の概要」「継続事業を中心とした骨格的な予算編成としています」（藤原市長の再選の年）", ref: "docs/data-sources.md §13-20" },
  { code: "282073", name: "伊丹市", fy: "H29", evidence: "「平成29年度 施政方針」（Wayback 20190823154844）「骨格的予算として編成しました平成29年度当初予算」（無投票の再選の年。H29 自体は未収録）", ref: "docs/data-sources.md §13-32" },
  { code: "282146", name: "宝塚市", fy: "R7", evidence: "原典は「骨格」の語を使わない。市長交代（2025年4月）前の編成で、R8 概要が「政策的判断を要する経費は2号補正に計上」と書くことから registry が実質的な骨格と判断したもの", ref: "docs/data-sources.md §13-17" },
  { code: "282146", name: "宝塚市", fy: "R3", evidence: "原典は「骨格」の語を使わない。市長改選前の編成で政策的経費は6月補正、と R4 の注記が記す（R3 の原典はスキャンで総額しか裏取りできていない）", ref: "docs/data-sources.md §13-17" },
  { code: "282146", name: "宝塚市", fy: "H25", evidence: "H25 `taiyou25.pdf`「停滞が許されない経費を盛り込んだ骨格予算とし」", ref: "docs/data-sources.md §13-32" },
  { code: "282146", name: "宝塚市", fy: "H18", evidence: "H18 予算編成大要「４月に市長選挙が実施されることから…骨格予算を編成する」", ref: "docs/data-sources.md §13-32" },
  { code: "312029", name: "米子市", fy: "R7", evidence: "R7 概要「の計上にとどめた骨格予算となるが」（翌年度の前年度列は6月補正後）", ref: "docs/data-sources.md §13-31" },
  { code: "312029", name: "米子市", fy: "R3", evidence: "R3 概要の当年度側の骨格宣言（R4 の前年度列は6月補正後）", ref: "docs/data-sources.md §13-31" },
  { code: "312029", name: "米子市", fy: "H29", evidence: "H29 概要「の計上にとどめた骨格予算として編成しているが」", ref: "docs/data-sources.md §13-31" },
  { code: "312029", name: "米子市", fy: "H25", evidence: "H25 概要の当年度側の骨格宣言（H26 の前年度列は6月補正後）", ref: "docs/data-sources.md §13-31" },
  { code: "322016", name: "松江市", fy: "R3", evidence: "「令和3年度 松江市当初予算概要」「4 月に市長選挙を控えていることから骨格予算としているが」", ref: "docs/data-sources.md §13-32" },
  { code: "322016", name: "松江市", fy: "H29", evidence: "「平成29年度 松江市当初予算概要」「…義務的経費や継続性・緊急性を有する経費を中心とした骨格予算を編成した。」", ref: "docs/data-sources.md §13-32" },
  { code: "322016", name: "松江市", fy: "H25", evidence: "「平成25年度 松江市当初予算概要」（H25_tosyo_01.pdf）「…骨格予算を編成した。」", ref: "docs/data-sources.md §13-32" },
  { code: "322032", name: "出雲市", fy: "H25", evidence: "H26 資料「※平成 25 年度当初は市長選挙を控えた骨格予算編成であったため 6 月補正後と比較している。」", ref: "docs/data-sources.md §13-23" },
  { code: "322032", name: "出雲市", fy: "H21", evidence: "未収録の H22 資料が H26 と同型（前年度列が6月補正後）と registry に記録（原典の引用は無い・伝聞の水準）", ref: "pipeline/registry/sources.ts 出雲市" },
  { code: "332020", name: "倉敷市", fy: "R6", evidence: "R6 概要「継続的な事業に要する経費を中心に計上する骨格予算として編成」", ref: "docs/data-sources.md §13-32" },
  { code: "332020", name: "倉敷市", fy: "R2", evidence: "原典は「骨格」の語を使わず、R3 概要が R2 の6月補正を「肉付け予算」と呼ぶ（「令和２年度の…６月補正予算による肉付け予算後と比較すると…約４．４％の減少」）。肉付けされる当初＝骨格として載せる（千葉市 R7 と同じ扱い）", ref: "docs/data-sources.md §13-32" },
  { code: "342122", name: "東広島市", fy: "H30", evidence: "H31 概要の前年度列に「（骨格のみ）」が5件", ref: "pipeline/registry/sources.ts 東広島市" },
  { code: "352012", name: "下関市", fy: "R7", evidence: "R7 概要「…骨格予算として編成し」・R8 概要 ※1「令和７年度数値は、当初予算（骨格）と６月（肉付け補正）の合計値」", ref: "docs/data-sources.md §13-16" },
  { code: "352012", name: "下関市", fy: "R3", evidence: "市長記者発表「令和3年度当初予算」「…骨格予算として編成しています。」", ref: "docs/data-sources.md §13-32" },
  { code: "352012", name: "下関市", fy: "H29", evidence: "「平成29年度当初予算の概要」§2 骨格予算・「平成29年度 6月補正予算の概要」", ref: "docs/data-sources.md §13-32" },
  { code: "352012", name: "下関市", fy: "H25", evidence: "H25 6月補正（肉付け）33億9,125万7千円・補正後 1,247億3,125万7千円", ref: "docs/data-sources.md §13-32" },
  { code: "362018", name: "徳島市", fy: "R6", evidence: "R7 資料の列「令和６年度（９月肉付補正後）」（市長選 4年ごと4月）", ref: "docs/data-sources.md §13-15" },
  { code: "362018", name: "徳島市", fy: "R2", evidence: "R3 資料の列「令和２年度（肉付補正後）」", ref: "docs/data-sources.md §13-15" },
  { code: "362018", name: "徳島市", fy: "H28", evidence: "H29 の前年度列が「H28 9月補正後」", ref: "docs/data-sources.md §13-15" },
  { code: "362018", name: "徳島市", fy: "H24", evidence: "H25 の前年度列が「H24 6月補正後」", ref: "docs/data-sources.md §13-15" },
  { code: "382027", name: "今治市", fy: "R3", evidence: "R3 予算書「令和３年度は、骨格予算を基本に」（市長交代の年。R7 は再選で通常）", ref: "docs/data-sources.md §13-30" },
  { code: "422011", name: "長崎市", fy: "R5", evidence: "R5 予算書「継続事業を中心とした骨格予算の考え方を基」（市長・市議改選期）", ref: "pipeline/registry/sources.ts 長崎市" },
  { code: "422029", name: "佐世保市", fy: "H19", evidence: "H20 資料「※平成１９年度予算については、当初が骨格予算であったため、６月補正（肉付け）後の予算額を記載する。」", ref: "docs/data-sources.md §13-16" },
  { code: "442011", name: "大分市", fy: "R5", evidence: "R6 の前年度列見出し「6月補正後予算」（市長選の骨格予算のため）", ref: "docs/data-sources.md §13-4" },
  { code: "442011", name: "大分市", fy: "H31", evidence: "R2 の前年度列見出し「6月補正後予算」", ref: "docs/data-sources.md §13-4" },
  { code: "452017", name: "宮崎市", fy: "R4", evidence: "R5 の前年度列が「肉付け後予算額」（R4 が市長選年度の骨格予算）", ref: "docs/data-sources.md §13-6" },
  { code: "472115", name: "沖縄市", fy: "R7", evidence: "沖縄市長の施政方針〔令和7年6月定例会〕", ref: "docs/data-sources.md §13-31" },
  { code: "472115", name: "沖縄市", fy: "R4", evidence: "沖縄市長の施政方針〔令和4年6月定例会〕「当初予算が骨格予算となりましたことから」", ref: "docs/data-sources.md §13-31" },
  { code: "122068", name: "木更津市", fy: "H30", evidence: "「平成30年度予算の概要」p.3 に、3月25日執行予定の市長選挙のため骨格予算として編成した旨の記載（偵察が原典で確認・逐語は未照合）", ref: "docs/data-sources.md §13-36" },
  { code: "122068", name: "木更津市", fy: "R4", evidence: "「令和4年度予算の概要」p.3 に、3月27日執行予定の市長選挙のため骨格予算として編成した旨の記載（偵察が原典で確認・逐語は未照合）", ref: "docs/data-sources.md §13-36" },
  { code: "122068", name: "木更津市", fy: "R8", evidence: "「令和8年度予算の概要」p.3 に、3月29日執行予定の市長選挙を控えて骨格予算として編成した旨の記載（偵察が原典で確認・逐語は未照合）", ref: "docs/data-sources.md §13-36" },
  { code: "422045", name: "諫早市", fy: "H25", evidence: "「平成25年度当初予算の概要」p.1 に、4月の市長・市議会議員選挙のため義務的経費と経常的経費を中心に編成した骨格的予算である旨の記載（偵察が原典で確認・逐語は未照合）", ref: "docs/data-sources.md §13-36" },
  { code: "422045", name: "諫早市", fy: "H29", evidence: "「平成29年度当初予算の概要」p.1 に、3月の市長・市議会議員選挙のため新たな政策的判断を伴う経費を見送り経常的経費と継続的事業を中心に編成した骨格予算である旨の記載（偵察が原典で確認・逐語は未照合）", ref: "docs/data-sources.md §13-36" },
  { code: "422045", name: "諫早市", fy: "R3", evidence: "「令和3年度当初予算の概要」p.1 に、3月の市長・市議会議員選挙のため新たな政策的判断を伴う経費を見送り経常的経費と継続的事業を中心に編成した骨格予算である旨の記載（偵察が原典で確認・逐語は未照合）", ref: "docs/data-sources.md §13-36" },
  { code: "422045", name: "諫早市", fy: "R7", evidence: "「令和7年度当初予算の概要」（/uploaded/attachment/19716.pdf）p.1「なお、令和７年度当初予算については、３月に市長・市議会議員選挙が実施されることから、扶助費をはじめとする経常的経費や、既に着手している継続事業に要する経費を中心に編成した骨格的予算としております。」（2026-09-12 に自分で取得して逐語照合）", ref: "docs/data-sources.md §13-36" },
  { code: "042021", name: "石巻市", fy: "R3", evidence: "「石巻市の令和3年度当初予算案の概要」Ⅰ 予算編成の考え方「なお、令和3年4月が市長の改選期に当たるため、新規の政策的経費については、継続性のある国県補助事業など、当初予算において計上を必要とするものを除き、計上を留保している。」／翌年度の「石巻市の令和4年度当初予算案の概要」Ⅱ「一般会計は、市長改選を控え、骨格予算として編成した前年度を下回る規模となっている。」（2026-09-12 に自分で取得して逐語照合）", ref: "docs/data-sources.md §13-37" },
  { code: "232041", name: "瀬戸市", fy: "R5", evidence: "「令和5年度当初予算の概要」p.6「２ 骨格予算としての編成」「令和５年４月に市長選挙が行われることから、令和５年度の当初予算は、義務的・経常的な経費や継続的に実施している事業の経費を基本とした「骨格予算」として編成し、政策的判断を要する新規事業については、原則、計上していません。」（2026-09-12 に収録した raw から逐語照合）", ref: "docs/data-sources.md §13-38" },
];
