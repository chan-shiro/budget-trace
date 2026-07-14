// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// データ整備状況ページの元データ。レジストリ（pipeline/registry/sources.ts）と
// 魚拓台帳（data/archives.json）・raw-meta から導出する。

export interface CoverageFile {
  filename: string;
  /** 原本の来歴ハッシュ（短縮） */
  sha256: string;
  bytes: number;
  fetchedAt: string;
  /** ③自サーバー配信のコピー */
  localUrl: string;
}
export interface CoverageSource {
  sourceId: string;
  title: string;
  publisher: string;
  fiscalYear: string;
  kind: string;
  /** 発行元が示す利用条件（原文） */
  license: string;
  /** open=政府標準利用規約 / permission-required=要許可 / unverified=未確認 */
  licenseClass: "open" | "permission-required" | "unverified";
  originUrl: string;
  landingPage: string | null;
  files: CoverageFile[];
  /** ②Wayback に保存済み */
  archived: boolean;
  /** 原本自体が恒久アーカイブ（Wayback/WARP）由来 */
  archiveOrigin: boolean;
  archiveUrl: string | null;
  /** 魚拓と raw の sha256 一致を検証済み */
  shaVerified: boolean;
}
export interface CoverageDataset {
  key: string;
  label: string;
  ok: boolean;
  detail: string;
}
export interface CoverageEntity {
  muniCode: string;
  name: string;
  pref: string;
  tier: string;
  isPref: boolean;
  datasets: CoverageDataset[];
  sources: CoverageSource[];
}
export interface CoveragePref {
  name: string;
  code: string;
  /** 総務省決算で閲覧できる市区町村数 */
  muniCount: number;
  fullCount: number;
  budgetCount: number;
  deepNames: string[];
}

/** 収録済み（予算資料ベース）のエンティティ */
export const COVERAGE_ENTITIES: CoverageEntity[] = [
  {
    "muniCode": "192015",
    "name": "甲府市",
    "pref": "山梨県",
    "tier": "full",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "R2〜R8（7年度）"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "R2〜R8（7年度）・計482件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": true,
        "detail": "令和7年度2件 / 令和6年度3件（公表サンプルのみ）"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": true,
        "detail": "R2〜R8（7年度）・議決つき"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": true,
        "detail": "R1〜R7（7年度）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": true,
        "detail": "H29〜R7（9年度）・約1,500件"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": true,
        "detail": "H30〜R6（7年度）"
      }
    ],
    "sources": [
      {
        "sourceId": "kofu-yosansho-r8",
        "title": "令和8年度 甲府市当初予算（案）資料",
        "publisher": "甲府市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r8yosan.html",
        "files": [
          {
            "filename": "r8toushoyosansiryou.pdf",
            "sha256": "9a3cb9417077…",
            "bytes": 2277868,
            "fetchedAt": "2026-07-11",
            "localUrl": "/sources/kofu-yosansho-r8/r8toushoyosansiryou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712083450/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r8toushoyosansiryou.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-yosansho-r7",
        "title": "令和7年度 甲府市当初予算資料",
        "publisher": "甲府市",
        "fiscalYear": "R7",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r7yosan.html",
        "files": [
          {
            "filename": "r7toushoyosansiryou.pdf",
            "sha256": "8c98435dc455…",
            "bytes": 2406272,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r7/r7toushoyosansiryou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712085206/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r7toushoyosansiryou.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-yosansho-r5",
        "title": "令和5年度 甲府市当初予算資料（WARP回収）",
        "publisher": "甲府市",
        "fiscalYear": "R5",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（WARP 経由の保存版。利用条件は両者のサイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://warp.ndl.go.jp/20240509/20240508214211/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r5tousyoshiryou.pdf",
        "landingPage": "https://warp.ndl.go.jp/20240508/20240508090506/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r05yosan.html",
        "files": [
          {
            "filename": "03r5tousyoshiryou.pdf",
            "sha256": "9f6b99df2517…",
            "bytes": 1421795,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r5/03r5tousyoshiryou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://warp.ndl.go.jp/20240509/20240508214211/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r5tousyoshiryou.pdf",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-yosansho-r4",
        "title": "令和4年度 甲府市当初予算資料（WARP回収）",
        "publisher": "甲府市",
        "fiscalYear": "R4",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（WARP 経由の保存版。利用条件は両者のサイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://warp.ndl.go.jp/20240509/20240508214215/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r4toushoyosan.pdf",
        "landingPage": "https://warp.ndl.go.jp/20240508/20240508090506/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04yosan.html",
        "files": [
          {
            "filename": "r4toushoyosan.pdf",
            "sha256": "67137914dc46…",
            "bytes": 2100657,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r4/r4toushoyosan.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://warp.ndl.go.jp/20240509/20240508214215/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r4toushoyosan.pdf",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-yosansho-r6",
        "title": "令和6年度 甲府市当初予算資料",
        "publisher": "甲府市",
        "fiscalYear": "R6",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r06yosan.html",
        "files": [
          {
            "filename": "03r6tousyoshiryou.pdf",
            "sha256": "1f07ed8057a6…",
            "bytes": 2122685,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r6/03r6tousyoshiryou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712085452/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/03r6tousyoshiryou.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-yosansho-r3",
        "title": "令和3年度 甲府市当初予算資料（款別一覧表・主な事業）",
        "publisher": "甲府市",
        "fiscalYear": "R3",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/2r03ippankaikeisainyusaisyutu.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r03yosan.html",
        "files": [
          {
            "filename": "2r03ippankaikeisainyusaisyutu.pdf",
            "sha256": "2cf18692f58b…",
            "bytes": 128475,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r3/2r03ippankaikeisainyusaisyutu.pdf"
          },
          {
            "filename": "3r03omonajigyo_3.pdf",
            "sha256": "022cb23bd9e0…",
            "bytes": 389411,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r3/3r03omonajigyo_3.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712104219/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/2r03ippankaikeisainyusaisyutu.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-yosansho-r2",
        "title": "令和2年度 甲府市当初予算資料（款別一覧表・主な事業）",
        "publisher": "甲府市",
        "fiscalYear": "R2",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02sainyuusaishutu.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r02yosan.html",
        "files": [
          {
            "filename": "r02sainyuusaishutu.pdf",
            "sha256": "3fe6f1f3e9ed…",
            "bytes": 190724,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r2/r02sainyuusaishutu.pdf"
          },
          {
            "filename": "r02omonajigyou.pdf",
            "sha256": "e3d5753f5602…",
            "bytes": 169960,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-yosansho-r2/r02omonajigyou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712104609/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/documents/r02omonajigyou.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-kessan-syousai-r6",
        "title": "令和6年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "publisher": "甲府市",
        "fiscalYear": "R6",
        "kind": "page",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r6kessan/r6ippansyousai.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r6kessan/r6kessan.html",
        "files": [
          {
            "filename": "r6ippansyousai.html",
            "sha256": "4f8155ca6cb0…",
            "bytes": 26481,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-kessan-syousai-r6/r6ippansyousai.html"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712125856/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r6kessan/r6ippansyousai.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-kessan-syousai-r5",
        "title": "令和5年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "publisher": "甲府市",
        "fiscalYear": "R5",
        "kind": "page",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r5kessan/r5ippansyousai.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r5kessan/r5kessan.html",
        "files": [
          {
            "filename": "r5ippansyousai.html",
            "sha256": "59a4a42ca20c…",
            "bytes": 26436,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-kessan-syousai-r5/r5ippansyousai.html"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712125134/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r5kessan/r5ippansyousai.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-kessan-syousai-r4",
        "title": "令和4年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "publisher": "甲府市",
        "fiscalYear": "R4",
        "kind": "page",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04kessan/r4ippannsyousai.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04kessan/r04kessan.html",
        "files": [
          {
            "filename": "r4ippannsyousai.html",
            "sha256": "f75fc5e696b6…",
            "bytes": 26361,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-kessan-syousai-r4/r4ippannsyousai.html"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712125433/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r04kessan/r4ippannsyousai.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-kessan-syousai-r2",
        "title": "令和2年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "publisher": "甲府市",
        "fiscalYear": "R2",
        "kind": "page",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r2shuushishousai.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/r02kessan.html",
        "files": [
          {
            "filename": "r2shuushishousai.html",
            "sha256": "62f0600e5f23…",
            "bytes": 26353,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-kessan-syousai-r2/r2shuushishousai.html"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712125651/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r2shuushishousai.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-kessan-syousai-r1",
        "title": "令和1年度 甲府市決算状況 収入支出詳細（一般会計・確定値）",
        "publisher": "甲府市",
        "fiscalYear": "R1",
        "kind": "page",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r1sishutu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r1kessann.html",
        "files": [
          {
            "filename": "r1sishutu.html",
            "sha256": "c175362570a9…",
            "bytes": 26727,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-kessan-syousai-r1/r1sishutu.html"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20210128054004/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r1sishutu.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-kessan-syousai-r3",
        "title": "令和3年度 甲府市決算状況 収入支出詳細（一般会計・確定値・WARP回収）",
        "publisher": "甲府市",
        "fiscalYear": "R3",
        "kind": "page",
        "license": "甲府市ウェブサイト掲載資料（WARP 経由の保存版。利用条件は両者のサイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://warp.ndl.go.jp/20231106/20231106005608/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html",
        "landingPage": "https://warp.ndl.go.jp/waid/4530",
        "files": [
          {
            "filename": "r3shuushishousai.html",
            "sha256": "7881a7735a83…",
            "bytes": 34386,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-kessan-syousai-r3/r3shuushishousai.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://warp.ndl.go.jp/20231106/20231106005608/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/yosan/h28kessan/r3shuushishousai.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-toukei-zaisei-r6",
        "title": "令和6年度 一般会計歳入歳出状況（甲府市統計書 令和7年版）",
        "publisher": "甲府市",
        "fiscalYear": "R6",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/toukeisho.html",
        "files": [
          {
            "filename": "r7-15-01.xls",
            "sha256": "d5f7744a6a04…",
            "bytes": 49664,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r6/r7-15-01.xls"
          },
          {
            "filename": "r7-15-02.xls",
            "sha256": "822bd6e36b6b…",
            "bytes": 46080,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r6/r7-15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712153454/https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-toukei-zaisei-r5",
        "title": "令和5年度 一般会計歳入歳出状況（甲府市統計書 令和7年版）",
        "publisher": "甲府市",
        "fiscalYear": "R5",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/toukeisho.html",
        "files": [
          {
            "filename": "r7-15-01.xls",
            "sha256": "d5f7744a6a04…",
            "bytes": 49664,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r5/r7-15-01.xls"
          },
          {
            "filename": "r7-15-02.xls",
            "sha256": "822bd6e36b6b…",
            "bytes": 46080,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r5/r7-15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712153454/https://www.city.kofu.yamanashi.jp/somu-somu/r7toukyisho/documents/r7-15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-toukei-zaisei-r4",
        "title": "令和4年度 一般会計歳入歳出状況（甲府市統計書 令和6年版）",
        "publisher": "甲府市",
        "fiscalYear": "R4",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r6toukeisyo/documents/r6-15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r6toukeisyo/toukeisyo.html",
        "files": [
          {
            "filename": "r6-15-01.xls",
            "sha256": "f3fc53d318f6…",
            "bytes": 50688,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r4/r6-15-01.xls"
          },
          {
            "filename": "r6-15-02.xls",
            "sha256": "8d52446785e5…",
            "bytes": 46592,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r4/r6-15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712153917/https://www.city.kofu.yamanashi.jp/somu-somu/r6toukeisyo/documents/r6-15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-toukei-zaisei-r3",
        "title": "令和3年度 一般会計歳入歳出状況（甲府市統計書 令和5年版）",
        "publisher": "甲府市",
        "fiscalYear": "R3",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/documents/r5-15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r5toukeisho.html",
        "files": [
          {
            "filename": "r5-15-01.xls",
            "sha256": "dff9a4ae775f…",
            "bytes": 50688,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r3/r5-15-01.xls"
          },
          {
            "filename": "r5-15-02.xls",
            "sha256": "756bf4cb926b…",
            "bytes": 46080,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r3/r5-15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712154125/https://www.city.kofu.yamanashi.jp/somu-somu/documents/r5-15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-toukei-zaisei-r2",
        "title": "令和2年度 一般会計歳入歳出状況（甲府市統計書 令和4年版）",
        "publisher": "甲府市",
        "fiscalYear": "R2",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/r4toukeisho/documents/15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r4toukeisho/r4toukeisho.html",
        "files": [
          {
            "filename": "15-01.xls",
            "sha256": "fd2bb80193cf…",
            "bytes": 48640,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r2/15-01.xls"
          },
          {
            "filename": "15-02.xls",
            "sha256": "67689828769f…",
            "bytes": 45568,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r2/15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20250313051734/https://www.city.kofu.yamanashi.jp/somu-somu/r4toukeisho/documents/15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-toukei-zaisei-r1",
        "title": "令和1年度 一般会計歳入歳出状況（甲府市統計書 令和2年版）",
        "publisher": "甲府市",
        "fiscalYear": "R1",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r2toukeisho.html",
        "files": [
          {
            "filename": "15-01.xls",
            "sha256": "e22f574b6827…",
            "bytes": 44544,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r1/15-01.xls"
          },
          {
            "filename": "15-02.xls",
            "sha256": "dcbc7e8e944d…",
            "bytes": 42496,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-r1/15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712154331/https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-toukei-zaisei-h30",
        "title": "平成30年度 一般会計歳入歳出状況（甲府市統計書 令和2年版）",
        "publisher": "甲府市",
        "fiscalYear": "H30",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-01.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/somu-somu/r2toukeisho.html",
        "files": [
          {
            "filename": "15-01.xls",
            "sha256": "e22f574b6827…",
            "bytes": 44544,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-h30/15-01.xls"
          },
          {
            "filename": "15-02.xls",
            "sha256": "dcbc7e8e944d…",
            "bytes": 42496,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-toukei-zaisei-h30/15-02.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712154331/https://www.city.kofu.yamanashi.jp/somu-somu/documents/15-01.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r7",
        "title": "令和7年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R7",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r7gyoseihyouka.html",
        "files": [
          {
            "filename": "7kouhyouyou2.xlsx",
            "sha256": "2aa6a6906c4b…",
            "bytes": 230816,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r7/7kouhyouyou2.xlsx"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712142225/https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r6",
        "title": "令和6年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R6",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r6gyoseihyouka.html",
        "files": [
          {
            "filename": "6kouhyouyou6.xlsx",
            "sha256": "ece2179358b5…",
            "bytes": 244558,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r6/6kouhyouyou6.xlsx"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712140404/https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r5",
        "title": "令和5年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R5",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta5-4.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r5gyouseihyouka.html",
        "files": [
          {
            "filename": "kouhyouyoudeta5-4.pdf",
            "sha256": "02a39805a06e…",
            "bytes": 2457742,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r5/kouhyouyoudeta5-4.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712140528/https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta5-4.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r4",
        "title": "令和4年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R4",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta3-4.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r4gyouseihyouka.html",
        "files": [
          {
            "filename": "kouhyouyoudeta3-4.pdf",
            "sha256": "9159e9a90f33…",
            "bytes": 1054111,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r4/kouhyouyoudeta3-4.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712140642/https://www.city.kofu.yamanashi.jp/zaise/documents/kouhyouyoudeta3-4.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r3",
        "title": "令和3年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R3",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/hyoukahyou2.xlsx",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r3gyouseihyouka.html",
        "files": [
          {
            "filename": "hyoukahyou2.xlsx",
            "sha256": "2c4f976ea311…",
            "bytes": 153472,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r3/hyoukahyou2.xlsx"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712140840/https://www.city.kofu.yamanashi.jp/zaise/documents/hyoukahyou2.xlsx",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r2",
        "title": "令和2年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R2",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/r02kekkaichiran.xlsx",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r2gyouseihyouka.html",
        "files": [
          {
            "filename": "r02kekkaichiran.xlsx",
            "sha256": "943e67ba8eff…",
            "bytes": 29562,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r2/r02kekkaichiran.xlsx"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712141123/https://www.city.kofu.yamanashi.jp/zaise/documents/r02kekkaichiran.xlsx",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-r1",
        "title": "令和1年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "R1",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/r01kekkaichiran.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r1gyouseihyouka.html",
        "files": [
          {
            "filename": "r01kekkaichiran.xls",
            "sha256": "8679c887f47a…",
            "bytes": 199680,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-r1/r01kekkaichiran.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712142843/https://www.city.kofu.yamanashi.jp/zaise/documents/r01kekkaichiran.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-h30",
        "title": "平成30年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "H30",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/30kekkaitiran.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/h30gyouseihyouka.html",
        "files": [
          {
            "filename": "30kekkaitiran.xls",
            "sha256": "e65d6b9bd47f…",
            "bytes": 235520,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-h30/30kekkaitiran.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712141434/https://www.city.kofu.yamanashi.jp/zaise/documents/30kekkaitiran.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gyousei-hyouka-h29",
        "title": "平成29年度 甲府市行政評価（事務事業評価）結果一覧",
        "publisher": "甲府市",
        "fiscalYear": "H29",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/kekkaitiran.xls",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/keikaku.html",
        "files": [
          {
            "filename": "kekkaitiran.xls",
            "sha256": "94cee8c8201a…",
            "bytes": 224768,
            "fetchedAt": "2026-07-12",
            "localUrl": "/sources/kofu-gyousei-hyouka-h29/kekkaitiran.xls"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712141740/https://www.city.kofu.yamanashi.jp/zaise/documents/kekkaitiran.xls",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-zaisei-jokyo-r7",
        "title": "令和7年度 甲府市財政事情（一般会計の状況・令和8年3月31日現在）",
        "publisher": "甲府市",
        "fiscalYear": "R7",
        "kind": "pdf",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/r07zaiseijokyo.html",
        "files": [
          {
            "filename": "01ipankaikei.pdf",
            "sha256": "92529cd6bd05…",
            "bytes": 82306,
            "fetchedAt": "2026-07-11",
            "localUrl": "/sources/kofu-zaisei-jokyo-r7/01ipankaikei.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712091231/https://www.city.kofu.yamanashi.jp/zaise/shise/yosan/zaise/documents/01ipankaikei.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-gikai-r8",
        "title": "令和8年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R8",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "5f3fc1470d4f…",
            "bytes": 27278,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r8/h270512kaihabetu.html"
          },
          {
            "filename": "shingikekka.html",
            "sha256": "d12c7e8654f2…",
            "bytes": 43387,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r8/shingikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260714124615/https://www.city.kofu.yamanashi.jp/gijichosa/r0803/shingikekka.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-gikai-r7",
        "title": "令和7年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R7",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://web.archive.org/web/20240910021519id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "aee200f26722…",
            "bytes": 26677,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r7/h270512kaihabetu.html"
          },
          {
            "filename": "shingikekka.html",
            "sha256": "9974f7f72edd…",
            "bytes": 46058,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r7/shingikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://web.archive.org/web/20260714133655/https://www.city.kofu.yamanashi.jp/gijichosa/r0703/shingikekka.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-gikai-r6",
        "title": "令和6年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R6",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://web.archive.org/web/20231202080331id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "69843dbd160a…",
            "bytes": 26554,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r6/h270512kaihabetu.html"
          },
          {
            "filename": "shingikekka.html",
            "sha256": "c318f9f70356…",
            "bytes": 43983,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r6/shingikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://web.archive.org/web/20260513161136/https://www.city.kofu.yamanashi.jp/gijichosa/r0603/shingikekka.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-gikai-r5",
        "title": "令和5年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R5",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://web.archive.org/web/20221129001525id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "55fb01bfa50f…",
            "bytes": 25966,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r5/h270512kaihabetu.html"
          },
          {
            "filename": "shingikekka.html",
            "sha256": "9bba74990187…",
            "bytes": 45161,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r5/shingikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://web.archive.org/web/20260116054107/https://www.city.kofu.yamanashi.jp/gijichosa/r0503/shingikekka.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-gikai-r4",
        "title": "令和4年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R4",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://web.archive.org/web/20211130030844id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "1936b60f0a6d…",
            "bytes": 25926,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r4/h270512kaihabetu.html"
          },
          {
            "filename": "shingikekka.html",
            "sha256": "0294a72de033…",
            "bytes": 43638,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r4/shingikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://web.archive.org/web/20260215161610/https://www.city.kofu.yamanashi.jp/gijichosa/r0403/shingikekka.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-gikai-r3",
        "title": "令和3年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R3",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "5e4e451a83cb…",
            "bytes": 25592,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r3/h270512kaihabetu.html"
          },
          {
            "filename": "shingikekka.html",
            "sha256": "158ede6f6ecf…",
            "bytes": 38032,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r3/shingikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://web.archive.org/web/20240227080640/https://www.city.kofu.yamanashi.jp/gijichosa/r0303/shingikekka.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-gikai-r2",
        "title": "令和2年度 甲府市議会の構成（会派別議席数）と当初予算の議決",
        "publisher": "甲府市議会",
        "fiscalYear": "R2",
        "kind": "page",
        "license": "甲府市議会ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "landingPage": "https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/giinmeibo.html",
        "files": [
          {
            "filename": "h270512kaihabetu.html",
            "sha256": "5e4e451a83cb…",
            "bytes": 25592,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r2/h270512kaihabetu.html"
          },
          {
            "filename": "shinngikekka.html",
            "sha256": "7545cc52ea31…",
            "bytes": 48836,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-gikai-r2/shinngikekka.html"
          }
        ],
        "archived": true,
        "archiveOrigin": true,
        "archiveUrl": "https://web.archive.org/web/20191114183718id_/https://www.city.kofu.yamanashi.jp/gikai-somu/shise/gikai/mebo/h270512kaihabetu.html",
        "shaVerified": false
      },
      {
        "sourceId": "kofu-jigyou-houkoku-r6",
        "title": "令和6年度 甲府市 事務事業評価 詳細票（事業報告・成果）",
        "publisher": "甲府市",
        "fiscalYear": "R6",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r6gyoseihyouka.html",
        "files": [
          {
            "filename": "6kouhyouyou6.xlsx",
            "sha256": "ece2179358b5…",
            "bytes": 244558,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-jigyou-houkoku-r6/6kouhyouyou6.xlsx"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712140404/https://www.city.kofu.yamanashi.jp/zaise/documents/6kouhyouyou6.xlsx",
        "shaVerified": true
      },
      {
        "sourceId": "kofu-jigyou-houkoku-r7",
        "title": "令和7年度 甲府市 事務事業評価 詳細票（事業報告・成果）",
        "publisher": "甲府市",
        "fiscalYear": "R7",
        "kind": "excel",
        "license": "甲府市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
        "landingPage": "https://www.city.kofu.yamanashi.jp/zaise/r7gyoseihyouka.html",
        "files": [
          {
            "filename": "7kouhyouyou2.xlsx",
            "sha256": "2aa6a6906c4b…",
            "bytes": 230816,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/kofu-jigyou-houkoku-r7/7kouhyouyou2.xlsx"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260712142225/https://www.city.kofu.yamanashi.jp/zaise/documents/7kouhyouyou2.xlsx",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "232076",
    "name": "豊川市",
    "pref": "愛知県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和7年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "175件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "toyokawa-yosansho-r7",
        "title": "令和7年度 豊川市予算（款別歳入歳出）",
        "publisher": "豊川市",
        "fiscalYear": "R7",
        "kind": "pdf",
        "license": "豊川市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
        "landingPage": "https://www.city.toyokawa.lg.jp/soshiki/zaimu/zaisei/2/1/1/3/22950.html",
        "files": [
          {
            "filename": "R7_yosann.pdf",
            "sha256": "f59f68ba2279…",
            "bytes": 2493682,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/toyokawa-yosansho-r7/R7_yosann.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260208071246/https://www.city.toyokawa.lg.jp/material/files/group/10/R7_yosann.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "352039",
    "name": "山口市",
    "pref": "山口県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和7年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "60件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "yamaguchi-yosansho-r7",
        "title": "令和7年度 山口市当初予算資料（款別歳入歳出）",
        "publisher": "山口市",
        "fiscalYear": "R7",
        "kind": "pdf",
        "license": "山口市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
        "landingPage": "https://www.city.yamaguchi.lg.jp/site/shiseijoho/171302.html",
        "files": [
          {
            "filename": "105329.pdf",
            "sha256": "bf258ef90f57…",
            "bytes": 5588963,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/yamaguchi-yosansho-r7/105329.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20250815060151/https://www.city.yamaguchi.lg.jp/uploaded/attachment/105329.pdf",
        "shaVerified": false
      }
    ]
  },
  {
    "muniCode": "222038",
    "name": "沼津市",
    "pref": "静岡県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和7年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": false,
        "detail": "未収録（curated な一覧が非公開）"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "numazu-yosansho-r7",
        "title": "令和7年度 沼津市予算（款別歳入歳出前年度比較表）",
        "publisher": "沼津市",
        "fiscalYear": "R7",
        "kind": "pdf",
        "license": "沼津市ウェブサイト掲載資料（非営利・二次利用要許可。利用条件は同サイト参照）",
        "licenseClass": "permission-required",
        "originUrl": "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
        "landingPage": "https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/index.htm",
        "files": [
          {
            "filename": "s-1.pdf",
            "sha256": "b51832efcaf0…",
            "bytes": 53348,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/numazu-yosansho-r7/s-1.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260713094056/https://www.city.numazu.shizuoka.jp/shisei/gyozaisei/finance/yosan2025/gaiyousho/pdf/s-1.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "272191",
    "name": "和泉市",
    "pref": "大阪府",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "28件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "izumi-yosansho-r8",
        "title": "令和8年度 和泉市当初予算（一般会計事項別明細書 総括）",
        "publisher": "和泉市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "和泉市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
        "landingPage": "https://www.city.osaka-izumi.lg.jp/kakukano/soumubu/zaiseika/gyoumu/yosan.html",
        "files": [
          {
            "filename": "02_R8_ippan.pdf",
            "sha256": "9131903e5be4…",
            "bytes": 1954711,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/izumi-yosansho-r8/02_R8_ippan.pdf"
          },
          {
            "filename": "00_08_gaiyou.pdf",
            "sha256": "98114b82b309…",
            "bytes": 2928898,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/izumi-yosansho-r8/00_08_gaiyou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260713094338/https://www.city.osaka-izumi.lg.jp/material/files/group/18/02_R8_ippan.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192112",
    "name": "笛吹市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "39件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "fuefuki-yosansho-r8",
        "title": "令和8年度 笛吹市当初予算概要（款別歳入歳出）",
        "publisher": "笛吹市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "笛吹市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
        "landingPage": "https://www.city.fuefuki.yamanashi.jp/zaise/shisejoho/zaise/yosan.html",
        "files": [
          {
            "filename": "r8toushoyosangaiyou.pdf",
            "sha256": "9344be2cda43…",
            "bytes": 923606,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/fuefuki-yosansho-r8/r8toushoyosangaiyou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260713113932/https://www.city.fuefuki.yamanashi.jp/documents/1033/r8toushoyosangaiyou.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192023",
    "name": "富士吉田市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "55件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "fujiyoshida-yosansho-r8",
        "title": "令和8年度 富士吉田市当初予算概要（款別歳入歳出＋主要事業）",
        "publisher": "富士吉田市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "富士吉田市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
        "landingPage": "https://www.city.fujiyoshida.yamanashi.jp/page/1900.html",
        "files": [
          {
            "filename": "7412.pdf",
            "sha256": "879613ffbf54…",
            "bytes": 1988745,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/fujiyoshida-yosansho-r8/7412.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260713114033/https://www.city.fujiyoshida.yamanashi.jp/uploaded/attachment/7412.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192082",
    "name": "南アルプス市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": false,
        "detail": "未収録（curated な一覧が非公開）"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "minami-alps-yosansho-r8",
        "title": "令和8年度 南アルプス市当初予算概要（款別歳入歳出）",
        "publisher": "南アルプス市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "南アルプス市ウェブサイト掲載資料（二次利用は要許可。利用条件は同サイト参照）",
        "licenseClass": "permission-required",
        "originUrl": "https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
        "landingPage": "https://www.city.minami-alps.yamanashi.jp/docs/21143.html",
        "files": [
          {
            "filename": "__8____________.pdf",
            "sha256": "65371756356e…",
            "bytes": 3596425,
            "fetchedAt": "2026-07-13",
            "localUrl": "/sources/minami-alps-yosansho-r8/__8____________.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260713114137/https://www.city.minami-alps.yamanashi.jp/fs/1/4/1/8/3/3/_/__8____________.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192104",
    "name": "北杜市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": false,
        "detail": "未収録（curated な一覧が非公開）"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "hokuto-yosansho-r8",
        "title": "令和8年度 北杜市当初予算概要（款別歳入歳出）",
        "publisher": "北杜市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "北杜市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
        "landingPage": "https://www.city.hokuto.yamanashi.jp/docs/1664.html",
        "files": [
          {
            "filename": "__8__________.pdf",
            "sha256": "a5766d9905a1…",
            "bytes": 412282,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/hokuto-yosansho-r8/__8__________.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260714071224/https://www.city.hokuto.yamanashi.jp/fs/4/9/9/0/3/0/_/__8__________.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192066",
    "name": "大月市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": false,
        "detail": "未収録（curated な一覧が非公開）"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "otsuki-yosansho-r8",
        "title": "令和8年度 大月市当初予算概要（款別歳入歳出）",
        "publisher": "大月市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "大月市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
        "landingPage": "https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/yosan.html",
        "files": [
          {
            "filename": "R08_yosangaiyou.pdf",
            "sha256": "a2dd179b68d6…",
            "bytes": 1689895,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/otsuki-yosansho-r8/R08_yosangaiyou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260714071536/https://www.city.otsuki.yamanashi.jp/shisei/jyohokokai/images/R08_yosangaiyou.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192040",
    "name": "都留市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": false,
        "detail": "未収録（curated な一覧が非公開）"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "tsuru-yosansho-r8",
        "title": "令和8年度 都留市当初予算（款別歳入歳出）",
        "publisher": "都留市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "都留市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
        "landingPage": "https://www.city.tsuru.yamanashi.jp/soshiki/zaimu/zaisei_t/1/1657.html",
        "files": [
          {
            "filename": "R8-0.pdf",
            "sha256": "f11b50887ab1…",
            "bytes": 4176806,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/tsuru-yosansho-r8/R8-0.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260714071801/https://www.city.tsuru.yamanashi.jp/material/files/group/4/R8-0.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "192139",
    "name": "甲州市",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": false,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": false,
        "detail": "未収録（curated な一覧が非公開）"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": false,
        "detail": "未収録（決算は総務省ベースで閲覧可）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "koshu-yosansho-r8",
        "title": "令和8年度 甲州市当初予算（款別歳入歳出）",
        "publisher": "甲州市",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "甲州市ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
        "landingPage": "https://www.city.koshu.yamanashi.jp/docs/2021011200621/",
        "files": [
          {
            "filename": "R8tousyoyosan.pdf",
            "sha256": "108e376a89df…",
            "bytes": 154532,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/koshu-yosansho-r8/R8tousyoyosan.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260714072236/https://www.city.koshu.yamanashi.jp/docs/2021011200621/file_contents/R8tousyoyosan.pdf",
        "shaVerified": true
      }
    ]
  },
  {
    "muniCode": "190004",
    "name": "山梨県",
    "pref": "山梨県",
    "tier": "budget",
    "isPref": true,
    "datasets": [
      {
        "key": "budget",
        "label": "予算（款別）",
        "ok": true,
        "detail": "令和8年度 当初予算・前年当初比つき"
      },
      {
        "key": "projects",
        "label": "事業単位（主な事業）",
        "ok": true,
        "detail": "74件"
      },
      {
        "key": "report",
        "label": "事業報告（成果）",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "council",
        "label": "議会の構成",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "execution",
        "label": "執行・決算（確定値）",
        "ok": true,
        "detail": "令和6年度（決算・確定値）"
      },
      {
        "key": "evaluation",
        "label": "事務事業評価",
        "ok": false,
        "detail": "未収録"
      },
      {
        "key": "outturn",
        "label": "統計書（款項×当初/最終/決算）",
        "ok": false,
        "detail": "未収録"
      }
    ],
    "sources": [
      {
        "sourceId": "yamanashi-yosansho-r8",
        "title": "令和8年度 山梨県当初予算（規模・款別歳入歳出＋主要事業）",
        "publisher": "山梨県",
        "fiscalYear": "R8",
        "kind": "pdf",
        "license": "山梨県ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.pref.yamanashi.jp/documents/6018/03_tousyoyosannkibo_1.pdf",
        "landingPage": "https://www.pref.yamanashi.jp/zaisei/43539671890.html",
        "files": [
          {
            "filename": "03_tousyoyosannkibo_1.pdf",
            "sha256": "742025562ff7…",
            "bytes": 319791,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/yamanashi-yosansho-r8/03_tousyoyosannkibo_1.pdf"
          },
          {
            "filename": "02_tousyonogaiyou_1.pdf",
            "sha256": "1cd670c5dd7a…",
            "bytes": 354240,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/yamanashi-yosansho-r8/02_tousyonogaiyou_1.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20260508112720/https://www.pref.yamanashi.jp/documents/6018/02_tousyonogaiyou_1.pdf",
        "shaVerified": true
      },
      {
        "sourceId": "yamanashi-kessan-r6",
        "title": "令和6年度 山梨県一般会計決算の状況（款別・執行率）",
        "publisher": "山梨県",
        "fiscalYear": "R6",
        "kind": "pdf",
        "license": "山梨県ウェブサイト掲載資料（利用条件は同サイト参照）",
        "licenseClass": "unverified",
        "originUrl": "https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
        "landingPage": "https://www.pref.yamanashi.jp/sui-kai/163_003.html",
        "files": [
          {
            "filename": "r6kessannjokyou.pdf",
            "sha256": "4ac0b9855c4a…",
            "bytes": 1339880,
            "fetchedAt": "2026-07-14",
            "localUrl": "/sources/yamanashi-kessan-r6/r6kessannjokyou.pdf"
          }
        ],
        "archived": true,
        "archiveOrigin": false,
        "archiveUrl": "https://web.archive.org/web/20251119051228/https://www.pref.yamanashi.jp/documents/5948/r6kessannjokyou.pdf",
        "shaVerified": true
      }
    ]
  }
];
/** 都道府県別の網羅状況 */
export const COVERAGE_PREFS: CoveragePref[] = [
  {
    "name": "北海道",
    "code": "01",
    "muniCount": 179,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "青森県",
    "code": "02",
    "muniCount": 40,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "岩手県",
    "code": "03",
    "muniCount": 33,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "宮城県",
    "code": "04",
    "muniCount": 35,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "秋田県",
    "code": "05",
    "muniCount": 25,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "山形県",
    "code": "06",
    "muniCount": 35,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "福島県",
    "code": "07",
    "muniCount": 59,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "茨城県",
    "code": "08",
    "muniCount": 44,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "栃木県",
    "code": "09",
    "muniCount": 25,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "群馬県",
    "code": "10",
    "muniCount": 35,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "埼玉県",
    "code": "11",
    "muniCount": 63,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "千葉県",
    "code": "12",
    "muniCount": 54,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "東京都",
    "code": "13",
    "muniCount": 62,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "神奈川県",
    "code": "14",
    "muniCount": 33,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "新潟県",
    "code": "15",
    "muniCount": 30,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "富山県",
    "code": "16",
    "muniCount": 15,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "石川県",
    "code": "17",
    "muniCount": 19,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "福井県",
    "code": "18",
    "muniCount": 17,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "山梨県",
    "code": "19",
    "muniCount": 27,
    "fullCount": 1,
    "budgetCount": 8,
    "deepNames": [
      "甲府市",
      "笛吹市",
      "富士吉田市",
      "南アルプス市",
      "北杜市",
      "大月市",
      "都留市",
      "甲州市",
      "山梨県"
    ]
  },
  {
    "name": "長野県",
    "code": "20",
    "muniCount": 77,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "岐阜県",
    "code": "21",
    "muniCount": 42,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "静岡県",
    "code": "22",
    "muniCount": 35,
    "fullCount": 0,
    "budgetCount": 1,
    "deepNames": [
      "沼津市"
    ]
  },
  {
    "name": "愛知県",
    "code": "23",
    "muniCount": 54,
    "fullCount": 0,
    "budgetCount": 1,
    "deepNames": [
      "豊川市"
    ]
  },
  {
    "name": "三重県",
    "code": "24",
    "muniCount": 29,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "滋賀県",
    "code": "25",
    "muniCount": 19,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "京都府",
    "code": "26",
    "muniCount": 26,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "大阪府",
    "code": "27",
    "muniCount": 43,
    "fullCount": 0,
    "budgetCount": 1,
    "deepNames": [
      "和泉市"
    ]
  },
  {
    "name": "兵庫県",
    "code": "28",
    "muniCount": 41,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "奈良県",
    "code": "29",
    "muniCount": 39,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "和歌山県",
    "code": "30",
    "muniCount": 30,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "鳥取県",
    "code": "31",
    "muniCount": 19,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "島根県",
    "code": "32",
    "muniCount": 19,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "岡山県",
    "code": "33",
    "muniCount": 27,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "広島県",
    "code": "34",
    "muniCount": 23,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "山口県",
    "code": "35",
    "muniCount": 19,
    "fullCount": 0,
    "budgetCount": 1,
    "deepNames": [
      "山口市"
    ]
  },
  {
    "name": "徳島県",
    "code": "36",
    "muniCount": 24,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "香川県",
    "code": "37",
    "muniCount": 17,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "愛媛県",
    "code": "38",
    "muniCount": 20,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "高知県",
    "code": "39",
    "muniCount": 34,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "福岡県",
    "code": "40",
    "muniCount": 60,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "佐賀県",
    "code": "41",
    "muniCount": 20,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "長崎県",
    "code": "42",
    "muniCount": 21,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "熊本県",
    "code": "43",
    "muniCount": 45,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "大分県",
    "code": "44",
    "muniCount": 18,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "宮崎県",
    "code": "45",
    "muniCount": 26,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "鹿児島県",
    "code": "46",
    "muniCount": 43,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  },
  {
    "name": "沖縄県",
    "code": "47",
    "muniCount": 41,
    "fullCount": 0,
    "budgetCount": 0,
    "deepNames": []
  }
];
/** 全国共通の資料（総務省の決算状況調など） */
export const COVERAGE_NATIONAL: CoverageSource[] = [
  {
    "sourceId": "soumu-shichoson-kessan-r6",
    "title": "令和6年度 市町村別決算状況調",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R6",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/001061669.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html",
    "files": [
      {
        "filename": "001061669.xlsx",
        "sha256": "700fc73e7547…",
        "bytes": 280977,
        "fetchedAt": "2026-07-11",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061669.xlsx"
      },
      {
        "filename": "001061670.xlsx",
        "sha256": "0353d207daec…",
        "bytes": 760113,
        "fetchedAt": "2026-07-11",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061670.xlsx"
      },
      {
        "filename": "001061671.xlsx",
        "sha256": "a5928ea0f813…",
        "bytes": 648149,
        "fetchedAt": "2026-07-11",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061671.xlsx"
      },
      {
        "filename": "001061674.xlsx",
        "sha256": "dbd2306e0814…",
        "bytes": 303130,
        "fetchedAt": "2026-07-11",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061674.xlsx"
      },
      {
        "filename": "001061675.xlsx",
        "sha256": "d39dc896172d…",
        "bytes": 779429,
        "fetchedAt": "2026-07-11",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061675.xlsx"
      },
      {
        "filename": "001061676.xlsx",
        "sha256": "b1ecb4af9463…",
        "bytes": 674190,
        "fetchedAt": "2026-07-11",
        "localUrl": "/sources/soumu-shichoson-kessan-r6/001061676.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20260712083739/https://www.soumu.go.jp/main_content/001061669.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-kessan-r5",
    "title": "令和5年度 市町村別決算状況調",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R5",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000999900.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r05_shichouson.html",
    "files": [
      {
        "filename": "000999900.xlsx",
        "sha256": "fa95397dba35…",
        "bytes": 281433,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999900.xlsx"
      },
      {
        "filename": "000999901.xlsx",
        "sha256": "4f959c19fe84…",
        "bytes": 763985,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999901.xlsx"
      },
      {
        "filename": "000999902.xlsx",
        "sha256": "4961e05a6f84…",
        "bytes": 652100,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999902.xlsx"
      },
      {
        "filename": "000999905.xlsx",
        "sha256": "e59baacdc93b…",
        "bytes": 306346,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999905.xlsx"
      },
      {
        "filename": "000999906.xlsx",
        "sha256": "72ba069f50d9…",
        "bytes": 781763,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999906.xlsx"
      },
      {
        "filename": "000999908.xlsx",
        "sha256": "f3dfe992968f…",
        "bytes": 676814,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r5/000999908.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20260712084605/https://www.soumu.go.jp/main_content/000999900.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-kessan-r4",
    "title": "令和4年度 市町村別決算状況調",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R4",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000937287.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r04_shichouson.html",
    "files": [
      {
        "filename": "000937287.xlsx",
        "sha256": "ef99b54fe095…",
        "bytes": 274617,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937287.xlsx"
      },
      {
        "filename": "000937288.xlsx",
        "sha256": "46872f188fe4…",
        "bytes": 748472,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937288.xlsx"
      },
      {
        "filename": "000937289.xlsx",
        "sha256": "1258b1765388…",
        "bytes": 640840,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937289.xlsx"
      },
      {
        "filename": "000937292.xlsx",
        "sha256": "35efd29b58ef…",
        "bytes": 296153,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937292.xlsx"
      },
      {
        "filename": "000937293.xlsx",
        "sha256": "72786ac738c4…",
        "bytes": 766206,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937293.xlsx"
      },
      {
        "filename": "000937294.xlsx",
        "sha256": "0e27938eead1…",
        "bytes": 668734,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r4/000937294.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20240522135002/https://www.soumu.go.jp/main_content/000937287.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-kessan-r3",
    "title": "令和3年度 市町村別決算状況調",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R3",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000871018.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r03_shichouson.html",
    "files": [
      {
        "filename": "000871018.xlsx",
        "sha256": "bb03a28b1aac…",
        "bytes": 324542,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871018.xlsx"
      },
      {
        "filename": "000871019.xlsx",
        "sha256": "66869a6fd61b…",
        "bytes": 769860,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871019.xlsx"
      },
      {
        "filename": "000871020.xlsx",
        "sha256": "75fb9b341570…",
        "bytes": 640062,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871020.xlsx"
      },
      {
        "filename": "000871023.xlsx",
        "sha256": "8cc35c1e9467…",
        "bytes": 351978,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871023.xlsx"
      },
      {
        "filename": "000871024.xlsx",
        "sha256": "580e45fb7e93…",
        "bytes": 790263,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871024.xlsx"
      },
      {
        "filename": "000871025.xlsx",
        "sha256": "18246ccfb29a…",
        "bytes": 666080,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r3/000871025.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20230329151625/https://www.soumu.go.jp/main_content/000871018.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-kessan-r2",
    "title": "令和2年度 市町村別決算状況調",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R2",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000800819.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r02_shichouson.html",
    "files": [
      {
        "filename": "000800819.xlsx",
        "sha256": "b2a9dc2dc3f4…",
        "bytes": 324476,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800819.xlsx"
      },
      {
        "filename": "000800820.xlsx",
        "sha256": "17151f110da2…",
        "bytes": 761166,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800820.xlsx"
      },
      {
        "filename": "000800822.xlsx",
        "sha256": "711f1c576b9b…",
        "bytes": 643328,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800822.xlsx"
      },
      {
        "filename": "000800826.xlsx",
        "sha256": "426064dae135…",
        "bytes": 352064,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800826.xlsx"
      },
      {
        "filename": "000800828.xlsx",
        "sha256": "7efe3fff556d…",
        "bytes": 781071,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800828.xlsx"
      },
      {
        "filename": "000800830.xlsx",
        "sha256": "fd4fcf11c7eb…",
        "bytes": 668165,
        "fetchedAt": "2026-07-12",
        "localUrl": "/sources/soumu-shichoson-kessan-r2/000800830.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20220401110434/https://www.soumu.go.jp/main_content/000800819.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-seishitsu-r6",
    "title": "令和6年度 市町村別決算状況調（性質別歳出・地方債）",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R6",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/001061672.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r06_shichouson.html",
    "files": [
      {
        "filename": "001061672.xlsx",
        "sha256": "05e6da4e1d26…",
        "bytes": 1015428,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r6/001061672.xlsx"
      },
      {
        "filename": "001061673.xlsx",
        "sha256": "8b4d86c9ff05…",
        "bytes": 127738,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r6/001061673.xlsx"
      },
      {
        "filename": "001061677.xlsx",
        "sha256": "f46ffed96050…",
        "bytes": 1041581,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r6/001061677.xlsx"
      },
      {
        "filename": "001061678.xlsx",
        "sha256": "51eb56f3b399…",
        "bytes": 134584,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r6/001061678.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20260713103942/https://www.soumu.go.jp/main_content/001061673.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-seishitsu-r5",
    "title": "令和5年度 市町村別決算状況調（性質別歳出・地方債）",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R5",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000999903.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r05_shichouson.html",
    "files": [
      {
        "filename": "000999903.xlsx",
        "sha256": "9991c459ca1c…",
        "bytes": 997929,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r5/000999903.xlsx"
      },
      {
        "filename": "000999904.xlsx",
        "sha256": "7667863672dc…",
        "bytes": 130468,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r5/000999904.xlsx"
      },
      {
        "filename": "000999910.xlsx",
        "sha256": "1c41856dc39b…",
        "bytes": 1023672,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r5/000999910.xlsx"
      },
      {
        "filename": "000999911.xlsx",
        "sha256": "9748ef9590f2…",
        "bytes": 137267,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r5/000999911.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20260713105445/https://www.soumu.go.jp/main_content/000999903.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-seishitsu-r4",
    "title": "令和4年度 市町村別決算状況調（性質別歳出・地方債）",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R4",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000937290.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r04_shichouson.html",
    "files": [
      {
        "filename": "000937290.xlsx",
        "sha256": "7945df31289c…",
        "bytes": 987166,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r4/000937290.xlsx"
      },
      {
        "filename": "000937291.xlsx",
        "sha256": "3e4dd969bd4a…",
        "bytes": 120502,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r4/000937291.xlsx"
      },
      {
        "filename": "000937295.xlsx",
        "sha256": "948c52309eaf…",
        "bytes": 1013093,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r4/000937295.xlsx"
      },
      {
        "filename": "000937296.xlsx",
        "sha256": "ff23c682ce81…",
        "bytes": 127020,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r4/000937296.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20240522174306/https://www.soumu.go.jp/main_content/000937290.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-seishitsu-r3",
    "title": "令和3年度 市町村別決算状況調（性質別歳出・地方債）",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R3",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000871021.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r03_shichouson.html",
    "files": [
      {
        "filename": "000871021.xlsx",
        "sha256": "abeb333a42c9…",
        "bytes": 987290,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r3/000871021.xlsx"
      },
      {
        "filename": "000871022.xlsx",
        "sha256": "211018746ba4…",
        "bytes": 120225,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r3/000871022.xlsx"
      },
      {
        "filename": "000871026.xlsx",
        "sha256": "fe53ff9550c1…",
        "bytes": 1012817,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r3/000871026.xlsx"
      },
      {
        "filename": "000871027.xlsx",
        "sha256": "accc72bffdbd…",
        "bytes": 126766,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r3/000871027.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20230329160753/https://www.soumu.go.jp/main_content/000871021.xlsx",
    "shaVerified": true
  },
  {
    "sourceId": "soumu-shichoson-seishitsu-r2",
    "title": "令和2年度 市町村別決算状況調（性質別歳出・地方債）",
    "publisher": "総務省 自治財政局",
    "fiscalYear": "R2",
    "kind": "excel",
    "license": "公共データ利用規約（政府標準利用規約準拠）",
    "licenseClass": "open",
    "originUrl": "https://www.soumu.go.jp/main_content/000800823.xlsx",
    "landingPage": "https://www.soumu.go.jp/iken/zaisei/r02_shichouson.html",
    "files": [
      {
        "filename": "000800823.xlsx",
        "sha256": "c74d7ddc9faf…",
        "bytes": 988160,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r2/000800823.xlsx"
      },
      {
        "filename": "000800825.xlsx",
        "sha256": "fcbb6dd47905…",
        "bytes": 120199,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r2/000800825.xlsx"
      },
      {
        "filename": "000800832.xlsx",
        "sha256": "e98c7271446e…",
        "bytes": 1012839,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r2/000800832.xlsx"
      },
      {
        "filename": "000800834.xlsx",
        "sha256": "a3db5cf73b85…",
        "bytes": 126866,
        "fetchedAt": "2026-07-13",
        "localUrl": "/sources/soumu-shichoson-seishitsu-r2/000800834.xlsx"
      }
    ],
    "archived": true,
    "archiveOrigin": false,
    "archiveUrl": "https://web.archive.org/web/20220401110452/https://www.soumu.go.jp/main_content/000800823.xlsx",
    "shaVerified": true
  }
];
/** scope から対象を解決できなかった資料（要メンテ・黙って隠さない） */
export const COVERAGE_UNCLASSIFIED: CoverageSource[] = [];
export const COVERAGE_SUMMARY = {
  "sourceCount": 62,
  "fileCount": 120,
  "archivedCount": 62,
  "shaVerifiedCount": 46,
  "licenseOpen": 10,
  "licensePermission": 2,
  "licenseUnverified": 50,
  "fullCount": 1,
  "budgetCount": 12,
  "decisionCount": 1741,
  "prefCount": 47
};
