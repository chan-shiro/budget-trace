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
  "/sources/sapporo-jigyou-hyouka-r7/20251020058.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020058.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020064.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020064.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020067.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020067.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020074.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020074.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020150.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020150.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020159.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020159.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020183.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020183.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020250.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020250.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020260.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020260.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020276.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020276.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020280.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020280.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020313.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020313.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020314.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020314.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020317.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020317.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020322.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020322.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020343.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020343.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020344.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020344.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020347.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020347.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020360.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020360.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020364.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020364.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020367.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020367.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020385.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020385.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020388.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020388.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020392.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020392.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020407.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020407.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020451.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020451.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020452.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020452.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020454.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020454.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020476.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020476.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020477.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020477.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020478.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020478.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020479.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020479.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020480.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020480.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020559.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020559.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020567.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020567.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020568.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020568.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020571.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020571.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020574.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020574.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020578.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020578.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020597.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020597.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020600.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020600.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020606.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020606.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020642.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020642.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020656.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020656.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020658.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020658.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020685_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020685_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020703.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020703.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020704.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020704.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020713.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020713.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020718.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020718.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020720.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020720.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020723.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020723.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020724.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020724.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020726.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020726.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020730.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020730.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020732.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020732.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020735.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020735.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020745.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020745.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020756.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020756.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020761.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020761.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020811.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020811.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020852.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020852.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020887.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020887.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020894.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020894.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020895.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020895.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020899.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020899.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020952.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020952.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020989.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020989.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020990.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020990.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020992.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020992.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251020997.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251020997.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021014.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021014.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021042.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021042.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021047.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021047.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021138.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021138.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021139.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021139.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021144.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021144.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021161.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021161.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021192.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021192.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021231.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021231.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021233.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021233.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021234.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021234.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021235.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021235.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021249.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021249.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021253.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021253.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021262.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021262.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021263.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021263.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021268.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021268.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021270.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021270.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021281.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021281.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021282.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021282.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021284.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021284.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021287.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021287.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021461.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021461.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021462.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021462.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021463.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021463.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021464.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021464.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021505.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021505.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021535.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021535.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021553.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021553.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021587.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021587.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021599.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021599.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021615.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021615.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021626.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021626.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021631.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021631.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021660.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021660.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021663.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021663.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021668.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021668.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021762.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021762.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021768.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021768.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021865.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021865.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021908.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021908.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021911.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021911.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021933.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021933.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021938.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021938.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021947.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021947.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021957.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021957.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251021965_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251021965_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022184.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022184.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022392.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022392.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022469.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022469.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022494.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022494.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022498.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022498.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022499.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022499.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022704.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022704.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022713.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022713.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022721.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022721.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022745.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022745.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022755.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022755.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022898_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022898_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/dennkijidoushatyousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/dennkijidoushatyousho.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022985.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022985.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251022986.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251022986.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023021.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023021.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023023.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023023.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023024.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023024.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023040.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023040.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023043.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023043.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023045.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023045.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023046.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023046.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023048.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023048.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023050.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023050.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023084.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023084.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023110.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023110.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023191.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023191.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023195.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023195.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023220.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023220.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023315.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023315.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023320.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023320.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023326.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023326.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023333.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023333.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023389.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023389.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023428.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023428.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023443.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023443.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023447.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023447.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023468.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023468.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023484.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023484.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023512.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023512.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023526.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023526.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023531.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023531.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023536.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023536.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023550.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023550.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023595.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023595.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023619.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023619.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023645.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023645.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023664.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023664.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023695.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023695.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023730.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023730.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023875.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023875.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023877.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023877.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023882.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023882.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023909.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023909.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023946.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023946.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251023947.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251023947.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024003.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024003.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024017.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024017.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024040.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024040.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024056.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024056.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024059.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024059.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024112.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024112.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024131.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024131.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024162.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024162.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024167.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024167.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024224.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024224.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024230.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024230.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024231.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024231.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024241.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024241.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024318.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024318.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024349.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024349.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024563.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024563.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024573.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024573.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024605.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024605.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024621.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024621.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024654.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024654.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251024680.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251024680.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025029.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025029.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025165.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025165.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025185.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025185.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025240.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025240.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025260.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025260.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025274.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025274.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025281.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025281.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251025353.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251025353.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035012.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035012.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035014.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035014.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035083.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035083.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035117.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035117.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035164.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035164.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035168_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035168_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035170.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035170.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035187.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035187.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035231.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035231.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035233.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035233.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035264.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035264.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035291.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035291.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035312.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035312.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035316.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035316.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035366.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035366.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035402.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035402.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035429.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035429.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035453.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035453.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035481.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035481.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035485.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035485.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035500.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035500.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035553.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035553.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035554.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035554.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035581.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035581.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035621.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035621.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035639.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035639.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035672.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035672.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035674.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035674.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035696.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035696.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035720.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035720.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035778_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035778_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035783.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035783.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035787.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035787.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035794.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035794.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035838.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035838.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035856.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035856.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251035907.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251035907.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036002.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036002.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036041.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036041.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036051.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036051.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036080.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036080.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036116.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036116.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036211.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036211.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036213.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036213.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036235.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036235.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036246.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036246.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036260.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036260.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036276.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036276.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036285.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036285.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036287.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036287.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036301.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036301.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036351.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036351.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036388_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036388_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036444.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036444.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036446.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036446.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036449.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036449.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036480.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036480.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036495.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036495.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036537.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036537.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036567.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036567.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036602.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036602.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036618.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036618.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036619.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036619.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036640.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036640.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036693.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036693.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036694.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036694.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036735.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036735.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036738.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036738.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036747.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036747.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036767.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036767.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036774.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036774.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036780.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036780.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036789.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036789.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036819.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036819.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036832.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036832.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036836.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036836.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036837.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036837.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036846.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036846.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036878.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036878.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036884.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036884.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036900.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036900.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036903.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036903.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036910.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036910.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036919.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036919.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036927.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036927.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036956.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036956.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036959.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036959.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251036975.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251036975.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037048.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037048.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037095.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037095.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037132.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037132.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037133.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037133.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037135.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037135.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037137.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037137.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037140.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037140.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037146.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037146.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037152.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037152.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037164.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037164.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037192.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037192.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037223.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037223.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037259.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037259.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037285.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037285.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037317.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037317.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037333.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037333.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037356.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037356.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037384.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037384.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037390.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037390.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037400.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037400.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037410.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037410.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037413.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037413.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037428.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037428.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037471.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037471.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037486.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037486.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037503.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037503.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037507.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037507.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037509.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037509.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037535.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037535.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037540.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037540.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037549.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037549.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037552.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037552.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037553.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037553.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037557.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037557.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037559.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037559.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037560.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037560.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037567.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037567.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037572_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037572_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037593.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037593.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037612.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037612.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037624.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037624.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037635.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037635.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037641.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037641.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037664.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037664.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037666.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037666.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037711.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037711.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037717.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037717.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037718.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037718.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037739.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037739.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037741.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037741.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037742.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037742.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037743.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037743.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037755.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037755.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037765.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037765.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037778.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037778.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037780.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037780.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037782.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037782.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037785.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037785.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037789.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037789.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037802.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037802.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037811.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037811.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037818.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037818.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037829.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037829.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037835.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037835.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037857.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037857.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037858.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037858.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037859.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037859.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037864.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037864.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037865_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037865_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037866.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037866.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037869.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037869.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037871_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037871_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037901.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037901.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037907.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037907.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037910.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037910.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037911.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037911.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037925.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037925.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251037977.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251037977.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038008.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038008.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038011.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038011.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038015.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038015.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038020.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038020.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038021.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038021.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038022.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038022.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038044.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038044.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038045.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038045.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038078.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038078.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038082.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038082.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038110.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038110.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038113.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038113.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038117.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038117.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038124.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038124.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038128.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038128.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038133.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038133.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038136.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038136.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038150.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038150.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038174.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038174.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038181.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038181.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038184.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038184.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038195.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038195.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038218.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038218.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038255.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038255.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038257.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038257.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038258.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038258.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038265.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038265.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038268.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038268.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038303.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038303.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038306.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038306.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038307.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038307.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038321.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038321.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038332.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038332.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038334.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038334.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038343.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038343.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038344.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038344.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038349.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038349.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038350.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038350.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038397.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038397.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038400.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038400.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038402.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038402.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038413.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038413.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038415.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038415.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038417.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038417.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038420.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038420.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038421.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038421.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038424.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038424.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038426.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038426.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038435.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038435.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038441.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038441.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038442.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038442.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038449.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038449.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038451.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038451.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038454.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038454.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038457.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038457.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038460.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038460.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038462.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038462.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038463.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038463.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038468.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038468.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038470.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038470.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038478.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038478.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038488.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038488.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038505.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038505.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038507.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038507.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038512.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038512.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038533.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038533.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038566.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038566.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038579.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038579.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038610.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038610.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038613.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038613.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038616.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038616.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038618.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038618.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038628.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038628.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038636.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038636.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038642.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038642.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038652.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038652.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038654.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038654.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038682.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038682.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038687.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038687.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038693.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038693.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038735.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038735.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038737.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038737.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038739.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038739.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038740.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038740.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038744.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038744.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038749.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038749.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038756.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038756.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038762.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038762.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038767.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038767.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038771.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038771.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038778.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038778.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038779.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038779.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038785.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038785.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038788.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038788.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038790.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038790.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038797.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038797.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038798.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038798.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038799.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038799.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038801.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038801.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038802.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038802.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038812.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038812.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038813.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038813.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038814.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038814.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038827_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038827_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038829.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038829.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251038845.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251038845.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070021.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070021.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070027.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070027.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070029.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070029.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070030.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070030.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070034.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070034.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070035.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070035.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070046.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070046.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070047.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070047.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070049.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070049.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070051.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070051.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070052.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070052.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070053.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070053.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070061.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070061.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070063.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070063.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070064.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070064.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070067.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070067.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070074.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070074.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070075.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070075.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070076.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070076.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070080.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070080.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070081.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070081.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070082.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070082.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070091.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070091.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070097.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070097.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070104.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070104.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070105.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070105.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070106.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070106.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070118.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070118.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070119.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070119.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070122.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070122.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070123.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070123.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070125.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070125.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070126.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070126.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070137.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070137.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070138.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070138.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070139.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070139.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070140.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070140.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070144.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070144.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070145.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070145.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070147.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070147.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070149.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070149.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070152.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070152.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070154.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070154.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070155.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070155.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070156.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070156.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070158.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070158.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070159.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070159.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070160.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070160.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070161.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070161.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070163.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070163.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070171.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070171.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070180.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070180.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070181.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070181.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070182.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070182.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070192.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070192.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070193.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070193.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070210.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070210.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070211.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070211.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070220.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070220.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070224.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070224.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070229.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070229.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070232_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070232_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070234.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070234.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070235.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070235.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070236.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070236.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070238.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070238.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070242.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070242.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070245.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070245.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070248.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070248.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070251.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070251.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070253.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070253.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070254.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070254.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070257.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070257.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070259.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070259.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070265.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070265.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070266.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070266.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070271.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070271.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070272.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070272.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070274.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070274.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070275.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070275.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070278.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070278.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070279.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070279.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070285.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070285.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070286.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070286.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070287.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070287.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070291.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070291.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070292.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070292.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070294.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070294.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070295.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070295.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070296.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070296.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070297.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070297.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070298.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070298.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070299.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070299.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070300.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070300.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070301.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070301.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070303.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070303.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070304.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070304.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070306.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070306.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070308.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070308.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070312.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070312.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070314.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070314.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070315.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070315.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070319.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070319.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070320.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070320.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070326.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070326.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070328.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070328.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070334.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070334.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070336.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070336.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070345.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070345.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070346.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070346.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070349.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070349.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070350.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070350.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070351.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070351.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070352.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070352.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070354.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070354.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070355.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070355.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070362.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070362.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070369.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070369.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070376_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070376_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070427.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070427.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070434.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070434.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070435.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070435.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251070436.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251070436.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091739.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091739.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091740.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091740.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091769.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091769.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091807.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091807.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091808.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091808.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091810.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091810.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091872.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091872.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091880.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091880.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091883.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091883.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091905.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091905.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091932.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091932.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091933.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091933.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091938.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091938.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251091945.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251091945.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092006.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092006.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092050.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092050.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092051.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092051.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092052.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092052.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092082.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092082.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092083.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092083.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092084.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092084.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092085.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092085.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092086_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092086_1.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092087.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092087.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092091.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092091.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092092.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092092.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
  },
  "/sources/sapporo-jigyou-hyouka-r7/20251092094.pdf": {
    "mode": "origin",
    "href": "https://www.city.sapporo.jp/somu/hyoka/kekka/documents/zikohyouka/r7kyoku/documents/20251092094.pdf",
    "license": "札幌市公式ホームページに掲載されている文章、写真等に関する諸権利は原則として札幌市に帰属しています。ただし、一部の写真の著作権などについては原著作者が所有しています。私的使用のための複製や、引用など著作権法上認められた場合を除き、当ホームページの掲載コンテンツを複製・転用する際は、必ず事前にそれぞれのページを所管する各担当課にご相談ください。"
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
  "/sources/saitama-jigyou-houkoku-r6/gyouseihoukokusyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.saitama.lg.jp/006/007/011/002/p124022_d/fil/gyouseihoukokusyo.pdf",
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
  "/sources/kitakyushu-jigyou-hyoka-r6/001158940.pdf": {
    "mode": "origin",
    "href": "https://www.city.kitakyushu.lg.jp/files/001158940.pdf",
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
  "/sources/hamamatsu-yosansho-r8/02_syuyojigyo08.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/171794/02_syuyojigyo08.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/hamamatsu-yosansho-r7/l_yosansetsumeisho.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/164874/l_yosansetsumeisho.pdf",
    "license": "本Webサイトで掲載している、情報・文章・画像などの全てのコンテンツデータについては、「私的使用のための複製」や「引用」といった、著作権法上認められた場合を除き、権利者の許可なく複製・転用・販売といった二次利用をすることを固く禁じます。"
  },
  "/sources/hamamatsu-yosansho-r7/02_bunyabetsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.hamamatsu.shizuoka.jp/documents/164874/02_bunyabetsu.pdf",
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
  "/sources/ota-yosansho-h31/3.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/31yosan/31yosanann.files/3.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h30/3_yosangaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/30yosan/30_yosan.files/3_yosangaiyo.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h29/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/29yosan/29yosan.files/gaiyo.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h28/gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/28yosan/28yosangaiyo.files/gaiyo.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/taito-kanbetsu-r2/2gaisansho_sainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/2yosanannopointo.files/2gaisansho_sainyuu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-r2/2gaisansho_saishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/2yosanannopointo.files/2gaisansho_saishutu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h31/31gaisannshosainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/31yosanannopointo.files/31gaisannshosainyuu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h31/31gaisannshosaishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/31yosanannopointo.files/31gaisannshosaishutu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h27/sainyuu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/27yosananpoint.files/sainyuu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h27/saishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/27yosananpoint.files/saishutu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/ota-yosansho-h27/yosanhenseinogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/27yosan/27yosangaiyo.files/yosanhenseinogaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h26/26yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/26yosan.files/26yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h25/25yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/25yosan.files/25yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h24/24yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/24yosan.files/24yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h23/23yosan_gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/23yosan.files/23yosan_gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h22/22yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/22yosan.files/22yosan-gaiyou.pdf.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h21/21yosan-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/21yosan.files/21yosan-gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/ota-yosansho-h20/20gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.ota.tokyo.jp/kuseijoho/suuji/yosan_kessan/yosan/20yosan_gaiyou.files/20gaiyou.pdf",
    "license": "大田区ホームページ上の文書や画像などの各ファイル、及びその内容に関する諸権利は、原則として大田区に帰属しています。また、一部の画像などの著作権は、原著作権者が所有しています。／大田区ホームページ上の文書や画像などについては、「私的使用のための複製」や「引用」など著作権法上認められた場合や大田区がオープンデータとして公開しているものを除き、無断での使用・転載、二次利用はできません。／大田区がオープンデータとして公開しているもの以外の文書などについて転用等を希望される場合は、各ページのお問い合わせ先の所属に、ご相談ください。"
  },
  "/sources/kita-yosangaiyou-r8/r8gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r8gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-r7/r7gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r7gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-r6/r6gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r6gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-r5/r5gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r5gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-r4/r4gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r4gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-r3/r3gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/r3gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-r2/02gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/02gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h31/31gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/31gaiyou.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h30/30gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/30gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h29/29gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/014/485/29gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h28/28gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130075731id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/28gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h27/27gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130100057id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/27gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h26/26gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130065453id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/26gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/kita-yosangaiyou-h24/24gaiyo.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211130091510id_/http://www.city.kita.tokyo.jp/zaisei/kuse/zaise/documents/24gaiyo.pdf",
    "license": "東京都北区公式ウェブサイト(https://www.city.kita.lg.jp/ 又は東京都北区の各組織が左記以外のドメインで運営するサイト)(以下「当区サイト」という。)に掲載されている文字、写真、イラストなどの個々の情報に関する著作権は、原則として北区に帰属します。ただし、一部の画像等の著作権は、原著作者が所有しています。また、総体としての当区サイトについては、北区に編集著作権があります。／当区サイトの内容の全部又は一部は、「私的使用」または「引用」など著作権法上認められた行為として適切な方法で利用する場合を除き、北区に無断で転載、複製、改変、放送、送信、翻訳、販売、貸与などの利用をすることはできません。"
  },
  "/sources/taito-kanbetsu-r8/R8yosan3.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R8yosanannopoint.files/R8yosan3.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-r7/R7yosan3.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R7yosanannopoint.files/R7yosan3.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-r6/R6yosan3.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R6yosanannopoint.files/R6yosan3.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-r5/5gaisansho.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R5yosanannopoint.files/5gaisansho.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-r4/s3-kanbetuyosangaku.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/R4yosanannopoint.files/s3-kanbetuyosangaku.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-r3/3gaisannsho.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/3point.files/3gaisannsho.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h30/sainyuusaishutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/30yosanpoint.files/sainyuusaishutu.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h29/29-4.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/29point.files/29-4.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/taito-kanbetsu-h28/30gaisansyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.taito.lg.jp/kusei/zaisei/yosan/tousyo/point/28point.files/30gaisansyo.pdf",
    "license": "台東区公式ホームページ内の文章・写真・イラストなどの著作権は、区または正当な権利を有している第三者にあります。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r8/000451451.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/file06_02_0101.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r7/000448143.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r6/000418377.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r5/000359952.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kucho/message/20230213-01-1.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r4/000359947.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r3/000331346.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r2/000304338.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-r1/000283543.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h30/000254899.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h29/000233794.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h28/000192291.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h27/000189437.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h26/000168755.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h25/000139123.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/zaisei01_001014.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h24/000121180.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h23/000103085.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h22/000062569.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h21/000059941.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h20/000050579.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h19/000050580.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h18/000050581.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h17/000050582.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h16/000050585.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h15/000050586.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h14/000050587.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-yosan-gaiyou-h13/000050588.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/gaiyou_kako.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/shinjuku-kessan-taisho-r6/000434904.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinjuku.lg.jp/kusei/kaikei01_001000_00006.html",
    "license": "新宿区公式ホームページから発信するコンテンツ（テキスト、画像、PDF、そのほかのデータ）の著作権は新宿区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。掲載されている情報は、個人的かつ非営利的な使用目的だけのために利用する場合に限り、複製、使用、ダウンロードすることができます。著作権法上の「私的使用」や「引用」の範囲を越えて、本ページのコンテンツの使用を希望する場合は事前に問合せ担当課または区政情報課までお問い合わせください。事前の許可がない限り、転載、変更、発行、配布、掲示などは一切できません。"
  },
  "/sources/minato-yosangaiyou-r8/20260202131316.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/20260202131316.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-r7/r7nishou.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/r7nishou.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-r6/nishou.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/nishou.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-r5/2sho.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/2sho.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-r4/02_section2.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/02_section2.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-r3/04sainyusaisyutu.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/04sainyusaisyutu.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-r2/section2.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/section2.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h31/15-24.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/15-24.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h30/05kibo_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/05kibo_1.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h28/03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h27/h27yosangaiyou03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h27yosangaiyou03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h26/h26_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h26_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h25/h25_yosangaiyo_02pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h25_yosangaiyo_02pdf.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h23/h23_yosangaiyo_02.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h23_yosangaiyo_02.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h22/h22_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h22_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h21/h21_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h21_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h20/h20_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h20_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
  },
  "/sources/minato-yosangaiyou-h19/h19_yosangaiyo_03.pdf": {
    "mode": "origin",
    "href": "https://www.city.minato.tokyo.jp/documents/4694/h19_yosangaiyo_03.pdf",
    "license": "港区ホームページ上の文書や画像等の各ファイル、およびその内容に関する諸権利は、原則として港区に帰属します。記載内容の無断での転載は禁じます。もし、記載内容について転載を希望される場合は、その旨下記までご連絡ください。"
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
  "/sources/chuo-sokatsuhyo-h31/31tousyoyosansoukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2772/31tousyoyosansoukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-h30/30tousyosoukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2763/30tousyosoukatuhyou.pdf",
    "license": "区ホームページに掲載されている内容（テキスト、画像、PDFその他のデータ）の著作権は中央区に帰属します。また、一部の画像などの著作権は、原著作者が所有しています。著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/chuo-sokatsuhyo-h29/29tousyoyosansoukatuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.chuo.lg.jp/documents/2756/29tousyoyosansoukatuhyou.pdf",
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
  "/sources/koto-yosangaiyou-h31/31yosananngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/31yosananngaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-h30/30yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/documents/30yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-h29/yosanangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/kuse/yosanzaise/yosan/h29/documents/yosanangaiyou.pdf",
    "license": "江東区公式サイトから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は江東区に帰属します。また一部の画像などの著作権は原著作権者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの情報の利用などをご希望の場合は、コンテンツの所管係までお問い合わせください。"
  },
  "/sources/koto-yosangaiyou-h28/28yosanan1.pdf": {
    "mode": "origin",
    "href": "https://www.city.koto.lg.jp/011102/kuse/yosanzaise/yosan/h28/documents/28yosanan1.pdf",
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
  "/sources/katsushika-yosangaiyou-h31/31katsugaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/020/311/31katsugaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-h30/yosangaiyou2.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/017/523/yosangaiyou2.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-h29/29angaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/013/830/29angaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/katsushika-yosangaiyou-h28/28yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/010/536/28yosangaiyou.pdf",
    "license": "葛飾区公式サイト上の文書や画像等のコンテンツ、及び内容に関する諸権利は葛飾区に帰属します。一部の画像等の著作権は原著作者が所有しています。本サイト上の文書・画像等の各ファイルは、「私的使用のための複製」や「引用」など著作権法上認められている場合を除き、無断で転載・改変することを禁じます。"
  },
  "/sources/sumida-yosangaiyou-r8/r8-yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r8yosangaiyou.files/r8-yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-r7/r7gaiyouan.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r7yosangaiyou.files/r7gaiyouan.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-r6/r6yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r6yosangaiyou.files/r6yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-r5/r5yosanngaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r5yosangaiyou.files/r5yosanngaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-r4/r4yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r4yosangaiyou.files/r4yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-r3/3yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/R3nendoyosangaiyou.files/3yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-r2/R2_yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/r2_yosangaiyou.files/R2_yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h31/31yosangaiyou_s.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/31yosangaiyou.files/31yosangaiyou_s.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h30/h30yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/h30yosangaiyou.files/h30yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h29/h29_yosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/h29yosangaiyou.files/h29_yosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h28/28yosan-gaiyou..pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/28yosan-gaiyou.files/28yosan-gaiyou..pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h27/27yosann2.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/yosangaiyo.files/27yosann2.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h26/26gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/26yosangaiyou.files/26gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h25/25gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/ta104346037.files/25gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h24/gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/ta10300020.files/gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h23/23yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/H23yosanngaiyou.files/23yosan-gaiyou.pdf.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h22/22yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/22yosangaiyou.files/22yosan-gaiyou.pdf.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h21/21yosan-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/21yosangaiyou.files/21yosan-gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h20/20yosan-gaiyou.pdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/20yosangaiyo.files/20yosan-gaiyou.pdf.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h19/19yosan-gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/19yosangaiyou.files/19yosan-gaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h18/heisei18nendoyosangaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/heisei18nendoyosangaiyou.files/heisei18nendoyosangaiyou.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/sumida-yosangaiyou-h17/yosangaiyou_h17.pdf": {
    "mode": "origin",
    "href": "https://www.city.sumida.lg.jp/kuseijoho/gyoseikaikaku_zaisei/zaisei/yosan_gaiyou/h17_yosangaiyou.files/yosangaiyou_h17.pdf",
    "license": "本サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として墨田区に帰属します。また、一部の画像等の著作権は、原著作者が所有しています。著作権法上認められている行為を除き、本サイト上の文書・画像等の無断使用・転載を禁止します。使用を希望する場合は、コンテンツの担当課までお問合せください。"
  },
  "/sources/shinagawa-kanbetsu-r8/2026tousyoyosan_3.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/2026tousyoyosan_3.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。"
  },
  "/sources/shinagawa-kanbetsu-r7/2025tousyoyosan_4.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/2025tousyoyosan_4.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。"
  },
  "/sources/shinagawa-kanbetsu-r7/2025tousyoyosan_5.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/2025tousyoyosan_5.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。"
  },
  "/sources/shinagawa-kanbetsu-r6/20240208145918_8.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20240208145918_8.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。"
  },
  "/sources/shinagawa-kanbetsu-r5/20230208174032_9.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20230208174032_9.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。"
  },
  "/sources/shinagawa-kanbetsu-r4/20220210190000_8.pdf": {
    "mode": "origin",
    "href": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20220210190000_8.pdf",
    "license": "品川区ホームページ（https://www.city.shinagawa.tokyo.jp/）上の情報・画像・図表等は、特に明示がない限り、その著作権を品川区が保有します。無断引用・転載・複製は、これを禁じます。"
  },
  "/sources/itabashi-yosan-gaiyou-r8/r8yosangaiyouhonpen.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/059/985/r8yosangaiyouhonpen.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/itabashi-yosan-gaiyou-r7/r7yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/054/671/r7yosannogaiyou.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/itabashi-yosan-gaiyou-r6/r6yosannogaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/049/183/r6yosannogaiyou.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/itabashi-yosan-gaiyou-r5/r5_yosannogaiyou_2.pdf": {
    "mode": "origin",
    "href": "https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/041/624/r5_yosannogaiyou_2.pdf",
    "license": "本サイトに掲載する写真・画像などの各ファイル及びその内容に関する諸権利は板橋区役所に帰属します。「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/arakawa-setsumei-r8/8yosansetumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/43359/8yosansetumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/arakawa-setsumei-r7/yosansetsumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/39324/yosansetsumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/arakawa-setsumei-r6/r6_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/35959/r6_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/arakawa-setsumei-r5/r5_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/30279/r5_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/arakawa-setsumei-r4/r4_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/26185/r4_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/arakawa-setsumei-r3/r3_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/21692/r3_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/arakawa-setsumei-r2/r2_yosan-setumeisyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.arakawa.tokyo.jp/documents/27655/r2_yosan-setumeisyo.pdf",
    "license": "荒川区公式サイト上（各SNSも含む）の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として荒川区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。本サイト上の文書・画像等の各ファイルの無断使用・転載・引用は禁じます。なお、文書・画像等の各ファイルについて転用等を希望される場合は、お問い合わせください。"
  },
  "/sources/tokyo-yosangaiyou-r8/08-03sainyukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/08-03sainyukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r8/08-04saishutsukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/08-04saishutsukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r7/07-03sainyukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/07-03sainyukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r7/07-04saishutsukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/07-04saishutsukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r6/06-03sainyukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/06-03sainyukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r6/06-04saishutsukanbetsu": {
    "mode": "origin",
    "href": "https://www.zaimu.metro.tokyo.lg.jp/documents/d/zaimu/06-04saishutsukanbetsu",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r5/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou05/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r5/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou05/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r4/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou04/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r4/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/zaisei/dashboard/yosangaiyou04/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r3/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/3opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r3/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/3opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r2/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/2opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-r2/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/2opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-h31/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/31opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-h31/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/31opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-h30/03sainyukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/30opendata/03sainyukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
  },
  "/sources/tokyo-yosangaiyou-h30/04saishutsukanbetsu.csv": {
    "mode": "origin",
    "href": "https://www.zaimu1.metro.tokyo.lg.jp/syukei1/zaisei/30opendata/04saishutsukanbetsu.csv",
    "license": "当サイトに掲載されている著作物の著作権は、東京都及びその他の第三者が所有しています。「私的使用のための複製」や「引用」など著作権法上で著作権者の許諾が不要とされている場合を除き、著作物の無断複製・転用することはできません。なお、引用する場合には引用元として「東京都財務局出典」と明記してください。"
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
  "/sources/toshima-yosansho-r4/04toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202015242id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/04toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-r3/03toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20211114090748id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/03toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-r2/02toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202031059id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/02toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-h31/31toushoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202021859id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/31toushoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-h30/30tousyoyosan.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202023230id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/30tousyoyosan.pdf",
    "license": "当サイト上の文書や画像等の各ファイル、及びその内容に関する諸権利は、原則として豊島区に帰属しています。また、一部の画像等の著作権は、原著作者が所有しています。／当サイト上の文書や画像等は、「私的使用のための複製」や「引用」など著作権法上認められた場合を除き、無断で複製・転用することはできません。"
  },
  "/sources/toshima-yosansho-h29/29yosansho.pdf": {
    "mode": "archive",
    "href": "https://web.archive.org/web/20230202031608id_/https://www.city.toshima.lg.jp/004/kuse/shisaku/yosan/documents/29yosansho.pdf",
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
  "/sources/edogawa-yosansho-r8/r8toshoyosan.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/66965/r8toshoyosan.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-r7/r7tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/58935/r7tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-r6/r6tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/49549/r6tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-r5/r5tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/40224/r5tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-r4/r4tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/31190/r4tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-h31/h31tosyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/12531/h31tosyo.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-h29/29tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/262/29tousho.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-h28/28tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/260/28tousho.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yosansho-h27/27tousho.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/259/27tousho.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yoko-r3/r3yoko.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/23048/r3yoko.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yoko-r2/r2yoko.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/17473/r2yoko.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/edogawa-yoko-h30/h30yoko_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.edogawa.tokyo.jp/documents/261/h30yoko_1.pdf",
    "license": "江戸川区公式ホームページ上の一部コンテンツ（テキスト、画像、PDFなどのデータ）の著作権は江戸川区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-yosansho-r8/r8yosansho.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/22830/r8yosansho.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-yosansho-r7/r7yosansho.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/12499/r7yosansho.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-yosansho-r6/r6yosan0209.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7159/r6yosan0209.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-yosansho-r5/r5yosannsyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7158/r5yosannsyo.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-yosansho-r4/r04-tousyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7157/r04-tousyo.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-keikakusho-r3/4ippannkaikei.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7156/4ippannkaikei.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/suginami-keikakusho-r2/r2kuseikeieikeikakusho.pdf": {
    "mode": "origin",
    "href": "https://www.city.suginami.tokyo.jp/documents/7155/r2kuseikeieikeikakusho.pdf",
    "license": "杉並区公式ホームページに掲載されている文字、写真、イラストなど、個々の情報に関する著作権は、原則として杉並区に帰属します。ただし、一部の画像などの著作権は、原著作者が所有しています。私的使用や引用などの著作権法上認められている行為を除き、無断で転載や改変などを行うことはできません。"
  },
  "/sources/bunkyo-sokatsuhyo-r8/r08_tosyoyosan_sokatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/12708/r08_tosyoyosan_sokatsuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-r7/r07_tosyoyosansoukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/10873/r07_tosyoyosansoukatsuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-r6/202437164616.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/8579/202437164616.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-r5/20233614280_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5568/20233614280_1.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-r4/2022324164654.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5569/2022324164654.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-r3/2021soukatuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5570/2021soukatuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-r2/2020soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5571/2020soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h31/310208_gian_31tousyo_shiryo1_soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5572/310208_gian_31tousyo_shiryo1_soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h30/300208_gian_tousyo_shiryo1_soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/49/300208_gian_tousyo_shiryo1_soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h29/29soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5573/29soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h28/28soukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5574/28soukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h27/26soukatsuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5575/26soukatsuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h26/26soukatsuhyo_1.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5576/26soukatsuhyo_1.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h24/24yosansoukatsuhyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5578/24yosansoukatsuhyou.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h23/23soukatuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5579/23soukatuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h22/22soukatsu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5580/22soukatsu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h21/21sokatuhyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5581/21sokatuhyo.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h20/20soukatupdf.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5582/20soukatupdf.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h19/19soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5583/19soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h18/soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5584/soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h17/soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5585/soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/bunkyo-sokatsuhyo-h16/soukatu.pdf": {
    "mode": "origin",
    "href": "https://www.city.bunkyo.lg.jp/documents/5586/soukatu.pdf",
    "license": "文京区ホームページから発信するコンテンツ（テキスト、画像、PDF、その他のデータ）の著作権は文京区に帰属します。また、一部の画像などの著作権は原著作者が所有しています。本サイト上の文書・画像などの無断使用・転載、二次利用を禁止します。これらの文書などについて転用などを希望する場合は、各ページのお問い合わせ先にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r8/R08_2026gaiyo.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R08_2026gaiyo.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r7/R7-2025gaiyousyuusei2.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R7-2025gaiyousyuusei2.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r6/R6-2024gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R6-2024gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r5/r5-2023gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/r5-2023gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r4/R4-2022gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R4-2022gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r3/R3-2021gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R3-2021gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
  },
  "/sources/nakano-yosangaiyou-r2/R2-2020gaiyou.pdf": {
    "mode": "origin",
    "href": "https://www.city.tokyo-nakano.lg.jp/kusei/zaisei/yosan/tosho.files/R2-2020gaiyou.pdf",
    "license": "中野区ホームページ上の文書や画像等のファイルおよび、その内容に関する著作権は、原則として中野区に帰属します。また、一部の画像などの著作権は原著作権者が所有しています。私的使用や引用など、著作権法上認められている行為を除き、当ホームページ上の文書や画像等を無断で二次利用することを禁じます。当ホームページの内容の利用を希望する場合は、事前に広報係にご相談ください。"
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
