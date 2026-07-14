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

/** 1ソースの raw ファイル群をまとめて受け取り、マージ済みの facts を返す */
type ParserFn = (files: { path: string; filename: string }[], source: SourceEntry) => AnyParsedDoc;

const PARSERS: Record<string, ParserFn> = {
  "soumu-shichoson-kessan": parseShichosonKessan,
  "kofu-yosansho": parseKofuYosansho,
  "kofu-zaisei-jokyo": parseKofuZaiseiJokyo, // 財政事情の公表（予算執行状況・速報）
  "kofu-kessan-syousai": parseKofuKessanSyousai, // 決算状況 収入支出詳細（執行の確定値）
  "kofu-gyousei-hyouka": parseKofuGyouseiHyouka, // 行政評価（事務事業評価）結果一覧
  "kofu-toukei-zaisei": parseKofuToukeiZaisei, // 統計書 財政章（款項×当初/最終/決算）
  "soumu-shichoson-seishitsu": parseShichosonSeishitsu, // 決算状況調(4)性質別・(5)地方債
  "yamanashi-kessan": parseYamanashiKessan, // 山梨県 決算の状況（款別・執行率／収入率）
  "kofu-gikai": parseKofuGikai, // 議会の構成（会派別議席数）＋当初予算の議決
};

export function getParser(key: string): ParserFn {
  const p = PARSERS[key];
  if (!p) throw new Error(`未登録のパーサ: ${key}（登録済み: ${Object.keys(PARSERS).join(", ")}）`);
  return p;
}
