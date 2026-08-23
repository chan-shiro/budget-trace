// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive
// 発行元が二次利用を許諾していない一次資料（/coverage の「要許可」）の
// 自サーバー配信コピー → 発行元（消えている資料は魚拓）のディープリンク。
// 画面はこのキーに載っている資料だけ、ドロワーではなく外部リンクで開く。

export interface RestrictedEvidenceLink {
  /** origin = 発行元へ直リンク / archive = 発行元から消えており魚拓にしかない */
  mode: "origin" | "archive";
  /**
   * 振替先に何があるか。page = 掲載ページ（HTML）と判っているもの / file = それ以外。
   * 画面のリンク文言はこれに従う（「予算書PDFを開く」と書いて HTML が開くのを防ぐ）。
   */
  target: "file" | "page";
  href: string;
  /** 発行元が示している利用条件の原文（なぜ外部リンクなのかの根拠） */
  license: string;
}

/** キー: 自サーバー配信コピーのパス（/sources/<sourceId>/<filename>。フラグメント無し） */
export const RESTRICTED_EVIDENCE: Record<string, RestrictedEvidenceLink> = {
  "/sources/numazu-yosansho-r7/s-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
    "license": "沼津市ウェブサイト掲載資料（非営利・二次利用要許可。利用条件は同サイト参照）",
    "target": "file"
  },
  "/sources/minami-alps-yosansho-r8/__8____________.pdf": {
    "mode": "origin",
    "href": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "license": "南アルプス市ウェブサイト掲載資料（二次利用は要許可。利用条件は同サイト参照）",
    "target": "file"
  },
  "/sources/fujikawaguchiko-yosansho-r8/R8yosan ga.pdf": {
    "mode": "origin",
    "href": "https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
    "license": "富士河口湖町公式ホームページに掲載している個々の情報（文章，写真，イラストなど）は，著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/chiba-ken-yosansho-r8/202602-5-y-i-yosan.pdf": {
    "mode": "origin",
    "href": "https://www.pref.chiba.lg.jp/zaisei/gian/documents/202602-5-y-i-yosan.pdf",
    "license": "「千葉県ホームページ」に掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、千葉県ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/osakafu-aramashi-yosan-r8/08-06_03_yosan.pdf": {
    "mode": "origin",
    "href": "https://www.pref.osaka.lg.jp/documents/133484/08-06_03_yosan.pdf",
    "license": "大阪府ホームページに掲載されている写真・イラスト・音声・動画及び記事は、著作権の対象となっており、著作権法により保護されています。「私的使用」や「引用」など、著作権法上認められている適切な方法で利用する場合を除き、無断使用・無断転載することはできません。",
    "target": "file"
  },
  "/sources/hiroshimaken-yosansho-r8/1113482_9615229_misc.pdf": {
    "mode": "origin",
    "href": "https://www.pref.hiroshima.lg.jp/site/zaiseiyosann/r08tosyo-giansyo.html",
    "license": "広島県ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象になっています。また、広島県ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法によって保護されています。広島県ホームページの情報を許可なく複製・無断使用・転載・販売・改変・印刷・配布する行為等は、私的利用の範囲や引用など、著作権法上認められる場合を除き、禁止します。",
    "target": "page"
  },
  "/sources/miyagiken-yosansho-r8/aohon_ippannkaikei.pdf": {
    "mode": "origin",
    "href": "https://www.pref.miyagi.jp/soshiki/zaisei/zei-r08-yosan.html",
    "license": "「宮城県ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「宮城県ホームページ」全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/niigataken-yosan-keisu-r8/486523.pdf": {
    "mode": "origin",
    "href": "https://www.pref.niigata.lg.jp/sec/zaisei/r8tousho.html",
    "license": "新潟県ホームページ(https://www.pref.niigata.lg.jp/，又は新潟県の各組織が左記以外のドメインで運営するサイト)(以下「当県サイト」という。）に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として新潟県に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当県サイトについては、新潟県に編集著作権があります。当県サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、新潟県に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。ただし、当県サイトの各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "page"
  },
  "/sources/kumamoto-ken-setsumeisho-r8/302703.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kumamoto.jp/uploaded/attachment/302703.pdf",
    "license": "当サイトに掲載されている情報（写真・イラスト・音声・動画及び記事など）は、熊本県または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められている適切な方法で利用する場合を除き、無断で複製・変更・使用等をすることはできません。",
    "target": "file"
  },
  "/sources/kyotofu-tosho-gaiyou-r8/r8_p1_sainyu.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kyoto.jp/yosan/documents/r8_p1_sainyu.pdf",
    "license": "京都府ホームページに掲載されている個々の情報(文章、写真、イラストなど)について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyotofu-tosho-gaiyou-r8/r8_p5_mokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kyoto.jp/yosan/documents/r8_p5_mokuteki.pdf",
    "license": "京都府ホームページに掲載されている個々の情報(文章、写真、イラストなど)について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyotofu-seika-houkoku-r6/01sesaku_1.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kyoto.jp/kessan/documents/01sesaku_1.pdf",
    "license": "京都府ホームページに掲載されている個々の情報(文章、写真、イラストなど)について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/naganoken-yosansho-r8/r0802_yosetsu_sokatsu.pdf": {
    "mode": "origin",
    "href": "https://www.pref.nagano.lg.jp/zaisei/kensei/soshiki/yosan/r08/r8yosanan.html",
    "license": "長野県公式ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、長野県公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/ibaraki-ken-yosan-kankeisiryou-r8/r08_tousyo_yosankankeisiryou.pdf": {
    "mode": "origin",
    "href": "https://www.pref.ibaraki.jp/somu/zaisei/kanri/documents/r08_tousyo_yosankankeisiryou.pdf",
    "license": "茨城県ホームページに掲載されている文章、画像等の著作権は、茨城県または文章、画像等の提供者の方にあります。これらの著作物は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転用・引用することはできません。",
    "target": "file"
  },
  "/sources/gifuken-yosan-keisu-r8/485785.pdf": {
    "mode": "origin",
    "href": "https://www.pref.gifu.lg.jp/uploaded/attachment/485785.pdf",
    "license": "本ホームページに掲載されている情報（文章、写真、画像、プログラムなど）は著作権の対象であり、法律によって保護されています。また本ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。これらの情報については、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、岐阜県の許可なく無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/tochigiken-yosansho-r8/412yosannann1.pdf": {
    "mode": "origin",
    "href": "https://www.pref.tochigi.lg.jp/b01/7gian.html",
    "license": "栃木県ホームページに掲載されている文章、画像等の著作権は、栃木県または文章、画像等の提供者に帰属します。これらの著作物は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・引用することはできません。",
    "target": "page"
  },
  "/sources/kagoshima-ken-yosan-setsumeisho-r8/127227_20260319114612-1.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kagoshima.jp/ab05/documents/127227_20260319114612-1.pdf",
    "license": "鹿児島県ホームページに掲載されている個々の情報及び鹿児島県ホームページ全体については著作権の対象となっており，ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き，無断転載・改変等をすることはできません。",
    "target": "file"
  },
  "/sources/gunma-ken-yosansetsumeisho-r8/690172.pdf": {
    "mode": "origin",
    "href": "https://www.pref.gunma.jp/uploaded/attachment/690172.pdf",
    "license": "群馬県ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、群馬県ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukushimaken-yosansho-r8/734665.pdf": {
    "mode": "origin",
    "href": "https://www.pref.fukushima.lg.jp/uploaded/attachment/734665.pdf",
    "license": "「福島県ホームページ」に掲載されている個々の情報(文章、写真、イラストなど)は、著作権の対象となっています。また、「福島県ホームページ」全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転用・引用することはできません。また、当ページの内容を改変することもできません。ただし、「福島県ホームページ」の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/mieken-yosan-gaiyou-r7/001178138.pdf": {
    "mode": "origin",
    "href": "https://www.pref.mie.lg.jp/common/content/001178138.pdf",
    "license": "「三重県ウェブサイト」に掲載されている情報（文章、写真、画像、プログラムなど）は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、三重県の許可なく複製、転用等する事は法律で禁止されています。／各ページの記載記事、写真の無断転載を禁じます。",
    "target": "file"
  },
  "/sources/mieken-yosan-gaiyou-r8/001238210.pdf": {
    "mode": "origin",
    "href": "https://www.pref.mie.lg.jp/common/content/001238210.pdf",
    "license": "「三重県ウェブサイト」に掲載されている情報（文章、写真、画像、プログラムなど）は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、三重県の許可なく複製、転用等する事は法律で禁止されています。／各ページの記載記事、写真の無断転載を禁じます。",
    "target": "file"
  },
  "/sources/aichi-yosan-setsumeisho-r8/600028.pdf": {
    "mode": "origin",
    "href": "https://www.pref.aichi.jp/uploaded/attachment/600028.pdf",
    "license": "ネットあいちに掲載されている個々の情報（文章，写真，イラストなど）は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/shizuokaken-zaisei-aramashi-157/aramashi157.pdf": {
    "mode": "origin",
    "href": "https://www.pref.shizuoka.jp/kensei/zaiseisuito/zaisei/1011521.html",
    "license": "「静岡県ホームページ」に掲載されている情報（文章、写真、イラスト、画像など）は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/shiga-ken-yosansho-r8/5592374.pdf": {
    "mode": "origin",
    "href": "https://www.pref.shiga.lg.jp/file/attachment/5592374.pdf",
    "license": "「滋賀県ホームページ」に掲載されている個々の情報（文字、写真、イラスト等）に関する諸権利は、滋賀県ならびに第三者が有する著作権の対象であり、法律によって保護されています。「滋賀県ホームページ」の利用者は、私的使用その他法律で認める範囲内において使用する場合にのみ、個々の情報をダウンロード等により複製することができます。また、上記目的による複製以外の場合であっても、個々の情報に著作権者による個別の利用条件が示されている場合には、当該条件に従って利用することができます。その他、私的使用その他法律で認める範囲を超えて権利者の許可なく複製、転用することは、法律で禁止されています。",
    "target": "file"
  },
  "/sources/nara-ken-yosansetsumeisho-r8/02_r8_setsumeisyo_soukatsu_001-004.pdf": {
    "mode": "origin",
    "href": "https://www.pref.nara.lg.jp/documents/21175/02_r8_setsumeisyo_soukatsu_001-004.pdf",
    "license": "奈良県ホームページに掲載されている文章、画像等の著作権は、奈良県または提供者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、当県のオープンデータカタログサイトや当県サイトの各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/nagasaki-ken-yosan-setsumeisho-r8/_________.pdf": {
    "mode": "origin",
    "href": "https://www.pref.nagasaki.jp/doc/45074.html",
    "license": "当県サイトに掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として長崎県に帰属します。（ただし、一部の画像等の著作権は、原著作者が所有しています。）「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "page"
  },
  "/sources/aomori-ken-kanbetsu-sokatsu-r8/R8tousyo_kanbetu-cleaned.pdf": {
    "mode": "origin",
    "href": "https://www.pref.aomori.lg.jp/soshiki/zaimu/zaisei/yosan_2026.html",
    "license": "青森県庁ホームページ(https://www.pref.aomori.lg.jp/)に掲載されている文章、写真、画像、動画、その他全ての情報は著作権の対象となっています。また、「青森県庁ホームページ」全体も編集著作物として著作権の対象となっており、共に著作権法により保護されています。これらの情報については、青森県または第三者が著作権を有しており、「私的利用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/iwate-ken-yosan-setsumeisho-r8/r8tousyo_setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.pref.iwate.jp/kensei/yosan/yosan/1069687/1097070.html",
    "license": "岩手県ホームページに掲載されている写真、画像、イラスト、動画などの個々の情報についての著作権は、県又はコンテンツ提供者にあります。これらの情報については、「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/ishikawa-ken-yosan-gaiyou-r8/r8_5ten.pdf": {
    "mode": "origin",
    "href": "https://www.pref.ishikawa.lg.jp/zaisei/yosan/r7/r8tousyo.html",
    "license": "「石川県ホームページ」に掲載されている個々の情報（文字、写真、イラスト等）は著作権の対象となっています。また、「石川県ホームページ」全体も編集著作物として著作権の対象となっており、ともに日本国著作権法及び国際条約により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、石川県の許可なく無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/oita-ken-zaisei-jokyo-r8/2269676.pdf": {
    "mode": "origin",
    "href": "https://www.pref.oita.jp/site/zaiseisugata/zaisei-jyokyo.html",
    "license": "大分県ホームページ全体及び大分県ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分県及び第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "page"
  },
  "/sources/miyazaki-ken-yosansho-r8/106626_20260219100915-1.pdf": {
    "mode": "origin",
    "href": "https://www.pref.miyazaki.lg.jp/documents/106626/106626_20260219100915-1.pdf",
    "license": "「宮崎県ホームページ」に掲載されている情報（文章、写真、イラスト等）の著作権は、県に帰属します。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kagawa-ken-zaisei-jijo-r8/157_01-14_r8toshogaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kagawa.lg.jp/documents/8155/157_01-14_r8toshogaiyo.pdf",
    "license": "当サイトに掲載されている個々の情報（文章・写真・イラストなど）は、著作権の対象となっています。また、当サイト全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。当サイトの内容の全部または一部については、私的使用または引用など著作権法上認められた行為として、適宜の方法により出所を明示することにより、引用・転載複製を行うことができます。ただし「無断転載を禁じます」などの注記があるものについては、それに従ってください。当サイトの内容の全部または一部について、無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/akita-ken-setsumeisho-sokatsu-r8/予算書【６】（２月議会・Ｒ８当初予算分）.pdf": {
    "mode": "origin",
    "href": "https://www.pref.akita.lg.jp/pages/archive/94507",
    "license": "「美の国あきたネット」に掲載されている文章、写真、画像、動画、その他全ての情報は著作権の対象となっています。また、「美の国あきたネット」全体も編集著作物として著作権の対象となっており、共に著作権法により保護されています。これらの情報については、秋田県または第三者が著作権を有しており、「私的利用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "page"
  },
  "/sources/toyama-ken-yosansetsumeisho-r8/08yosansetsumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.pref.toyama.jp/documents/52665/08yosansetsumeisyo.pdf",
    "license": "このウェブサイトに掲載されている文章、画像等の著作権は、富山県または文章、画像等の提供者の方にあります。これらの著作物は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で複製・転用することはできません。利用許諾については各ページに記載されているお問い合わせ先の所属へご連絡ください。",
    "target": "file"
  },
  "/sources/saga-ken-yosansho-r8/3_117997_up_6cba1aek.pdf": {
    "mode": "origin",
    "href": "https://www.pref.saga.lg.jp/kiji003117997/index.html",
    "license": "「佐賀県庁ホームページ」に掲載されている文字、写真、イラストなどの個々の情報及び「佐賀県庁ホームページ」全体に関する著作権は、原則として佐賀県に帰属します。（ただし、一部の画像等の著作権は、原著作者が所有しています。）「私的使用のための複製」など著作権法上認められた場合を除き、無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "page"
  },
  "/sources/fukui-ken-yosansho-r8/r8tousyo_yosanan.pdf": {
    "mode": "origin",
    "href": "https://www.pref.fukui.lg.jp/doc/zaisei/fukuikenyosan/tousyo08.html",
    "license": "このサイトにおけるコンテンツの著作権は、福井県に帰属します。著作権法上認められた場合を除いては、無断での複製・転用はできません。個々の写真・文章等の二次利用をご希望の方は、それぞれのページの担当課にご相談ください。",
    "target": "page"
  },
  "/sources/tokushima-ken-yosan-gaiyou-keisu-r8/1033755.pdf": {
    "mode": "origin",
    "href": "https://www.pref.tokushima.lg.jp/kenseijoho/zaisei/7310242/",
    "license": "徳島県ホームページで提供するすべての情報（文章・写真・イラストなど）について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、徳島県の許可なく複製・転用・販売することはできません。ただし、当県サイトの各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "page"
  },
  "/sources/kochi-ken-zaisei-jokyo-r8/file_2026629122744_1.pdf": {
    "mode": "origin",
    "href": "https://www.pref.kochi.lg.jp/doc/zaiseijoukyou-index/",
    "license": "高知県ホームページに掲載されている個々の情報（文字、写真、イラスト等）に関する諸権利は、著作権の対象であり、法律によって保護されています。これらの情報について、「私的使用のための複製」や「引用」など著作権法上で認められた場合を除き、高知県の許可なく複製、転用等をすることは法律で禁止されています。",
    "target": "page"
  },
  "/sources/shimane-ken-kamoku-mokuteki-r8/01_kamoku_mokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.pref.shimane.lg.jp/admin/seisaku/zaisei/yosan/yosanr8/r8gaiyou.data/01_kamoku_mokuteki.pdf",
    "license": "「島根県ホームページ」に掲載されている文章や写真、イラスト、画像などの著作権は、「島根県」又は「コンテンツ提供者」にあります。「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ホームページに記載されている所属へお問い合わせください。",
    "target": "file"
  },
  "/sources/tottori-ken-yosan-gaiyou-bunseki-r8/R8tousyogaiyoubunseki.pdf": {
    "mode": "origin",
    "href": "https://www.pref.tottori.lg.jp/327294.htm",
    "license": "とりネットに掲載されている個々の情報（文章，写真，イラストなど）は，著作権の対象となっています。とりネット全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。 「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。利用許諾については該当するウェブページを所管する担当課へお問い合わせください。",
    "target": "page"
  },
  "/sources/sapporo-yosansetsumeisho-r7/02_r7_yosansetsumeisho_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/documents/02_r7_yosansetsumeisho_ippan.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-yosansetsumeisho-r6/r6_yosansetsumeisyoippann.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/documents/r6_yosansetsumeisyoippann.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-yosansetsumeisho-r5/r5kakukaikeiyosansetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/documents/r5kakukaikeiyosansetumeisyo.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-yosansetsumeisho-r4/r4_yosansetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/documents/r4_yosansetsumeisho.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-yosansetsumeisho-r3/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/documents/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-yosansetsumeisho-r2/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/documents/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/gaiyou.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-4.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-5.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-5.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/2-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/2-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/2-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/3-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/3-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/3-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-4.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-5.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-5.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-8.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-8.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-9.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-9.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/5-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/5-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/5-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/5-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/0236_20240903.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/0236_20240903.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/01_R7datsutanso.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/01_R7datsutanso.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/02_R7digital.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/02_R7digital.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/03_R7seisaku_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/03_R7seisaku_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/04_R7soumu.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/04_R7soumu.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/05_R7zaisei_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/05_R7zaisei_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/06_R7kokusai_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/06_R7kokusai_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/07_R7shimin.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/07_R7shimin.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/08_R7nigiwai.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/08_R7nigiwai.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/09_R7keizai_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/09_R7keizai_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/10_R7kodomo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/10_R7kodomo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/11_R7kenkoufukushi.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/11_R7kenkoufukushi.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/12_R7iryo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/12_R7iryo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/13_R7midorikankyo_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/13_R7midorikankyo_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/14_R7gesui.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/14_R7gesui.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/15_R7shigen.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/15_R7shigen.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/16_R7kentiku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/16_R7kentiku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/17_R7toshiseibi.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/17_R7toshiseibi.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/18_R7douro.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/18_R7douro.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/19_R7kouwan_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/19_R7kouwan_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/20_R7syoubou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/20_R7syoubou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/21_R7kaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/21_R7kaikei.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/22_R7kyouiku_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/22_R7kyouiku_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/23_R7senkyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/23_R7senkyo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/24_R7jinji.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/24_R7jinji.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/25_R7kansa.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/25_R7kansa.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/26_R7gikai.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/26_R7gikai.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/01_R7tsurumi_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/01_R7tsurumi_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/02_R7kanagawa.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/02_R7kanagawa.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/03_R7nishi_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/03_R7nishi_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/04_R7naka_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/04_R7naka_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/05_R7minami_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/05_R7minami_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/06_R7konan_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/06_R7konan_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/07_R7hodogaya.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/07_R7hodogaya.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/08_R7asahi_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/08_R7asahi_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/09_R7isogo_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/09_R7isogo_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/10_R7kanazawa_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/10_R7kanazawa_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/11_R7kohoku_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/11_R7kohoku_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/12_R7midori.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/12_R7midori.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/13_R7aoba.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/13_R7aoba.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/14_R7tuzuki.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/14_R7tuzuki.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/15_R7totsuka.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/15_R7totsuka.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/16_R7sakae_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/16_R7sakae_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/17_R7izumi.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/17_R7izumi.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyo-hyoka-r7/18_R7seya_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/18_R7seya_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_00_mokuzi_seiribanngou.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_00_mokuzi_seiribanngou.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_00_mokuzi_sisakutaikeibetu.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_00_mokuzi_sisakutaikeibetu.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_01_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_01_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_02_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_02_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_03_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_03_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_04_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_04_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_05_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_05_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_06_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_06_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_07_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_07_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_08_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_08_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_09_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_09_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_10_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_10_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_11_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_11_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_12_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_12_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_13_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_13_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_14_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_14_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_15_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_15_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_16_zimuzigyou3.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_16_zimuzigyou3.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_17_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_17_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_18_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_18_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_19_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_19_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_20_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_20_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_21_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_21_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_22_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_22_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_23_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_23_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_24_zimuzigyou3.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_24_zimuzigyou3.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_25_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_25_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_26_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_26_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_27_zimuzigyou3.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_27_zimuzigyou3.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_28_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_28_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_29_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_29_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-jimujigyou-hyouka-r7/r7_99_zimuzigyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/23075/r7_99_zimuzigyou2.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho211.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho211.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho221.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho221.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho222.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho222.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho231.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho231.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho241.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho241.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho251.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho251.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho19.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho19.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho19110.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho19110.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho19117.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho19117.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho171.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho171.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho17123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho17131.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17131.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho17132.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17132.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho17133.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17133.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho17141.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17141.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho17142.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho17142.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho201.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho201.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho20111.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho20111.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8jigyoukeikakusho20121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/green/jigyokeikaku/r8jigyokeikaku.files/r8jigyoukeikakusho20121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8-somu-jigyoukeikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-jigyoukeikaku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8-somu-281-jigyoukeikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-281-jigyoukeikaku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8-somu-282-jigyoukeikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-282-jigyoukeikaku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8-somu-283-jigyoukeikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-283-jigyoukeikaku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8-somu-19115-jigyoukeikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/zaisei/jigyokeikaku/r8jigyoukeikaku.files/r8-somu-19115-jigyoukeikaku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0088_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/seisaku/jigyokeikaku/r8jigyoukeikaku.files/0088_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0086_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/seisaku/jigyokeikaku/r8jigyoukeikaku.files/0086_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0085_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/seisaku/jigyokeikaku/r8jigyoukeikaku.files/0085_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0004_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/R07izen/digital/jigyokeikaku/r8jigyoukeikaku.files/0004_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0056_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0056_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0054_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0054_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0055_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0055_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0042_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0042_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0043_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0043_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0044_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0044_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0045_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0045_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0046_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0046_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0047_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0047_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0048_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0048_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0049_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0049_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0050_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0050_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0051_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0051_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0052_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/somu/jigyoukeikaku/r8jigyoukeikaku.files/0052_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/R8kokusai.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/R07izen/kokusai/jigyoukeikaku/r8jigyoukeikaku.files/R8kokusai.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0021_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0021_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0022_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0022_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0023_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0023_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0024_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0024_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0025_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0025_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0026_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0026_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0027_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shimin/jigyoukeikaku/r8jigyoukeikaku.files/0027_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0012_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0012_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0008_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0008_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0009_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0009_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0010_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0010_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0011_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0011_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0013_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/bunko/jigyoukeikaku/r8jigyoukeikaku.files/0013_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0175_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0175_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0153_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0153_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0154_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0154_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0176_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0176_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0156_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0156_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0173_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0173_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0158_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0158_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0163_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0163_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0160_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0160_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0161_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0161_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0162_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0162_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0164_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0164_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0165_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0165_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0166_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0166_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0167_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0167_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0168_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0168_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0169_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/keizai/jigyoukeikaku/r8jigyoukeikaku.files/0169_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_kodomo_all.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_kodomo_all.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0002_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/0002_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0003_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0004_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-2-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-1.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-2-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-2-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-3.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-2-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-4.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-2-5.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-2-5.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-1.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-3.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-4.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-5.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-5.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-6.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-6.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_6-3-7.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_6-3-7.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_19.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_19.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/r8_kashitukekin.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kodomo/jigyoukeikaku/r8jigyoukeikaku.files/r8_kashitukekin.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0158_20260213.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0158_20260213.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0119_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0119_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0159_20260213.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0159_20260213.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0121_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0121_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0122_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0122_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0123_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0123_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0124_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0124_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0155_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0155_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0126_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0126_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0127_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0127_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0128_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0128_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0129_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0129_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0130_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0130_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0131_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0131_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0132_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0132_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0133_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0133_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0134_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0134_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0135_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0135_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0136_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0136_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0137_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0137_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0138_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0138_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0139_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0139_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0140_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0140_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0141_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0141_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0142_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0142_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0143_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0143_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0144_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0144_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0145_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0145_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0146_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0146_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0147_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0147_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0148_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0148_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0149_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0149_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0156_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0156_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0151_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0151_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0157_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0157_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0153_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenko/jigyoukeikaku/r8jigyoukeikaku.files/0153_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0001_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0001_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/iryo__0002_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0002_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/iryo__0003_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/iryo__0004_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0005_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0005_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0006_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0006_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0007_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo/jigyoukeikaku/r8jigyoukeikaku.files/0007_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/iryo-byoin__0005_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/iryo-byoin/jigyoukeikaku/r8jigyoukeikaku.files/0005_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0463_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0463_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0425_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0425_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0434_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0434_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0464_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0464_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0436_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0436_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0437_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0437_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0438_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0438_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0439_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0439_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0441_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0441_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0442_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0442_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0443_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0443_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0444_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0444_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0461_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0461_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0446_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0446_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0447_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0447_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0448_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0448_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0449_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0449_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0450_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0450_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0451_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0451_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0452_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0452_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0453_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0453_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0454_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0454_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0455_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0455_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0456_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0456_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0457_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0457_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0458_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0458_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0459_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0459_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0460_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kankyo/jigyoukeikaku/r8jigyoukeikaku.files/0460_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0403_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0403_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0404_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0404_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0405_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0405_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0407_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0407_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0406_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0406_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0408_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0408_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0409_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0409_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0410_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0410_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0411_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0411_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0412_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0412_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0413_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0413_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0414_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0414_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0415_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0415_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0416_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0416_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0432_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0432_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0418_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0418_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0419_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0419_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0420_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0420_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0421_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0421_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0422_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0422_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0423_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0423_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0424_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0424_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0425_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0425_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0426_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0426_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0427_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0427_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0428_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0428_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0429_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0429_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0430_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0430_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0397_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0397_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0398_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0398_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0399_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0399_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0400_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0400_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0401_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gesui/jigyokeikaku/r8jigyoukeikaku.files/0401_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0017_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0017_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0018_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0018_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0019_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0019_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0020_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0020_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0021_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0021_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0022_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0022_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0023_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0023_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0024_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0024_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0025_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0025_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0026_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0026_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0027_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shigen/jigyoukeikaku/r8jigyoukeikaku.files/0027_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0108_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0108_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0109_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0109_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0111_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0111_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0100_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0100_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0101_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0101_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0102_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0102_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0103_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0103_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0104_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0104_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0105_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0105_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0106_20260121.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kenchiku/jigyoukeikaku/r8jigyoukeikaku.files/0106_20260121.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_12.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_12.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_120101.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_120101.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_120102.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_120102.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_120103.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_120103.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_19.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_19.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_190110.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_190110.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_01_190117.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_01_190117.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_17.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_17_0101.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0101.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_17_0102.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0102.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_17_0103.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0103.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/2026_17_0105.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/2026_17_0105.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/R8_hosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/toshi/jigyoukeikaku/r8jigyoukeikaku.files/R8_hosyo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0029_20260204.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0029_20260204.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0011_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0011_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0027_20260204.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0027_20260204.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0024_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0024_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0025_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0025_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0015_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0015_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0016_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0016_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0017_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0017_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0018_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0018_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0020_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0020_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0022_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0022_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0023_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0023_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyokeikaku__0019_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/doro/jigyokeikaku/r8jigyoukeikaku.files/0019_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0073_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0073_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0066_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0066_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0067_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0067_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0068_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0068_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0069_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0069_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0070_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0070_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0071_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0071_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0051_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0051_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0072_20260127.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0072_20260127.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0053_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0053_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/kowan__0054_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0054_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/kowan__0055_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0055_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/kowan__0056_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0056_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0057_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0057_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0059_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0059_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0060_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0060_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0061_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0061_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0062_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0062_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0063_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0063_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0064_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0064_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0065_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kowan/jigyoukeikaku/r8jigyoukeikaku.files/0065_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0016_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0016_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0017_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0017_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0019_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0019_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0020_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0020_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0021_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0021_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0022_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0022_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0023_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0023_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0024_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0024_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0025_20260122.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/shobo/jigyoukeikaku/r8jigyoukeikaku.files/0025_20260122.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jigyoukeikaku__0004_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/suido/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-02-01-01syokouchiku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-01syokouchiku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-02-01-30syaryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-30syaryou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-02-01-40unten.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-40unten.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-02-01-60unyukanri.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-60unyukanri.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-02-01-73juuryouzei.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-02-01-73juuryouzei.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-12-01-01syaryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-12-01-01syaryou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-12-01-10kouchikubutsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-12-01-10kouchikubutsu.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8jidousya-12-01-15kikaibihin.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8jidousya-12-01-15kikaibihin.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kanren-18-01-80kensyuujo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kanren-18-01-80kensyuujo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kanren-18-01-90ippankanri.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kanren-18-01-90ippankanri.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-02-01-10senro.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-10senro.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-02-01-20denro.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-20denro.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-02-01-30sharyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-30sharyou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-02-01-40unten.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-40unten.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-02-01-50unyu.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-50unyu.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-02-01-60unyukanri.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-02-01-60unyukanri.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-12-01-01kensetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-12-01-01kensetsu.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-12-01-05kensetsukairyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-12-01-05kensetsukairyou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/8kousoku-12-01-07futaijigyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kotsu/jigyoukeikaku/r8jigyoukeikaku.files/8kousoku-12-01-07futaijigyou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0003_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kaikei/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0211_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0211_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0212_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0212_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0213_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0213_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0214_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0214_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0215_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0215_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0239_20260204.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0239_20260204.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0217_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0217_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0218_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0218_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0219_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0219_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0220_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0220_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0221_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0221_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0222_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0222_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0223_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0223_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0224_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0224_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0225_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0225_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0226_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0226_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0227_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0227_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0228_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0228_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0229_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0229_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0230_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0230_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0231_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0231_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0232_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0232_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0233_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0233_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0234_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0234_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0235_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0235_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0236_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0236_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0240_20260209.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0240_20260209.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0238_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kyoiku/jigyoukeikaku/r8jigyoukeikaku.files/0238_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0004_20260125.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/senkyo/jigyoukeikaku/r8jigyoukeikaku.files/0004_20260125.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0005_20260125.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/senkyo/jigyoukeikaku/r8jigyoukeikaku.files/0005_20260125.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0006_20260125.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/senkyo/jigyoukeikaku/r8jigyoukeikaku.files/0006_20260125.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/jinji__0003_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/jinji/jigyoukeikaku/r8jigyoukeikaku.files/0003_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/0014_20260123.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/kansa/jigyoukeikaku/r8jigyoukeikaku.files/0014_20260123.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-jigyou-keikaku-r8/gikai__0001_20260126.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/yokohamashi/org/gikai/jigyoukeikaku/r8jigyoukeikaku.files/0001_20260126.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020058.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020058.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020064.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020064.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020067.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020067.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020074.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020074.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020150.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020150.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020159.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020159.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020183.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020183.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020250.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020250.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020260.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020260.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020276.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020276.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020280.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020280.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020313.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020313.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020314.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020314.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020317.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020317.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020322.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020322.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020343.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020343.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020344.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020344.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020347.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020347.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020360.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020360.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020364.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020364.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020367.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020367.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020385.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020385.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020388.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020388.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020392.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020392.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020407.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020407.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020451.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020451.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020452.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020452.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020454.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020454.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020476.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020476.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020477.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020477.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020478.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020478.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020479.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020479.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020480.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020480.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020559.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020559.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020567.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020567.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020568.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020568.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020571.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020571.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020574.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020574.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020578.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020578.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020597.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020597.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020600.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020600.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020606.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020606.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020642.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020642.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020656.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020656.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020658.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020658.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020685_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020685_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020703.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020703.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020704.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020704.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020713.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020713.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020718.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020718.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020720.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020720.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020723.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020723.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020724.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020724.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020726.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020726.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020730.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020730.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020732.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020732.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020735.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020735.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020745.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020745.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020756.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020756.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020761.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020761.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020811.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020811.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020852.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020852.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020887.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020887.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020894.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020894.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020895.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020895.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020899.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020899.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020952.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020952.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020989.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020989.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020990.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020990.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020992.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020992.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020997.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020997.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021014.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021014.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021042.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021042.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021047.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021047.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021138.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021138.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021139.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021139.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021144.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021144.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021161.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021161.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021192.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021192.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021231.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021231.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021233.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021233.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021234.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021234.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021235.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021235.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021249.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021249.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021253.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021253.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021262.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021262.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021263.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021263.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021268.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021268.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021270.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021270.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021281.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021281.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021282.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021282.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021284.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021284.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021287.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021287.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021461.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021461.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021462.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021462.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021463.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021463.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021464.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021464.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021505.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021505.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021535.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021535.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021553.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021553.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021587.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021587.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021599.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021599.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021615.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021615.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021626.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021626.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021631.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021631.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021660.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021660.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021663.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021663.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021668.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021668.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021762.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021762.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021768.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021768.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021865.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021865.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021908.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021908.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021911.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021911.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021933.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021933.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021938.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021938.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021947.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021947.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021957.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021957.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021965_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021965_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022184.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022184.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022392.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022392.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022469.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022469.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022494.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022494.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022498.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022498.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022499.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022499.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022704.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022704.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022713.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022713.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022721.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022721.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022745.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022745.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022755.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022755.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022898_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022898_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/dennkijidoushatyousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/dennkijidoushatyousho.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022985.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022985.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022986.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022986.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023021.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023021.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023023.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023023.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023024.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023024.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023040.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023040.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023043.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023043.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023045.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023045.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023046.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023046.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023048.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023048.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023050.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023050.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023084.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023084.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023110.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023110.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023191.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023191.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023195.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023195.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023220.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023220.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023315.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023315.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023320.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023320.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023326.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023326.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023333.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023333.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023389.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023389.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023428.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023428.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023443.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023443.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023447.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023447.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023468.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023468.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023484.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023484.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023512.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023512.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023526.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023526.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023531.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023531.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023536.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023536.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023550.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023550.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023595.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023595.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023619.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023619.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023645.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023645.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023664.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023664.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023695.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023695.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023730.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023730.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023875.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023875.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023877.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023877.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023882.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023882.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023909.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023909.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023946.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023946.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023947.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023947.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024003.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024003.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024017.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024017.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024040.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024040.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024056.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024056.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024059.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024059.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024112.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024112.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024131.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024131.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024162.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024162.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024167.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024167.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024224.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024224.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024230.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024230.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024231.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024231.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024241.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024241.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024318.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024318.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024349.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024349.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024563.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024563.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024573.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024573.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024605.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024605.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024621.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024621.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024654.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024654.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024680.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024680.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025029.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025029.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025165.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025165.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025185.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025185.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025240.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025240.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025260.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025260.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025274.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025274.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025281.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025281.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025353.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025353.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035012.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035012.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035014.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035014.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035083.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035083.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035117.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035117.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035164.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035164.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035168_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035168_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035170.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035170.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035187.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035187.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035231.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035231.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035233.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035233.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035264.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035264.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035291.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035291.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035312.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035312.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035316.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035316.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035366.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035366.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035402.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035402.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035429.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035429.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035453.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035453.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035481.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035481.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035485.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035485.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035500.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035500.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035553.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035553.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035554.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035554.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035581.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035581.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035621.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035621.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035639.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035639.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035672.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035672.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035674.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035674.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035696.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035696.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035720.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035720.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035778_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035778_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035783.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035783.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035787.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035787.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035794.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035794.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035838.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035838.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035856.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035856.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035907.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035907.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036002.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036002.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036041.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036041.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036051.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036051.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036080.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036080.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036116.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036116.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036211.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036211.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036213.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036213.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036235.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036235.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036246.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036246.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036260.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036260.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036276.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036276.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036285.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036285.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036287.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036287.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036301.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036301.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036351.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036351.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036388_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036388_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036444.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036444.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036446.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036446.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036449.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036449.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036480.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036480.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036495.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036495.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036537.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036537.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036567.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036567.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036602.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036602.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036618.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036618.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036619.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036619.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036640.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036640.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036693.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036693.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036694.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036694.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036735.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036735.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036738.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036738.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036747.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036747.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036767.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036767.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036774.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036774.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036780.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036780.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036789.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036789.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036819.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036819.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036832.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036832.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036836.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036836.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036837.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036837.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036846.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036846.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036878.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036878.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036884.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036884.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036900.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036900.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036903.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036903.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036910.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036910.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036919.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036919.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036927.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036927.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036956.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036956.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036959.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036959.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036975.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036975.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037048.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037048.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037095.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037095.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037132.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037132.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037133.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037133.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037137.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037137.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037140.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037140.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037146.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037146.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037152.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037152.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037164.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037164.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037192.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037192.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037223.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037223.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037259.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037259.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037285.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037285.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037317.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037317.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037333.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037333.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037356.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037356.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037384.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037384.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037390.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037390.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037400.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037400.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037410.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037410.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037413.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037413.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037428.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037428.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037471.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037471.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037486.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037486.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037503.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037503.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037507.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037507.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037509.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037509.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037535.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037535.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037540.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037540.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037549.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037549.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037552.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037552.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037553.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037553.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037557.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037557.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037559.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037559.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037560.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037560.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037567.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037567.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037572_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037572_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037593.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037593.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037612.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037612.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037624.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037624.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037635.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037635.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037641.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037641.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037664.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037664.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037666.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037666.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037711.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037711.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037717.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037717.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037718.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037718.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037739.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037739.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037741.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037741.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037742.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037742.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037743.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037743.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037755.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037755.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037765.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037765.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037778.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037778.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037780.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037780.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037782.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037782.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037785.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037785.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037789.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037789.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037802.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037802.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037811.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037811.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037818.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037818.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037829.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037829.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037835.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037835.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037857.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037857.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037858.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037858.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037859.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037859.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037864.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037864.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037865_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037865_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037866.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037866.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037869.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037869.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037871_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037871_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037901.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037901.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037907.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037907.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037910.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037910.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037911.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037911.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037925.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037925.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037977.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037977.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038008.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038008.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038011.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038011.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038015.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038015.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038020.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038020.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038021.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038021.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038022.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038022.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038044.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038044.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038045.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038045.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038078.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038078.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038082.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038082.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038110.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038110.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038113.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038113.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038117.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038117.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038124.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038124.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038128.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038128.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038133.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038133.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038136.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038136.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038150.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038150.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038174.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038174.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038181.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038181.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038184.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038184.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038195.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038195.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038218.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038218.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038255.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038255.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038257.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038257.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038258.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038258.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038265.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038265.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038268.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038268.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038303.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038303.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038306.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038306.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038307.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038307.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038321.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038321.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038332.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038332.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038334.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038334.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038343.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038343.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038344.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038344.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038349.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038349.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038350.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038350.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038397.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038397.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038400.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038400.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038402.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038402.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038413.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038413.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038415.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038415.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038417.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038417.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038420.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038420.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038421.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038421.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038424.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038424.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038426.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038426.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038435.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038435.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038441.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038441.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038442.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038442.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038449.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038449.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038451.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038451.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038454.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038454.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038457.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038457.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038460.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038460.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038462.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038462.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038463.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038463.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038468.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038468.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038470.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038470.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038478.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038478.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038488.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038488.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038505.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038505.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038507.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038507.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038512.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038512.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038533.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038533.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038566.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038566.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038579.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038579.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038610.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038610.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038613.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038613.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038616.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038616.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038618.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038618.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038628.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038628.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038636.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038636.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038642.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038642.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038652.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038652.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038654.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038654.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038682.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038682.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038687.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038687.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038693.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038693.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038735.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038735.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038737.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038737.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038739.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038739.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038740.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038740.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038744.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038744.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038749.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038749.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038756.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038756.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038762.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038762.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038767.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038767.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038771.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038771.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038778.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038778.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038779.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038779.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038785.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038785.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038788.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038788.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038790.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038790.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038797.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038797.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038798.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038798.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038799.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038799.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038801.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038801.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038802.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038802.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038812.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038812.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038813.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038813.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038814.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038814.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038827_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038827_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038829.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038829.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038845.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038845.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070021.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070021.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070027.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070027.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070029.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070029.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070030.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070030.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070034.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070034.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070035.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070035.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070046.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070046.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070047.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070047.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070049.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070049.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070051.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070051.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070052.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070052.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070053.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070053.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070061.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070061.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070063.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070063.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070064.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070064.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070067.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070067.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070074.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070074.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070075.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070075.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070076.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070076.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070080.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070080.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070081.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070081.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070082.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070082.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070091.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070091.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070097.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070097.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070104.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070104.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070105.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070105.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070106.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070106.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070118.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070118.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070119.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070119.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070122.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070122.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070123.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070123.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070125.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070125.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070126.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070126.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070137.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070137.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070138.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070138.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070139.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070139.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070140.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070140.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070144.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070144.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070145.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070145.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070149.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070149.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070152.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070152.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070154.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070154.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070155.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070155.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070156.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070156.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070158.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070158.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070159.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070159.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070161.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070161.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070163.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070163.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070171.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070171.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070180.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070180.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070181.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070181.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070182.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070182.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070192.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070192.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070193.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070193.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070210.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070210.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070211.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070211.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070220.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070220.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070224.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070224.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070229.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070229.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070232_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070232_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070234.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070234.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070235.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070235.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070236.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070236.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070238.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070238.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070242.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070242.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070245.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070245.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070248.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070248.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070251.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070251.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070253.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070253.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070254.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070254.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070257.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070257.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070259.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070259.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070265.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070265.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070266.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070266.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070271.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070271.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070272.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070272.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070274.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070274.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070275.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070275.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070278.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070278.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070279.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070279.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070285.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070285.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070286.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070286.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070287.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070287.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070291.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070291.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070292.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070292.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070294.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070294.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070295.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070295.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070296.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070296.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070297.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070297.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070298.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070298.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070299.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070299.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070300.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070300.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070301.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070301.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070303.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070303.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070304.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070304.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070306.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070306.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070308.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070308.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070312.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070312.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070314.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070314.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070315.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070315.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070319.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070319.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070320.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070320.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070326.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070326.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070328.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070328.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070334.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070334.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070336.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070336.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070345.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070345.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070346.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070346.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070349.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070349.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070350.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070350.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070351.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070351.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070352.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070352.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070354.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070354.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070355.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070355.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070362.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070362.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070369.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070369.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070376_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070376_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070427.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070427.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070434.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070434.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070435.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070435.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070436.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070436.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091739.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091739.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091740.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091740.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091769.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091769.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091807.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091807.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091808.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091808.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091810.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091810.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091872.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091872.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091880.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091880.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091883.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091883.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091905.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091905.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091932.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091932.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091933.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091933.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091938.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091938.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091945.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091945.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092006.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092006.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092050.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092050.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092051.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092051.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092052.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092052.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092082.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092082.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092083.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092083.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092084.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092084.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092085.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092085.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092086_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092086_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092087.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092087.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092091.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092091.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092092.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092092.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092094.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092094.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/osaka-yosansho-r8/2026gian60.pdf": {
    "mode": "origin",
    "href": "https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
    "license": "ライセンス表示のない画像ファイルや添付ファイルは著作権の対象となっているため、無断での使用や転載を禁じます。私的使用のための複製や、引用など著作権法上認められた場合を除き、上記著作権の対象に該当するコンテンツを複製・転用する際は、必ず事前にそれぞれのコンテンツを所管する各担当にご相談ください。",
    "target": "file"
  },
  "/sources/saitama-yosansho-r8/reiwa8nendotousyoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
    "license": "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）",
    "target": "file"
  },
  "/sources/saitama-yosansho-r7/reiwa7nendotousyoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.saitama.lg.jp/006/007/011/001/020/p119990_d/fil/reiwa7nendotousyoyosan.pdf",
    "license": "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）",
    "target": "file"
  },
  "/sources/saitama-jigyou-houkoku-r6/gyouseihoukokusyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.saitama.lg.jp/006/007/011/002/p124022_d/fil/gyouseihoukokusyo.pdf",
    "license": "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）",
    "target": "file"
  },
  "/sources/hiroshima-yosansho-r8/2610.pdf": {
    "mode": "origin",
    "href": "https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/047/851/2610.pdf",
    "license": "広島市ホームページ上の文書や画像等の各ファイル及びその内容に関する諸権利は、原則として広島市に帰属します（一部の画像等の著作権は、原著作者が所有しています。）。「私的使用による複製」や「引用」など著作権法上認められる場合を除き、広島市ホームページ上に掲載されている文書や画像等を、無断で使用・複製・転載・販売・改変・印刷配布することはできません。使用等を希望される方は、各ページに記載されている担当課へ、事前に、ご相談ください。なお、広島市の各局や各課が配信するページ等に利用規約等、特別な規定がある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r8/01_ippantousyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000347/347934/01_ippantousyo.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r7/01_tousyoippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000335/335933/01_tousyoippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r6/01_tousyoippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000323/323068/01_tousyoippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r5/04-1_ippann_jikoubetu.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000304/304545/04-1_ippann_jikoubetu.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r4/01_ippannjikoubetuR4.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000290/290208/01_ippannjikoubetuR4.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r3/ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000293/293622/ippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kyoto-yosansho-r2/01ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000259/259833/01ippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r8/001192254.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001192254.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-jigyou-hyoka-r6/001158940.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001158940.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r7/001129574.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001129574.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r6/001074934.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001074934.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r5/001034900.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001034900.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r4/000966725.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/000966725.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r3/000917954.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/000917954.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kitakyushu-yosansho-r2/000840516.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/000840516.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/chiba-yosansho-r8/r8yosansho_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/documents/r8yosansho_ippan.pdf",
    "license": "千葉市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として千葉市に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。千葉市ホームページは利用目的を問わず自由に閲覧していただくことが可能ですが、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、千葉市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/chiba-yosansho-r4/r4ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/documents/r4ippan.pdf",
    "license": "千葉市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として千葉市に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。千葉市ホームページは利用目的を問わず自由に閲覧していただくことが可能ですが、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、千葉市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/sendai-yosansho-r8/1_r8tousho_mokuji.pdf": {
    "mode": "origin",
    "href": "https://www.city.sendai.jp/yosandaichi/shise/zaise/zaimu/zaise/sendaishi/yosan/r8terekai/r8-1/index/index/documents/1_r8tousho_mokuji.pdf",
    "license": "仙台市ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、仙台市ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、仙台市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/sakai-yosansho-r8/R8-2yosannannsetsumeisiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/R8-1giannsyo.files/R8-2yosannannsetsumeisiryou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/sakai-yosansho-r7/R7-1_yosannnannsetumei.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/giannsyo_R7-1.files/R7-1_yosannnannsetumei.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/sakai-yosansho-r6/R6-1yosannannsetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/75920720240209111619595.files/R6-1yosannannsetumeisyo.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/sakai-yosansho-r3/0301-yosannan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0301gian.files/0301-yosannan.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/sakai-yosansho-r2/0201yosanansetumeishiryo.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0207giansho.files/0201yosanansetumeishiryo.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/niigata-yosansho-r8/R8-2yosansyo_shinen-ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.files/R8-2yosansyo_shinen-ippan.pdf",
    "license": "市公式ホームページに掲載している文書、画像等のファイルやその内容（以下「内容等」という）については、原則として新潟市に帰属します。ただし、一部の内容等の著作権は、原著作者が所有しています。市公式ホームページ内の内容等については、著作権法上認められた「私的使用のための複製」や「引用」等の場合を除き、新潟市及び内容等の提供者に無断で転載、複製、改変、販売、貸与等の利用をすることはできません。ただし、新潟市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/niigata-yosansho-r7/r7-2yosansyo-ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.files/r7-2yosansyo-ippan.pdf",
    "license": "市公式ホームページに掲載している文書、画像等のファイルやその内容（以下「内容等」という）については、原則として新潟市に帰属します。ただし、一部の内容等の著作権は、原著作者が所有しています。市公式ホームページ内の内容等については、著作権法上認められた「私的使用のための複製」や「引用」等の場合を除き、新潟市及び内容等の提供者に無断で転載、複製、改変、販売、貸与等の利用をすることはできません。ただし、新潟市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r8/22_setumeisho08.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/171794/22_setumeisho08.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r8/02_syuyojigyo08.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/171794/02_syuyojigyo08.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r7/l_yosansetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/164874/l_yosansetsumeisho.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r7/02_bunyabetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/164874/02_bunyabetsu.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r6/l-setumeishoippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/157760/l-setumeishoippan.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r5/yosansetumeisyo_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/148959/yosansetumeisyo_ippan.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/hamamatsu-yosansho-r4/r4_yosansetumeisyo_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/133296/r4_yosansetumeisyo_ippan.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/sagamihara-yosansho-r8/20260216_shuyou_setumei.pdf": {
    "mode": "origin",
    "href": "https://www.city.sagamihara.kanagawa.jp/_res/projects/default_project/_page_/001/003/978/r08nend/20260216_shuyou_setumei.pdf",
    "license": "相模原市のホームページに掲載されている文書や画像等の各ファイル、及びその内容に関する権利は、原則として相模原市に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、許可なく無断で複製や転用することはできません。",
    "target": "file"
  },
  "/sources/ota-yosansho-r8/02r8_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r08yosan/r08-yosan.files/02r8_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-r7/02r7_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r07yosan/r07-yosan.files/02r7_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-r6/02r6_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r06yosan/r06-yosan.files/02r6_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-r5/02r5_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r05yosan/r05-yosan.files/02r5_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-r4/02kihontekikanngae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r04yosan/r04-yosann.files/02kihontekikanngae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-r3/03.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r03yosan/r03-yosann.files/03.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-r2/3.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r02yosan/r02-yosanann.files/3.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h31/3.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/31yosan/31yosanann.files/3.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h30/3_yosangaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/30yosan/30_yosan.files/3_yosangaiyo.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h29/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/29yosan/29yosan.files/gaiyo.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h28/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/28yosan/28yosangaiyo.files/gaiyo.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r2/2gaisansho_sainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/2yosanannopointo.files/2gaisansho_sainyuu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r2/2gaisansho_saishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/2yosanannopointo.files/2gaisansho_saishutu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h31/31gaisannshosainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/31yosanannopointo.files/31gaisannshosainyuu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h31/31gaisannshosaishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/31yosanannopointo.files/31gaisannshosaishutu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h27/sainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/27yosananpoint.files/sainyuu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h27/saishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/27yosananpoint.files/saishutu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/ota-yosansho-h27/yosanhenseinogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/27yosan/27yosangaiyo.files/yosanhenseinogaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h26/26yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/26yosan.files/26yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h25/25yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/25yosan.files/25yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h24/24yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/24yosan.files/24yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h23/23yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/23yosan.files/23yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h22/22yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/22yosan.files/22yosan-gaiyou.pdf.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h21/21yosan-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/21yosan.files/21yosan-gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/ota-yosansho-h20/20gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/20yosan_gaiyou.files/20gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r8/r8gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r8gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r7/r7gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r7gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r6/r6gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r6gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r5/r5gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r5gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r4/r4gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r4gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r3/r3gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r3gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-r2/02gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/02gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h31/31gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/31gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h30/30gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/30gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h29/29gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/29gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h28/28gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130075731id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/28gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h27/27gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130100057id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/27gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h26/26gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130065453id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/26gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/kita-yosangaiyou-h24/24gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130091510id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/24gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r8/R8yosan3.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R8yosanannopoint.files/R8yosan3.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r7/R7yosan3.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R7yosanannopoint.files/R7yosan3.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r6/R6yosan3.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R6yosanannopoint.files/R6yosan3.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r5/5gaisansho.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R5yosanannopoint.files/5gaisansho.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r4/s3-kanbetuyosangaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R4yosanannopoint.files/s3-kanbetuyosangaku.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-r3/3gaisannsho.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/3point.files/3gaisannsho.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h30/sainyuusaishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/30yosanpoint.files/sainyuusaishutu.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h29/29-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/29point.files/29-4.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/taito-kanbetsu-h28/30gaisansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/28point.files/30gaisansyo.pdf",
    "license": "台東区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は台東区に帰属します。ただし、一部の画像などの著作権は原著作者が所有しています。原則、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/shinjuku-yosan-gaiyou-r8/000451451.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/file06_02_0101.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r7/000448143.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r6/000418377.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r5/000359952.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kucho/message/20230213-01-1.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r4/000359947.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r3/000331346.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r2/000304338.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-r1/000283543.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h30/000254899.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h29/000233794.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h28/000192291.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h27/000189437.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h26/000168755.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h25/000139123.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h24/000121180.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h23/000103085.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h22/000062569.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h21/000059941.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h20/000050579.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h19/000050580.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h18/000050581.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h17/000050582.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h16/000050585.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h15/000050586.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h14/000050587.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-yosan-gaiyou-h13/000050588.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/shinjuku-kessan-taisho-r6/000434904.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/kaikei01_001000_00006.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。",
    "target": "page"
  },
  "/sources/minato-yosangaiyou-r8/20260202131316.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/20260202131316.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r8/20260202131436.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/20260202131436.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r7/r7nishou.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/r7nishou.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r6/nishou.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/nishou.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r5/2sho.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/2sho.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r4/02_section2.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/02_section2.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r3/04sainyusaisyutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/04sainyusaisyutu.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-r2/section2.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/section2.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h31/15-24.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/15-24.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h30/05kibo_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/05kibo_1.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h28/03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h27/h27yosangaiyou03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h27yosangaiyou03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h26/h26_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h26_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h25/h25_yosangaiyo_02pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h25_yosangaiyo_02pdf.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h23/h23_yosangaiyo_02.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h23_yosangaiyo_02.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h22/h22_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h22_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h21/h21_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h21_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h20/h20_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h20_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/minato-yosangaiyou-h19/h19_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h19_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r8/r8_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/17921/r8_sokatsuhyo.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r7/r7_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/16917/r7_sokatsuhyo.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r6/r6_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/15419/r6_sokatsuhyo.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r5/r5soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/13525/r5soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r4/r4soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2801/r4soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r3/r3tousyo_soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2791/r3tousyo_soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-r2/r2tousyo_soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2786/r2tousyo_soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-h31/31tousyoyosansoukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2772/31tousyoyosansoukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-h30/30tousyosoukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2763/30tousyosoukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/chuo-sokatsuhyo-h29/29tousyoyosansoukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2756/29tousyoyosansoukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r8/r08_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/19579/r08_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r7/r07_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/17203/r07_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r6/r06_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/14537/r06_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r5/r05_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2254/r05_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r4/r04_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2259/r04_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r3/r03_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2258/r03_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/meguro-yosanan-r2/r02yosan_s01.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2257/r02yosan_s01.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r8/8tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/8tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r7/7tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/7tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r6/6tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/6tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r5/5tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/5tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r4/4tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/4tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r3/3yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/3yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-r2/2yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/2yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-h31/31yosananngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/31yosananngaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-h30/30yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/30yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-h29/yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/kuse/yosanzaise/yosan/h29/documents/yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/koto-yosangaiyou-h28/28yosanan1.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/kuse/yosanzaise/yosan/h28/documents/28yosanan1.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。",
    "target": "file"
  },
  "/sources/shibuya-yosansho-r8/yosan08_yosansho08.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/c85b01cbe55648f3b5ca9e2a24f1acdc/yosan08_yosansho08.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。",
    "target": "file"
  },
  "/sources/shibuya-yosansho-r7/yosan07_yosansho07.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/adb12cdac1e243b08bf17586deb3b4e6/yosan07_yosansho07.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。",
    "target": "file"
  },
  "/sources/shibuya-yosansho-r6/yosan06_yosansho06.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/015bac93f649407c8b1b77e74679a5d0/yosan06_yosansho06.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。",
    "target": "file"
  },
  "/sources/shibuya-yosansho-r5/yosan05_yosansho05.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/e0b774174e384a5da3a056344280fea2/yosan05_yosansho05.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r8/8yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/041/034/8yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r7/r7yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/037/487/r7yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r6/r6yosangaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/034/308/r6yosangaiyo.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r5/r5_katsu_yosan2.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/030/965/r5_katsu_yosan2.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r4/r4yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/976/r4yosanngaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r3/reiwa3yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/473/reiwa3yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-r2/yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/022/573/yosanngaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-h31/31katsugaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/020/311/31katsugaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-h30/yosangaiyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/017/523/yosangaiyou2.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-h29/29angaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/013/830/29angaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/katsushika-yosangaiyou-h28/28yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/010/536/28yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r8/r8-yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r8yosangaiyou.files/r8-yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r7/r7gaiyouan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r7yosangaiyou.files/r7gaiyouan.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r6/r6yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r6yosangaiyou.files/r6yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r5/r5yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r5yosangaiyou.files/r5yosanngaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r4/r4yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r4yosangaiyou.files/r4yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r3/3yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/R3nendoyosangaiyou.files/3yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-r2/R2_yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r2_yosangaiyou.files/R2_yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h31/31yosangaiyou_s.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/31yosangaiyou.files/31yosangaiyou_s.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h30/h30yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/h30yosangaiyou.files/h30yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h29/h29_yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/h29yosangaiyou.files/h29_yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h28/28yosan-gaiyou..pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/28yosan-gaiyou.files/28yosan-gaiyou..pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h27/27yosann2.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/yosangaiyo.files/27yosann2.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h26/26gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/26yosangaiyou.files/26gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h25/25gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/ta104346037.files/25gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h24/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/ta10300020.files/gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h23/23yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/H23yosanngaiyou.files/23yosan-gaiyou.pdf.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h22/22yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/22yosangaiyou.files/22yosan-gaiyou.pdf.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h21/21yosan-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/21yosangaiyou.files/21yosan-gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h20/20yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/20yosangaiyo.files/20yosan-gaiyou.pdf.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h19/19yosan-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/19yosangaiyou.files/19yosan-gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h18/heisei18nendoyosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/heisei18nendoyosangaiyou.files/heisei18nendoyosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/sumida-yosangaiyou-h17/yosangaiyou_h17.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/h17_yosangaiyou.files/yosangaiyou_h17.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。",
    "target": "file"
  },
  "/sources/shinagawa-kanbetsu-r8/2026tousyoyosan_3.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/2026tousyoyosan_3.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    "target": "file"
  },
  "/sources/shinagawa-kanbetsu-r7/2025tousyoyosan_4.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/2025tousyoyosan_4.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    "target": "file"
  },
  "/sources/shinagawa-kanbetsu-r7/2025tousyoyosan_5.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/2025tousyoyosan_5.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    "target": "file"
  },
  "/sources/shinagawa-kanbetsu-r6/20240208145918_8.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20240208145918_8.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    "target": "file"
  },
  "/sources/shinagawa-kanbetsu-r5/20230208174032_9.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20230208174032_9.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    "target": "file"
  },
  "/sources/shinagawa-kanbetsu-r4/20220210190000_8.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20220210190000_8.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。",
    "target": "file"
  },
  "/sources/itabashi-yosan-gaiyou-r8/r8yosangaiyouhonpen.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/059/985/r8yosangaiyouhonpen.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/itabashi-yosan-gaiyou-r7/r7yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/054/671/r7yosannogaiyou.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/itabashi-yosan-gaiyou-r6/r6yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/049/183/r6yosannogaiyou.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/itabashi-yosan-gaiyou-r5/r5_yosannogaiyou_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/041/624/r5_yosannogaiyou_2.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r8/8yosansetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/43359/8yosansetumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r7/yosansetsumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/39324/yosansetsumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r6/r6_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/35959/r6_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r5/r5_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/30279/r5_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r4/r4_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/26185/r4_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r3/r3_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/21692/r3_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/arakawa-setsumei-r2/r2_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/27655/r2_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r8/08-03sainyukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/08-03sainyukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r8/08-04saishutsukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/08-04saishutsukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r7/07-03sainyukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/07-03sainyukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r7/07-04saishutsukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/07-04saishutsukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r6/06-03sainyukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/06-03sainyukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r6/06-04saishutsukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/06-04saishutsukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r5/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou05/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r5/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou05/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r4/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou04/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r4/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou04/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r3/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/3opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r3/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/3opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r2/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/2opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-r2/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/2opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-h31/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/31opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-h31/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/31opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-h30/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/30opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/tokyo-yosangaiyou-h30/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/30opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。",
    "target": "file"
  },
  "/sources/toshima-yosansho-r8/20260205141545.pdf": {
    "mode": "origin",
    "href": "https://www.city.toshima.lg.jp/documents/12068/20260205141545.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-r6/r6_toshimaku_yosannsho.pdf": {
    "mode": "origin",
    "href": "https://www.city.toshima.lg.jp/documents/12068/r6_toshimaku_yosannsho.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-r5/r5_toshimaku_yosannsho.pdf": {
    "mode": "origin",
    "href": "https://www.city.toshima.lg.jp/documents/12068/r5_toshimaku_yosannsho.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-r4/04toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202015242id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/04toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-r3/03toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211114090748id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/03toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-r2/02toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202031059id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/02toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-h31/31toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202021859id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/31toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-h30/30tousyoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202023230id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/30tousyoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/toshima-yosansho-h29/29yosansho.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202031608id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/29yosansho.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r8/r8_yosan_aramashi_link.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/74956/r8_yosan_aramashi_link.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r7/r7_yosan_aramashi_link.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/71328/r7_yosan_aramashi_link.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r6/1-r6aramashi.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/64031/1-r6aramashi.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r5/r5aramashi.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/60270/r5aramashi.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r4/r4yosanaramashi.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/55535/r4yosanaramashi.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r3/03aramashi_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/50963/03aramashi_1.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/adachi-yosansho-r2/02aramashi_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/46120/02aramashi_1.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-r8/r8toshoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/66965/r8toshoyosan.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-r7/r7tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/58935/r7tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-r6/r6tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/49549/r6tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-r5/r5tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/40224/r5tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-r4/r4tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/31190/r4tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-h31/h31tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/12531/h31tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-h29/29tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/262/29tousho.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-h28/28tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/260/28tousho.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yosansho-h27/27tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/259/27tousho.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yoko-r3/r3yoko.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/23048/r3yoko.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yoko-r2/r2yoko.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/17473/r2yoko.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/edogawa-yoko-h30/h30yoko_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/261/h30yoko_1.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-yosansho-r8/r8yosansho.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/22830/r8yosansho.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-yosansho-r7/r7yosansho.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/12499/r7yosansho.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-yosansho-r6/r6yosan0209.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7159/r6yosan0209.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-yosansho-r5/r5yosannsyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7158/r5yosannsyo.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-yosansho-r4/r04-tousyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7157/r04-tousyo.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-keikakusho-r3/4ippannkaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7156/4ippannkaikei.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/suginami-keikakusho-r2/r2kuseikeieikeikakusho.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7155/r2kuseikeieikeikakusho.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r8/r08_tosyoyosan_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/12708/r08_tosyoyosan_sokatsuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r7/r07_tosyoyosansoukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/10873/r07_tosyoyosansoukatsuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r6/202437164616.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/8579/202437164616.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r5/20233614280_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5568/20233614280_1.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r4/2022324164654.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5569/2022324164654.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r3/2021soukatuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5570/2021soukatuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-r2/2020soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5571/2020soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h31/310208_gian_31tousyo_shiryo1_soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5572/310208_gian_31tousyo_shiryo1_soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h30/300208_gian_tousyo_shiryo1_soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/49/300208_gian_tousyo_shiryo1_soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h29/29soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5573/29soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h28/28soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5574/28soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h27/26soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5575/26soukatsuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h26/26soukatsuhyo_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5576/26soukatsuhyo_1.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h24/24yosansoukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5578/24yosansoukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h23/23soukatuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5579/23soukatuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h22/22soukatsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5580/22soukatsu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h21/21sokatuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5581/21sokatuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h20/20soukatupdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5582/20soukatupdf.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h19/19soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5583/19soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h18/soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5584/soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h17/soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5585/soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/bunkyo-sokatsuhyo-h16/soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5586/soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r8/R08_2026gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R08_2026gaiyo.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r7/R7-2025gaiyousyuusei2.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R7-2025gaiyousyuusei2.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r6/R6-2024gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R6-2024gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r5/r5-2023gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/r5-2023gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r4/R4-2022gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R4-2022gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r3/R3-2021gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R3-2021gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/nakano-yosangaiyou-r2/R2-2020gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R2-2020gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r8/R8tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000075/75851/R8tousyogaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r7/01yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000065/65008/01yosangaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r6/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000053/53555/gaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r5/R5tousyoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000042/42016/R5tousyoyosan.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r4/R4tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000032/32749/R4tousho.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r3/R3gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000025/25283/R3gaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/okayama-yosangaiyou-r2/000400556.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000020/20277/000400556.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。",
    "target": "file"
  },
  "/sources/shizuoka-yosansho-r8/06_r8jikoubetumeisaisyo_ippankaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.shizuoka.lg.jp/documents/56762/06_r8jikoubetumeisaisyo_ippankaikei.pdf",
    "license": "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/shizuoka-yosansho-r7/01jikoubetumeisaisyoippannkaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.shizuoka.lg.jp/documents/53981/01jikoubetumeisaisyoippannkaikei.pdf",
    "license": "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/shizuoka-yosansho-r6/r6ippannkaikeiyosannsetsumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.shizuoka.lg.jp/documents/10691/r6ippannkaikeiyosannsetsumeisyo.pdf",
    "license": "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/yokohama-yosansho-r7/r7ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-yosansho-r6/r6ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-yosansho-r5/r5ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/yokohama-yosansho-r4/r4ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r7/04_R7_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R7_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r6/04_R6_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R6_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r5/04_R5_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R5_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r4/04_R4_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R4_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r3/04.R3keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R3keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r2/04.R2keisuushiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R2keisuushiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r7/25bunkatuban6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000173/173806/25bunkatuban6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r6/24bunkatuban6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000158/158395/24bunkatuban6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r5/23bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000147/147869/23bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r4/22bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000136/136966/22bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r3/21bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000125/125926/21bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r2/20bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000114/114574/20bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/yokohama-yosansho-r8/r8ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。",
    "target": "file"
  },
  "/sources/sapporo-yosansetsumeisho-r8/02_r8_yosansetsumeisho_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。",
    "target": "file"
  },
  "/sources/fukuoka-yosansho-r8/04_R8_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kawasaki-yosansho-r8/26bunkatuban6_antore.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r8/sainyu.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p144524_d/fil/sainyu.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r8/saisyutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p144524_d/fil/saisyutu.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r7/sanko-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p134434_d/fil/sanko-2.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r7/sanko-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p134434_d/fil/sanko-3.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r6/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p123980_d/fil/gaiyo.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r5/R5gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p125141_d/fil/R5gaiyo.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r4/R4gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p118949_d/fil/R4gaiyo.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r3/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p124347_d/fil/gaiyo.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r2/R2gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p124633_d/fil/R2gaiyou.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/funabashi-yosan-gaiyou-r1/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.funabashi.lg.jp/shisei/zaisei/001/p125198_d/fil/gaiyo.pdf",
    "license": "「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、船橋市の許可なく当ホームページに掲載している文書・画像等を無断で複製・転用することを禁止します。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r8/r8yosanangaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r7/documents/r8yosanangaiyo.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r7/r7yosangaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r7/documents/r7yosangaiyo.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r6/gaiyouannnasir61-8.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r4/documents/gaiyouannnasir61-8.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r5/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r4/documents/gaiyou.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r4/annnashisyuyoujigyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r4/documents/annnashisyuyoujigyou.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r3/r3pointannasi.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r3/documents/r3pointannasi.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-r2/2gaiyo-1_0-8.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/r2/documents/2gaiyo-1_0-8.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/kagoshima-yosangaiyo-h31/31-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kagoshima.lg.jp/kikakuzaisei/zaisei/zaisei/shise/yosan/jokyo/documents/31-gaiyou.pdf",
    "license": "本ウェブサイトにおいて提供している情報（文書や画像等の各ファイル及びその内容）の著作権は、原則として鹿児島市に帰属します。また、本ウェブサイト上で提供している情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r8/R8ippannkaikeiyosannsoukatuhyousainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000032/32701/R8ippannkaikeiyosannsoukatuhyousainyuu.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r8/R8ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000032/32701/R8ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r7/R7ippannkaikeiyosannsoukatuhyousainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000030/30034/R7ippannkaikeiyosannsoukatuhyousainyuu.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r7/R7ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000030/30034/R7ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r6/R6ippannkaikeiyosannsoukatuhyousainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000026/26326/R6ippannkaikeiyosannsoukatuhyousainyuu.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r6/R6ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000026/26326/R6ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r5/R5ippannkaikeiyosannsoukatuhyousainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000023/23499/R5ippannkaikeiyosannsoukatuhyousainyuu.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r5/R5ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000023/23499/R5ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r4/R4ippannkaikeiyosannsoukatuhyousainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000020/20103/R4ippannkaikeiyosannsoukatuhyousainyuu.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/himeji-yosan-soukatsu-r4/R4ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf": {
    "mode": "origin",
    "href": "https://www.city.himeji.lg.jp/shisei/cmsfiles/contents/0000020/20103/R4ippannkaikeiyosannsoukatuhyousaishutumokuteki.pdf",
    "license": "姫路市公式ウェブサイト(以下、当サイト)に掲載しているすべてのコンテンツ（文章・画像・イラストなど)は、権利者に無断で二次利用（複製・転載・転用・販売など）することを固く禁じます。",
    "target": "file"
  },
  "/sources/kawaguchi-yosan-gaiyou-r8/R8_yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawaguchi.lg.jp/material/files/group/9/R8_yosanngaiyou.pdf",
    "license": "川口市ホームページに掲載されている文章、写真、イラスト、画像等の著作権は、川口市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転載することはできません。「引用」を行う際は、必ず出典を明示してください。また、利用許諾については各ページの担当課へお問い合わせください。",
    "target": "file"
  },
  "/sources/matsudo-yosan-setsumeisho-r8/R8setsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/R8setsumeisho.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-r7/07_sankouhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/07_sankouhyou.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-r6/3_sankouhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/3_sankouhyou.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-r5/sankouhyou_R5.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_R5.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-r4/sankouhyou_R4.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_R4.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-r3/sankouhyou_R3.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_R3.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-r2/sankouhyou_R2.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_R2.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-h31/sankouhyou_H31.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_H31.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-h30/sankouhyou_H30.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_H30.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-h29/sankouhyou_H29.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_H29.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsudo-sankouhyou-h28/sankouhyou_H28.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsudo.chiba.jp/shisei/zai-yosan-kessan/yosan.files/sankouhyou_H28.pdf",
    "license": "これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断の転用・引用を禁止します。ただし、特段の定めがある場合は、この限りでありません。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r8/06_R8_ippan_mokutekibetu.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/R8tousyo.files/06_R8_ippan_mokutekibetu.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r7/06_R7_ippan_mokutekibetu.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/14591120250213.files/06_R7_ippan_mokutekibetu.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r6/06_R6_ippan_mokutekibetu.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/R06tousyo.files/06_R6_ippan_mokutekibetu.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r5/07_R5_ippan_soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/2023_tosho_yosan.files/07_R5_ippan_soukatsuhyo.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r4/07_R4_ippan_soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/2022_tosho_yosan.files/07_R4_ippan_soukatsuhyo.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r3/07_R3_ippan_soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/2021_tosho_yosan.files/07_R3_ippan_soukatsuhyo.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-r2/05_R2_ippan_soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/2020_tosho_yosan.files/05_R2_ippan_soukatsuhyo.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/matsuyama-yosan-soukatsu-h31/05_H31_ippan_soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.matsuyama.ehime.jp/shisei/zaisei/yosan/2019_tosho_yosan.files/05_H31_ippan_soukatsuhyo.pdf",
    "license": "本Webサイトに掲載されている文章、写真、イラスト、画像等の著作権は、原則として松山市に帰属し、国際条約・法律等によって保護されています。一部の画像等の著作権は、原著作者が所有しています。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。ただし、特段の定めがある場合は、この取り扱いに優先するものとします。",
    "target": "file"
  },
  "/sources/ichikawa-yosansho-r8/41372.pdf": {
    "mode": "origin",
    "href": "https://www.city.ichikawa.lg.jp/uploaded/attachment/41372.pdf",
    "license": "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/ichikawa-yosansho-r7/5288.pdf": {
    "mode": "origin",
    "href": "https://www.city.ichikawa.lg.jp/uploaded/attachment/5288.pdf",
    "license": "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/ichikawa-yosansho-r6/8731.pdf": {
    "mode": "origin",
    "href": "https://www.city.ichikawa.lg.jp/uploaded/attachment/8731.pdf",
    "license": "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/ichikawa-yosansho-r5/5364.pdf": {
    "mode": "origin",
    "href": "https://www.city.ichikawa.lg.jp/uploaded/attachment/5364.pdf",
    "license": "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/ichikawa-yosansho-r4/5331.pdf": {
    "mode": "origin",
    "href": "https://www.city.ichikawa.lg.jp/uploaded/attachment/5331.pdf",
    "license": "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/ichikawa-yosansho-r3/8783.pdf": {
    "mode": "origin",
    "href": "https://www.city.ichikawa.lg.jp/uploaded/attachment/8783.pdf",
    "license": "市公式Webサイトに掲載されている文章、写真、イラストなどの個々の情報は、著作権の対象となります。また、市公式Webサイト全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-r8/r8yosantaikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/r8yosantaikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-r7/r7yosantaikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/r7yosantaikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-r6/r6yosantaikou-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/r6yosantaikou-2.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-r5/r5yosantaikou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/r5yosantaikou2.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-r4/r4yosanntaikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/r4yosanntaikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-r2/r2taikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/r2taikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-h31/31taikou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/31taikou2.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-h30/30taikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/30taikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-h29/29yosantaikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/29yosantaikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/utsunomiya-yosan-taikou-h28/28toushoyosanannotaikou.pdf": {
    "mode": "origin",
    "href": "https://www.city.utsunomiya.lg.jp/_res/projects/default_project/_page_/001/010/664/28toushoyosanannotaikou.pdf",
    "license": "宇都宮市公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は宇都宮市に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r8/R8yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/R8yosan.files/R8yosannogaiyou.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r7/R7gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/R7yosanan.files/R7gaiyou.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r6/R6yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/R6yosan.files/R6yosannogaiyou.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r5/R5.toushoyosan_gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/20230203091643212.files/R5.toushoyosan_gaiyo.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r4/R4.toushohosei_gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/20220209144503509.files/R4.toushohosei_gaiyo.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r3/R3.toushoyosan_gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/R3yosannogaiyou.files/R3.toushoyosan_gaiyo.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r2/R2toushoyosannogaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/R2yosannogaiyou.files/R2toushoyosannogaiyo.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-r1/H31tousyoyosannogaiyo1900320.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/r1yosanannogaiyou.files/H31tousyoyosannogaiyo1900320.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-h30/H30yosannogaiyou1.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/H30yosannogaiyou.files/H30yosannogaiyou1.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nishinomiya-yosan-gaiyou-h29/H29yosannogaiyou1.pdf": {
    "mode": "origin",
    "href": "https://www.nishi.or.jp/shisei/zaiseijoho/yosan/h29yosangaiyo.files/H29yosannogaiyou1.pdf",
    "license": "「西宮市ホームページ」に掲載されている個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、「西宮市ホームページ」全体も編集著作物として著作権の対象となり、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r8/r8tousho-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/r8tousho-gaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r7/2r7tousho-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/2r7tousho-gaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r6/2tosyo-gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/2tosyo-gaiyo.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r5/r5tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/r5tousyogaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r4/r4tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/r4tousyogaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r3/r3gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/r3gaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-r2/r2gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/r2gaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-h31/31tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/31tousyogaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-h30/30toushogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/documents/30toushogaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/oita-shi-yosan-gaiyou-h29/29tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.oita.oita.jp/o032/shisejoho/kekakuzaise/documents/29tousyogaiyou.pdf",
    "license": "大分市ホームページ全体および大分市ホームページに掲載されている個々の情報（文章、写真、イラストなど）は、大分市または第三者が有する著作権により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で転載・複製・改変などはできません。",
    "target": "file"
  },
  "/sources/higashiosaka-yosansho-r8/R8yosan_T_I.pdf": {
    "mode": "origin",
    "href": "https://www.city.higashiosaka.lg.jp/0000000529.html",
    "license": "東大阪市ウェブサイトに掲載されているすべてのコンテンツ(文書、画像、イラストなど)の著作権は、東大阪市または原著作者に帰属します。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "page"
  },
  "/sources/higashiosaka-yosansho-r7/R7yosan_T_I.pdf": {
    "mode": "origin",
    "href": "https://www.city.higashiosaka.lg.jp/0000000529.html",
    "license": "東大阪市ウェブサイトに掲載されているすべてのコンテンツ(文書、画像、イラストなど)の著作権は、東大阪市または原著作者に帰属します。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "page"
  },
  "/sources/amagasaki-yosan-gaiyou-r8/R8tousyoyosannnogaiyou-suuchihenn.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/042/785/R8tousyoyosannnogaiyou-suuchihenn.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-r7/R7gaiyousuchi.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/040/305/R7gaiyousuchi.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-r6/R6yosannogaiyou02.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/036/379/R6yosannogaiyou02.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-r5/R5suuchihen.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/033/321/R5suuchihen.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-r4/suutihenn.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/028/205/suutihenn.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-r3/R3touyoyosan_suuti.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/024/209/R3touyoyosan_suuti.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-r2/2-1yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/020/112/2-1yosannogaiyou.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h31/201902151054.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/015/606/201902151054.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h30/30.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/009/184/30.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h29/yosannnogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/008/210/yosannnogaiyou.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h28/h28toushoyosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/008/212/h28toushoyosannogaiyou.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h27/h27toushoyosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/008/214/h27toushoyosannogaiyou.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h26/h26toushoyosannnogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/008/216/h26toushoyosannnogaiyou.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/amagasaki-yosan-gaiyou-h25/yosannnogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.amagasaki.hyogo.jp/_res/projects/default_project/_page_/001/008/218/yosannnogaiyou.pdf",
    "license": "尼崎市公式ホームページに掲載している情報（文章、写真、イラスト等。トップページ上部にあるヘッダーロゴも含む）の著作権は尼崎市に帰属します。また、一部の画像などの著作権は原著作者が所有しています。これらを無断で複製・転用することは「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、禁止されています。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r8/400655_2463920_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/400655_2463920_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r7/393859_2419579_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/393859_2419579_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r6/360984_2171418_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/360984_2171418_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r5/324957_1908110_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/324957_1908110_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r4/289395_1651660_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/289395_1651660_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r3/347577_2070797_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/347577_2070797_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r2/223768_1120938_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/223768_1120938_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-r1/347574_2070688_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/347574_2070688_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/fukuyama-yosan-sankou-h30/347578_2070867_misc.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuyama.hiroshima.jp/uploaded/life/347578_2070867_misc.pdf",
    "license": "福山市ホームページに掲載されている情報は、著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/kurashiki-yosan-gaiyo-r8/r8gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/021/840/r8gaiyo.pdf",
    "license": "本サイト上のコンテンツは、倉敷市およびその他団体ならびに第三者が有する著作権により保護されております。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用等を希望される方は、各ページに記載されている担当所属へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kurashiki-yosan-gaiyo-r6/r6gaiyo2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/002/297/r6gaiyo2.pdf",
    "license": "本サイト上のコンテンツは、倉敷市およびその他団体ならびに第三者が有する著作権により保護されております。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用等を希望される方は、各ページに記載されている担当所属へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kurashiki-yosan-gaiyo-r5/r5gaiyo2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/011/591/r5gaiyo2.pdf",
    "license": "本サイト上のコンテンツは、倉敷市およびその他団体ならびに第三者が有する著作権により保護されております。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用等を希望される方は、各ページに記載されている担当所属へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kurashiki-yosan-gaiyo-r4/r4gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/011/592/r4gaiyo.pdf",
    "license": "本サイト上のコンテンツは、倉敷市およびその他団体ならびに第三者が有する著作権により保護されております。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用等を希望される方は、各ページに記載されている担当所属へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/kurashiki-yosan-gaiyo-r3/r3gaiyo1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kurashiki.okayama.jp/_res/projects/default_project/_page_/001/011/594/r3gaiyo1.pdf",
    "license": "本サイト上のコンテンツは、倉敷市およびその他団体ならびに第三者が有する著作権により保護されております。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用等を希望される方は、各ページに記載されている担当所属へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r8/R08_01gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r8/2026yosanhensei.files/R08_01gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r7/R07_01gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r7/2025yosanhensei.files/R07_01gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r6/R06_01gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r_6/2024yosannhensei.files/R06_01gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r5/R05_01gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r5/2023yosannhensei.files/R05_01gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r4/R04_01gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r4/2022yosannhensei.files/R04_01gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r3/R3_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r3/2021yosannhensei.files/R3_gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-r2/R2_gaiyou_.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/r2/zaisei_up20191004.files/R2_gaiyou_.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h31/02_2019tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/2019/2019yosanhensei.files/02_2019tousyogaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h30/h30toushogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h30/yosanhensei_h30.files/h30toushogaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h29/29gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h29/yosanhensei_h29.files/29gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h28/28gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h28/yosanhensei_28.files/28gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h27/24081_L21_27gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h27/yosanhensei_27.files/24081_L21_27gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h26/26gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h26/yosanhensei_26.files/26gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h25/25gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h25/yosanhensei_25.files/25gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h24/24toushoyosannnogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h24/yosanhensei_24.files/24toushoyosannnogaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h23/17278_L17_17278_h23_yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h23/yosanhensei_23.files/17278_L17_17278_h23_yosan_gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h22/13058_L17_13058_h22_yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h22/yosanhensei_22.files/13058_L17_13058_h22_yosan_gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/takamatsu-yosan-gaiyou-h21/11406_L17_11406_h21_yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.takamatsu.kagawa.jp/kurashi/shinotorikumi/zaisei/katei/h21/yosanhensei_21.files/11406_L17_11406_h21_yosan_gaiyou.pdf",
    "license": "高松市公式ホームページ「もっと高松」に掲載されている文章、写真、イラスト、画像等の著作権は、高松市又はコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r8/r8_yosansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/34730/r8_yosansyo.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r7/r7_yosansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/32609/r7_yosansyo.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r6/r6_yosansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/30625/r6_yosansyo.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r5/r5_yosansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/28756/r5_yosansyo.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r4/r4yosansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/26734/r4yosansyo.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r3/r3yosannsyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/24661/r3yosannsyo.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/fujisawa-yosansho-r2/yosann.pdf": {
    "mode": "origin",
    "href": "https://www.city.fujisawa.kanagawa.jp/documents/22950/yosann.pdf",
    "license": "「私的使用のための複製」や「引用」など著作権法上認められる場合を除き、藤沢市の許可なく当サイトに掲載されている文書・画像等を無断使用・複製・転載・販売・改変・印刷配布することを禁止します。",
    "target": "file"
  },
  "/sources/kashiwa-yosan-setsumeisho-r8/r8yosansetumei.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/r8-yosan.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/kashiwa-yosan-setsumeisho-r7/r7yosannsetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/r7-yosan.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/kashiwa-yosan-setsumeisho-r6/r6yosannsetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/r6-yosan.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/kashiwa-yosan-setsumeisho-r5/r5yosannsetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/r5-yosan.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/kashiwa-yosan-setsumeisho-r4/r4toushoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/20211029.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/kashiwa-yosan-setsumeisho-r3/r3setumei_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/r3-yosan.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/kashiwa-yosan-setsumeisho-r2/reiwa2nenndokashiwashiippannkaikeitokubetukaikeiyosannnikannsurusetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kashiwa.lg.jp/zaisei/policy_pr/budget/budget2/r2-yosan.html",
    "license": "柏市オフィシャルウェブサイトに掲載されている情報（文字、写真、イラストなど）は著作権の対象です。著作権法上認められた「私的使用のための複製」や「引用」などの場合を除き、無断で複製、転用等をすることはできません。",
    "target": "page"
  },
  "/sources/machida-yosansho-r8/R8_yosansyo_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.machida.tokyo.jp/shisei/gyouzaisei/siyosan/tousyo_26/2026yosansyo.files/R8_yosansyo_2.pdf",
    "license": "本サイトに記載された文章・画像に関する権利は町田市に帰属しています。無断で転載することを禁じます。もし、これらの文書等について転用等を希望される場合は、その旨掲載されているページの担当課へご連絡下さい。",
    "target": "file"
  },
  "/sources/kanazawa-yosangaiyou-r5/R5zentai.pdf": {
    "mode": "origin",
    "href": "https://www4.city.kanazawa.lg.jp/material/files/group/16/R5zentai.pdf",
    "license": "私的使用のための複製や引用など著作権法上認められた場合を除き、金沢市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    "target": "file"
  },
  "/sources/kanazawa-yosangaiyou-r4/R4zentai_040331.pdf": {
    "mode": "origin",
    "href": "https://www4.city.kanazawa.lg.jp/material/files/group/16/R4zentai_040331.pdf",
    "license": "私的使用のための複製や引用など著作権法上認められた場合を除き、金沢市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    "target": "file"
  },
  "/sources/gifu-yosan-setsumeisho-r8/r8yosannsetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/035/841/r8yosannsetumeisyo.pdf",
    "license": "岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、著作権法により保護されており、原則として著作権は、岐阜市に帰属します。岐阜市公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。また、一部の画像等の著作権については、原著作者が所有しています。私的使用のための複製や引用など著作権法上認められた場合を除き、岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    "target": "file"
  },
  "/sources/gifu-yosan-setsumeisho-r7/r7yosannsetumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/029/017/r7yosannsetumeisho.pdf",
    "license": "岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、著作権法により保護されており、原則として著作権は、岐阜市に帰属します。岐阜市公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。また、一部の画像等の著作権については、原著作者が所有しています。私的使用のための複製や引用など著作権法上認められた場合を除き、岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    "target": "file"
  },
  "/sources/gifu-yosan-setsumeisho-r6/r6yosansetumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.gifu.lg.jp/_res/projects/default_project/_page_/001/023/302/r6yosansetumeisho.pdf",
    "license": "岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、著作権法により保護されており、原則として著作権は、岐阜市に帰属します。岐阜市公式ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。また、一部の画像等の著作権については、原著作者が所有しています。私的使用のための複製や引用など著作権法上認められた場合を除き、岐阜市公式ホームページに掲載されている写真、イラスト、音声、動画、記事等は、無断で複製・転用することはできません。使用許諾は、必ずそれぞれのページを所管する担当課にご確認ください（担当課は、それぞれのページ下部に記載してあります）。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r8/04____4_________.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/8/7/2/0/7/6/_/04____4_________.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r7/832555.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/8/3/2/5/5/5/_/832555.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r6/785174.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/7/8/5/1/7/4/_/785174.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r5/747252.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/7/4/7/2/5/2/_/747252.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r4/675955.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/6/7/5/9/5/5/_/675955.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r3/514224.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/5/1/4/2/2/4/_/514224.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/miyazaki-shi-yosan-gaiyou-r2/368981.pdf": {
    "mode": "origin",
    "href": "https://www.city.miyazaki.miyazaki.jp/fs/3/6/8/9/8/1/_/368981.pdf",
    "license": "宮崎市ホームページに掲載しているすべてのコンテンツは、特別の断りがない限り原則として宮崎市が保有します。私的使用のための複製など著作権法上で認められている場合を除き、権利者の許可なく複製・転用することを固く禁じます。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r8/r8giansankou.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/r8yosan.files/r8giansankou.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r7/r7giansankousiryou_0221.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/reiwa7.files/r7giansankousiryou_0221.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r6/r6giansankousiryou_0226.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/reiwa6yosan.files/r6giansankousiryou_0226.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r5/r5giansankoutousyoyosan_0224.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/reiwa5yosan.files/r5giansankoutousyoyosan_0224.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r4/r4giansankou.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/reiwa4yosan.files/r4giansankou.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r3/giansankou01_0217.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/shigikai_anken/r3/r3sangatuteireikai.files/giansankou01_0217.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-r1/310225kanbetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/reiwa1yosan.files/310225kanbetsu.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/toyonaka-kanbetsu-h30/300226kanbetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.toyonaka.osaka.jp/joho/zaisei/yosan/heisei30yosan.files/300226kanbetsu.pdf",
    "license": "豊中市ホームページに掲載されている文章、写真、イラストなど個々の情報は、著作権の対象です。また、本市サイト全体も編集著作権として、著作権の対象になります。「私的使用のための複製」や「引用」など、著作権法上認められた場合を除き、無断で複製、転用することはできません。",
    "target": "file"
  },
  "/sources/okazaki-yosan-gaiyou-r8/01-01.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1014207.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-r7/0-1_.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006072.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-r6/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006074.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-r5/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006076.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-r4/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006078.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-r3/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006080.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-r2/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006082.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-h31/01-01.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006084.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-h30/01-01.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006086.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-h29/01.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006088.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/okazaki-yosan-gaiyou-h28/01.pdf": {
    "mode": "origin",
    "href": "https://www.city.okazaki.lg.jp/shisei/yosan/1006068/1006090.html",
    "license": "岡崎市ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡崎市または原著作者に帰属します。著作権法上認められた場合を除き、無断で複製・引用することはできません。掲載されている内容を二次利用する場合には、各ページ内に記載された担当課へ、事前にご相談ください。",
    "target": "page"
  },
  "/sources/nagasaki-shi-yosansho-r8/56051.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagasaki.lg.jp/uploaded/attachment/56051.pdf",
    "license": "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/nagasaki-shi-yosansho-r7/42798.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagasaki.lg.jp/uploaded/attachment/42798.pdf",
    "license": "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/nagasaki-shi-yosansho-r5/23851.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagasaki.lg.jp/uploaded/attachment/23851.pdf",
    "license": "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/nagasaki-shi-yosansho-r2/16522.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagasaki.lg.jp/uploaded/attachment/16522.pdf",
    "license": "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/nagasaki-shi-yosansho-h30/12831.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagasaki.lg.jp/uploaded/attachment/12831.pdf",
    "license": "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/nagasaki-shi-yosansho-h29/11548.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagasaki.lg.jp/uploaded/attachment/11548.pdf",
    "license": "長崎市ウェブサイトに掲載されている文章、画像等の著作権は長崎市またはコンテンツ提供者に帰属します。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については、各ウェブページに記載されている課等へお問い合わせください。",
    "target": "file"
  },
  "/sources/hirakata-yosan-gaiyou-r8/20260224_02_yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.hirakata.osaka.jp/0000045365.html",
    "license": "本サイトに掲載されている個々の情報（文章、写真、イラスト等）は、私的使用のための複製や引用等の著作権上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/hirakata-yosan-gaiyou-r7/02_R07yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.hirakata.osaka.jp/0000053646.html",
    "license": "本サイトに掲載されている個々の情報（文章、写真、イラスト等）は、私的使用のための複製や引用等の著作権上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/hirakata-yosan-gaiyou-r5/toushoyosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.hirakata.osaka.jp/0000053637.html",
    "license": "本サイトに掲載されている個々の情報（文章、写真、イラスト等）は、私的使用のための複製や引用等の著作権上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "page"
  },
  "/sources/yokosuka-yosan-gaiyou-r8/r8yosan-gaiyo_yokosuka.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/shisei/unei/zaisei/documents/r8yosan-gaiyo_yokosuka.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-r7/07kannmatushiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/shisei/unei/zaisei/documents/07kannmatushiryou.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-r6/07_kanmatusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/documents/07_kanmatusiryou.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-r5/07kanmatusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/documents/07kanmatusiryou.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-r4/04-2zennenhikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/documents/04-2zennenhikaku.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-r3/03-2zennenhikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/documents/03-2zennenhikaku.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-r2/02-2zennenhikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/documents/02-2zennenhikaku.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/yokosuka-yosan-gaiyou-h31/31-2zennenhikaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokosuka.kanagawa.jp/1610/finas/yosan/documents/31-2zennenhikaku.pdf",
    "license": "当サイトに掲載されている文字、写真、イラストやデザインといった情報の著作権は、私たちまたは原権利者に帰属します。私的使用または引用等著作権法上認められている行為を除き、無断で転載等を行うことはできません。引用を行う際は、適宜の方法により、必ず出所を明示してください。また、当サイトの内容の全部または一部について、私たちに無断で改変を行うことはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r8/05_R8ippankaikeiyosangaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/041/852/05_R8ippankaikeiyosangaku.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r7/05_R7ippankaikeiyosangaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/037/994/05_R7ippankaikeiyosangaku.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r6/R6_ippankaikeiyosangaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/032/448/R6_ippankaikeiyosangaku.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r5/ippannyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/026/012/ippannyosan.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r4/12232515347.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/372/12232515347.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r3/121916113254.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/369/121916113254.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-r2/12192414539.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/365/12192414539.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-h31/121924134314.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/383/121924134314.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-h30/12193011857.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/379/12193011857.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-h29/121924125046.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/375/121924125046.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/suita-yosangaku-h28/121924113447.pdf": {
    "mode": "origin",
    "href": "https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/008/374/121924113447.pdf",
    "license": "吹田市公式ウェブサイト内に掲載している文章、画像等に関する諸権利は、原則として吹田市または原著作者に帰属します。これらの情報について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r8/r8yosannsetumeisyoippannkaikeitou.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/r8yosannsetumeisyoippannkaikeitou.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r7/ippannkaikeiyosannsetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/ippannkaikeiyosannsetumeisyo.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r6/ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/ippan.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r5/yosannsetumeisyoippann.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/yosannsetumeisyoippann.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r4/742573_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/742573_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r3/358472_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/358472_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r2/340608_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/340608_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-r1/322165_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/322165_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-h30/306634_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/306634_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-h28/100995_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/100995_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-h27/81423_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/81423_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-h26/63554_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/63554_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-setsumeisho-h25/47890_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/47890_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/nagano-shi-yosan-gaiyou-h29/118006_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.nagano.nagano.jp/documents/1170/118006_1.pdf",
    "license": "長野市ホームページ（以下、当ホームページ）に掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として長野市に帰属します。また、一部の画像等の著作権は、長野市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内に記載されたホームページ担当課へ、事前にご相談ください。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-r8/37728.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/37728.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-r7/26854.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/26854.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-r6/15966.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/15966.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-r5/6478.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6478.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-r3/6472.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6472.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-r2/6469.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6469.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h30/6463.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6463.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h29/6460.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6460.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h26/6451.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6451.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h25/6448.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6448.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h23/6429.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6429.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h22/6414.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6414.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  },
  "/sources/takasaki-yosan-gaiyou-h21/6399.pdf": {
    "mode": "origin",
    "href": "https://www.city.takasaki.gunma.jp/uploaded/attachment/6399.pdf",
    "license": "本サイトに掲載している文書や画像等の各ファイル及びその内容に関する著作権は、原則として高崎市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。本サイトに掲載している文書・画像等の無断使用・転載を禁止します。",
    "target": "file"
  }
};
