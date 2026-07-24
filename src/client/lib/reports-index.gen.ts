// このファイルは自動生成です。手で編集しないこと。
// 再生成: bun run pipeline:derive（pipeline/derive-app-data.ts）
// 事業報告（成果）を**全量公開**している自治体の団体コード → 件数。
// 実体は public/reports/<団体コード>.json（その画面でだけフェッチする。useProjectReports）。
// 甲府（公表サンプル5件）は静的 gen の report.gen.ts 側なのでここには入らない。

export const REPORT_MUNIS: Record<string, { name: string; fy: string; fyLabel: string; count: number }> = {
  "111007": {
    "name": "さいたま市",
    "fy": "R6",
    "fyLabel": "令和6年度",
    "count": 676
  },
  "141003": {
    "name": "横浜市",
    "fy": "R7",
    "fyLabel": "令和7年度",
    "count": 2313
  },
  "141305": {
    "name": "川崎市",
    "fy": "R6",
    "fyLabel": "令和6年度",
    "count": 572
  },
  "011002": {
    "name": "札幌市",
    "fy": "R7",
    "fyLabel": "令和7年度",
    "count": 634
  }
};
