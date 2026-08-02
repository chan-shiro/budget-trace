// 横浜市 予算に関する説明書「歳入・歳出予算」CSV — **款項目節（項以下の内訳）**（#191）
//
// **プロジェクト初の「款より下」に届く資料**。全自治体で款別（第1階層）までしか収録できておらず、
// `/roadmap` の later「款より下（項・目・節）の内訳」は甲府市の原典（予算書本編）がウェブ未公開で
// 止まっていた。横浜の CSV は **款・項・目・節（歳出はさらに細節）の5階層**を持つ。
//
// 原本は **zip**（`rNsainyu_saisyutsu.zip`）で、中に歳入・歳出の CSV が1本ずつ入っている。
//   歳入 `年度,会計,会計名称,款,款名称,項,項名称,目,目名称,節,節名称,合計 / 歳入予算合計`
//   歳出 `…,節,節名称,細節,細節名称,合計 / 歳出予算合計`
// ⚠ **歳出の節は地方自治法の性質別区分**（報酬・給料・委託料…）なので、款項目の目的別とは軸が違う。
//   つまりこの資料は**目的別（款項目）× 性質別（節）のクロス表**。
//
// ⚠⚠ **年度差と罠（すべて実測。静かに壊れる順に並べた）**:
//  1. **R8・R7 の歳出には `総計` 行がある**（年度列が `総計`・会計コードが空）。R6 には無い。
//     **落とさないと二重計上**になる（R8 で 3,450,770,850千円）。⚠ **偵察の「全行が葉ノードで
//     小計行が無い」は誤り** — 3年度中2年度に在る。落とすと同時に**葉の Σ と突合する**（差0 を実測）。
//  2. **zip のエントリ名の文字コードが年度で違う**（R8=UTF-8 / R6・R7=CP932）。素朴に名前で
//     選ぶと化ける。→ **basename のバイト列の接頭辞 `010_`（歳入）/ `020_`（歳出）で選ぶ**。
//  3. **R6 だけ2列目の見出しが `会計` でなく `コード`**、かつ**会計コードがゼロ埋めされない**
//     （`1` であって `01` ではない）。→ 見出しは位置で読み、コードは2桁へ揃える。
//  4. **単位がファイルのどこにも書かれていない**（練馬型）。**千円**は外部突合で確定した
//     （一般会計 Σ = 既収録の款別 parsed と差0）。registry の `unit` で宣言する。
//
// **検証の網**（validate が見る）:
//  - 一般会計の **歳入 Σ = 歳出 Σ**（予算は均衡編成。⚠ **R7 はここが破れる**＝下記）
//  - 原典の `総計` 行 = 全会計の葉の Σ（在る年度だけ）
//  - 款項目節の完全キーで重複が無い・空セルが無い
//
// ⚠⚠ **R7 は収録しない**（2026-08-02 実測）。**歳入 CSV だけが +379,539千円 大きい**:
//   一般会計 歳入 1,984,787,527 vs 歳出 1,984,407,988（**CSV 自身の中で均衡が破れている**）。
//   既収録の款別 parsed・R8 PDF の前年度列とも歳出側が一致するので**歳入 CSV が単独で外れている**。
//   zip 内 mtime も歳入 2025-01-30 / 歳出 2025-07-15 で**歳出だけ後から差し替えられている**。
//   **原因が未確認のまま差0前提のゲートを緩めると「静かに壊れる」型に化ける**ので、
//   `unrecordable.ts` に理由と確認日つきで記録して収録しない。
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import type { BudgetDetailDoc, BudgetDetailFact, SourceEntry } from "../types";

// 0.2.0: #192 で前年度列つきの XLSX 版を足したのに伴い、共通スキーマへ prevAmount を追加（CSV 版は常に null）
export const PARSER_VERSION = "0.2.0";

interface Options {
  /** 一般会計の会計コード（既定 "01"）。ゼロ埋め後の2桁で書く */
  generalAccountCode?: string;
}

/** zip から `010_`/`020_` で始まるエントリを取り出す（エントリ名の文字コードに依存しない） */
function readZipEntries(zipPath: string): { revenue: string; expenditure: string } {
  // `unzip -Z1` は名前を出すが化けるので、**インデックス**で取り出す。
  // -p で標準出力に出せるが名前指定が要るため、ここは python を使わず `unzip -l` の順序に頼らない:
  // エントリ名はバイト列で来るので、`unzip -Z -1` の出力をバイトで受けて接頭辞判定する。
  const names = execFileSync("unzip", ["-Z", "-1", zipPath], { maxBuffer: 1 << 28 });
  const lines = names.toString("binary").split("\n").filter((l) => l.trim() !== "");
  let rev: string | null = null;
  let exp: string | null = null;
  for (const line of lines) {
    const base = line.split("/").pop() ?? "";
    if (base.startsWith("010_")) rev = line;
    else if (base.startsWith("020_")) exp = line;
  }
  if (!rev || !exp) {
    throw new Error(
      `${zipPath}: zip の中に 010_（歳入）/ 020_（歳出）で始まるエントリが見つかりません` +
        `（見つかったエントリ: ${lines.length}件）。エントリ名の文字コードは年度で違うので**接頭辞のバイト列**で選ぶこと`,
    );
  }
  const grab = (entry: string): string => {
    // 名前をそのまま渡すと化けた名前で参照できないので、-p でインデックス指定はできない。
    // ここは `unzip -p <zip> <glob>` を使い、接頭辞のワイルドカードで一意に取り出す。
    const base = entry.split("/").pop()!;
    const prefix = base.slice(0, 4); // "010_" / "020_"
    const buf = execFileSync("unzip", ["-p", zipPath, `*${prefix}*`], { maxBuffer: 1 << 28 });
    let s = buf.toString("utf8");
    if (s.charCodeAt(0) === 0xfeff) s = s.slice(1); // BOM
    return s;
  };
  return { revenue: grab(rev), expenditure: grab(exp) };
}

/** RFC4180 の最小実装（このファイルは引用符もエスケープも使わないが、混入に備える） */
function parseCsv(text: string): string[][] {
  const out: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++; } else quoted = false;
      } else cur += c;
      continue;
    }
    if (c === '"') { quoted = true; continue; }
    if (c === ",") { row.push(cur); cur = ""; continue; }
    if (c === "\r") continue;
    if (c === "\n") { row.push(cur); out.push(row); row = []; cur = ""; continue; }
    cur += c;
  }
  if (cur !== "" || row.length) { row.push(cur); out.push(row); }
  return out.filter((r) => r.some((c) => c.trim() !== ""));
}

export function parseYokohamaYosanMeisaiCsv(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): BudgetDetailDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  const generalCode = opts.generalAccountCode ?? "01";
  const zip = files.find((f) => f.filename.toLowerCase().endsWith(".zip"));
  if (!zip) throw new Error(`${source.id}: zip が見つかりません（raw: ${files.map((f) => f.filename).join(", ")}）`);
  void readFileSync; // raw の存在は fetch が保証する

  const { revenue, expenditure } = readZipEntries(zip.path);
  const facts: BudgetDetailFact[] = [];
  let statedRevenueTotal: number | null = null;
  let statedExpenditureTotal: number | null = null;

  const load = (text: string, side: "revenue" | "expenditure") => {
    const rows = parseCsv(text);
    const head = rows[0]!;
    // 見出しは位置で読む。⚠ R6 だけ2列目が `コード`（R7・R8 は `会計`）
    const wantLen = side === "expenditure" ? 14 : 12;
    if (head.length !== wantLen) {
      throw new Error(`${source.id} ${side}: 列数が ${head.length}（期待 ${wantLen}）。様式が変わった可能性`);
    }
    if (!/^(会計|コード)$/.test(head[1]!.trim())) {
      throw new Error(`${source.id} ${side}: 2列目の見出しが「${head[1]}」（期待 会計 / コード）`);
    }
    for (const r of rows.slice(1)) {
      // ⚠ `総計` 行（年度列が `総計`・会計コードが空）。残すと二重計上になる
      if (r[0]!.trim() === "総計") {
        const v = Number(r[r.length - 1]!.replace(/,/g, ""));
        // ⚠ **歳入側も捨てない**（現状の原典には出ないが、出たら検証の錨になる）
        if (side === "expenditure") statedExpenditureTotal = v;
        else statedRevenueTotal = v;
        continue;
      }
      const acc = r[1]!.trim().padStart(2, "0"); // ⚠ R6 はゼロ埋めされない
      const amount = Number(r[r.length - 1]!.replace(/,/g, ""));
      if (!Number.isFinite(amount)) {
        throw new Error(`${source.id} ${side}: 金額が数値でない行があります（${r.slice(0, 6).join(",")}）`);
      }
      facts.push({
        side,
        accountCode: acc,
        accountName: r[2]!.trim(),
        kanNo: r[3]!.trim(), kanName: r[4]!.trim(),
        koNo: r[5]!.trim(), koName: r[6]!.trim(),
        mokuNo: r[7]!.trim(), mokuName: r[8]!.trim(),
        setsuNo: r[9]!.trim(), setsuName: r[10]!.trim(),
        saisetsuNo: side === "expenditure" ? r[11]!.trim() : null,
        saisetsuName: side === "expenditure" ? r[12]!.trim() : null,
        amount,
        prevAmount: null, // CSV 版は前年度列を持たない（XLSX 版＝#192 は持つ）
        locator: { file: zip.filename, sheet: side === "revenue" ? "010_歳入" : "020_歳出" },
      });
    }
  };
  load(revenue, "revenue");
  load(expenditure, "expenditure");

  // 空セルは1つも無いのが原典の性質（実測）。出たら様式が変わったので落とす
  for (const f of facts) {
    for (const [k, v] of Object.entries(f)) {
      if (typeof v === "string" && v === "" && !k.startsWith("saisetsu")) {
        throw new Error(`${source.id}: 空セルがあります（${f.side} ${f.kanName}/${f.koName}/${f.mokuName} の ${k}）`);
      }
    }
  }
  // 完全キーの重複が無いのも原典の性質（実測 0）
  const seen = new Set<string>();
  for (const f of facts) {
    const key = [f.side, f.accountCode, f.kanNo, f.koNo, f.mokuNo, f.setsuNo, f.saisetsuNo ?? ""].join("/");
    if (seen.has(key)) {
      throw new Error(`${source.id}: 款項目節の完全キーが重複しています（${key}）— 小計行を葉として拾っていないか疑うこと`);
    }
    seen.add(key);
  }

  const sum = (pred: (f: BudgetDetailFact) => boolean) => facts.filter(pred).reduce((a, b) => a + b.amount, 0);
  const generalRevenueTotal = sum((f) => f.side === "revenue" && f.accountCode === generalCode);
  const generalExpenditureTotal = sum((f) => f.side === "expenditure" && f.accountCode === generalCode);
  if (generalRevenueTotal === 0 || generalExpenditureTotal === 0) {
    throw new Error(`${source.id}: 一般会計（会計コード ${generalCode}）の行がありません`);
  }

  return {
    docType: "budget-detail",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    unit: "thousandYen",
    fiscalYear: source.fiscalYear,
    generalRevenueTotal,
    generalExpenditureTotal,
    allRevenueTotal: sum((f) => f.side === "revenue"),
    allExpenditureTotal: sum((f) => f.side === "expenditure"),
    prevRevenueTotal: null,
    prevExpenditureTotal: null,
    statedRevenueTotal,
    statedExpenditureTotal,
    facts,
  };
}
