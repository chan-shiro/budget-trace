// パーサのディスパッチ。registry の `parser` キー → 実装
import type { AnyParsedDoc, SourceEntry } from "../types";
import { parseShichosonKessan } from "./soumu-shichoson-kessan";
import { parseKofuYosansho } from "./kofu-yosansho";

/** 1ソースの raw ファイル群をまとめて受け取り、マージ済みの facts を返す */
type ParserFn = (files: { path: string; filename: string }[], source: SourceEntry) => AnyParsedDoc;

const PARSERS: Record<string, ParserFn> = {
  "soumu-shichoson-kessan": parseShichosonKessan,
  "kofu-yosansho": parseKofuYosansho, // 款別一覧のみ。主な事業一覧（LLM 併用）は今後追加
};

export function getParser(key: string): ParserFn {
  const p = PARSERS[key];
  if (!p) throw new Error(`未登録のパーサ: ${key}（登録済み: ${Object.keys(PARSERS).join(", ")}）`);
  return p;
}
