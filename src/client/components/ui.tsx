"use client";

import React from "react";

// CSS 文字列 → React style オブジェクト。
// プロトタイプの inline style 文字列をそのまま移植するためのヘルパー。
function camelProp(prop: string): string {
  if (prop.startsWith("-ms-")) return "ms" + prop.slice(4).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}
export function cssToStyle(css: string): React.CSSProperties {
  const out: Record<string, string> = {};
  css.split(";").forEach((decl) => {
    const i = decl.indexOf(":");
    if (i < 0) return;
    const key = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!key || val === "") return;
    out[camelProp(key)] = val;
  });
  return out as React.CSSProperties;
}
// 短縮エイリアス
export const S = cssToStyle;

// 数値カウントアップ（マウント時 0→値、値変更時は旧値→新値をイージング補間）
export function CountUpNum({
  value,
  fmt,
  dur,
}: {
  value: number;
  fmt?: (n: number) => string;
  dur?: number;
}) {
  const [n, setN] = React.useState(0);
  const fromRef = React.useRef(0);
  React.useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(value);
      fromRef.current = value;
      return;
    }
    const from = fromRef.current,
      to = value,
      t0 = performance.now(),
      d = dur || 950;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / d);
      const e = 1 - Math.pow(1 - p, 3);
      setN(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = to;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{fmt ? fmt(n) : String(Math.round(n))}</>;
}

// style-hover 相当：ホバー時に hoverStyle をマージする汎用要素
type HoverBoxProps = {
  as?: keyof JSX.IntrinsicElements;
  hoverStyle?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement> &
  Record<string, unknown>;

export const HoverBox = React.forwardRef<HTMLElement, HoverBoxProps>(
  function HoverBox(
    { as = "div", hoverStyle, style, onMouseEnter, onMouseLeave, children, ...rest },
    ref
  ) {
    const [h, setH] = React.useState(false);
    const El = as as React.ElementType;
    return (
      <El
        ref={ref}
        style={hoverStyle && h ? { ...style, ...hoverStyle } : style}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          if (hoverStyle) setH(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          if (hoverStyle) setH(false);
          onMouseLeave?.(e);
        }}
        {...rest}
      >
        {children}
      </El>
    );
  }
);
