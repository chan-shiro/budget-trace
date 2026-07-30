// 京都府「主要な施策の成果に関する報告書」パーサ — 事業報告（成果）
//
// 地方自治法233条5項の成果説明書。R6・325p・born-digital（テキスト層あり）。docs §12。
// **款で章立てされた唯一の資料**（第2款 総務費 〜 第11款 災害復旧費 の10款）で、
// 1つの表の中に 科目（項・目）／予算現額・決算額／主要な施策・所管課／実施状況と成果 が並ぶ。
// → `measure` を `N款款名/N項項名/N目目名` の形にすると derive が款名を取り出して
//    **款ドリルへ直接紐付ける**（さいたま §8f と同じ経路。derive-app-data.ts の `kanName`）。
//
// ⚠⚠ **座標で読む**（`-layout` では列が混ざる）。x 帯は実測値:
//   科目 〜140 / 予算現額・決算額 140〜285 / 主要な施策・所管課 285〜400 / 実施状況と成果 400〜
//
// ⚠⚠ **項番号は全角（`１`）・目番号は半角（`1`）で混在する**（実測）。
//   正規化しないと**項が丸ごと落ちる**（プロトタイプで実際に落ちた）。
//
// ⚠ **施策の区切りは「成果欄の見出し」ではなく「所管課の括弧ブロック」で取る**。
//   `施策の趣旨等` をアンカーにする実装を先に試したが、**その見出しを持たない施策があり
//   2件が1件に結合した**（プロトタイプで実測）。名前欄は
//     事業名（x≈291・折返しあり） → `（` で始まる所管課ブロック（x≈295〜360）
//   の順で必ず並ぶので、**括弧の出現を施策の終端**とするほうが構造的に強い。
//
// ⚠ **ページ上部の注記が名前欄の x 帯に入る**（`予算現額及び決算額欄中（` が x=390.5・y=72.4）。
//   本文は y>90 に限る。款の見出しも同じ理由で x<260 に限る（注記を款名に連結させない）。
//
// **金額は目レベルであって施策レベルではない** — 施策ごとの額は成果欄の本文にある
// `３ 執行額 …円` だけ。**目の金額を施策へ配らない**（二重計上になる）。執行額を持たない施策は
// `cost: []` にする（原典に無いものを推計しない）。
//
// 成果指標は**2形式**ある（片方だけ拾うと半分落ちる。実測: 行内形式64件＋表形式）:
//   ① 表形式  `指 標 / 目 標 / 実 績` のミニ表（成果欄の中に3カラム）
//   ② 行内形式 `指標：府内の留学生数 目標：13,550 人 実績：14,358 人`
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Word {
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
}

/** 制御文字（原典の空セルが \u0007 で出てくる）と空白を落とす */
const clean = (s: string): string => s.replace(/[\u0000-\u001f\u007f]/g, "").replace(/\s/g, "").trim();

/** 全角数字を半角へ（項番号が全角・目番号が半角で混在するため） */
const zenNum = (s: string): string =>
  s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));

function pdfWords(filePath: string): Word[] {
  const out = execFileSync("pdftotext", ["-tsv", filePath, "-"], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  const words: Word[] = [];
  let page = 0;
  for (const line of out.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12) continue;
    const text = c[11]!;
    if (text === "###PAGE###") {
      page++;
      continue;
    }
    if (!text || text.startsWith("###")) continue;
    words.push({ page, x: +c[6]!, y: +c[7]!, w: +c[8]!, h: +c[9]!, text });
  }
  return words;
}

/** 同じ y（±3pt）の単語をまとめて x 順に連結する */
function lines(words: Word[]): { y: number; xMin: number; text: string; words: Word[] }[] {
  const rows: Word[][] = [];
  for (const w of [...words].sort((a, b) => a.y - b.y || a.x - b.x)) {
    const last = rows[rows.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) < 3) last.push(w);
    else rows.push([w]);
  }
  return rows.map((r) => {
    // ⚠ **行内は必ず x で並べ替えてから連結する**。外側のソートは (y, x) なので、
    //   同じ行でも y が 1pt でも小さい語（右カラムの数値は行の基準線より上に来ることがある）が
    //   先頭に回り、`13,550府内の留学生数人14,358人` のように**列が入れ替わる**。
    //   これを直すまで成果指標は 25/64・執行額は 6/520 しか拾えていなかった（実測）。
    const sorted = [...r].sort((a, b) => a.x - b.x);
    return {
      y: r[0]!.y,
      xMin: Math.min(...r.map((w) => w.x)),
      text: zenNum(clean(sorted.map((w) => w.text).join(""))),
      words: sorted,
    };
  });
}

/** 成果欄の本文から `３ 執行額 …円` を拾う（円単位。無ければ null） */
function pickExecution(body: string): number | null {
  const m = /執\s*行\s*額[^0-9]{0,12}([0-9,]+)\s*円/.exec(body);
  if (!m) return null;
  const v = Number(m[1]!.replace(/,/g, ""));
  return Number.isFinite(v) ? v : null;
}

/**
 * 成果欄の本文から成果指標を拾う（①表形式・②行内形式の両方）。
 *
 * ⚠ **表形式は文字列ではなく座標で列を切る**。値は右寄せなので、`名前 目標 実績` を
 *   正規表現で切ると `府内の留学生数13,550人14,358人` から `13,550` の途中で割れる（実測）。
 *   → ヘッダ行の `目`・`実` の x を境界にして、行の単語を name / target / actual に振り分ける。
 */
function pickIndicators(
  bodyLines: { text: string; words: Word[] }[],
): ProjectReportFact["indicators"] {
  const out: ProjectReportFact["indicators"] = [];
  // ② 行内形式: `指標：… 目標：… 実績：…`
  for (const l of bodyLines) {
    const m = /指標[:：](.+?)目標[:：](.+?)実績[:：](.+)$/.exec(l.text);
    if (!m) continue;
    const name = clean(m[1]!);
    if (name) out.push({ category: "成果指標", name, targets: [numOrNull(m[2]!)], actuals: [numOrNull(m[3]!)] });
  }
  // ① 表形式: ヘッダ `指標 目標 実績` の x を列境界に使う
  const headIdx = bodyLines.findIndex((l) => /^指標.{0,4}目標.{0,4}実績$/.test(l.text));
  if (headIdx >= 0) {
    const head = bodyLines[headIdx]!.words;
    const xOf = (ch: string) => head.find((w) => w.text === ch)?.x ?? null;
    const xMoku = xOf("目");
    const xJitsu = xOf("実");
    if (xMoku != null && xJitsu != null) {
      for (const l of bodyLines.slice(headIdx + 1)) {
        const nameW = l.words.filter((w) => w.x < xMoku - 20);
        const tgtW = l.words.filter((w) => w.x >= xMoku - 20 && w.x < xJitsu - 20);
        const actW = l.words.filter((w) => w.x >= xJitsu - 20);
        const name = clean(nameW.map((w) => w.text).join(""));
        // 表は連続する。名前が無い／数値が片側でも欠けたら表の終わり
        if (!name || tgtW.length === 0 || actW.length === 0) break;
        if (/^[0-9,]/.test(name)) break;
        out.push({
          category: "成果指標",
          name,
          targets: [numOrNull(clean(tgtW.map((w) => w.text).join("")))],
          actuals: [numOrNull(clean(actW.map((w) => w.text).join("")))],
        });
      }
    }
  }
  return out;
}

const numOrNull = (s: string): number | null => {
  const m = /-?[0-9][0-9,]*(?:\.[0-9]+)?/.exec(s);
  if (!m) return null;
  const v = Number(m[0].replace(/,/g, ""));
  return Number.isFinite(v) ? v : null;
};

export function parseKyotofuSeikaHoukoku(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const facts: ProjectReportFact[] = [];
  const opts = (source.parserOptions ?? {}) as { targetFy?: string };
  const targetFy = opts.targetFy ?? source.fiscalYear;

  for (const file of files) {
    const words = pdfWords(file.path);
    const byPage = new Map<number, Word[]>();
    for (const w of words) (byPage.get(w.page) ?? byPage.set(w.page, []).get(w.page)!).push(w);

    // 款・項・目は**ページを跨いで持ち越す**（章の途中でページが変わるため）
    let kan: string | null = null;
    let kou: string | null = null;
    let moku: string | null = null;

    for (const [page, ws] of [...byPage.entries()].sort((a, b) => a[0] - b[0])) {
      // --- 款の章見出し（ページ上部・x<260。⚠ 注記を連結させないため x を絞る） ---
      const headText = lines(ws.filter((w) => w.y < 90 && w.x >= 60 && w.x < 260))
        .map((l) => l.text)
        .join("");
      const km = /第(\d+)款(.+?)費/.exec(headText);
      if (km) {
        kan = `${km[1]}款${km[2]}費`;
        kou = null;
        moku = null;
      }
      if (!kan) continue; // 款の章が始まる前（総括表など）は対象外

      // --- 科目欄（x<140）の項・目。y つきで拾い、施策の y と突き合わせる ---
      const kamokuEvents: { y: number; kou?: string; moku?: string }[] = [];
      for (const l of lines(ws.filter((w) => w.x < 140 && w.y > 90))) {
        const m = /^(\d+)([^\d\s（(].*)$/.exec(l.text);
        if (!m) continue;
        if (l.xMin < 62) kamokuEvents.push({ y: l.y, kou: `${m[1]}項${m[2]}` });
        else if (l.xMin < 100) kamokuEvents.push({ y: l.y, moku: `${m[1]}目${m[2]}` });
      }
      kamokuEvents.sort((a, b) => a.y - b.y);

      // --- 名前欄（285〜400）を「事業名 → 所管課の括弧ブロック」で施策に切る ---
      const nameLines = lines(ws.filter((w) => w.x >= 285 && w.x < 400 && w.y > 90));
      const bodyLines = lines(ws.filter((w) => w.x >= 400 && w.y > 90));

      let nameBuf: string[] = [];
      let bukaBuf: string[] = [];
      let startY: number | null = null;
      let inBuka = false;
      const flush = (endY: number) => {
        const name = nameBuf.join("").trim();
        if (!name || startY == null) {
          nameBuf = [];
          bukaBuf = [];
          inBuka = false;
          return;
        }
        // この施策の位置に効いている項・目（施策の開始 y より前の最後のイベント）
        for (const e of kamokuEvents) {
          if (e.y > startY + 6) break;
          if (e.kou) {
            kou = e.kou;
            moku = null;
          }
          if (e.moku) moku = e.moku;
        }
        const body = bodyLines.filter((l) => l.y >= startY! - 6 && l.y < endY);
        const bodyText = body.map((l) => l.text).join("\n");
        const exec = pickExecution(bodyText);
        const measure = kan && kou && moku ? `${kan}/${kou}/${moku}` : kan ? `${kan}` : "";
        facts.push({
          no: String(facts.length + 1),
          name,
          buka: bukaBuf.join("").replace(/[（()）]/g, "").trim(),
          kubun: null,
          implementation: bodyText || null,
          grade: null,
          score: null,
          measure,
          policy: null,
          cost:
            exec == null
              ? []
              : [{ fy: targetFy, kind: "決算", jigyohi: exec, jinkenhi: null, totalCost: null, ippanZaigen: null }],
          indicators: pickIndicators(body),
          locator: { file: file.filename, page },
        });
        nameBuf = [];
        bukaBuf = [];
        startY = null;
        inBuka = false;
      };

      // ⚠ **所管課は「括弧」ではなく「x のインデント」で見分ける**。
      //   事業名は必ず x≈291（列の左端）から始まり、所管課は x≈304〜314 に字下げされる。
      //   括弧 `（ ）` は装飾で、**無い施策が実在する**（p.15 ベンチャーチャレンジ職員育成事業）。
      //   括弧をアンカーにしていたときは、そこで課名が事業名に飲み込まれて
      //   `ベンチャーチャレンジ職員育成事業職員総務課安心・安全まちづくり推進課…` になっていた（実測）。
      // **事業名と所管課は「行の左端」で見分ける**（全325ページの x 分布を測って決めた）:
      //   事業名の左端は **291pt に集中**（656語）、所管課は **297〜315pt**（字下げ）。→ 境界は 295。
      // ⚠ **括弧 `（ ）` をアンカーにしてはいけない** — 括弧の無い施策が実在する（p.15）。
      // ⚠ **単語ごとに x で振り分けてもいけない** — 課名は `職 員 総 務 課` と1文字ずつ別語に
      //   なって x が 304〜361 に散るので、単語単位だと事業名の途中で切れて断片が量産される
      //   （実測: 名前2字未満が50件出た）。**行の左端**だけが安定した信号。
      const hasReal = (s: string) => /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9]/u.test(s);
      for (const l of nameLines) {
        if (/^主要な施策$/.test(l.text)) continue; // 列見出し
        if (!hasReal(l.text)) continue; // 罫線・括弧だけの行
        if (l.xMin >= 295) {
          // 所管課ブロック。名前がまだ無ければページ跨ぎの継続なので捨てる
          if (startY != null) {
            inBuka = true;
            bukaBuf.push(l.text);
          }
          continue;
        }
        // 左端から始まる行 = 事業名。
        // ⚠ **ただし行内に `（課名）` が同居することがある**（p.23・p.32 等。3つ目の型）:
        //   `向日町競輪場周辺地域まちづくり協働検討費（文化施設政策監付）地域振興計画推進事業`
        //   → 括弧の前 = 今の施策名の続き / 括弧の中 = 所管課 / **括弧の後ろ = 次の施策の名前**。
        //   これを分けないと2件が1件に潰れる（実測25件）。
        let rest = l.text;
        let first = true;
        while (rest) {
          const m = /^([^（(]*)[（(]([^）)]*)[）)](.*)$/.exec(rest);
          if (!m) {
            if (hasReal(rest)) {
              if (inBuka) flush(l.y);
              if (startY == null) startY = l.y;
              nameBuf.push(rest);
            }
            break;
          }
          const [, before, inside, after] = m;
          if (hasReal(before!)) {
            if (inBuka && first) flush(l.y);
            if (startY == null) startY = l.y;
            nameBuf.push(before!);
          }
          if (hasReal(inside!) && startY != null) {
            inBuka = true;
            bukaBuf.push(inside!);
          }
          rest = after!;
          first = false;
        }
      }
      flush(1e9);
    }
  }

  if (facts.length === 0) {
    throw new Error(
      `${source.id}: 施策を1件も抽出できませんでした（款の章見出し・名前欄の x 帯を確認してください）`,
    );
  }
  // 自己検証: 款が解決できない施策があってはならない（款ドリルへの紐付けが目的の資料なので）
  const noKan = facts.filter((f) => !/^\d+款/.test(f.measure ?? ""));
  if (noKan.length > 0) {
    throw new Error(
      `${source.id}: 款を解決できない施策が ${noKan.length} 件あります（例: ${noKan[0]!.name} p.${noKan[0]!.locator.page}）`,
    );
  }

  return {
    docType: "project-report",
    sourceId: source.id,
    parser: "kyotofu-seika-houkoku",
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    targetFy,
    facts,
  };
}
