"use client";

import React from "react";
import JapanMap from "./JapanMap";
import { HoverBox, S } from "./ui";
import PdfViewer from "./PdfViewer";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function BudgetTraceView({ v }: { v: any }) {
  return (
    <div style={S("min-height:100vh; background:#F7FAFC; color:#14181C; font-family:'IBM Plex Sans JP',sans-serif; font-size:15px; line-height:1.65;")}>

      {/* ============ TOP ============ */}
      {v.isTop && (
        <div data-screen-label="トップ（自治体選択）" style={S("min-height:100vh; display:flex; flex-direction:column;")}>
          <header data-mq-pad="" style={S("display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 32px; flex-wrap:wrap;")}>
            <div style={S("display:flex; align-items:baseline; gap:10px;")}>
              <span style={S("font-weight:700; font-size:17px; letter-spacing:0.02em;")}>予算トレース</span>
            </div>
          </header>

          <div data-mq="hero" style={S("flex:1; width:min(1160px,100%); margin:0 auto; padding:32px; display:flex; gap:48px; align-items:center; flex-wrap:wrap; animation:fadeUp .4s ease both;")}>
            <div style={S("flex:1 1 380px; min-width:300px;")}>
              <h1 style={S("margin:0 0 18px; font-size:clamp(32px,4vw,48px); font-weight:700; line-height:1.28;")}>税金のゆくえを、<br />執行まで。</h1>
              <p style={S("margin:0 0 30px; color:#5C6B77; max-width:44ch;")}>款別の内訳から主な事業、前年比較、類似自治体との比較までを一次資料（エビデンス）付きで確認できます。</p>
              <div style={S("display:flex; gap:28px; margin-bottom:34px; flex-wrap:wrap;")}>
                <div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:24px; font-weight:600;")}>47</div><div style={S("font-size:12px; color:#5C6B77;")}>都道府県</div></div>
                <div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:24px; font-weight:600;")}>1,741</div><div style={S("font-size:12px; color:#5C6B77;")}>市区町村</div></div>
                <div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:24px; font-weight:600;")}>1</div><div style={S("font-size:12px; color:#5C6B77;")}>サンプル収録（甲府市）</div></div>
              </div>
              <HoverBox as="button" onClick={v.openKofuLink} data-mq="cta" style={S("background:#14181C; color:#F7FAFC; border:none; border-radius:10px; padding:14px 26px; font-size:15px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("background:#1798D0;")}>甲府市のサンプルを見る →</HoverBox>
            </div>
            <div style={S("flex:1 1 420px; min-width:300px;")}>
              <JapanMap onSelect={v.onPrefSelect} onSelectMuni={v.onMuniSelect} colorMode={v.mapColorMode} />
            </div>
          </div>

          <footer data-mq-pad="" style={S("padding:18px 32px; border-top:1px solid #DFE7EC; font-size:12px; color:#5C6B77; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;")}>
            <span>本サイトはプロトタイプです。掲載数値はすべて一次資料（甲府市 当初予算資料 令和2〜8年度・総務省 市町村別決算状況調）由来の実データです。</span>
            <span style={S("font-family:'IBM Plex Mono',monospace;")}>v0.1 / 2026-07</span>
          </footer>
        </div>
      )}

      {/* ============ 市区町村選択 ============ */}
      {v.isMuni && (
        <div data-screen-label="市区町村選択" data-mq-pad="" style={S("min-height:100vh; width:min(880px,100%); margin:0 auto; padding:28px 32px 64px; animation:fadeUp .35s ease both;")}>
          <HoverBox as="button" onClick={v.goTop} style={S("border:none; background:none; color:#5C6B77; font-size:13px; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>← 日本地図へ戻る</HoverBox>
          <h1 style={S("margin:18px 0 6px; font-size:32px; font-weight:700;")}>{v.muniPrefName}</h1>
          <p style={S("margin:0 0 28px; color:#5C6B77; font-size:14px;")}>自治体を選択してください。現在の収録は甲府市（令和2〜8年度当初予算）のみです。</p>

          <HoverBox as="button" onClick={v.prefAllOpen} style={S(`width:100%; text-align:left; display:flex; align-items:center; justify-content:space-between; gap:12px; background:${v.prefAllBg}; color:${v.prefAllFg}; border:1px solid ${v.prefAllBd}; border-radius:12px; padding:18px 22px; cursor:pointer; margin-bottom:22px; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("border-color:#1798D0;")}>
            <span>
              <span style={S("display:block; font-size:17px; font-weight:700;")}>{v.muniPrefName}全体（都道府県レベル）</span>
              <span style={S("display:block; font-size:12.5px; opacity:0.75; margin-top:2px;")}>{v.prefAllNote}</span>
            </span>
            <span style={S("font-family:'IBM Plex Mono',monospace; font-size:12px; border:1px solid currentColor; border-radius:999px; padding:3px 10px; white-space:nowrap;")}>{v.prefAllBadge}</span>
          </HoverBox>

          <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(190px,1fr)); gap:10px;")}>
            {v.muniList.map((m: any, i: number) => (
              <HoverBox as="button" key={i} onClick={m.open} style={S(`text-align:left; display:flex; flex-direction:column; gap:6px; background:${m.bg}; border:1px solid ${m.bd}; border-radius:12px; padding:14px 16px; cursor:${m.cursor}; color:${m.fg}; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("border-color:#1798D0;")}>
                <span style={S("font-size:15px; font-weight:600;")}>{m.name}</span>
                <span style={S(`font-family:'IBM Plex Mono',monospace; font-size:11px; color:${m.badgeFg};`)}>{m.badge}</span>
              </HoverBox>
            ))}
          </div>
        </div>
      )}

      {/* ============ アプリ共通ヘッダー ============ */}
      {v.isApp && (
        <div style={S("min-height:100vh; display:flex; flex-direction:column;")}>
          <header style={S("background:#FFFFFF; border-bottom:1px solid #DFE7EC; position:sticky; top:0; z-index:10;")}>
            <div data-mq-pad="" data-mq="head" style={S("width:min(1160px,100%); margin:0 auto; padding:12px 28px 0; display:flex; flex-direction:column; gap:8px;")}>
              <div style={S("display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;")}>
                <div style={S("display:flex; align-items:center; gap:14px; flex-wrap:wrap;")}>
                  <HoverBox as="button" onClick={v.goTop} style={S("border:none; background:none; padding:0; cursor:pointer; font-weight:700; font-size:15px; color:#14181C; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>予算トレース</HoverBox>
                  <span style={S("color:#C6D2DA;")}>/</span>
                  <nav style={S("display:flex; align-items:center; gap:6px; font-size:13px; color:#5C6B77;")}>
                    <HoverBox as="button" onClick={v.goTop} style={S("border:none; background:none; padding:0; cursor:pointer; color:#5C6B77; font-size:13px; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>日本</HoverBox>
                    <span>›</span>
                    <HoverBox as="button" onClick={v.goMuniSelect} style={S("border:none; background:none; padding:0; cursor:pointer; color:#5C6B77; font-size:13px; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>{v.crumbPref}</HoverBox>
                    <span>›</span>
                    <span style={S("color:#14181C; font-weight:600;")}>{v.crumbMuni}</span>
                  </nav>
                </div>
                <div data-mq="hctrl" style={S("display:flex; align-items:center; gap:8px; flex-wrap:wrap;")}>
                  <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                    {v.unitTabs.map((ut: any, i: number) => (
                      <button key={i} onClick={ut.pick} style={S(`border:none; background:${ut.bg}; color:${ut.fg}; padding:6px 14px; font-size:12px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)}>{ut.label}</button>
                    ))}
                  </div>
                  <select
                    value={v.yearSel}
                    onChange={(e) => v.pickYear(e.target.value)}
                    aria-label="表示する当初予算の年度"
                    style={S("font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#5C6B77; background:#ECF2F6; border:none; border-radius:999px; padding:4px 12px; white-space:nowrap; cursor:pointer; appearance:auto;")}
                  >
                    {v.yearOptions.map((o: any) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <nav data-mq="tabs" style={S("display:flex; gap:4px; overflow-x:auto;")}>
                {v.navTabs.map((t: any, i: number) => (
                  <HoverBox as="button" key={i} onClick={t.open} style={S(`border:none; background:none; padding:10px 14px 12px; cursor:pointer; font-size:14px; font-weight:${t.fw}; color:${t.fg}; border-bottom:2.5px solid ${t.ul}; white-space:nowrap; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("color:#1798D0;")}>{t.label}</HoverBox>
                ))}
              </nav>
            </div>
          </header>

          <main data-mq-pad="" style={S("flex:1; width:min(1160px,100%); margin:0 auto; padding:28px 28px 72px;")}>

            {/* ==== ダッシュボード ==== */}
            {v.isDash && (
              <div data-screen-label="自治体ダッシュボード" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:24px;")}>
                  <div>
                    <h1 style={S("margin:0 0 4px; font-size:28px; font-weight:700;")}>{v.dashTitle}</h1>
                    <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>一般会計 当初予算 ・ 歳入と歳出は同額で編成されます</p>
                  </div>
                  <div data-mq="ralign" style={S("text-align:right;")}>
                    <div style={S("font-family:'IBM Plex Mono',monospace; font-size:34px; font-weight:600; line-height:1.1;")}>{v.totalFmtAnim}</div>
                    <div style={S("font-size:12.5px; color:#5C6B77;")}>{v.yoyCaption} <span style={S("color:#0F76A3; font-weight:600;")}>{v.yoy}</span></div>
                    <div style={S("font-size:12px; color:#5C6B77; margin-top:3px;")}>{v.perCapitaLine}</div>
                  </div>
                </div>

                <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(340px,1fr)); gap:18px; margin-bottom:26px;")}>
                  {v.dashPanels.map((pn: any, i: number) => (
                    <section key={i} style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:22px 24px;")}>
                      <div style={S("display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;")}>
                        <div style={S("display:flex; align-items:center; gap:7px;")}>
                          <h2 style={S("margin:0; font-size:16px; font-weight:700;")}>{pn.title}</h2>
                          <button onMouseEnter={pn.gloss} onClick={pn.gloss} onMouseLeave={v.hideTip} style={S("width:17px; height:17px; border-radius:50%; border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; font-size:11px; line-height:1; cursor:help; padding:0; font-family:'IBM Plex Mono',monospace;")}>?</button>
                        </div>
                        <HoverBox as="button" onClick={pn.openDrill} style={S("border:none; background:none; color:#1798D0; font-size:12.5px; font-weight:600; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("text-decoration:underline;")}>款・項・目・節で見る →</HoverBox>
                      </div>
                      <div style={S("display:flex; gap:22px; align-items:center; flex-wrap:wrap;")}>
                        <div onMouseMove={pn.tipMove} onClick={pn.tipMove} onMouseLeave={v.hideTip} style={S(`width:170px; height:170px; border-radius:50%; background:${pn.donutBg}; position:relative; flex-shrink:0; cursor:pointer;`)}>
                          <span data-anim="donutcover" style={S("position:absolute; inset:0; border-radius:50%; background:#FFFFFF; pointer-events:none;")}></span>
                          <div style={S("position:absolute; inset:34px; border-radius:50%; background:#FFFFFF; display:flex; flex-direction:column; align-items:center; justify-content:center;")}>
                            <span style={S("font-size:10.5px; color:#5C6B77;")}>{pn.centerLabel}</span>
                            <span style={S("font-family:'IBM Plex Mono',monospace; font-size:16px; font-weight:600;")}>{pn.centerAmt}</span>
                          </div>
                        </div>
                        <div style={S("flex:1; min-width:200px; display:flex; flex-direction:column;")}>
                          {pn.legend.map((lg: any, j: number) => (
                            <HoverBox as="button" key={j} onClick={lg.open} onMouseEnter={lg.hoverOn} onMouseLeave={lg.hoverOff} style={S("display:flex; align-items:center; gap:9px; border:none; background:none; padding:5px 6px; cursor:pointer; border-radius:7px; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("background:#ECF2F6;")}>
                              <span style={S(`width:10px; height:10px; border-radius:3px; background:${lg.sw}; flex-shrink:0;`)}></span>
                              <span style={S("flex:1; font-size:13px; color:#14181C;")}>{lg.name}</span>
                              <span style={S("font-family:'IBM Plex Mono',monospace; font-size:12.5px;")}>{lg.amtFmt}</span>
                              <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; color:#5C6B77; width:44px; text-align:right;")}>{lg.pctFmt}</span>
                            </HoverBox>
                          ))}
                        </div>
                      </div>
                    </section>
                  ))}
                </div>

                <section style={S("margin-bottom:26px;")}>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; margin-bottom:12px;")}>
                    <h2 style={S("margin:0; font-size:16px; font-weight:700;")}>政策テーマ別に見る</h2>
                    <HoverBox as="button" onClick={v.goThemes} style={S("border:none; background:none; color:#1798D0; font-size:12.5px; font-weight:600; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("text-decoration:underline;")}>すべてのテーマ →</HoverBox>
                  </div>
                  <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(220px,1fr)); gap:10px;")}>
                    {v.themeStrip.map((th: any, i: number) => (
                      <HoverBox as="button" key={i} onClick={th.open} style={S("text-align:left; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:12px; padding:14px 16px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0;")}>
                        <span style={S("display:block; font-size:14px; font-weight:600; margin-bottom:2px;")}>{th.name}</span>
                        <span style={S("display:block; font-size:11px; color:#5C6B77; margin-bottom:6px;")}>{th.sub2}</span>
                        <span style={S("display:block; font-family:'IBM Plex Mono',monospace; font-size:15px;")}>{th.totalFmt}</span>
                        <span style={S("display:block; font-size:11.5px; color:#5C6B77;")}>{th.count}事業 ・ {th.sub}</span>
                      </HoverBox>
                    ))}
                  </div>
                  <p style={S("margin:10px 2px 0; font-size:12px; color:#5C6B77;")}>第七次甲府市総合計画の基本目標別に、予算資料「主な事業一覧」掲載事業の予算額を集計しています。</p>
                </section>

                <section>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; margin-bottom:12px;")}>
                    <h2 style={S("margin:0; font-size:16px; font-weight:700;")}>注目の事業（予算額上位）</h2>
                  </div>
                  <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:12px;")}>
                    {v.featured.map((f: any, i: number) => (
                      <div key={i} style={S("text-align:left; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:18px 20px;")}>
                        <span style={S("display:flex; align-items:center; gap:8px; margin-bottom:6px;")}>
                          <span style={S("font-size:11.5px; color:#5C6B77; font-family:'IBM Plex Mono',monospace;")}>{f.kanPath}</span>
                          {f.kubun && <span style={S(`font-size:10.5px; font-weight:700; border-radius:999px; padding:1px 9px; color:${f.kubun === "新規" ? "#0F76A3" : "#C25400"}; border:1px solid ${f.kubun === "新規" ? "#B9E0F2" : "#EFD4BE"};`)}>{f.kubun}</span>}
                        </span>
                        <span style={S("display:block; font-size:15px; font-weight:700; margin-bottom:8px; color:#14181C;")}>{f.name}</span>
                        <span style={S("display:block; font-size:12px; color:#5C6B77; margin-bottom:8px;")}>予算 <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C; font-weight:600;")}>{f.budgetFmt}</span>（{f.sub}）</span>
                        <span style={S("display:block; font-size:11.5px; color:#5C6B77; line-height:1.6;")}>{f.desc}</span>
                      </div>
                    ))}
                  </div>
                  {v.hasProjCoverage && (
                  <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:14px 20px; margin-top:14px;")}>
                    <div style={S("display:flex; justify-content:space-between; gap:12px; font-size:12px; color:#5C6B77; margin-bottom:6px; flex-wrap:wrap;")}>
                      <span>事業単位のエビデンスあり <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C; font-weight:600;")}>{v.projCoverageCoveredFmt}</span>（総額の {v.projCoveragePct}%・{v.projCoverageCount}事業）</span>
                      <span>事業掲載なし（款・項レベルのみ） <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{v.projCoverageRestFmt}</span></span>
                    </div>
                    <div style={S("display:flex; height:10px; border-radius:999px; overflow:hidden; background:#E3EBF0;")}>
                      <span data-anim="bar" style={S(`width:${v.projCoverageBarW}%; background:#1798D0;`)}></span>
                    </div>
                    <p style={S("margin:8px 0 0; font-size:11.5px; color:#5C6B77;")}>「主な事業一覧」に掲載された事業だけが内容・施策つきで説明されています。残りの予算は款別（一部は決算の項別）までの内訳です。</p>
                  </div>
                  )}
                  <p style={S("margin:14px 2px 0; font-size:12px; color:#5C6B77;")}>
                    <a href={v.dashSourceUrl} onClick={(e) => { e.preventDefault(); v.dashSourceOpen(); }} style={S("color:#5C6B77; cursor:pointer;")}>{v.dashSourceLabel}（原本を開く）</a>
                  </p>
                </section>
              </div>
            )}

            {/* ==== 款・項・目・節ドリルダウン ==== */}
            {v.isDrill && (
              <div data-screen-label="款・項・目・節ドリルダウン" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("display:flex; align-items:center; gap:8px; margin-bottom:18px; flex-wrap:wrap;")}>
                  <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                    {v.drillSideTabs.map((stb: any, i: number) => (
                      <button key={i} onClick={stb.pick} style={S(`border:none; background:${stb.bg}; color:${stb.fg}; padding:7px 18px; font-size:13px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)}>{stb.label}</button>
                    ))}
                  </div>
                  <span style={S("display:inline-flex; align-items:center; gap:6px; font-size:12px; color:#5C6B77;")}>款を選ぶと内訳（歳入の合算グループ）や主な事業（歳出）を表示します
                    <button onMouseEnter={v.gKan} onClick={v.gKan} onMouseLeave={v.hideTip} style={S("width:17px; height:17px; border-radius:50%; border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; font-size:11px; line-height:1; cursor:help; padding:0; font-family:'IBM Plex Mono',monospace;")}>?</button>
                  </span>
                </div>

                <div style={S("display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:20px; font-size:14px;")}>
                  {v.drillCrumbs.map((c: any, i: number) => (
                    <React.Fragment key={i}>
                      <HoverBox as="button" onClick={c.jump} style={S(`border:none; background:${c.bg}; color:${c.fg}; font-weight:${c.fw}; border-radius:8px; padding:5px 12px; cursor:pointer; font-size:13.5px; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("color:#1798D0;")}>{c.label}</HoverBox>
                      <span style={S(`color:#C6D2DA; display:${c.sep};`)}>›</span>
                    </React.Fragment>
                  ))}
                  <span style={S("margin-left:auto; font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#5C6B77; background:#ECF2F6; border-radius:999px; padding:4px 12px;")}>この階層：{v.drillLevelLabel}</span>
                </div>

                <div style={S("display:flex; gap:24px; flex-wrap:wrap;")}>
                  <div style={S("flex:0 0 auto; display:flex; flex-direction:column; align-items:center; gap:14px;")}>
                    <div onMouseMove={v.drillTipMove} onClick={v.drillTipMove} onMouseLeave={v.hideTip} style={S(`width:220px; height:220px; border-radius:50%; background:${v.drillDonutBg}; position:relative; cursor:pointer;`)}>
                      <span data-anim="donutcover" style={S("position:absolute; inset:0; border-radius:50%; background:#F7FAFC; pointer-events:none;")}></span>
                      <div style={S("position:absolute; inset:44px; border-radius:50%; background:#F7FAFC; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;")}>
                        <span style={S("font-size:11px; color:#5C6B77; max-width:110px; line-height:1.4;")}>{v.drillTitle}</span>
                        <span style={S("font-family:'IBM Plex Mono',monospace; font-size:19px; font-weight:600;")}>{v.drillTotalFmt}</span>
                        <span style={S("font-size:10.5px; color:#5C6B77;")}>{v.drillSub}</span>
                      </div>
                    </div>
                    <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:12px; padding:12px 16px; max-width:240px;")}>
                      <div style={S("font-size:11px; font-family:'IBM Plex Mono',monospace; letter-spacing:0.12em; color:#5C6B77; margin-bottom:5px;")}>EVIDENCE</div>
                      <div style={S("font-size:12.5px; line-height:1.6;")}>{v.drillEvidence}</div>
                      <a href={v.drillPdfUrl} onClick={(e) => { e.preventDefault(); v.dashSourceOpen(); }} style={S("font-size:12px; cursor:pointer;")}>予算書PDFを開く</a>
                    </div>
                  </div>

                  <div style={S("flex:1; min-width:320px;")}>
                    {v.drillRows.map((r: any, i: number) => (
                      <HoverBox as="button" key={i} onClick={r.open} onMouseEnter={r.hoverOn} onMouseLeave={r.hoverOff} data-mq="drill" style={S(`width:100%; display:grid; grid-template-columns:14px minmax(120px,1.4fr) 2fr 92px 56px 20px; align-items:center; gap:12px; border:none; border-bottom:1px solid #E3EBF0; background:none; padding:12px 8px; cursor:${r.cursor}; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("background:#ECF2F6;")}>
                        <span style={S(`width:11px; height:11px; border-radius:3px; background:${r.sw};`)}></span>
                        <span style={S("font-size:14px; font-weight:600; color:#14181C;")}>{r.name}</span>
                        <span style={S("height:8px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${r.barW}%; background:${r.sw};`)}></span></span>
                        <span style={S("text-align:right;")}><span style={S("display:block; font-family:'IBM Plex Mono',monospace; font-size:13.5px;")}>{r.amtFmt}</span><span style={S("display:block; font-size:10px; color:#5C6B77;")}>{r.sub}</span></span>
                        <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#5C6B77; text-align:right;")}>{r.pctFmt}</span>
                        <span style={S("color:#9DACB7; font-size:14px;")}>{r.arrow}</span>
                      </HoverBox>
                    ))}

                    {v.hasR6Detail && (
                      <div style={S("margin-top:8px;")}>
                        <h3 style={S("margin:0 0 4px; font-size:14px; font-weight:700;")}>項別の内訳（{v.r6DetailFyLabel}）</h3>
                        <p style={S("margin:0 0 10px; font-size:12px; color:#5C6B77;")}>{v.compCurLabel}予算の項別内訳は原典未公開のため、直近の決算値を参考として表示しています。決算計 {v.r6DetailKanTotalFmt}。</p>
                        <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:11px; padding:6px 16px;")}>
                          {v.r6DetailRows.map((r: any, i: number) => (
                            <div key={i} data-mq="drill" style={S("display:grid; grid-template-columns:14px minmax(120px,1.4fr) 2fr 92px 56px 20px; align-items:center; gap:12px; border-bottom:1px solid #ECF2F6; padding:10px 0;")}>
                              <span style={S(`width:11px; height:11px; border-radius:3px; background:${r.sw};`)}></span>
                              <span style={S("font-size:13.5px; font-weight:600; color:#14181C;")}>{r.name}</span>
                              <span style={S("height:8px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${r.barW}%; background:${r.sw};`)}></span></span>
                              <span style={S("font-family:'IBM Plex Mono',monospace; font-size:13px; text-align:right;")}>{r.amtFmt}</span>
                              <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#5C6B77; text-align:right;")}>{r.pctFmt}</span>
                              <span></span>
                            </div>
                          ))}
                        </div>
                        <p style={S("margin:8px 2px 0; font-size:12px; color:#5C6B77;")}>
                          <a href={v.r6DetailSourceUrl} target="_blank" rel="noopener noreferrer" style={S("color:#5C6B77;")}>{v.r6DetailSourceLabel} ↗</a>
                        </p>
                      </div>
                    )}

                    {v.drillNoChildrenNote && !v.hasRealProjects && !v.hasR6Detail && (
                      <p style={S("margin:8px 2px 0; font-size:12.5px; color:#5C6B77;")}>この款の項・目・節の内訳は未収録です（予算書本編の収録後に追加予定）。</p>
                    )}

                    {v.hasRealProjects && (
                      <div style={S("margin-top:24px;")}>
                        <h3 style={S("margin:0 0 10px; font-size:14px; font-weight:700;")}>この款の主な事業（予算資料より）</h3>
                        <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:11px; padding:12px 16px; margin-bottom:10px;")}>
                          <div style={S("display:flex; justify-content:space-between; gap:12px; font-size:12px; color:#5C6B77; margin-bottom:6px; flex-wrap:wrap;")}>
                            <span>事業単位のエビデンスあり <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C; font-weight:600;")}>{v.realProjectsCoveredFmt}</span>（款の {v.realProjectsCoveredPct}%）</span>
                            <span>事業掲載なし（詳細不明） <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{v.realProjectsUncoveredFmt}</span></span>
                          </div>
                          <div style={S("display:flex; height:10px; border-radius:999px; overflow:hidden; background:#E3EBF0;")}>
                            <span data-anim="bar" style={S(`width:${v.realProjectsCoveredBarW}%; background:#1798D0;`)}></span>
                          </div>
                        </div>
                        <div style={S("display:flex; flex-direction:column; gap:8px;")}>
                          {v.realProjects.map((rp: any, i: number) => (
                            <div key={i} style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:11px; padding:12px 16px;")}>
                              <div style={S("display:flex; align-items:baseline; justify-content:space-between; gap:14px;")}>
                                <span style={S("display:inline-flex; align-items:center; gap:8px; min-width:0;")}>
                                  {rp.kubun && <span style={S(`font-size:10.5px; font-weight:700; border-radius:999px; padding:1px 9px; white-space:nowrap; color:${rp.kubun === "新規" ? "#0F76A3" : "#C25400"}; border:1px solid ${rp.kubun === "新規" ? "#B9E0F2" : "#EFD4BE"};`)}>{rp.kubun}</span>}
                                  <span style={S("font-size:14px; font-weight:600;")}>{rp.name}</span>
                                </span>
                                <span style={S("font-family:'IBM Plex Mono',monospace; font-size:13px; white-space:nowrap;")}>{rp.amountFmt}</span>
                              </div>
                              <div style={S("font-size:11.5px; color:#5C6B77; margin-top:4px; line-height:1.6;")}>{rp.desc}</div>
                              <div style={S("display:flex; gap:10px; flex-wrap:wrap; margin-top:6px; font-size:11px; color:#5C6B77;")}>
                                <span>基本目標: {rp.goal}</span>
                                <span>施策: {rp.shisaku}</span>
                                <a href={rp.refUrl} onClick={(e) => { e.preventDefault(); rp.refOpen(); }} title={rp.refTitle} style={S("font-family:'IBM Plex Mono',monospace; color:#0F76A3; cursor:pointer;")}>{rp.refLabel}</a>
                                {rp.bookName && <span style={S("font-family:'IBM Plex Mono',monospace; color:#8494A0;")}>予算書名{rp.bookName}</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p style={S("margin:10px 2px 0; font-size:12px; color:#5C6B77;")}>
                          <a href={v.realProjectsSourceUrl} onClick={(e) => { e.preventDefault(); v.realProjectsSourceOpen(); }} style={S("color:#5C6B77; cursor:pointer;")}>{v.realProjectsSourceLabel}（原本を開く）</a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ==== 前年比較 ==== */}
            {v.isCompare && (
              <div data-screen-label="予算の前年比較" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:20px;")}>
                  <div>
                    <h1 style={S("margin:0 0 6px; font-size:24px; font-weight:700;")}>前年度との比較</h1>
                    <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>{v.compPrevLabel} と {v.compCurLabel} の当初予算を款ごとに比較します（甲府市は公表実データ）。{v.compPrevNote && <span style={S("display:block; font-size:11.5px; color:#9DACB7; margin-top:2px;")}>{v.compPrevNote}</span>}</p>
                  </div>
                  <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                    {v.compTabs.map((ct: any, i: number) => (
                      <button key={i} onClick={ct.pick} style={S(`border:none; background:${ct.bg}; color:${ct.fg}; padding:8px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)}>{ct.label}</button>
                    ))}
                  </div>
                </div>

                <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:22px; display:flex; gap:34px; align-items:center; flex-wrap:wrap;")}>
                  <div><div style={S("font-size:12px; color:#5C6B77;")}>{v.compPrevLabel}</div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:24px; font-weight:600; color:#5C6B77;")}>{v.compPrevTotal}</div></div>
                  <span style={S("color:#9DACB7; font-size:20px;")}>→</span>
                  <div><div style={S("font-size:12px; color:#5C6B77;")}>{v.compCurLabel}</div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:28px; font-weight:600;")}>{v.compCurTotal}</div><div style={S("font-size:10.5px; color:#5C6B77;")}>{v.compSub}</div></div>
                  <div style={S("margin-left:auto; text-align:right;")}>
                    <div style={S(`font-family:'IBM Plex Mono',monospace; font-size:22px; font-weight:600; color:${v.compTotalFg};`)}>{v.compTotalDelta}</div>
                    <div style={S("font-size:12px; color:#5C6B77;")}>増減（{v.compTotalPct}）</div>
                  </div>
                </div>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px;")}>
                  <div style={S("display:flex; gap:16px; font-size:11.5px; color:#5C6B77; margin-bottom:12px;")}>
                    <span style={S("display:inline-flex; align-items:center; gap:5px;")}><span style={S("width:18px; height:7px; border-radius:999px; background:#C6D2DA;")}></span>{v.compPrevLabel}</span>
                    <span style={S("display:inline-flex; align-items:center; gap:5px;")}><span style={S("width:18px; height:7px; border-radius:999px; background:#0072B2;")}></span>{v.compCurLabel}</span>
                  </div>
                  <div data-mq="comp" style={S("display:grid; grid-template-columns:14px minmax(110px,1fr) 2.2fr 92px 92px 110px; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:8px;")}>
                    <span></span><span>款</span><span></span><span style={S("text-align:right;")}>前年度</span><span style={S("text-align:right;")}>今年度</span><span style={S("text-align:right;")}>増減</span>
                  </div>
                  {v.compRows.map((cr: any, i: number) => (
                    <HoverBox as="button" key={i} onClick={cr.open} data-mq="comp" style={S(`width:100%; display:grid; grid-template-columns:14px minmax(110px,1fr) 2.2fr 92px 92px 110px; gap:12px; padding:12px 0; border:none; border-bottom:1px solid #ECF2F6; background:none; font-size:13px; align-items:center; cursor:pointer; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("background:#F1F6F9;")}>
                      <span style={S(`width:10px; height:10px; border-radius:3px; background:${cr.sw};`)}></span>
                      <span style={S("font-weight:600;")}>{cr.name}</span>
                      <span style={S("display:flex; flex-direction:column; gap:4px;")}>
                        <span style={S("display:block; height:7px; border-radius:999px; background:#ECF2F6; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${cr.prevW}%; background:#C6D2DA;`)}></span></span>
                        <span style={S("display:block; height:7px; border-radius:999px; background:#ECF2F6; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${cr.curW}%; background:${cr.sw};`)}></span></span>
                      </span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; color:#5C6B77;")}>{cr.prevFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{cr.curFmt}</span>
                      <span style={S(`font-family:'IBM Plex Mono',monospace; text-align:right; font-weight:600; color:${cr.deltaFg};`)}>{cr.deltaFmt}</span>
                    </HoverBox>
                  ))}
                  <p style={S("margin:12px 2px 0; font-size:12px; color:#5C6B77;")}>増減は当初予算同士の比較。行をクリックすると款の内訳へ移動します。</p>
                </section>
              </div>
            )}

            {/* ==== 政策テーマ ==== */}
            {v.isThemes && (
              <div data-screen-label="政策テーマ別ビュー" style={S("animation:fadeUp .35s ease both;")}>
                <section data-mq-pad="" style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:18px; padding:26px 30px; margin-bottom:24px;")}>
                  <div style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.18em; color:#0F76A3; margin-bottom:10px;")}>POLICY THEMES — 総合計画の基本目標別に見る</div>
                  <p style={S("margin:0 0 14px; font-size:15px; line-height:1.9; max-width:76ch;")}>{v.themesIntro}</p>
                  <div style={S("display:flex; gap:8px; flex-wrap:wrap;")}>
                    <a href={v.dashSourceUrl} onClick={(e) => { e.preventDefault(); v.dashSourceOpen(); }} style={S("font-size:12px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:4px 12px; text-decoration:none; cursor:pointer;")}>出典：{v.dashSourceTitle}（原本を開く）</a>
                  </div>
                </section>

                <p style={S("margin:0 0 14px; font-size:13px; color:#5C6B77;")}>基本目標は会計上の款・項とは別軸です。複数の基本目標を持つ事業は各目標に計上しています。</p>

                <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(220px,1fr)); gap:10px; margin-bottom:28px;")}>
                  {v.themeCards.map((tc: any, i: number) => (
                    <HoverBox as="button" key={i} onClick={tc.open} style={S(`text-align:left; background:${tc.bg}; border:1.5px solid ${tc.bd}; border-radius:13px; padding:15px 16px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("border-color:#1798D0;")}>
                      <span style={S("display:block; font-size:14px; font-weight:700; margin-bottom:2px; color:#14181C;")}>{tc.name}</span>
                      <span style={S("display:block; font-size:11px; color:#5C6B77; margin-bottom:7px;")}>{tc.sub2}</span>
                      <span style={S("display:block; font-family:'IBM Plex Mono',monospace; font-size:16px;")}>{tc.totalFmt}</span>
                      <span style={S("display:block; font-size:11.5px; color:#5C6B77;")}>{tc.count}事業 ・ {tc.sub}</span>
                    </HoverBox>
                  ))}
                </div>

                {v.hasTheme && (
                  <section data-mq-pad="" style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:18px; padding:26px 30px;")}>
                    <div style={S("display:flex; align-items:flex-start; justify-content:space-between; gap:18px; flex-wrap:wrap; margin-bottom:6px;")}>
                      <div>
                        <h2 style={S("margin:0 0 8px; font-size:22px; font-weight:700;")}>{v.themeName}</h2>
                        <p style={S("margin:0; color:#5C6B77; font-size:14px; max-width:64ch; line-height:1.8;")}>{v.themeIntent}</p>
                      </div>
                      <div style={S("text-align:right;")}>
                        <div style={S("font-family:'IBM Plex Mono',monospace; font-size:26px; font-weight:600;")}>{v.themeTotalFmt}</div>
                        <div style={S("font-size:12px; color:#5C6B77;")}>{v.themeCount}事業の予算合計 ・ 市民1人あたり <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C; font-weight:600;")}>{v.themePer}</span></div>
                      </div>
                    </div>

                    <div style={S("margin:18px 0 22px;")}>
                      <div style={S("font-size:12px; color:#5C6B77; margin-bottom:8px;")}>会計項目（款）別の内訳 — 政策テーマ ⇄ 款・項・目・節 は相互に集計できます</div>
                      <div style={S("display:flex; gap:8px; flex-wrap:wrap;")}>
                        {v.themeKanChips.map((kc: any, i: number) => (
                          <HoverBox as="button" key={i} onClick={kc.open} style={S("display:inline-flex; align-items:center; gap:7px; border:1px solid #DFE7EC; background:#F7FAFC; border-radius:999px; padding:5px 13px; font-size:12.5px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0; color:#1798D0;")}>
                            <span style={S(`width:9px; height:9px; border-radius:3px; background:${kc.sw};`)}></span>{kc.name} <span style={S("font-family:'IBM Plex Mono',monospace;")}>{kc.amtFmt}</span>
                          </HoverBox>
                        ))}
                      </div>
                    </div>

                    <div style={S("display:flex; flex-direction:column; gap:9px;")}>
                      {v.themeProjects.map((tp: any, i: number) => (
                        <div key={i} data-mq="tproj" style={S("display:grid; grid-template-columns:minmax(200px,2fr) minmax(140px,1.2fr) 96px 110px; align-items:center; gap:14px; border:1px solid #E3EBF0; background:#F7FAFC; border-radius:12px; padding:14px 18px; text-align:left;")}>
                          <span>
                            <span style={S("display:flex; align-items:center; gap:8px;")}>
                              {tp.kubun && <span style={S(`font-size:10.5px; font-weight:700; border-radius:999px; padding:1px 9px; white-space:nowrap; color:${tp.kubun === "新規" ? "#0F76A3" : "#C25400"}; border:1px solid ${tp.kubun === "新規" ? "#B9E0F2" : "#EFD4BE"};`)}>{tp.kubun}</span>}
                              <span style={S("font-size:14.5px; font-weight:700; color:#14181C;")}>{tp.name}</span>
                            </span>
                            <span style={S("display:block; font-size:11.5px; color:#5C6B77; margin-top:2px; line-height:1.6;")}>{tp.summary}</span>
                          </span>
                          <span style={S("font-size:11.5px; color:#5C6B77; font-family:'IBM Plex Mono',monospace;")}>{tp.kanPath}</span>
                          <span style={S("text-align:right;")}><span style={S("display:block; font-family:'IBM Plex Mono',monospace; font-size:13.5px;")}>{tp.budgetFmt}</span><span style={S("display:block; font-size:10px; color:#5C6B77;")}>{tp.sub}</span></span>
                          <span>
                            <span style={S("display:block; font-size:10.5px; color:#5C6B77;")}>施策</span>
                            <span style={S("display:block; font-size:11.5px; color:#14181C; line-height:1.5;")}>{tp.shisaku}</span>
                            <a href={tp.refUrl} onClick={(e) => { e.preventDefault(); tp.refOpen(); }} style={S("display:block; font-size:10px; color:#0F76A3; font-family:'IBM Plex Mono',monospace; margin-top:2px; cursor:pointer;")}>{tp.refLabel}</a>
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* ==== 予算執行状況（財政事情の公表） ==== */}
            {v.isExecution && (
              <div data-screen-label="予算執行状況" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:20px;")}>
                  <div>
                    <h1 style={S("margin:0 0 6px; font-size:24px; font-weight:700;")}>予算執行状況</h1>
                    <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>{v.execFyLabel} ・ 款ごとに「予算はこうでした → ここまで使われました」を確認できます。</p>
                  </div>
                  <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                    {v.execTabs.map((et: any, i: number) => (
                      <button key={i} onClick={et.pick} style={S(`border:none; background:${et.bg}; color:${et.fg}; padding:8px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)}>{et.label}</button>
                    ))}
                  </div>
                </div>

                <div style={S("display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:18px;")}>
                  <span style={S("font-size:12px; color:#5C6B77;")}>年度</span>
                  <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                    {v.execYearTabs.map((yt: any, i: number) => (
                      <button key={i} onClick={yt.pick} style={S(`border:none; background:${yt.bg}; color:${yt.fg}; padding:6px 14px; font-size:12px; font-weight:600; cursor:pointer; font-family:'IBM Plex Mono',monospace;`)}>{yt.label}</button>
                    ))}
                  </div>
                  <span style={S("font-size:11.5px; color:#9DACB7;")}>{v.execGapNote}</span>
                </div>

                <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:22px; display:flex; align-items:center; gap:26px; flex-wrap:wrap;")}>
                  <div>
                    <div style={S("font-size:12px; color:#5C6B77;")}>一般会計 {v.execSideLabel}の{v.execRateLabel}</div>
                    <div style={S("font-family:'IBM Plex Mono',monospace; font-size:38px; font-weight:600; line-height:1.1;")}>{v.execOverallRate}</div>
                  </div>
                  <div style={S("flex:1; min-width:220px;")}>
                    <div style={S("height:12px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}>
                      <div data-anim="bar" style={S(`height:100%; width:${v.execOverallBarW}%; background:linear-gradient(90deg,#1798D0,#55BBE4); border-radius:999px;`)}></div>
                    </div>
                    <div style={S("display:flex; justify-content:space-between; font-size:11.5px; color:#5C6B77; margin-top:6px;")}>
                      <span>予算現額 <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{v.execBudgetFmt}</span></span>
                      <span>{v.execSettledColLabel} <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{v.execSettledFmt}</span></span>
                    </div>
                  </div>
                </div>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:22px;")}>
                  <div data-mq="hist" style={S("display:grid; grid-template-columns:minmax(110px,1fr) 2fr 100px 100px 64px 90px; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:8px;")}>
                    <span>款</span><span>{v.execRateLabel}</span><span style={S("text-align:right;")}>予算現額</span><span style={S("text-align:right;")}>{v.execSettledColLabel}</span><span style={S("text-align:right;")}>率</span><span style={S("text-align:right;")}>残額</span>
                  </div>
                  {v.execRows.map((hr: any, i: number) => (
                    <div key={i} data-mq="hist" title={hr.breakdownNote ? `${hr.ref}\n内訳（予算現額）: ${hr.breakdownNote}` : hr.ref} style={S("display:grid; grid-template-columns:minmax(110px,1fr) 2fr 100px 100px 64px 90px; gap:12px; padding:12px 0; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center;")}>
                      <span style={S("font-weight:600; display:inline-flex; align-items:center; gap:8px;")}><span style={S(`width:10px; height:10px; border-radius:3px; background:${hr.sw};`)}></span>{hr.name}</span>
                      <span style={S("display:block; height:8px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${hr.barW}%; background:${hr.sw};`)}></span></span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{hr.budgetFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{hr.settledFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; font-weight:600;")}>{hr.rateFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; color:#5C6B77;")}>{hr.restFmt}</span>
                    </div>
                  ))}
                  <p style={S("margin:12px 2px 0; font-size:12px; color:#5C6B77;")}>{v.execAsOfNote}。残額＝予算現額−{v.execSettledColLabel}。</p>
                </section>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:22px;")}>
                  <h2 style={S("margin:0 0 4px; font-size:16px; font-weight:700;")}>決算の推移（普通会計・令和2〜6年度）</h2>
                  <p style={S("margin:0 0 16px; font-size:12.5px; color:#5C6B77;")}>総務省「市町村別決算状況調」による確定決算の経年推移です。</p>
                  <div style={S("display:flex; align-items:stretch; gap:12px; height:170px; max-width:560px;")}>
                    {v.trendBars.map((tb: any, i: number) => (
                      <div key={i} style={S("flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:5px;")}>
                        <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#3A4750;")}>{tb.amtFmt}</span>
                        <div style={S("width:100%; max-width:52px; height:110px; display:flex; align-items:flex-end; justify-content:center;")}>
                          <div data-anim="vbar" title={tb.ref} style={S(`width:100%; height:${tb.h}%; background:${tb.bg}; border-radius:6px 6px 0 0;`)}></div>
                        </div>
                        <a href={tb.landingUrl} target="_blank" rel="noopener noreferrer" style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; color:#5C6B77;")}>{tb.label}</a>
                      </div>
                    ))}
                  </div>
                  <div style={S("margin-top:18px; overflow-x:auto;")}>
                    <div style={S("display:grid; grid-template-columns:minmax(120px,1.4fr) repeat(5, minmax(72px,1fr)); gap:10px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:7px; min-width:520px;")}>
                      <span>指標</span>
                      {v.trendYearLabels.map((y: string, i: number) => (<span key={i} style={S("text-align:right; font-family:'IBM Plex Mono',monospace;")}>{y}</span>))}
                    </div>
                    {v.trendIndicators.map((ti: any, i: number) => (
                      <div key={i} style={S("display:grid; grid-template-columns:minmax(120px,1.4fr) repeat(5, minmax(72px,1fr)); gap:10px; padding:9px 0; border-bottom:1px solid #ECF2F6; font-size:12.5px; align-items:center; min-width:520px;")}>
                        <span style={S("font-weight:600;")}>{ti.name}</span>
                        {ti.vals.map((val: string, j: number) => (<span key={j} style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{val}</span>))}
                      </div>
                    ))}
                  </div>
                  <p style={S("margin:10px 2px 0; font-size:12px; color:#5C6B77;")}>
                    <a href={v.trendSourceUrl} target="_blank" rel="noopener noreferrer" style={S("color:#5C6B77;")}>出典：総務省「市町村別決算状況調」各年度（年度ラベルから各年度ページへ） ↗</a>
                  </p>
                </section>

                {v.showEvidence && (
                  <section>
                    <h3 style={S("margin:0 0 12px; font-size:14px; font-weight:700;")}>エビデンス（一次資料）</h3>
                    <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:12px;")}>
                      {v.execEvidence.map((he: any, i: number) => (
                        <HoverBox as="a" key={i} href={he.localUrl || he.url} target={he.open ? undefined : "_blank"} rel="noopener noreferrer" onClick={he.open ? (e: any) => { e.preventDefault(); he.open(); } : undefined} style={S("display:block; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:13px; overflow:hidden; text-decoration:none; color:#14181C; cursor:pointer;")} hoverStyle={S("border-color:#1798D0; text-decoration:none;")}>
                          <span style={S("display:flex; align-items:center; justify-content:center; height:96px; background:repeating-linear-gradient(45deg,#ECF2F6 0 10px,#E1EAF0 10px 20px); font-family:'IBM Plex Mono',monospace; font-size:11px; color:#5C6B77; text-align:center; padding:0 14px; line-height:1.5;")}>{he.thumb}</span>
                          <span style={S("display:block; padding:12px 15px;")}>
                            <span style={S("display:inline-block; font-size:10.5px; font-weight:600; color:#1798D0; border:1px solid #B9E0F2; border-radius:999px; padding:1px 9px; margin-bottom:6px;")}>{he.type}</span>
                            <span style={S("display:block; font-size:13px; font-weight:600; line-height:1.5;")}>{he.title}</span>
                            <span style={S("display:block; font-size:11px; color:#5C6B77; margin-top:3px; font-family:'IBM Plex Mono',monospace;")}>{he.source}</span>
                          </span>
                        </HoverBox>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* ==== 類似自治体との比較 ==== */}
            {v.isSimilar && (
              <div data-screen-label="類似自治体との比較" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("margin-bottom:20px;")}>
                  <h1 style={S("margin:0 0 6px; font-size:24px; font-weight:700;")}>類似自治体との比較</h1>
                  <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>人口15〜25万人の類似規模の市と、規模・1人あたり歳出・歳出構成を比べます（令和6年度 普通会計決算の実データ）。</p>
                </div>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:16px;")}>
                  <div data-mq="sim-h" style={S("display:grid; grid-template-columns:minmax(120px,1.2fr) 80px 100px 110px 2fr; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:8px;")}>
                    <span>自治体</span><span style={S("text-align:right;")}>人口</span><span style={S("text-align:right;")}>一般会計</span><span style={S("text-align:right;")}>1人あたり歳出</span><span>歳出構成（ホバー／タップで内訳）</span>
                  </div>
                  {v.similarRows.map((sr: any, i: number) => (
                    <div key={i} data-mq="sim" style={S(`display:grid; grid-template-columns:minmax(120px,1.2fr) 80px 100px 110px 2fr; gap:12px; padding:12px 8px; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center; background:${sr.bg}; border-radius:8px;`)}>
                      <span style={S("display:flex; flex-direction:column; gap:2px;")}>
                        <span style={S(`font-weight:${sr.fw}; display:inline-flex; align-items:center; gap:8px;`)}>{sr.name}<span style={S("font-size:10.5px; color:#0F76A3; font-weight:700;")}>{sr.badge}</span></span>
                        <span title={sr.ref} style={S("font-family:'IBM Plex Mono',monospace; font-size:10px; color:#8494A0; font-weight:400;")}>{sr.refLabel}</span>
                      </span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{sr.pop}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{sr.totalFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; font-weight:600;")}>{sr.perCap}</span>
                      <span style={S("display:flex; height:16px; border-radius:999px; overflow:hidden; background:#ECF2F6;")}>
                        {sr.segs.map((sg: any, j: number) => (
                          <span key={j} data-anim="bar" onMouseMove={sg.tipMove} onClick={sg.tipMove} onMouseLeave={v.hideTip} style={S(`width:${sg.w}%; background:${sg.sw}; cursor:pointer;`)}></span>
                        ))}
                      </span>
                    </div>
                  ))}
                  <div style={S("display:flex; gap:14px; flex-wrap:wrap; margin-top:12px; font-size:11.5px; color:#5C6B77;")}>
                    {v.simLegend.map((sl: any, i: number) => (
                      <span key={i} style={S("display:inline-flex; align-items:center; gap:5px;")}><span style={S(`width:10px; height:10px; border-radius:3px; background:${sl.sw};`)}></span>{sl.name}</span>
                    ))}
                  </div>
                </section>

                <section style={S("margin-bottom:16px;")}>
                  <h3 style={S("margin:0 0 12px; font-size:14px; font-weight:700;")}>エビデンス（一次資料）</h3>
                  <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:12px;")}>
                    {v.similarEvidence.map((ev: any, i: number) => (
                      <HoverBox as="a" key={i} href={ev.url} target="_blank" rel="noopener noreferrer" style={S("display:block; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:13px; overflow:hidden; text-decoration:none; color:#14181C;")} hoverStyle={S("border-color:#1798D0; text-decoration:none;")}>
                        <span style={S("display:flex; align-items:center; justify-content:center; height:110px; background:repeating-linear-gradient(45deg,#ECF2F6 0 10px,#E1EAF0 10px 20px); font-family:'IBM Plex Mono',monospace; font-size:11px; color:#5C6B77; text-align:center; padding:0 14px; line-height:1.5;")}>{ev.thumb}</span>
                        <span style={S("display:block; padding:12px 15px;")}>
                          <span style={S("display:inline-block; font-size:10.5px; font-weight:600; color:#1798D0; border:1px solid #B9E0F2; border-radius:999px; padding:1px 9px; margin-bottom:6px;")}>{ev.type}</span>
                          <span style={S("display:block; font-size:13px; font-weight:600; line-height:1.5;")}>{ev.title}</span>
                          <span style={S("display:block; font-size:11px; color:#5C6B77; margin-top:3px; font-family:'IBM Plex Mono',monospace;")}>{ev.source}</span>
                        </span>
                      </HoverBox>
                    ))}
                  </div>
                </section>

                <div style={S("display:flex; gap:6px; flex-wrap:wrap;")}>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>出典：令和6年度 市町村別決算状況調（総務省）</span>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>地方財政状況調査（決算統計）</span>
                </div>
                <p style={S("margin:12px 2px 0; font-size:12px; color:#5C6B77;")}>1人あたり歳出が高い＝非効率とは限りません。面積・高齢化率・保有施設などの条件が異なります。</p>
              </div>
            )}

            {/* ==== データ出典・更新日 ==== */}
            {v.isSources && (
              <div data-screen-label="データ出典・更新日" style={S("animation:fadeUp .35s ease both;")}>
                <HoverBox as="button" onClick={v.goDash} style={S("border:none; background:none; color:#5C6B77; font-size:13px; cursor:pointer; padding:0; margin-bottom:14px; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>← ダッシュボードへ戻る</HoverBox>
                <div style={S("margin-bottom:20px;")}>
                  <h1 style={S("margin:0 0 6px; font-size:24px; font-weight:700;")}>データ出典・更新日</h1>
                  <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>このサイトで使用している一次資料と最終確認日の一覧です。すべての数値はこれらの資料まで遡れます。</p>
                </div>
                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px;")}>
                  <div data-mq="src" style={S("display:grid; grid-template-columns:minmax(200px,2fr) 70px minmax(140px,1.4fr) 100px minmax(160px,1.6fr); gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:8px;")}>
                    <span>資料名</span><span>種別</span><span>発行元</span><span>最終確認日</span><span>使用箇所</span>
                  </div>
                  {v.sourcesRows.map((src: any, i: number) => (
                    <div key={i} data-mq="src" style={S("display:grid; grid-template-columns:minmax(200px,2fr) 70px minmax(140px,1.4fr) 100px minmax(160px,1.6fr); gap:12px; padding:11px 0; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center;")}>
                      <span style={S("display:flex; flex-direction:column; gap:2px;")}>
                        {src.open ? (
                          <a href={src.localUrl} onClick={(e) => { e.preventDefault(); src.open(); }} style={S("font-weight:600; cursor:pointer;")}>{src.title}（原本を開く）</a>
                        ) : (
                          <a href={src.url} target="_blank" rel="noopener noreferrer" style={S("font-weight:600;")}>{src.title} ↗</a>
                        )}
                        {src.originUrl && src.originUrl !== src.url && (
                          <a href={src.originUrl} target="_blank" rel="noopener noreferrer" style={S("font-size:11px; color:#5C6B77; text-decoration:none;")}>発行元の元ページ（最新版に差し替わっている可能性あり）↗</a>
                        )}
                      </span>
                      <span><span style={S("display:inline-block; font-size:10.5px; font-weight:600; color:#0F76A3; border:1px solid #B9E0F2; border-radius:999px; padding:1px 9px;")}>{src.type}</span></span>
                      <span style={S("font-size:12.5px; color:#5C6B77;")}>{src.org}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; font-size:12px;")}>{src.date}</span>
                      <span style={S("font-size:12px; color:#5C6B77;")}>{src.used}</span>
                    </div>
                  ))}
                  <p style={S("margin:12px 2px 0; font-size:12px; color:#5C6B77;")}>アプリが実際に使用している一次資料の一覧です。リンクは Wayback Machine のコピー（魚拓）を優先しています — 発行元の直リンクは中身だけ差し替えられる可能性があるため、収録時点の版に固定されたコピーの方が透明性が高いためです。原本はリポジトリにもアーカイブされ、取得時の SHA-256 ハッシュで来歴を検証できます。</p>
                </section>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-top:20px;")}>
                  <h2 style={S("margin:0 0 6px; font-size:16px; font-weight:700;")}>未収録の資料をリクエストする</h2>
                  <p style={S("margin:0 0 14px; font-size:12.5px; color:#5C6B77; line-height:1.8;")}>ウェブに公開されていない一次資料は、リクエストが貯まったものから情報公開請求などで取得し、検証つきで収録します。賛同は各リクエストの 👍 リアクションでお願いします。請求から収録までの経緯もすべて公開されます。</p>
                  {v.uncollected.map((u: any, i: number) => (
                    <div key={i} data-mq="src" style={S("display:flex; align-items:center; justify-content:space-between; gap:14px; padding:10px 0; border-bottom:1px solid #ECF2F6; font-size:13px; flex-wrap:wrap;")}>
                      <span style={S("min-width:0;")}>
                        <span style={S("display:block; font-weight:600;")}>{u.title}</span>
                        <span style={S("display:block; font-size:11.5px; color:#5C6B77; margin-top:1px;")}>{u.why}</span>
                      </span>
                      <a href={u.requestUrl} target="_blank" rel="noopener noreferrer" style={S("font-size:12px; border:1px solid #1798D0; color:#0F76A3; border-radius:999px; padding:5px 14px; text-decoration:none; white-space:nowrap;")}>この資料をリクエスト ↗</a>
                    </div>
                  ))}
                  <p style={S("margin:12px 2px 0; font-size:11.5px; color:#9DACB7;")}>リクエスト一覧は <a href={v.requestListUrl} target="_blank" rel="noopener noreferrer" style={S("color:#5C6B77;")}>GitHub の「資料リクエスト」ラベル ↗</a> で確認できます。</p>
                </section>
              </div>
            )}

          </main>

          <footer data-mq-pad="" style={S("border-top:1px solid #DFE7EC; padding:16px 28px; font-size:12px; color:#5C6B77; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;")}>
            <span>予算トレース — プロトタイプ。掲載数値はすべて一次資料由来の実データです（項以下の内訳・補正・執行率は資料収録後に追加予定）。<button onClick={v.goSources} style={S("border:none; background:none; padding:0; margin-left:8px; color:#1798D0; font-size:12px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")}>データ出典・更新日一覧 →</button></span>
            <span style={S("font-family:'IBM Plex Mono',monospace;")}>SOURCE: 甲府市 当初予算資料 R2–R8</span>
          </footer>
        </div>
      )}

      {/* ==== 一次資料ドロワー（自サーバー配信の原本コピーをその場でレビュー） ==== */}
      {v.viewer && (
        <div role="dialog" aria-modal="true" aria-label={`一次資料: ${v.viewer.title}`} style={S("position:fixed; inset:0; z-index:300;")}>
          <div onClick={v.closeViewer} style={S("position:absolute; inset:0; background:rgba(20,24,28,0.45);")} />
          <div data-anim="drawer" style={S("position:absolute; left:0; right:0; bottom:0; height:min(78vh, 100%); background:#FFFFFF; border-top:1px solid #DFE7EC; border-radius:16px 16px 0 0; display:flex; flex-direction:column; box-shadow:0 -14px 44px rgba(20,24,28,0.22); overflow:hidden;")}>
            <div data-mq-pad="" style={S("display:flex; align-items:center; justify-content:space-between; gap:14px; padding:12px 22px; border-bottom:1px solid #DFE7EC; flex-wrap:wrap;")}>
              <div style={S("min-width:0;")}>
                <div style={S("font-size:13.5px; font-weight:700; color:#14181C; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;")}>{v.viewer.title}</div>
                <div style={S("font-size:11px; color:#5C6B77; font-family:'IBM Plex Mono',monospace;")}>{v.viewer.sub} ・ 収録時アーカイブの原本コピー</div>
              </div>
              <div style={S("display:flex; align-items:center; gap:10px; flex-wrap:wrap; font-size:11.5px;")}>
                <a href={v.viewer.tabUrl} target="_blank" rel="noopener noreferrer" style={S("color:#0F76A3; text-decoration:none;")}>新しいタブで開く ↗</a>
                {v.viewer.archiveUrl && <a href={v.viewer.archiveUrl} target="_blank" rel="noopener noreferrer" style={S("color:#5C6B77; text-decoration:none;")}>魚拓（Wayback）↗</a>}
                {v.viewer.originUrl && <a href={v.viewer.originUrl} target="_blank" rel="noopener noreferrer" style={S("color:#5C6B77; text-decoration:none;")}>発行元 ↗</a>}
                <HoverBox as="button" onClick={v.closeViewer} aria-label="閉じる" style={S("border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; border-radius:999px; padding:5px 14px; font-size:12px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0; color:#1798D0;")}>閉じる ✕</HoverBox>
              </div>
            </div>
            <PdfViewer url={v.viewer.url} page={v.viewer.page} />
          </div>
        </div>
      )}

      {/* ==== チャート近傍ツールチップ ==== */}
      {v.tipShow && (
        <div style={S(`position:fixed; left:${v.tipX}px; top:${v.tipY}px; transform:translate(-50%,-100%); background:#14181C; color:#F7FAFC; border-radius:9px; padding:8px 12px; font-size:12.5px; line-height:1.5; pointer-events:none; z-index:999; box-shadow:0 6px 18px rgba(20,24,28,0.25); white-space:nowrap;`)}>
          <span style={S(`display:flex; align-items:center; gap:7px; font-weight:700;`)}><span style={S(`width:9px; height:9px; border-radius:3px; background:${v.tipSw};`)}></span>{v.tipTitle}</span>
          <span style={S("display:block; font-family:'IBM Plex Mono',monospace;")}>{v.tipAmtLine}</span>
          <span style={S("display:block; max-width:270px; white-space:normal; font-weight:400; opacity:0.92; line-height:1.65;")}>{v.tipDesc}</span>
        </div>
      )}

    </div>
  );
}
