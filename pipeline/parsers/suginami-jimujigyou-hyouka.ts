// 杉並区 事務事業評価シート — 特別区で初の事業報告（#163）
//
// **1事業ちょうど2ページ**（R7 は 590事業 / 1,180ページ）。**款項目事業コードを持つ**ので、
// 横浜（§8d）と同じく**款 → 事業 → 成果**が一本で繋がる（款1〜11 が既収録の
// `suginami-yosansho-*` の歳出11款と番号まで一致することを実測した）。
//
// ⚠ **既存の事業報告パーサ4本はどれも当たらない**（横浜・川崎・札幌・北九州すべて throw を実測）。
//   杉並は「款項目事業＋整理番号」で、川崎の8桁コードも札幌の会計コードも持たない。
//
// ⚠⚠ **crop（`pdftotext -x/-W`）を使っていない**。表とグラフを分ける x 境界は
//   **金額表の帯（y≳455）でだけ**成り立ち、ヘッダ部では **23,957 トークンが境界を跨ぐ**
//   （`連絡先` `電話番号` `予算事業区分` …）。crop すると**ヘッダが壊れる**。
//   → **座標で直接絞る**（§9 の「crop より pdfPageWords + 窓のほうが安全」）。
//
// ⚠ **行ラベルは縦に割れる**（`常勤職員分` / `(再任用含)` / 縦書きの `人件費`）ので、
//   9系統の名前は**位置で決める**。位置決めが正しいことの証人は**算術3本**（下記ゲート）で、
//   順序が違えば算術が破れて落ちる。**ラベルの字面には頼らない**。
import { execFileSync } from "node:child_process";
import type { ProjectReportDoc, ProjectReportFact, SourceEntry } from "../types";

export const PARSER_VERSION = "0.1.0";

interface Options {
  /**
   * 一般会計の整理番号の上限。⚠ **既定は自動検出**（款番号が減る最初の地点＝会計の切れ目）。
   * **シートに会計欄が無い**ので横浜の会計名フィルタは使えない。宣言した場合は検出結果と
   * 突き合わせ、食い違えば throw する（片方だけを信じない）。
   */
  generalAccountSeiriMax?: number;
  /** 表とグラフを分ける右境界（pt）。金額表・指標の帯にだけ効かせる */
  tableRightX?: number;
}

interface W {
  page: number;
  x0: number;
  x1: number;
  y: number;
  t: string;
}

/** `pdftotext -tsv` を1ファイル1回だけ叩いて、ページごとの語（座標つき）に分ける */
function words(path: string): Map<number, W[]> {
  const tsv = execFileSync("pdftotext", ["-tsv", path, "-"], { maxBuffer: 1 << 30 }).toString("utf8");
  const out = new Map<number, W[]>();
  for (const line of tsv.split("\n").slice(1)) {
    const c = line.split("\t");
    if (c.length < 12 || c[0] !== "5") continue;
    const t = c[11]!;
    if (!t.trim()) continue;
    const page = Number(c[1]);
    const x0 = Number(c[6]);
    const y = Number(c[7]);
    const x1 = x0 + Number(c[8]);
    (out.get(page) ?? out.set(page, []).get(page)!).push({ page, x0, x1, y, t });
  }
  return out;
}

/** ページごとの `-layout` テキスト（ヘッダの文字列抽出用。座標が要らない項目はこちらが素直） */
function layoutPages(path: string): string[] {
  return execFileSync("pdftotext", ["-layout", path, "-"], { maxBuffer: 1 << 30 })
    .toString("utf8")
    .split("\f");
}

const num = (s: string): number | null => {
  const v = s.replace(/[,\s%]/g, "");
  if (v === "-" || v === "―" || v === "－" || v === "") return null;
  return /^-?\d+(\.\d+)?$/.test(v) ? Number(v) : null;
};
/** 科目名・事業名からセル内改行由来の空白を落とす（#192 と同じ判断。原典の語に意味のある空白は無い） */
const clean = (s: string): string => s.replace(/\s+/g, " ").trim();

/** 同じ y の語を1行にまとめる（`tol` pt 以内を同一行とみなす） */
function rowsOf(ws: W[], tol = 3): W[][] {
  const sorted = [...ws].sort((a, b) => a.y - b.y || a.x0 - b.x0);
  const out: W[][] = [];
  for (const w of sorted) {
    const last = out[out.length - 1];
    if (last && Math.abs(last[0]!.y - w.y) <= tol) last.push(w);
    else out.push([w]);
  }
  for (const r of out) r.sort((a, b) => a.x0 - b.x0);
  return out;
}

/** 9系統 × 3行（予算額/実績額/執行率）。**位置で決め、算術で検証する** */
const SERIES = [
  "事業費",
  "常勤職員分(再任用含)",
  "上記以外の職員",
  "総事業費(事業費+人件費)",
  "受益者負担分①",
  "国・都からの補助金②",
  "その他の補助金等③",
  "特定財源(①+②+③)",
  "差引：一般財源(総事業費-特定財源)",
] as const;

/** Ⅱ.事業の改善の方向性の語彙（複数回答）。**長いものから当てる**（前方一致で切るため） */
const IMPROVEMENTS = [
  "手段・方法の見直し（改善）",
  "実施主体の見直し",
  "対象の見直し",
  "現状維持",
  "廃止",
];

export function parseSuginamiJimujigyouHyouka(
  files: { path: string; filename: string }[],
  source: SourceEntry,
): ProjectReportDoc {
  const opts = (source.parserOptions ?? {}) as Options;
  const RIGHT = opts.tableRightX ?? 435;
  const facts: ProjectReportFact[] = [];

  // ⚠ 目次は**件数ゲートの錨**にだけ使う（事実は取らない）
  const toc = files.find((f) => /mokuzi_seiribanngou/.test(f.filename));
  let declared: number | null = null;
  if (toc) {
    const txt = execFileSync("pdftotext", ["-layout", toc.path, "-"], { maxBuffer: 1 << 28 }).toString("utf8");
    const nos = [...txt.matchAll(/^\s*(\d{1,3})\s+\S/gm)].map((m) => Number(m[1]));
    declared = nos.length ? Math.max(...nos) : null;
  }

  const HEAD =
    /事務事業名称\s+(.+?)\s{2,}款\s*(\d+)\s+項\s*(\d+)\s+目\s*(\d+)\s+事業\s*(\d+)\s+整理番号\s+(\d+)/;

  for (const f of files) {
    if (/mokuzi/.test(f.filename)) continue; // 目次はシートではない
    const pages = layoutPages(f.path);
    const byPage = words(f.path);
    const sheetPages: number[] = [];
    pages.forEach((p, i) => {
      if (/令和\d+年度\s*杉並区事務事業評価シート/.test(p)) sheetPages.push(i + 1);
    });
    // ⚠ **必ず奇数ページ始まり・2ページ1組**（590/590 実測）。破れたら様式が変わっている
    for (const p of sheetPages) {
      if (p % 2 === 0) {
        throw new Error(`${f.filename} p.${p}: シートが偶数ページから始まっています（1事業2ページの前提が崩れた）`);
      }
    }
    const realPages = pages.filter((_, i) => i < byPage.size || byPage.has(i + 1)).length;
    if (sheetPages.length * 2 !== [...byPage.keys()].length && sheetPages.length * 2 !== realPages) {
      throw new Error(
        `${f.filename}: ページ数 ${[...byPage.keys()].length} がシート数 ${sheetPages.length} の2倍ではありません`,
      );
    }

    for (const p of sheetPages) {
      const head = HEAD.exec(pages[p - 1] ?? "");
      if (!head) throw new Error(`${f.filename} p.${p}: 事務事業名称/款項目事業/整理番号の行を抽出できません`);
      const [, rawName, kanNo, koNo, mokuNo, jigyoNo, seiri] = head;
      const name = clean(rawName!);
      const text1 = pages[p - 1] ?? "";
      const text2 = pages[p] ?? "";
      // ⚠ **`\s` は改行を跨ぐ** — `Ⅱ.事業の改善の方向性` に値が無いシートでは、
      //   次の行のラベル `Ⅱ.事業の改善の方向性の理由` を値として拾ってしまった（実測 r7_10 p.1）。
      //   ラベルと値は**同じ行**にあるので、行内の空白だけを許す（`H` を使う）。
      const pick = (re: RegExp): string | null => {
        const m = re.exec(text1) ?? re.exec(text2);
        return m ? clean(m[1]!) : null;
      };

      // ⚠ **指標の値は x=400〜565 にある**ので、金額表用の右境界（RIGHT）で切った語では取れない。
      //   指標のブロックだけ**ページの全語**を使う（切ったまま使って targets が全件空になった＝実測）。
      const wAll = byPage.get(p) ?? [];
      const w1 = wAll.filter((w) => w.x1 <= RIGHT);

      // ---- 金額表: 9系統 × 3行 × 6年度 -------------------------------------
      const yearRow = rowsOf(w1).find((r) => r.some((w) => w.t === "単位") && r.filter((w) => /^令和\d+年度$/.test(w.t)).length >= 4);
      if (!yearRow) throw new Error(`${f.filename} p.${p} 「${name}」: 金額表の年度見出し行（単位 令和N年度…）がありません`);
      const fys = yearRow.filter((w) => /^令和\d+年度$/.test(w.t)).map((w) => `R${/令和(\d+)/.exec(w.t)![1]}`);

      const money = rowsOf(w1.filter((w) => w.y > yearRow[0]!.y + 2))
        .map((r) => {
          const label = r.find((w) => /^(予算額|実績額|執行率)$/.test(w.t) && w.x0 > 130 && w.x0 < 200);
          if (!label) return null;
          const vals = r.filter((w) => w.x0 > label.x1);
          return { kind: label.t, vals: vals.map((w) => w.t) };
        })
        .filter((r): r is { kind: string; vals: string[] } => r !== null);

      if (money.length !== SERIES.length * 3) {
        throw new Error(
          `${f.filename} p.${p} 「${name}」: 金額表の行が ${money.length} 行です（期待 ${SERIES.length * 3}＝9系統×3）`,
        );
      }
      for (const r of money) {
        if (r.vals.length !== fys.length) {
          throw new Error(
            `${f.filename} p.${p} 「${name}」: 「${r.kind}」の値が ${r.vals.length} 個です（期待 ${fys.length}）。空セルは原典に無いはず`,
          );
        }
      }
      // 3行1組が 予算額→実績額→執行率 の順であること（位置決めの前提）
      for (let i = 0; i < money.length; i += 3) {
        const got = [money[i]!.kind, money[i + 1]!.kind, money[i + 2]!.kind].join("/");
        if (got !== "予算額/実績額/執行率") {
          throw new Error(`${f.filename} p.${p} 「${name}」: ${i / 3 + 1}系統目の行が ${got} です（期待 予算額/実績額/執行率）`);
        }
      }
      /** 系統 index → 年度 index → 値 */
      const val = (s: number, kind: 0 | 1, y: number) => num(money[s * 3 + kind]!.vals[y]!);

      // ★ **算術3本が「位置で決めた系統名」の証人**（順序が違えば必ず破れる）
      for (let y = 0; y < fys.length; y++) {
        for (const kind of [0, 1] as const) {
          const g = (s: number) => val(s, kind, y);
          const chk = (label: string, want: number | null, parts: (number | null)[]) => {
            if (want == null || parts.some((v) => v == null)) return;
            const sum = parts.reduce((a, b) => a! + b!, 0)!;
            if (sum !== want) {
              throw new Error(
                `${f.filename} p.${p} 「${name}」${fys[y]} ${kind === 0 ? "予算額" : "実績額"}: ` +
                  `${label} が ${want.toLocaleString()} なのに内訳の和は ${sum.toLocaleString()} です（系統の位置決めを疑うこと）`,
              );
            }
          };
          chk("総事業費", g(3), [g(0), g(1), g(2)]);
          chk("特定財源", g(7), [g(4), g(5), g(6)]);
          if (g(3) != null && g(7) != null && g(8) != null && g(3)! - g(7)! !== g(8)!) {
            throw new Error(
              `${f.filename} p.${p} 「${name}」${fys[y]}: 差引一般財源 ${g(8)!.toLocaleString()} が ` +
                `総事業費 ${g(3)!.toLocaleString()} − 特定財源 ${g(7)!.toLocaleString()} と一致しません`,
            );
          }
        }
      }

      const cost = fys.flatMap((fy, y) =>
        ([
          ["予算", 0],
          ["実績", 1],
        ] as const).map(([kind, k]) => ({
          fy,
          kind,
          jigyohi: val(0, k, y),
          ippanZaigen: val(8, k, y),
          totalCost: val(3, k, y),
          // ⚠ 人件費は原典が2本（常勤/それ以外）。合算して持つが、**款08「職員費」にも
          //   別立てで載る**ので、Σ を歳出総額と並べてはいけない（docs に明記）
          jinkenhi: val(1, k, y) == null && val(2, k, y) == null ? null : (val(1, k, y) ?? 0) + (val(2, k, y) ?? 0),
          tokuteiZaigen: val(7, k, y),
          jueki: val(4, k, y),
          kokuToHojokin: val(5, k, y),
          sonotaHojokin: val(6, k, y),
        })),
      );

      // ---- 指標 -------------------------------------------------------------
      // 縦書きの `活/動/指/標`・`成/果/指/標` は x=[44:52] の1文字。ここで category を割る
      const vert = wAll
        .filter((w) => w.x0 < 54 && w.t.length === 1)
        .sort((a, b) => a.y - b.y);
      const seikaFrom = vert.find((w) => w.t === "成")?.y ?? Infinity;
      const anchors = rowsOf(wAll)
        .map((r) => ({ r, lab: r.find((w) => /^(計画|実績|達成率)$/.test(w.t) && w.x0 > 360 && w.x0 < 400) }))
        .filter((x): x is { r: W[]; lab: W } => !!x.lab);
      // 指標表の見出し行（`指標名 指標説明 単位 令和N年度…`）の y。1組目の名前の上端になる
      const headRowY = rowsOf(wAll).find((r) => r.some((w) => w.t === "指標名"))?.[0]?.y ?? null;
      // 分類の行（ラベル `分類` と、その右にある値）。**値の無いラベルは分類ではない**
      const clsRows = rowsOf(wAll)
        .map((r) => {
          const lab = r.find((w) => w.t === "分類" && w.x0 < 75);
          if (!lab) return null;
          const value = r
            .filter((w) => w.x0 > lab.x1 && w.x1 <= 182)
            .sort((a, b) => a.x0 - b.x0)
            .map((w) => w.t)
            .join("");
          return value ? { y: lab.y, value } : null;
        })
        .filter((x): x is { y: number; value: string } => x !== null);
      const indicators: ProjectReportFact["indicators"] = [];
      /** 空スロットとして落とした指標枠の y（分類の勘定に使う） */
      const droppedY: number[] = [];
      /** 実際に採用した指標枠の y */
      const keptY: number[] = [];
      for (let i = 0; i + 2 < anchors.length + 1; i += 3) {
        const trio = anchors.slice(i, i + 3);
        if (trio.length < 3) break;
        const got = trio.map((a) => a.lab.t).join("/");
        if (got !== "計画/実績/達成率") {
          throw new Error(`${f.filename} p.${p} 「${name}」: 指標の行が ${got} です（期待 計画/実績/達成率）`);
        }
        const cells = (a: { r: W[]; lab: W }) => a.r.filter((w) => w.x0 > a.lab.x1).map((w) => num(w.t));
        const y0 = trio[0]!.lab.y;
        const y2 = trio[2]!.lab.y;
        // ⚠ **名前の窓は「前の組の達成率より下」に限る** — 単に `y0 - 16` で取ると
        //   見出し行の `指標名` や、直前の成果指標の `分類` の値まで名前に食い込む
        //   （実測: `指標名地域活動・…`・`行政サービス成果指標震災救援所周辺等の助成件数`）。
        const yTop = i === 0 ? (headRowY ?? y0 - 16) : anchors[i - 1]!.lab.y;
        // 分類は名前の列に置かれるので、**その行ごと**除く（値だけ別に拾う）
        const clsYs = new Set(wAll.filter((w) => w.t === "分類").map((w) => Math.round(w.y)));
        const nm = clean(
          wAll
            .filter(
              (w) =>
                w.x0 >= 54 &&
                w.x1 <= 182 &&
                w.y > yTop + 2 &&
                w.y <= y2 + 4 &&
                !clsYs.has(Math.round(w.y)),
            )
            .sort((a, b) => a.y - b.y || a.x0 - b.x0)
            .map((w) => w.t)
            .join(""),
        );
        const tg = cells(trio[0]!);
        const ac = cells(trio[1]!);
        const rt = cells(trio[2]!);
        // ⚠ **様式は指標の枠を固定数で印字する** — 指標が登録されていない事業では
        //   名前が無く全セルが `-` になる（実測 r7_01 p.3「不燃化促進住宅管理」）。
        //   **空の枠は指標ではない**ので落とす。⚠ ただし**値があるのに名前が無い**のは
        //   抽出の失敗なので落とさず throw する（この2つを混ぜると取りこぼしが静かに消える）。
        const empty = [...tg, ...ac, ...rt].every((v) => v == null);
        if (!nm) {
          if (empty) { droppedY.push(y0); continue; }
          throw new Error(`${f.filename} p.${p} 「${name}」: 値があるのに指標名が空です（y=${y0.toFixed(0)}）`);
        }
        // ⚠ **分類は「その下にある最初の指標」に付く** — 様式は成果指標のスロットを固定数で
        //   印字するので、**指標行を持たない `分類` ラベルが残る**（実測: 590シート中177枚で
        //   最後の指標行より下に2つ目の `分類` がある＝空スロット）。窓で拾うと取り違える。
        const cls =
          clsRows
            .filter((c) => c.y < y0 && c.y > yTop)
            .sort((a, b) => b.y - a.y)[0]?.value ?? null;
        keptY.push(y0);
        indicators.push({
          category: y0 >= seikaFrom ? "成果指標" : "活動指標",
          name: nm,
          targets: tg,
          actuals: ac,
          rates: rt,
          classification: cls ?? null,
        });
      }

      // ★ **分類の取りこぼしを数える** — 拾えた分類 + 空スロット（最後の指標行より下にある分類）
      //   が、ページ上の分類の総数と一致すること。合わなければ黙って落ちている
      // ⚠ **分類が指標に付かないのは2通りとも正常** — ①最後の指標行より下にある（空スロットの
      //   ラベルだけが残る。590枚中177枚で実測）②直下の指標枠が空（名前も値も無い。実測 p.5
      //   「耐震化の促進」は分類だけあって枠は全部 `-`）。**それ以外の未付与は取りこぼし**。
      for (const c of clsRows) {
        const belowKept = keptY.filter((y) => y > c.y);
        const belowDropped = droppedY.filter((y) => y > c.y);
        const nextKept = belowKept.length ? Math.min(...belowKept) : Infinity;
        const nextDropped = belowDropped.length ? Math.min(...belowDropped) : Infinity;
        if (nextKept === Infinity && nextDropped === Infinity) continue; // ①空スロットのラベル
        if (nextDropped < nextKept) continue; // ②直下の枠が空
        if (!indicators.some((i) => i.classification === c.value)) {
          throw new Error(
            `${f.filename} p.${p} 「${name}」: 分類「${c.value}」が指標に付いていません（取りこぼし）`,
          );
        }
      }

      facts.push({
        no: seiri!,
        name,
        buka: pick(/現担当課名[^\S\r\n]+(\S+)/) ?? "",
        kubun: pick(/予算事業区分[^\S\r\n]+(\S+)/),
        implementation: null,
        grade: null, // 杉並は A〜F も点数も達成度も持たない（**丸めない**）
        score: null,
        // ⚠ 年度をまたいで安定するコードは無い。`昨年度整理番号` が前年への鎖
        code: null,
        achievement: null,
        direction: pick(/Ⅰ\.事業コストの方向性[^\S\r\n]+(\S+)/),
        // ⚠ **`・` で機械的に割ってはいけない** — `手段・方法の見直し（改善）` の `・` は語の一部で、
        //   割ると「手段」「方法の見直し（改善）」の2件に化ける（実測）。**既知の語彙で切る**。
        //   ⚠ 語彙に無い語が出たら**黙って落とさず throw する**（新しい選択肢が増えたら気づきたい）
        improvementDirections: (() => {
          const raw = pick(/Ⅱ\.事業の改善の方向性[^\S\r\n]+(\S+)/);
          if (!raw) return [];
          let rest = raw;
          const got: string[] = [];
          while (rest.length > 0) {
            const hit = IMPROVEMENTS.find((v) => rest.startsWith(v));
            if (!hit) throw new Error(`${f.filename} p.${p} 「${name}」: 事業の改善の方向性に未知の語があります（${rest}）`);
            got.push(hit);
            rest = rest.slice(hit.length).replace(/^[・､、]/, "");
          }
          return got;
        })(),
        progress: null,
        // ⚠⚠ **値が空のとき、同じ行の右にある次のラベルを拾う**（実測 147件が `予算事業区分` に
        //   化けていた。`r7_99`＝施策を構成しない事業は上位施策が空欄で、右隣に
        //   `予算事業区分 既定事業` が並ぶ）。Ⅱ軸で踏んだ「次のラベルを値にする」型の**行内版**。
        //   → **値の形（`NN 施策名`）を要求する**。空欄なら null（施策に属さない事業は実在する）
        policy: pick(/上位施策No・施策名[^\S\r\n]+(\d{2}[^\S\r\n].+?)[^\S\r\n]{2,}/),
        // ⚠ 款項目は `measure` に入れる（既存の事業報告と同じ約束。derive が /\d+款/ で拾う）
        measure: `${kanNo!.padStart(2, "0")}款${koNo!.padStart(2, "0")}項${mokuNo!.padStart(2, "0")}目${jigyoNo!.padStart(3, "0")}事業`,
        cost,
        indicators,
        locator: { file: f.filename, page: p },
      });
    }
  }

  // ---- 会計の切れ目を**データから**決める（整理番号は款項目順に振られている） ----
  const sorted = [...facts].sort((a, b) => Number(a.no) - Number(b.no));
  const kanOf = (x: ProjectReportFact) => Number(/^(\d+)款/.exec(x.measure ?? "")![1]);
  let cut: number | null = null;
  for (let i = 1; i < sorted.length; i++) {
    if (kanOf(sorted[i]!) < kanOf(sorted[i - 1]!)) {
      cut = Number(sorted[i - 1]!.no);
      break;
    }
  }
  if (cut == null) throw new Error(`${source.id}: 会計の切れ目（款番号のリスタート）が見つかりません`);
  if (opts.generalAccountSeiriMax != null && opts.generalAccountSeiriMax !== cut) {
    throw new Error(
      `${source.id}: 一般会計の整理番号上限が宣言 ${opts.generalAccountSeiriMax} / 実測 ${cut} で食い違います`,
    );
  }
  const general = sorted.filter((x) => Number(x.no) <= cut!);

  if (declared != null && declared !== sorted.length) {
    throw new Error(`${source.id}: 目次の件数 ${declared} と抽出 ${sorted.length} が一致しません`);
  }
  if (new Set(sorted.map((x) => x.no)).size !== sorted.length) {
    throw new Error(`${source.id}: 整理番号が重複しています`);
  }

  return {
    docType: "project-report",
    sourceId: source.id,
    parser: source.parser,
    parserVersion: PARSER_VERSION,
    parsedAt: new Date().toISOString(),
    fiscalYear: source.fiscalYear,
    // 評価年度 R7 は「令和6年度事業」の評価
    targetFy: `R${Number(/\d+/.exec(source.fiscalYear)![0]) - 1}`,
    // ⚠ **特別会計は落とす**（シートに会計欄が無いので整理番号のレンジで切る）。
    //   ⚠ **落とした件数を宣言する** — derive は `policy` の会計名で除外を数える（横浜方式）が、
    //   杉並は parsed に出す前に落とすので**derive からは除外が見えず、画面が「全521事業が
    //   公表されています（サンプルではなく全量）」と過大に言う**（レビューが発見）。
    excludedCount: sorted.length - general.length,
    facts: general,
  };
}
