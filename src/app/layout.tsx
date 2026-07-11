import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "予算トレース — 地方自治体の予算執行可視化",
  description:
    "税金のゆくえを、執行まで。地方公共団体の予算（歳入・歳出）から執行率・支出先・事業報告までを一次資料付きで確認できるプロトタイプ。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
