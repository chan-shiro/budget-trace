// パーサのディスパッチ。registry の `parser` キー → 実装
import type { AnyParsedDoc, SourceEntry } from "../types";
import { parseShichosonKessan } from "./soumu-shichoson-kessan";
import { parseKofuYosansho } from "./kofu-yosansho";
import { parseKofuZaiseiJokyo } from "./kofu-zaisei-jokyo";
import { parseKofuKessanSyousai } from "./kofu-kessan-syousai";

/** 1ソースの raw ファイル群をまとめて受け取り、マージ済みの facts を返す */
type ParserFn = (files: { path: string; filename: string }[], source: SourceEntry) => AnyParsedDoc;

const PARSERS: Record<string, ParserFn> = {
  "soumu-shichoson-kessan": parseShichosonKessan,
  "kofu-yosansho": parseKofuYosansho,
  "kofu-zaisei-jokyo": parseKofuZaiseiJokyo, // 財政事情の公表（予算執行状況・速報）
  "kofu-kessan-syousai": parseKofuKessanSyousai, // 決算状況 収入支出詳細（執行の確定値）
};

export function getParser(key: string): ParserFn {
  const p = PARSERS[key];
  if (!p) throw new Error(`未登録のパーサ: ${key}（登録済み: ${Object.keys(PARSERS).join(", ")}）`);
  return p;
}
