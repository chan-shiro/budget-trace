// パーサのディスパッチ。registry の `parser` キー → 実装
import type { AnyParsedDoc, SourceEntry } from "../types";
import { parseShichosonKessan } from "./soumu-shichoson-kessan";
import { parseKofuYosansho } from "./kofu-yosansho";
import { parseKofuZaiseiJokyo } from "./kofu-zaisei-jokyo";
import { parseKofuKessanSyousai } from "./kofu-kessan-syousai";
import { parseKofuGyouseiHyouka } from "./kofu-gyousei-hyouka";
import { parseKofuToukeiZaisei } from "./kofu-toukei-zaisei";
import { parseShichosonSeishitsu } from "./soumu-shichoson-seishitsu";
import { parseYamanashiKessan } from "./yamanashi-kessan";
import { parseKofuGikai } from "./kofu-gikai";
import { parseKofuJigyouHoukoku } from "./kofu-jigyou-houkoku";
import { parseKawasakiJigyouHyouka } from "./kawasaki-jigyou-hyouka";
import { parseYokohamaJigyoHyoka } from "./yokohama-jigyo-hyoka";
import { parseOsakaYosansho } from "./osaka-yosansho";
import { parseHiroshimaYosansho } from "./hiroshima-yosansho";
import { parseTokyoYosangaiyouCsv } from "./tokyo-yosangaiyou-csv";
import { parseShinjukuKessanTaisho } from "./shinjuku-kessan-taisho";
import { parseNerimaKanbetsuXlsx } from "./nerima-kanbetsu-xlsx";
import { parseSetagayaMierukaCsv, parseSetagayaToushoXls } from "./setagaya-kanbetsu";

/** 1ソースの raw ファイル群をまとめて受け取り、マージ済みの facts を返す */
type ParserFn = (files: { path: string; filename: string }[], source: SourceEntry) => AnyParsedDoc;

const PARSERS: Record<string, ParserFn> = {
  "soumu-shichoson-kessan": parseShichosonKessan,
  "kofu-yosansho": parseKofuYosansho,
  "osaka-yosansho": parseOsakaYosansho, // 事項別明細書（款項目が同一表・182p・折返し款あり）
  "hiroshima-yosansho": parseHiroshimaYosansho, // 当初予算の概要「資料1」（款番号列が無い・10列）
  "tokyo-yosangaiyou-csv": parseTokyoYosangaiyouCsv, // 東京都 予算概要CSV（PDFが全経路パース不可のため唯一の機械可読経路）
  "kofu-zaisei-jokyo": parseKofuZaiseiJokyo, // 財政事情の公表（予算執行状況・速報）
  "kofu-kessan-syousai": parseKofuKessanSyousai, // 決算状況 収入支出詳細（執行の確定値）
  "kofu-gyousei-hyouka": parseKofuGyouseiHyouka, // 行政評価（事務事業評価）結果一覧
  "kofu-toukei-zaisei": parseKofuToukeiZaisei, // 統計書 財政章（款項×当初/最終/決算）
  "soumu-shichoson-seishitsu": parseShichosonSeishitsu, // 決算状況調(4)性質別・(5)地方債
  "kawasaki-jigyou-hyouka": parseKawasakiJigyouHyouka, // 事務事業評価シート（事業報告＝成果・572事業）
  "yokohama-jigyo-hyoka": parseYokohamaJigyoHyoka, // 事業評価書（事業報告＝成果・2,535事業・款項目つき）
  "yamanashi-kessan": parseYamanashiKessan, // 山梨県 決算の状況（款別・執行率／収入率）
  "shinjuku-kessan-taisho": parseShinjukuKessanTaisho, // 新宿区 款別予算決算対照表（款別・執行率／収入率）
  "nerima-kanbetsu-xlsx": parseNerimaKanbetsuXlsx, // 練馬区 款別一覧表 XLSX（データ自体が CC BY）
  "setagaya-mieruka-csv": parseSetagayaMierukaCsv, // 世田谷区 見える化ボード CSV（明細集計・R8）
  "setagaya-tousho-xls": parseSetagayaToushoXls, // 世田谷区 年度別当初予算データ XLS（H21〜R7 の17年）
  "kofu-gikai": parseKofuGikai, // 議会の構成（会派別議席数）＋当初予算の議決
  "kofu-jigyou-houkoku": parseKofuJigyouHoukoku, // 事業報告（成果）＝事務事業評価 詳細票
};

export function getParser(key: string): ParserFn {
  const p = PARSERS[key];
  if (!p) throw new Error(`未登録のパーサ: ${key}（登録済み: ${Object.keys(PARSERS).join(", ")}）`);
  return p;
}
