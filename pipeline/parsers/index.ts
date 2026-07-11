// パーサのディスパッチ。registry の `parser` キー → 実装
import type { ParsedDoc, SourceEntry } from "../types";
import { parseShichosonKessan } from "./soumu-shichoson-kessan";

type ParserFn = (filePath: string, filename: string, source: SourceEntry) => ParsedDoc;

const PARSERS: Record<string, ParserFn> = {
  "soumu-shichoson-kessan": parseShichosonKessan,
  // "kofu-yosansho": （予算書 PDF。LLM 併用で今後追加）
};

export function getParser(key: string): ParserFn {
  const p = PARSERS[key];
  if (!p) throw new Error(`未登録のパーサ: ${key}（登録済み: ${Object.keys(PARSERS).join(", ")}）`);
  return p;
}
