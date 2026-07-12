"use client";

// 一次資料ドロワーの HTML ビューア（自サーバー配信の原本コピー用）。
// sandbox でスクリプト実行を禁止しつつ allow-same-origin で読み取りだけ許可し、
// 読み込み後に本文の最初の表へ自動スクロールする（市サイトのヘッダを読み飛ばす手間を省く）。
// 原本のバイト列は改変しない — 表示だけの工夫。
import React from "react";

export default function HtmlViewer({ url, title }: { url: string; title: string }) {
  const ref = React.useRef<HTMLIFrameElement>(null);

  const scrollToTable = () => {
    try {
      const doc = ref.current?.contentDocument;
      const table = doc?.querySelector("table");
      table?.scrollIntoView({ block: "start" });
    } catch {
      // 読めなければ先頭表示のまま（内容は見られる）
    }
  };

  return (
    <iframe
      ref={ref}
      title={title}
      src={url}
      sandbox="allow-same-origin"
      onLoad={scrollToTable}
      style={{ flex: 1, width: "100%", border: "none", background: "#FFFFFF" }}
    />
  );
}
