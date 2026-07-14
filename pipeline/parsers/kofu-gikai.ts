// 甲府市議会の構成（予算議決時）HTML パーサ。
//
// 入力は2ファイル（registry の urls 順）:
//   [0] 所属会派別議員名簿 h270512kaihabetu.html
//       <h2>会派名（N名）</h2> の直後に議員名テーブルが1つ。議席数は名簿の実員数を
//       数える（（N名）表記とも突合）。無所属は「無所属（1名）」が2つ並ぶので議員名で一意化。
//   [1] 令和8年3月定例会 審議結果 shingikekka.html
//       <h1>令和8年3月定例会審議結果</h1>、表頭「番号|件名等|議決月日|結果」。
//       件名に「一般会計予算」を含む行から議案番号・議決日・結果を取る。
//
// 賛否内訳・会派別賛否は非公表（起立採決で「可決」のみ）なので保持しない。
import { readFileSync } from "node:fs";
import type {
  CouncilCompositionDoc,
  CouncilFactionFact,
  SourceEntry,
} from "../types";

export const PARSER_VERSION = "0.1.0";

/** HTML → テーブルの行列（セルはタグ除去・空白正規化済みテキスト） */
function parseTables(html: string): string[][][] {
  const noScript = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  const tables = noScript.match(/<table[\s\S]*?<\/table>/g) ?? [];
  return tables.map((t) =>
    (t.match(/<tr[\s\S]*?<\/tr>/g) ?? []).map((r) =>
      (r.match(/<t[hd][\s\S]*?<\/t[hd]>/g) ?? []).map((c) =>
        c
          .replace(/<[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/[\s　]+/g, "")
          .trim(),
      ),
    ),
  );
}

/** 全角数字 → 半角 */
function toHalf(s: string): string {
  return s.replace(/[０-９]/g, (c) => String(c.charCodeAt(0) - 0xff10));
}

/** "更新日：2025年5月1日" → "2025-05-01"（無ければ throw） */
function extractUpdatedDate(html: string, filename: string): string {
  const m = toHalf(html.replace(/<[^>]+>/g, "")).match(/更新日[：:]\s*(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!m) throw new Error(`${filename}: 更新日が見つかりません（ページ構成が変わった可能性）`);
  const [, y, mo, d] = m;
  return `${y}-${mo!.padStart(2, "0")}-${d!.padStart(2, "0")}`;
}

/** <h2>…</h2> と直後の <table> をドキュメント順に対にする */
function pairHeadingTables(html: string): { heading: string; table: string }[] {
  const noScript = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  const re = /<h2[^>]*>([\s\S]*?)<\/h2>|<table[\s\S]*?<\/table>/gi;
  const pairs: { heading: string; table: string }[] = [];
  let pendingHeading: string | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(noScript))) {
    if (m[0].toLowerCase().startsWith("<table")) {
      if (pendingHeading != null) {
        pairs.push({ heading: pendingHeading, table: m[0] });
        pendingHeading = null;
      }
    } else {
      pendingHeading = m[1]!
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/[\s　]+/g, "")
        .trim();
    }
  }
  return pairs;
}

function countMembers(tableHtml: string): string[] {
  const [rows] = parseTables(tableHtml);
  const names: string[] = [];
  for (const r of rows ?? []) for (const c of r) if (c) names.push(c);
  return names;
}

export function parseKofuGikai(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): CouncilCompositionDoc {
  if (files.length !== 2) {
    throw new Error(`${source.id}: 会派名簿＋審議結果の2ファイルを想定（現在 ${files.length} 件）`);
  }
  const kaihaFile = files.find((f) => /kaiha/i.test(f.filename)) ?? files[0]!;
  const kekkaFile = files.find((f) => /kekka|shingi/i.test(f.filename)) ?? files[1]!;
  const kaihaHtml = readFileSync(kaihaFile.path, "utf8");
  const kekkaHtml = readFileSync(kekkaFile.path, "utf8");

  // ---- 会派別議席数 ----
  const asOf = extractUpdatedDate(kaihaHtml, kaihaFile.filename);
  const pairs = pairHeadingTables(kaihaHtml);
  if (pairs.length === 0) throw new Error(`${kaihaFile.filename}: 会派の見出し＋名簿テーブルが見つかりません`);
  const factions: CouncilFactionFact[] = [];
  for (const { heading, table } of pairs) {
    // 見出し「会派名（N名）」から会派名と申告議席数
    const hm = toHalf(heading).match(/^(.*?)（(\d+)名）$/);
    if (!hm) throw new Error(`${kaihaFile.filename}: 会派見出しを解釈できません: ${heading}`);
    const baseName = hm[1]!;
    const declared = Number(hm[2]);
    const members = countMembers(table);
    // 名簿の実員数を数え、（N名）表記と突合する（不一致はページ変化の兆候）
    if (members.length !== declared) {
      throw new Error(
        `${kaihaFile.filename}: 「${baseName}」の名簿人数 ${members.length} が見出しの ${declared}名 と一致しません`,
      );
    }
    const isIndependent = baseName === "無所属";
    // 無所属は「無所属（1名）」が複数並ぶので議員名で一意化する
    const name = isIndependent && members[0] ? `無所属（${members[0].replace(/（.*$/, "")}）` : baseName;
    factions.push({
      name,
      seats: members.length,
      isIndependent,
      locator: { file: kaihaFile.filename, row: factions.length + 1 },
    });
  }
  const seats = factions.reduce((s, f) => s + f.seats, 0);

  // ---- 当初予算の議決（審議結果） ----
  const sessM = kekkaHtml.replace(/<[^>]+>/g, "").replace(/[\s　]+/g, "").match(/(令和\d+年\d+月[^審]*?定例会)/);
  const sessionLabel = sessM ? sessM[1]! : "";
  if (!sessionLabel) throw new Error(`${kekkaFile.filename}: 会期（○定例会）が見つかりません`);
  const tables = parseTables(kekkaHtml);
  const decisionTable = tables.find((rows) => (rows[0] ?? []).some((c) => c.includes("件名")) && (rows[0] ?? []).some((c) => c.includes("結果")));
  if (!decisionTable) throw new Error(`${kekkaFile.filename}: 審議結果テーブル（件名・結果）が見つかりません`);
  const head = decisionTable[0]!;
  const col = (label: string) => head.findIndex((c) => c.includes(label));
  const iNo = col("番号");
  const iName = head.findIndex((c) => c.includes("件名"));
  const iDate = col("議決");
  const iResult = col("結果");
  if (iName < 0 || iDate < 0 || iResult < 0) throw new Error(`${kekkaFile.filename}: 審議結果の列（件名/議決月日/結果）が特定できません`);
  // 一般会計予算の議決行。「…に対する附帯決議」（件名に一般会計予算を含むが別議案）は除く
  const bill = decisionTable
    .slice(1)
    .find(
      (r) =>
        (r[iName] ?? "").includes("一般会計予算") &&
        !(r[iName] ?? "").includes("附帯決議") &&
        !(r[iName] ?? "").includes("に対する"),
    );
  if (!bill) throw new Error(`${kekkaFile.filename}: 「一般会計予算」の議決行が見つかりません`);
  const billName = bill[iName]!;
  const billNo = iNo >= 0 ? bill[iNo]! : "";
  const result = bill[iResult]!;
  // 「3月25日」＋年度から ISO 日付を組む
  const fyNum = Number(source.fiscalYear.replace(/[^0-9]/g, "")); // R8 → 8
  const gregYear = 2018 + fyNum; // 令和N年 = 2018+N
  const dm = toHalf(bill[iDate]!).match(/(\d+)月(\d+)日/);
  if (!dm) throw new Error(`${kekkaFile.filename}: 議決月日を解釈できません: ${bill[iDate]}`);
  const [, mo, d] = dm;
  const decidedDate = `${gregYear}-${mo!.padStart(2, "0")}-${d!.padStart(2, "0")}`;
  const decidedDateLabel = `令和${fyNum}年${mo}月${d}日`;

  const rowIdx = decisionTable.indexOf(bill);

  return {
    docType: "council-composition",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    body: "甲府市議会",
    seats,
    asOf,
    factions,
    resolution: {
      billNo,
      billName,
      sessionLabel,
      decidedDate,
      decidedDateLabel,
      result,
      locator: { file: kekkaFile.filename, row: rowIdx },
    },
  };
}
