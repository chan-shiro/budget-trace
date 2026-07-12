"use client";

// 一次資料ドロワーの PDF ビューア。
// iframe のブラウザ内蔵ビューアは Safari で1ページ目しか描画されず #page も効かない
// ため、PDF.js（同梱・CDN 不使用）で全ページをアプリ内描画する。
// boxRef 配下は React 管理外の直接 DOM 操作（JapanMap と同じ境界ルール）。
import React from "react";

interface Props {
  /** 自サーバー配信の PDF（フラグメントなし） */
  url: string;
  /** 初期表示ページ（1-origin） */
  page: number;
}

export default function PdfViewer({ url, page }: Props) {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");

  React.useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | null = null;
    setStatus("loading");
    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/vendor/pdf.worker.min.mjs";
        const task = pdfjs.getDocument({ url });
        const doc = await task.promise;
        if (cancelled || !boxRef.current) {
          void task.destroy();
          return;
        }
        const box = boxRef.current;
        box.innerHTML = "";

        // 全ページ分の枠を先に作り、実寸のアスペクト比で高さを確保する
        // （款別一覧は横長・事業一覧は縦長が混在するため、初期スクロール位置を
        //   正しく出すにはページごとの比率が要る）
        const holders: HTMLDivElement[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const pg = await doc.getPage(i);
          const vp = pg.getViewport({ scale: 1 });
          const holder = document.createElement("div");
          holder.dataset.page = String(i);
          holder.style.cssText =
            `margin:12px auto; background:#FFFFFF; box-shadow:0 2px 10px rgba(20,24,28,0.12); ` +
            `width:min(960px, calc(100% - 24px)); aspect-ratio:${vp.width} / ${vp.height};`;
          box.appendChild(holder);
          holders.push(holder);
        }
        if (cancelled) {
          void task.destroy();
          return;
        }

        // 表示域に近づいたページだけ描画する（25ページ級でも軽く）
        const rendered = new Set<number>();
        const renderPage = async (n: number) => {
          if (rendered.has(n)) return;
          rendered.add(n);
          const pg = await doc.getPage(n);
          const holder = holders[n - 1]!;
          const vp1 = pg.getViewport({ scale: 1 });
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const scale = (holder.clientWidth / vp1.width) * dpr;
          const vp = pg.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = vp.width;
          canvas.height = vp.height;
          canvas.style.cssText = "display:block; width:100%; height:100%;";
          holder.appendChild(canvas);
          await pg.render({ canvas, canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
        };
        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) void renderPage(Number((e.target as HTMLElement).dataset.page));
            }
          },
          { root: box, rootMargin: "800px 0px" },
        );
        holders.forEach((h) => io.observe(h));

        // 初期ページへスクロール
        const target = holders[Math.min(Math.max(page, 1), doc.numPages) - 1];
        if (target) box.scrollTop = target.offsetTop - 12;
        setStatus("ready");
        cleanup = () => {
          io.disconnect();
          void task.destroy();
        };
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [url, page]);

  return (
    <div style={{ position: "relative", flex: 1, minHeight: 0, display: "flex" }}>
      <div ref={boxRef} style={{ flex: 1, overflowY: "auto", background: "#E3EBF0" }} />
      {status === "loading" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#5C6B77", fontSize: 13, fontFamily: "'IBM Plex Mono',monospace" }}>
          LOADING…
        </div>
      )}
      {status === "error" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#C25400", fontSize: 13 }}>
          PDF を表示できませんでした。「新しいタブで開く」をお試しください。
        </div>
      )}
    </div>
  );
}
