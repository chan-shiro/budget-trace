// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive
// 発行元が二次利用を許諾していない一次資料（/coverage の「要許可」）の
// 自サーバー配信コピー → 発行元（消えている資料は魚拓）のディープリンク。
// 画面はこのキーに載っている資料だけ、ドロワーではなく外部リンクで開く。

export interface RestrictedEvidenceLink {
  /** origin = 発行元へ直リンク / archive = 発行元から消えており魚拓にしかない */
  mode: "origin" | "archive";
  href: string;
  /** 発行元が示している利用条件の原文（なぜ外部リンクなのかの根拠） */
  license: string;
}

/** キー: 自サーバー配信コピーのパス（/sources/<sourceId>/<filename>。フラグメント無し） */
export const RESTRICTED_EVIDENCE: Record<string, RestrictedEvidenceLink> = {
  "/sources/numazu-yosansho-r7/s-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
    "license": "沼津市ウェブサイト掲載資料（非営利・二次利用要許可。利用条件は同サイト参照）"
  },
  "/sources/minami-alps-yosansho-r8/__8____________.pdf": {
    "mode": "origin",
    "href": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
    "license": "南アルプス市ウェブサイト掲載資料（二次利用は要許可。利用条件は同サイト参照）"
  },
  "/sources/fujikawaguchiko-yosansho-r8/R8yosan ga.pdf": {
    "mode": "origin",
    "href": "https://www.town.fujikawaguchiko.lg.jp/upload/file/soumu/zaisei/yosan/R8yosan%20ga.pdf",
    "license": "富士河口湖町公式ホームページに掲載している個々の情報（文章，写真，イラストなど）は，著作権の対象となっています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/sapporo-yosansetsumeisho-r7/02_r7_yosansetsumeisho_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r7/documents/02_r7_yosansetsumeisho_ippan.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-yosansetsumeisho-r6/r6_yosansetsumeisyoippann.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r6/documents/r6_yosansetsumeisyoippann.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-yosansetsumeisho-r5/r5kakukaikeiyosansetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r5/documents/r5kakukaikeiyosansetumeisyo.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-yosansetsumeisho-r4/r4_yosansetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r4/documents/r4_yosansetsumeisho.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-yosansetsumeisho-r3/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r3/documents/r3yosan_kakukaikeiyosansetsumeisyo_ippantokubetsu.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-yosansetsumeisho-r2/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r2/documents/reiwa2nenndoyosannsetsumeisyoippankaikeitokubetukaikei.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/gaiyou.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-4.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-5.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-5.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/1-6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/1-6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/2-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/2-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/2-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/2-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/3-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/3-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/3-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/3-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-3.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-3.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-4.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-5.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-5.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-8.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-8.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/4-9.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/4-9.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/5-1.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/5-1.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-jigyou-hyouka-r6/5-2.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/170/cmsfiles/contents/0000178/178614/5-2.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/yokohama-jigyo-hyoka-r7/0236_20240903.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/0236_20240903.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/01_R7datsutanso.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/01_R7datsutanso.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/02_R7digital.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/02_R7digital.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/03_R7seisaku_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/03_R7seisaku_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/04_R7soumu.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/04_R7soumu.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/05_R7zaisei_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/05_R7zaisei_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/06_R7kokusai_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/06_R7kokusai_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/07_R7shimin.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/07_R7shimin.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/08_R7nigiwai.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/08_R7nigiwai.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/09_R7keizai_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/09_R7keizai_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/10_R7kodomo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/10_R7kodomo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/11_R7kenkoufukushi.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/11_R7kenkoufukushi.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/12_R7iryo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/12_R7iryo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/13_R7midorikankyo_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/13_R7midorikankyo_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/14_R7gesui.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/14_R7gesui.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/15_R7shigen.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/15_R7shigen.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/16_R7kentiku.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/16_R7kentiku.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/17_R7toshiseibi.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/17_R7toshiseibi.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/18_R7douro.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/18_R7douro.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/19_R7kouwan_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/19_R7kouwan_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/20_R7syoubou.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/20_R7syoubou.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/21_R7kaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/21_R7kaikei.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/22_R7kyouiku_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/22_R7kyouiku_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/23_R7senkyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/23_R7senkyo.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/24_R7jinji.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/24_R7jinji.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/25_R7kansa.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/25_R7kansa.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/26_R7gikai.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/26_R7gikai.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/01_R7tsurumi_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/01_R7tsurumi_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/02_R7kanagawa.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/02_R7kanagawa.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/03_R7nishi_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/03_R7nishi_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/04_R7naka_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/04_R7naka_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/05_R7minami_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/05_R7minami_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/06_R7konan_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/06_R7konan_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/07_R7hodogaya.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/07_R7hodogaya.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/08_R7asahi_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/08_R7asahi_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/09_R7isogo_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/09_R7isogo_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/10_R7kanazawa_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/10_R7kanazawa_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/11_R7kohoku_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/11_R7kohoku_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/12_R7midori.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/12_R7midori.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/13_R7aoba.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/13_R7aoba.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/14_R7tuzuki.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/14_R7tuzuki.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/15_R7totsuka.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/15_R7totsuka.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/16_R7sakae_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/16_R7sakae_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/17_R7izumi.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/17_R7izumi.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-jigyo-hyoka-r7/18_R7seya_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/gyosei-kansa/innovation/jigyohyoka/r07/reiwa06jigyo.files/18_R7seya_2.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/osaka-yosansho-r8/2026gian60.pdf": {
    "mode": "origin",
    "href": "https://www.city.osaka.lg.jp/contents/wdu260/result/pdf/2026gian60.pdf",
    "license": "ライセンス表示のない画像ファイルや添付ファイルは著作権の対象となっているため、無断での使用や転載を禁じます。私的使用のための複製や、引用など著作権法上認められた場合を除き、上記著作権の対象に該当するコンテンツを複製・転用する際は、必ず事前にそれぞれのコンテンツを所管する各担当にご相談ください。"
  },
  "/sources/saitama-yosansho-r8/reiwa8nendotousyoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.saitama.lg.jp/006/007/011/001/021/p129189_d/fil/reiwa8nendotousyoyosan.pdf",
    "license": "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）"
  },
  "/sources/saitama-yosansho-r7/reiwa7nendotousyoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.saitama.lg.jp/006/007/011/001/020/p119990_d/fil/reiwa7nendotousyoyosan.pdf",
    "license": "市WEBサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則としてさいたま市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。市WEBサイト上の文書・画像等の無断使用・転載を禁止します。（さいたま市の各局ホームページ等に利用規約等の特段の定めがある場合は、この取り扱いに優先するものとします。）"
  },
  "/sources/hiroshima-yosansho-r8/2610.pdf": {
    "mode": "origin",
    "href": "https://www.city.hiroshima.lg.jp/_res/projects/default_project/_page_/001/047/851/2610.pdf",
    "license": "広島市ホームページ上の文書や画像等の各ファイル及びその内容に関する諸権利は、原則として広島市に帰属します（一部の画像等の著作権は、原著作者が所有しています。）。「私的使用による複製」や「引用」など著作権法上認められる場合を除き、広島市ホームページ上に掲載されている文書や画像等を、無断で使用・複製・転載・販売・改変・印刷配布することはできません。使用等を希望される方は、各ページに記載されている担当課へ、事前に、ご相談ください。なお、広島市の各局や各課が配信するページ等に利用規約等、特別な規定がある場合は、この取り扱いに優先するものとします。"
  },
  "/sources/kyoto-yosansho-r8/01_ippantousyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000347/347934/01_ippantousyo.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kyoto-yosansho-r7/01_tousyoippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000335/335933/01_tousyoippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kyoto-yosansho-r6/01_tousyoippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000323/323068/01_tousyoippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kyoto-yosansho-r5/04-1_ippann_jikoubetu.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000304/304545/04-1_ippann_jikoubetu.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kyoto-yosansho-r4/01_ippannjikoubetuR4.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000290/290208/01_ippannjikoubetuR4.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kyoto-yosansho-r3/ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000293/293622/ippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kyoto-yosansho-r2/01ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.kyoto.lg.jp/gyozai/cmsfiles/contents/0000259/259833/01ippan.pdf",
    "license": "京都市のホームページ「京都市情報館」に掲載している内容（文章、写真、イラストなど）に関する著作権は、原則として京都市に帰属します。また、一部の画像等の著作権は、京都市以外の原著作者が所有しています。当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kitakyushu-yosansho-r8/001192254.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001192254.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/kitakyushu-yosansho-r7/001129574.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001129574.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/kitakyushu-yosansho-r6/001074934.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001074934.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/kitakyushu-yosansho-r5/001034900.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001034900.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/kitakyushu-yosansho-r4/000966725.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/000966725.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/kitakyushu-yosansho-r3/000917954.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/000917954.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/kitakyushu-yosansho-r2/000840516.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/000840516.pdf",
    "license": "北九州市ホームページに掲載している内容（文章、写真、図、イラスト、音声・動画等）に関する著作権は、原則として北九州市に帰属します。また、一部の画像等の著作権は、北九州市以外の原著作者が所有しています。北九州市ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。使用許諾は、各ページ内にあります「このページの作成者」に記載されています部署へ、事前にご相談ください。"
  },
  "/sources/chiba-yosansho-r8/r8yosansho_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/documents/r8yosansho_ippan.pdf",
    "license": "千葉市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として千葉市に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。千葉市ホームページは利用目的を問わず自由に閲覧していただくことが可能ですが、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、千葉市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。"
  },
  "/sources/chiba-yosansho-r4/r4ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.chiba.jp/zaiseikyoku/zaisei/zaisei/documents/r4ippan.pdf",
    "license": "千葉市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として千葉市に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。千葉市ホームページは利用目的を問わず自由に閲覧していただくことが可能ですが、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、千葉市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。"
  },
  "/sources/sendai-yosansho-r8/1_r8tousho_mokuji.pdf": {
    "mode": "origin",
    "href": "https://www.city.sendai.jp/yosandaichi/shise/zaise/zaimu/zaise/sendaishi/yosan/r8terekai/r8-1/index/index/documents/1_r8tousho_mokuji.pdf",
    "license": "仙台市ホームページに掲載している個々の情報（文章、写真、イラストなど）は、著作権の対象となっています。また、仙台市ホームページ全体も編集著作物として著作権の対象となっており、ともに著作権法により保護されています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。ただし、仙台市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。"
  },
  "/sources/sakai-yosansho-r8/R8-2yosannannsetsumeisiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/R8-1giannsyo.files/R8-2yosannannsetsumeisiryou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/sakai-yosansho-r7/R7-1_yosannnannsetumei.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/giannsyo_R7-1.files/R7-1_yosannnannsetumei.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/sakai-yosansho-r6/R6-1yosannannsetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/75920720240209111619595.files/R6-1yosannannsetumeisyo.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/sakai-yosansho-r3/0301-yosannan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0301gian.files/0301-yosannan.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/sakai-yosansho-r2/0201yosanansetumeishiryo.pdf": {
    "mode": "origin",
    "href": "https://www.city.sakai.lg.jp/shigikai/kaigi/giansyo/0207giansho.files/0201yosanansetumeishiryo.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として堺市に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。本サイト上の文書・画像等について、私的利用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/niigata-yosansho-r8/R8-2yosansyo_shinen-ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.files/R8-2yosansyo_shinen-ippan.pdf",
    "license": "市公式ホームページに掲載している文書、画像等のファイルやその内容（以下「内容等」という）については、原則として新潟市に帰属します。ただし、一部の内容等の著作権は、原著作者が所有しています。市公式ホームページ内の内容等については、著作権法上認められた「私的使用のための複製」や「引用」等の場合を除き、新潟市及び内容等の提供者に無断で転載、複製、改変、販売、貸与等の利用をすることはできません。ただし、新潟市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。"
  },
  "/sources/niigata-yosansho-r7/r7-2yosansyo-ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.niigata.lg.jp/shisei/zaimu/zaisei/yosankessan/yosankessanjokyo.files/r7-2yosansyo-ippan.pdf",
    "license": "市公式ホームページに掲載している文書、画像等のファイルやその内容（以下「内容等」という）については、原則として新潟市に帰属します。ただし、一部の内容等の著作権は、原著作者が所有しています。市公式ホームページ内の内容等については、著作権法上認められた「私的使用のための複製」や「引用」等の場合を除き、新潟市及び内容等の提供者に無断で転載、複製、改変、販売、貸与等の利用をすることはできません。ただし、新潟市ホームページ内の各ページに特段の定めがある場合には、その取り扱いが優先されます。"
  },
  "/sources/hamamatsu-yosansho-r8/22_setumeisho08.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/171794/22_setumeisho08.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/hamamatsu-yosansho-r7/l_yosansetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/164874/l_yosansetsumeisho.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/hamamatsu-yosansho-r6/l-setumeishoippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/157760/l-setumeishoippan.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/hamamatsu-yosansho-r5/yosansetumeisyo_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/148959/yosansetumeisyo_ippan.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/hamamatsu-yosansho-r4/r4_yosansetumeisyo_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/133296/r4_yosansetumeisyo_ippan.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/sagamihara-yosansho-r8/20260216_shuyou_setumei.pdf": {
    "mode": "origin",
    "href": "https://www.city.sagamihara.kanagawa.jp/_res/projects/default_project/_page_/001/003/978/r08nend/20260216_shuyou_setumei.pdf",
    "license": "相模原市のホームページに掲載されている文書や画像等の各ファイル、及びその内容に関する権利は、原則として相模原市に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、許可なく無断で複製や転用することはできません。"
  },
  "/sources/ota-yosansho-r8/02r8_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r08yosan/r08-yosan.files/02r8_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-r7/02r7_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r07yosan/r07-yosan.files/02r7_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-r6/02r6_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r06yosan/r06-yosan.files/02r6_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-r5/02r5_kihontekikangae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r05yosan/r05-yosan.files/02r5_kihontekikangae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-r4/02kihontekikanngae.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r04yosan/r04-yosann.files/02kihontekikanngae.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-r3/03.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r03yosan/r03-yosann.files/03.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-r2/3.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/r02yosan/r02-yosanann.files/3.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/chuo-sokatsuhyo-r8/r8_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/17921/r8_sokatsuhyo.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-r7/r7_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/16917/r7_sokatsuhyo.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-r6/r6_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/15419/r6_sokatsuhyo.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-r5/r5soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/13525/r5soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-r4/r4soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2801/r4soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-r3/r3tousyo_soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2791/r3tousyo_soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-r2/r2tousyo_soukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2786/r2tousyo_soukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/meguro-yosanan-r8/r08_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/19579/r08_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/meguro-yosanan-r7/r07_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/17203/r07_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/meguro-yosanan-r6/r06_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/14537/r06_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/meguro-yosanan-r5/r05_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2254/r05_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/meguro-yosanan-r4/r04_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2259/r04_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/meguro-yosanan-r3/r03_yosan_siryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2258/r03_yosan_siryou.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/meguro-yosanan-r2/r02yosan_s01.pdf": {
    "mode": "origin",
    "href": "https://www.city.meguro.tokyo.jp/documents/2257/r02yosan_s01.pdf",
    "license": "目黒区公式ウェブサイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として目黒区に帰属します。なお、一部の画像等の著作権は、原著作者が所有しています。／目黒区公式ウェブサイト上の文書・画像等の無断使用・転載を禁止します。"
  },
  "/sources/koto-yosangaiyou-r8/8tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/8tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-r7/7tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/7tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-r6/6tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/6tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-r5/5tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/5tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-r4/4tousyoyosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/4tousyoyosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-r3/3yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/3yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-r2/2yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/2yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/shibuya-yosansho-r8/yosan08_yosansho08.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/c85b01cbe55648f3b5ca9e2a24f1acdc/yosan08_yosansho08.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。"
  },
  "/sources/shibuya-yosansho-r7/yosan07_yosansho07.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/adb12cdac1e243b08bf17586deb3b4e6/yosan07_yosansho07.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。"
  },
  "/sources/shibuya-yosansho-r6/yosan06_yosansho06.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/015bac93f649407c8b1b77e74679a5d0/yosan06_yosansho06.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。"
  },
  "/sources/shibuya-yosansho-r5/yosan05_yosansho05.pdf": {
    "mode": "origin",
    "href": "https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/e0b774174e384a5da3a056344280fea2/yosan05_yosansho05.pdf",
    "license": "本サイト上の情報・画像・図表などは、特に明示がない限り、その著作権を渋谷区が保有します。引用・転載・複製を希望される場合は、広報コミュニケーション課まで、ご連絡ください。転載・複製はこれを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r8/8yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/041/034/8yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r7/r7yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/037/487/r7yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r6/r6yosangaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/034/308/r6yosangaiyo.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r5/r5_katsu_yosan2.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/030/965/r5_katsu_yosan2.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r4/r4yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/976/r4yosanngaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r3/reiwa3yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/473/reiwa3yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-r2/yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/022/573/yosanngaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/toshima-yosansho-r8/20260205141545.pdf": {
    "mode": "origin",
    "href": "https://www.city.toshima.lg.jp/documents/12068/20260205141545.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-r6/r6_toshimaku_yosannsho.pdf": {
    "mode": "origin",
    "href": "https://www.city.toshima.lg.jp/documents/12068/r6_toshimaku_yosannsho.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-r5/r5_toshimaku_yosannsho.pdf": {
    "mode": "origin",
    "href": "https://www.city.toshima.lg.jp/documents/12068/r5_toshimaku_yosannsho.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-r3/03toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211114090748id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/03toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/adachi-yosansho-r8/r8_yosan_aramashi_link.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/74956/r8_yosan_aramashi_link.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/adachi-yosansho-r7/r7_yosan_aramashi_link.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/71328/r7_yosan_aramashi_link.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/adachi-yosansho-r6/1-r6aramashi.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/64031/1-r6aramashi.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/adachi-yosansho-r5/r5aramashi.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/60270/r5aramashi.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/adachi-yosansho-r4/r4yosanaramashi.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/55535/r4yosanaramashi.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/adachi-yosansho-r3/03aramashi_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/50963/03aramashi_1.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/adachi-yosansho-r2/02aramashi_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.adachi.tokyo.jp/documents/46120/02aramashi_1.pdf",
    "license": "ホームページに掲載しているコンテンツ（文章、イラスト、ロゴ、写真、動画、その他のすべての情報）は著作権の対象となっています。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/okayama-yosangaiyou-r8/R8tousyogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000075/75851/R8tousyogaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/okayama-yosangaiyou-r7/01yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000065/65008/01yosangaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/okayama-yosangaiyou-r6/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000053/53555/gaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/okayama-yosangaiyou-r5/R5tousyoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000042/42016/R5tousyoyosan.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/okayama-yosangaiyou-r4/R4tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000032/32749/R4tousho.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/okayama-yosangaiyou-r3/R3gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000025/25283/R3gaiyou.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/okayama-yosangaiyou-r2/000400556.pdf": {
    "mode": "origin",
    "href": "https://www.city.okayama.jp/shisei/cmsfiles/contents/0000020/20277/000400556.pdf",
    "license": "岡山市公式ホームページに掲載している内容（文章、写真、図、イラスト等）に関する著作権は、原則として岡山市の帰属とする。また、一部の画像等の著作権は、岡山市以外の原著作者の所有とする。岡山市公式ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできない。使用許諾は、各ページ内に記載されたウェブサイト各局区室課へ、事前に相談するものとする。"
  },
  "/sources/shizuoka-yosansho-r8/06_r8jikoubetumeisaisyo_ippankaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.shizuoka.lg.jp/documents/56762/06_r8jikoubetumeisaisyo_ippankaikei.pdf",
    "license": "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。"
  },
  "/sources/shizuoka-yosansho-r7/01jikoubetumeisaisyoippannkaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.shizuoka.lg.jp/documents/53981/01jikoubetumeisaisyoippannkaikei.pdf",
    "license": "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。"
  },
  "/sources/shizuoka-yosansho-r6/r6ippannkaikeiyosannsetsumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.shizuoka.lg.jp/documents/10691/r6ippannkaikeiyosannsetsumeisyo.pdf",
    "license": "「静岡市ホームページ」に掲載されている文章、写真、イラスト、画像等の著作権は、静岡市またはコンテンツ提供者の方にあります。これらの情報は、「私的使用のための複製」や「引用」などの著作権法上認められた場合を除き、無断で転用・引用することはできません。利用許諾については各ホームページに記載されている課等へお問い合わせください。"
  },
  "/sources/yokohama-yosansho-r7/r7ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r7/r7.files/r7ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-yosansho-r6/r6ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r6/r6.files/r6ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-yosansho-r5/r5ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r5/r5.files/r5ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-yosansho-r4/r4ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r4/r4.files/r4ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/yokohama-yosansho-r3/r3ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r3/r3.files/r3ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/fukuoka-yosansho-r7/04_R7_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R7_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/fukuoka-yosansho-r6/04_R6_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R6_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/fukuoka-yosansho-r5/04_R5_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R5_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/fukuoka-yosansho-r4/04_R4_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R4_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/fukuoka-yosansho-r3/04.R3keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R3keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/fukuoka-yosansho-r2/04.R2keisuushiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04.R2keisuushiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kawasaki-yosansho-r7/25bunkatuban6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000173/173806/25bunkatuban6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-yosansho-r6/24bunkatuban6.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000158/158395/24bunkatuban6.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-yosansho-r5/23bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000147/147869/23bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-yosansho-r4/22bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000136/136966/22bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-yosansho-r3/21bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000125/125926/21bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/kawasaki-yosansho-r2/20bunkatuban7.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000114/114574/20bunkatuban7.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  },
  "/sources/yokohama-yosansho-r8/r8ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.yokohama.lg.jp/city-info/zaisei/jokyo/yosan/r8/r8yosan.files/r8ippan.pdf",
    "license": "当サイトの著作権は原則として横浜市が所有しています。掲載している文章・写真・イラストなどの各々の情報及び各ページは、著作権法の保護の対象となる著作物であり、当サイトの全体についても編集著作物として著作権の対象となっています。私的使用のための複製や引用など著作権法上認められた場合を除き、無断で複製・転用をすることはできません。著作権法上認められた範囲を超える引用・転用・転載などをご希望する場合には、各ページ下部に記載された問合せ先に直接ご相談ください。なお、数値データ、簡単な表・グラフ等は著作権による保護の対象ではありませんので、自由に利用できます。"
  },
  "/sources/sapporo-yosansetsumeisho-r8/02_r8_yosansetsumeisho_ippan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/zaisei/kohyo/yosan-kessan/r8/documents/02_r8_yosansetsumeisho_ippan.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/fukuoka-yosansho-r8/04_R8_keisuusiryou.pdf": {
    "mode": "origin",
    "href": "https://www.city.fukuoka.lg.jp/zaisei/zaisei/shisei/documents/04_R8_keisuusiryou.pdf",
    "license": "福岡市ホームページに掲載している個々の情報（文章、写真、イラストなど）に関する著作権は、原則として福岡市に帰属します。（一部の画像等の著作権は、福岡市以外の原著作者が所有しています。）当ホームページの内容について、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/kawasaki-yosansho-r8/26bunkatuban6_antore.pdf": {
    "mode": "origin",
    "href": "https://www.city.kawasaki.jp/230/cmsfiles/contents/0000186/186101/26bunkatuban6_antore.pdf",
    "license": "川崎市ホームページの掲載コンテンツ（文書・画像等、及びその内容）に関する諸権利は、原則として川崎市に帰属します。一部の画像等の著作権は、原著作者が所有しています。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、川崎市ホームページの掲載コンテンツについて無断で複製・転用することを禁止します。コンテンツの転載などを行いたい場合は、各コンテンツのお問い合わせ先まで事前にご連絡ください。（内容を改変しないことが条件となります。）"
  }
};
