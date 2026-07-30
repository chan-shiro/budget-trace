// 京都府「主要な施策の成果に関する報告書」パーサ — 事業報告（成果）
//
// 地方自治法233条5項の成果説明書。R6・325p・born-digital（テキスト層あり）。docs §12。
// **款で章立てされた唯一の資料**（第2款 総務費 〜 第11款 災害復旧費 の10款）で、
// 1つの表の中に 科目（項・目）／予算現額・決算額／主要な施策・所管課／実施状況と成果 が並ぶ。
// → `measure` に `N款款名` を入れると derive が款名を取り出して**款ドリルへ直接紐付ける**
//    （さいたま §8f と同じ経路。derive-app-data.ts の `kanName`）。
//
// ⚠⚠ **項・目は出していない**（原典にはある）。理由は下の measure のコメントに書いたとおりで、
//    **科目欄が空のページが続く版面**のため持ち越すしかなく、取りこぼしが1つあると以降の施策に
//    誤った項・目が付く（実測で教育費の 4項高等学校費・5項特別支援学校費 が落ちた）。
//    **款は章見出しから取るので取りこぼしが起きない** — 款ドリルの紐付けは款だけで足りる。
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
  // ⚠ ラベルと金額の間に注記（`（補助金）` 等）や改行が挟まる施策がある。
  //   間隔を 12 文字に絞っていたときは 19 件を取りこぼした（自己検証の assert が捕まえた）。
  // ⚠ **`円` を必須にしない** — `執行額（積立金）278,913,177` のように単位を伴わない施策がある
  //   （実測149件が「直後に N円 が無い」型）。⚠ 3桁以上を要求して、注記中の小さな数を拾わない。
  const m = /執\s*行\s*額[^0-9]{0,60}?([0-9][0-9,]{2,})/.exec(body);
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
    const target = numOrNull(m[2]!);
    const actual = numOrNull(m[3]!);
    // ⚠ **壊れた指標を出さない**（レビュー指摘）。1つの指標に複数の目標が並ぶ施策があり、
    //   素で採ると指標名が目標文字列を飲み込み、`令和12年度` の 12 を目標値として出していた。
    //   その結果 caveats の「実績値がまだ記載されていません」が**事実と逆**の説明になっていた
    //   （原典は実績 25.5% を明記）。**名前が長すぎる／目標が取れない指標は載せない**。
    if (name && name.length <= 40 && target != null) {
      out.push({ category: "成果指標", name, targets: [target], actuals: [actual] });
    }
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

/**
 * ページ装飾（表の外の文字）かどうか。
 * ⚠ **y の閾値で切ってはいけない** — 継続ページは表の1行目が y=63〜90 に来るので、
 *   `y > 90` で落とすと**その施策が丸ごと消える**（レビューで40件以上の欠落が出た）。
 *   落としてよいのは「ページ上部の注記」と「列見出し」だけなので、**テキストで判定する**。
 */
const CHROME_RE =
  /^(?:科|目|予|算|現|額|決|主|要|な|施|策|の|実|況|と|成|果|等|状)$|予算現額及び決算額欄中|内の数字は、歳入歳出決算事項別明細書|^主要な施策$|^科目$/;
const isChrome = (w: Word): boolean => w.y < 100 && CHROME_RE.test(w.text.replace(/\s/g, ""));

/**
 * **テキスト層が破損したページ**（原典 PDF に、同じ表が多重・180°反転で重なって描かれた頁がある）。
 * `pdftotext` は `科 目 予目算 現科 予額…` の交互文字列と `業事等備整宅住営` の反転文字列を返す。
 * ⚠ **Σ も語彙ゲートも効かない**（金額ではない）ので、**ここで機械検出して頁ごと捨てる**。
 * 捨てた頁は件数を返して呼び出し側で assert する（黙って減らさない）。
 */
function isCorruptPage(ws: Word[]): boolean {
  const nameBand = ws.filter((w) => w.x >= 285 && w.x < 400).map((w) => w.text).join("");
  // 事業名に全角カンマ＋数字が混じることは原典では無い（重なった金額が混入した証拠）
  if (/[０-９0-9]，|，[０-９0-9]/.test(nameBand)) return true;
  // 反転して重なった見出しの断片
  // ⚠ `茨`・`芋` は反転して重なった文字の断片として現れる（京都府の施策名には出てこない語）。
  //   ⚠ 一般の漢字なので**名前欄に限って**判定する（本文には出てもよい）。
  return /額行執|策施要主|業事等備整宅住営|茨|芋/.test(nameBand);
}

export function parseKyotofuSeikaHoukoku(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const facts: ProjectReportFact[] = [];
  const opts = (source.parserOptions ?? {}) as { targetFy?: string; corruptPages?: number; execMissedAllowed?: number };
  const targetFy = opts.targetFy ?? source.fiscalYear;
  const hasReal = (t: string) =>
    /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9]/u.test(t);
  let corruptPages = 0;
  let shishiMarkers = 0;
  /** 本文に執行額があるのに金額を取り出せなかった施策（＝取りこぼし。0 でなければ throw） */
  let execMissed = 0;

  for (const file of files) {
    const words = pdfWords(file.path);
    const byPage = new Map<number, Word[]>();
    for (const w of words) (byPage.get(w.page) ?? byPage.set(w.page, []).get(w.page)!).push(w);

    let kan: string | null = null;
    // 施策のバッファは**ページを跨ぐ**（本文が次ページへ続くため。頁末で確定すると執行額を落とす）
    let nameBuf: string[] = [];
    let bukaBuf: string[] = [];
    let startPage: number | null = null;
    let inBuka = false;
    let pendingBody: { text: string; words: Word[] }[] = [];

    const flush = () => {
      const name = nameBuf.join("").trim();
      nameBuf = [];
      bukaBuf = [];
      inBuka = false;
      const body = pendingBody;
      pendingBody = [];
      const page = startPage;
      startPage = null;
      if (!name || page == null || !kan) return;
      const bodyText = body.map((l) => l.text).join("\n");
      const exec = pickExecution(bodyText);
      // ⚠ **本文に執行額があるのに拾えなかったら取りこぼし**（ページ跨ぎで本文が切れていた型）。
      //   マーカーの総数と突き合わせる代わりに**施策単位で照合する**（`３ 執行額` の行頭番号を
      //   数に含めてしまうなど、総数の突合はノイズが多い）。
      if (exec == null && /執\s*行\s*額/.test(bodyText) && /[0-9]/.test(bodyText)) {
        execMissed++;
        if (process.env.KYOTOFU_DEBUG) {
          const at = bodyText.search(/執\s*行\s*額/);
          console.error(`  MISS p.${page} ${name}: ${JSON.stringify(bodyText.slice(at, at + 90))}`);
        }
      }
      facts.push({
        no: String(facts.length + 1),
        name,
        buka: bukaBuf.join("").replace(/[（()）]/g, "").trim(),
        kubun: null,
        implementation: bodyText || null,
        grade: null,
        score: null,
        // ⚠⚠ **款だけを出す**（項・目も原典にはあるが、科目欄が空のページが続く版面のため
        //   持ち越すしかなく、取りこぼしが1つあると以降の施策に誤った項・目が付く。
        //   実測で教育費の 4項高等学校費・5項特別支援学校費 が落ちた）。
        //   **款は章見出しから取るので取りこぼしが起きない** — 款ドリルの紐付けは款だけで足りる。
        measure: kan,
        policy: null,
        cost:
          exec == null
            ? []
            : [{ fy: targetFy, kind: "決算", jigyohi: exec, jinkenhi: null, totalCost: null, ippanZaigen: null }],
        indicators: pickIndicators(body),
        locator: { file: file.filename, page },
      });
    };

    for (const [page, ws] of [...byPage.entries()].sort((a, b) => a[0] - b[0])) {
      const headText = lines(ws.filter((w) => w.y < 90 && w.x >= 60 && w.x < 260))
        .map((l) => l.text)
        .join("");
      const km = /第(\d+)款(.+?)費/.exec(headText);
      if (km) {
        flush(); // 章が変わったら持ち越し中の施策を確定する
        kan = `${km[1]}款${km[2]}費`;
      }
      if (!kan) continue; // 款の章が始まる前（総括表など）は対象外

      if (isCorruptPage(ws)) {
        flush(); // 破損頁の直前までで確定し、この頁は捨てる
        corruptPages++;
        continue;
      }

      const nameLines = lines(ws.filter((w) => w.x >= 285 && w.x < 400 && !isChrome(w)));
      const bodyLines = lines(ws.filter((w) => w.x >= 400 && !isChrome(w)));
      // 件数の網（相模原 §8p-2 の「マーカーの数 = 拾えた数」と同じ考え方）
      for (const l of bodyLines) if (/施策の趣旨等/.test(l.text)) shishiMarkers++;

      let bodyFrom = 0; // このページの本文のうち、今の施策に属する開始位置
      for (const l of nameLines) {
        if (!hasReal(l.text)) continue;
        if (l.xMin >= 295) {
          if (startPage != null) {
            inBuka = true;
            bukaBuf.push(l.text);
          }
          continue;
        }
        // 行内に `（課名）` が同居する型（`事業名（課名）次の事業名`）を括弧で分割する
        let rest = l.text;
        let first = true;
        while (rest) {
          const m = /^([^（(]*)[（(]([^）)]*)[）)](.*)$/.exec(rest);
          const before = m ? m[1]! : rest;
          if (hasReal(before)) {
            if (inBuka && (first || m)) {
              // 新しい施策の始まり — 直前の施策の本文はこの行の手前まで
              pendingBody.push(...bodyLines.slice(bodyFrom).filter((b) => b.y < l.y - 6));
              bodyFrom = bodyLines.findIndex((b) => b.y >= l.y - 6);
              if (bodyFrom < 0) bodyFrom = bodyLines.length;
              flush();
            }
            if (startPage == null) startPage = page;
            nameBuf.push(before);
          }
          if (!m) break;
          if (hasReal(m[2]!) && startPage != null) {
            inBuka = true;
            bukaBuf.push(m[2]!);
          }
          rest = m[3]!;
          first = false;
        }
      }
      // このページの残りの本文は、いま持ち越している施策のもの
      pendingBody.push(...bodyLines.slice(Math.max(0, bodyFrom)));
    }
    flush();
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
  // ⚠ **件数の網**（Σ が立たない資料なので、これが唯一の網）:
  //   ① 破損頁の数が宣言と一致するか ② 施策の数がマーカー数から大きく外れていないか
  //   ③ 執行額を持つ施策の数がマーカー数と一致するか
  const declaredCorrupt = opts.corruptPages ?? 0;
  if (corruptPages !== declaredCorrupt) {
    throw new Error(
      `${source.id}: 破損ページが ${corruptPages} 頁（parserOptions.corruptPages は ${declaredCorrupt}）。` +
        `原典が差し替わった可能性があるので、頁を目で確かめてから宣言を更新してください`,
    );
  }
  // ⚠ **取りこぼしの許容数は宣言する**（黙って落とさない）。残っているのは
  //   **執行額が本文ではなく下部の表に載る施策**（p.262 地域密着型社会資本整備事業＝路線別の表 /
  //   p.320 国直轄災害復旧事業＝事業名別の表 など）で、表の構造が施策ごとに違うため
  //   1つの正規表現では取れない。**金額を推計で埋めるより、載せないほうを採る**。
  const allowed = opts.execMissedAllowed ?? 0;
  if (execMissed !== allowed) {
    throw new Error(
      `${source.id}: 本文に執行額があるのに金額を取り出せなかった施策が ${execMissed} 件（宣言は ${allowed} 件）。` +
        `増えていれば取りこぼし・減っていれば宣言が古いので、頁を目で確かめてから更新してください`,
    );
  }
  if (facts.length < shishiMarkers) {
    throw new Error(
      `${source.id}: 「施策の趣旨等」が ${shishiMarkers} 件あるのに施策は ${facts.length} 件しかありません（結合の疑い）`,
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
    // **原典が施策ごとの金額を印字しない**（金額は目レベル・執行額を持つ施策だけが例外）。
    // 目の額を施策へ配ると二重計上になるので埋めず、宣言で validate に伝える（types.ts 参照）。
    noPerProjectCost: true,
    facts,
  };
}
