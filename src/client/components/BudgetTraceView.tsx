"use client";

import React from "react";
import JapanMap from "./JapanMap";
import { HoverBox, S } from "./ui";

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
              <p style={S("margin:0 0 30px; color:#5C6B77; max-width:44ch;")}>「予算はこうでした」で終わらせない。執行率、支出先、事業報告までを一次資料（エビデンス）付きで確認できます。</p>
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
            <span>本サイトはプロトタイプです。款レベルの数値は甲府市公表の令和8年度当初予算（総額918億円）の実データ、項以下の内訳・補正・執行率などは推計・ダミーです。</span>
            <span style={S("font-family:'IBM Plex Mono',monospace;")}>v0.1 / 2026-07</span>
          </footer>
        </div>
      )}

      {/* ============ 市区町村選択 ============ */}
      {v.isMuni && (
        <div data-screen-label="市区町村選択" data-mq-pad="" style={S("min-height:100vh; width:min(880px,100%); margin:0 auto; padding:28px 32px 64px; animation:fadeUp .35s ease both;")}>
          <HoverBox as="button" onClick={v.goTop} style={S("border:none; background:none; color:#5C6B77; font-size:13px; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>← 日本地図へ戻る</HoverBox>
          <h1 style={S("margin:18px 0 6px; font-size:32px; font-weight:700;")}>{v.muniPrefName}</h1>
          <p style={S("margin:0 0 28px; color:#5C6B77; font-size:14px;")}>自治体を選択してください。「県全体」を選ぶと都道府県レベルの予算を表示します。</p>

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
                  {v.hasStages && (
                    <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                      {v.stageTabs.map((stg: any, i: number) => (
                        <button key={i} onClick={stg.pick} style={S(`border:none; background:${stg.bg}; color:${stg.fg}; padding:6px 14px; font-size:12px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)}>{stg.label}</button>
                      ))}
                    </div>
                  )}
                  <HoverBox as="button" onClick={v.fyToggle} style={S("font-family:'IBM Plex Mono',monospace; font-size:11.5px; color:#5C6B77; background:#ECF2F6; border:1px solid transparent; border-radius:999px; padding:4px 12px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; white-space:nowrap;")} hoverStyle={S("border-color:#1798D0; color:#0F76A3;")}>{v.yearLabel} <span style={S("font-size:8.5px;")}>▼</span></HoverBox>
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
                    <div style={S("font-size:12.5px; color:#5C6B77;")}>対前年度 <span style={S("color:#0F76A3; font-weight:600;")}>{v.yoy}</span></div>
                    <div style={S("font-size:12px; color:#5C6B77; margin-top:3px;")}>{v.perCapitaLine}</div>
                  </div>
                </div>

                {v.hasStages && (
                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:18px 24px; margin-bottom:22px;")}>
                    <div style={S("display:flex; align-items:baseline; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:12px;")}>
                      <div style={S("display:flex; align-items:center; gap:7px;")}>
                        <h2 style={S("margin:0; font-size:15px; font-weight:700;")}>予算の変遷（当初 → 補正 → 現額）</h2>
                        <button onMouseEnter={v.gGenkei} onClick={v.gGenkei} onMouseLeave={v.hideTip} style={S("width:17px; height:17px; border-radius:50%; border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; font-size:11px; line-height:1; cursor:help; padding:0; font-family:'IBM Plex Mono',monospace;")}>?</button>
                      </div>
                      <span style={S("font-size:11.5px; color:#5C6B77;")}>カードをクリックすると表示が切り替わります ・ 補正額は款レベルで反映（ダミー）</span>
                    </div>
                    <div style={S("display:flex; align-items:stretch; gap:10px; flex-wrap:wrap;")}>
                      {v.stageFlow.map((sf: any, i: number) => (
                        <React.Fragment key={i}>
                          <HoverBox as="button" onClick={sf.pick} style={S(`flex:1; min-width:190px; text-align:left; border:1.5px solid ${sf.bd}; background:${sf.bg}; border-radius:12px; padding:13px 16px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("border-color:#1798D0;")}>
                            <span style={S(`display:block; font-size:12px; font-weight:700; color:${sf.labelFg}; margin-bottom:4px;`)}>{sf.t}</span>
                            <span style={S(`display:block; font-family:'IBM Plex Mono',monospace; font-size:19px; font-weight:600; color:${sf.amtFg};`)}>{sf.amt}</span>
                            <span style={S("display:block; font-size:11.5px; color:#5C6B77; margin-top:3px; line-height:1.5;")}>{sf.sub}</span>
                          </HoverBox>
                          <span data-mq="arrow" style={S(`align-self:center; color:#9DACB7; font-size:18px; display:${sf.sep};`)}>→</span>
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={S("display:flex; gap:6px; flex-wrap:wrap; margin-top:12px;")}>
                      <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>出典：令和8年度 補正予算書（第1号）</span>
                      <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>6月定例会 議決結果</span>
                    </div>
                  </section>
                )}

                <section data-mq="bsum-card" style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:14px 24px; margin-bottom:22px; display:flex; align-items:center; gap:20px; flex-wrap:wrap;")}>
                  <div data-mq="bsum" style={S("display:flex; align-items:center; gap:26px; flex-wrap:wrap; flex:1;")}>
                    {v.basicSummary.map((bs: any, i: number) => (
                      <div key={i} style={S("display:flex; flex-direction:column; gap:2px;")}>
                        <span style={S("font-size:11px; color:#5C6B77;")}>{bs.label}</span>
                        <span style={S("font-family:'IBM Plex Mono',monospace; font-size:14.5px; font-weight:600; color:#14181C; white-space:nowrap;")}>{bs.v}</span>
                      </div>
                    ))}
                  </div>
                  <HoverBox as="button" onClick={v.goBasic} style={S("border:none; background:none; color:#1798D0; font-size:12.5px; font-weight:600; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif; white-space:nowrap;")} hoverStyle={S("text-decoration:underline;")}>基本情報を見る →</HoverBox>
                </section>

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

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:22px 24px; margin-bottom:26px;")}>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:16px;")}>
                    <h2 style={S("margin:0; font-size:16px; font-weight:700;")}>議会の構成（予算議決時）</h2>
                    <span style={S("font-size:12.5px; color:#5C6B77;")}>{v.councilBody} ・ 定数 {v.councilSeats} ・ 会派名等はダミー</span>
                  </div>
                  <div style={S("display:flex; gap:30px; flex-wrap:wrap;")}>
                    <div style={S("flex:2 1 380px; min-width:300px;")}>
                      <div style={S("display:flex; height:16px; border-radius:999px; overflow:hidden; margin-bottom:14px; background:#E3EBF0;")}>
                        {v.councilParties.map((cp: any, i: number) => (
                          <span key={i} data-anim="bar" onMouseMove={cp.tipMove} onClick={cp.tipMove} onMouseLeave={v.hideTip} style={S(`width:${cp.w}%; background:${cp.sw}; cursor:pointer;`)}></span>
                        ))}
                      </div>
                      <div style={S("display:flex; flex-direction:column;")}>
                        {v.councilParties.map((cp: any, i: number) => (
                          <div key={i} data-mq="council" style={S("display:grid; grid-template-columns:14px minmax(140px,1fr) 70px 110px; align-items:center; gap:10px; padding:7px 4px; border-bottom:1px solid #ECF2F6; font-size:13px;")}>
                            <span style={S(`width:10px; height:10px; border-radius:3px; background:${cp.sw};`)}></span>
                            <span style={S("font-weight:600;")}>{cp.name}</span>
                            <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{cp.seats}議席</span>
                            <span style={S(`font-size:11.5px; font-weight:600; color:${cp.stanceFg}; text-align:right;`)}>{cp.stance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={S("flex:1 1 240px; min-width:220px;")}>
                      <div style={S("background:#F1F6F9; border-radius:12px; padding:16px 18px; margin-bottom:12px;")}>
                        <div style={S("display:flex; align-items:center; gap:8px; margin-bottom:10px;")}>
                          <span style={S("font-size:11.5px; font-weight:700; background:#E3F4FC; color:#0F76A3; border-radius:999px; padding:3px 11px;")}>可決</span>
                          <span style={S("font-size:12px; color:#5C6B77;")}>{v.councilDecided}</span>
                        </div>
                        <div style={S("display:flex; gap:20px;")}>
                          {v.councilVote.map((cv: any, i: number) => (
                            <div key={i}><div style={S(`font-family:'IBM Plex Mono',monospace; font-size:22px; font-weight:600; color:${cv.fg};`)}>{cv.n}</div><div style={S("font-size:11.5px; color:#5C6B77;")}>{cv.label}</div></div>
                          ))}
                        </div>
                      </div>
                      <div style={S("display:flex; gap:6px; flex-wrap:wrap;")}>
                        <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>出典：本会議 会議録（3月定例会）</span>
                        <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>議会だより</span>
                      </div>
                    </div>
                  </div>
                </section>

                <section style={S("margin-bottom:26px;")}>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; margin-bottom:12px;")}>
                    <h2 style={S("margin:0; font-size:16px; font-weight:700;")}>政策テーマ別に見る</h2>
                    <HoverBox as="button" onClick={v.goThemes} style={S("border:none; background:none; color:#1798D0; font-size:12.5px; font-weight:600; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("text-decoration:underline;")}>すべてのテーマ →</HoverBox>
                  </div>
                  <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(180px,1fr)); gap:10px;")}>
                    {v.themeStrip.map((th: any, i: number) => (
                      <HoverBox as="button" key={i} onClick={th.open} style={S("text-align:left; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:12px; padding:14px 16px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0;")}>
                        <span style={S("display:block; font-size:14px; font-weight:600; margin-bottom:6px;")}>{th.name}</span>
                        <span style={S("display:block; font-family:'IBM Plex Mono',monospace; font-size:15px;")}>{th.totalFmt}</span>
                        <span style={S("display:block; font-size:11.5px; color:#5C6B77;")}>{th.count}事業 ・ {th.sub}</span>
                      </HoverBox>
                    ))}
                  </div>
                </section>

                <section>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; margin-bottom:12px;")}>
                    <h2 style={S("margin:0; font-size:16px; font-weight:700;")}>注目の事業（執行状況）</h2>
                    <HoverBox as="button" onClick={v.goHistory} style={S("border:none; background:none; color:#1798D0; font-size:12.5px; font-weight:600; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("text-decoration:underline;")}>過年度の執行実績 →</HoverBox>
                  </div>
                  <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:12px;")}>
                    {v.featured.map((f: any, i: number) => (
                      <HoverBox as="button" key={i} onClick={f.open} style={S("text-align:left; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:18px 20px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0; box-shadow:0 4px 14px rgba(20,24,28,0.06);")}>
                        <span style={S("display:block; font-size:11.5px; color:#5C6B77; font-family:'IBM Plex Mono',monospace; margin-bottom:6px;")}>{f.kanPath}</span>
                        <span style={S("display:block; font-size:15px; font-weight:700; margin-bottom:12px; color:#14181C;")}>{f.name}</span>
                        <span style={S("display:flex; justify-content:space-between; font-size:12px; color:#5C6B77; margin-bottom:5px;")}>
                          <span>予算 <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{f.budgetFmt}</span>（{f.sub}）</span>
                          <span>執行率 <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C; font-weight:600;")}>{f.rateFmt}</span></span>
                        </span>
                        <span style={S("display:block; height:6px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}>
                          <span data-anim="bar" style={S(`display:block; height:100%; width:${f.barW}%; background:#1798D0; border-radius:999px;`)}></span>
                        </span>
                      </HoverBox>
                    ))}
                  </div>
                  <p style={S("margin:14px 2px 0; font-size:12px; color:#5C6B77;")}>出典：甲府市 令和8年度当初予算（款レベルは公表実データ・項以下は按分推計）</p>
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
                  <span style={S("display:inline-flex; align-items:center; gap:6px; font-size:12px; color:#5C6B77;")}>款 → 項 → 目 → 節 → 事業 の順に掘り下げられます（事業は収録済の目のみ）
                    <button onMouseEnter={v.gKanmoku} onClick={v.gKanmoku} onMouseLeave={v.hideTip} style={S("width:17px; height:17px; border-radius:50%; border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; font-size:11px; line-height:1; cursor:help; padding:0; font-family:'IBM Plex Mono',monospace;")}>?</button>
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
                      <a href="#" style={S("font-size:12px;")}>予算書PDFを開く ↗</a>
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

                    {v.hasRelated && (
                      <div style={S("margin-top:24px;")}>
                        <h3 style={S("margin:0 0 10px; font-size:14px; font-weight:700;")}>この会計項目に紐づく事業</h3>
                        <div style={S("display:flex; flex-direction:column; gap:8px;")}>
                          {v.drillRelated.map((rp: any, i: number) => (
                            <HoverBox as="button" key={i} onClick={rp.open} style={S("display:flex; align-items:center; justify-content:space-between; gap:14px; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:11px; padding:12px 16px; cursor:pointer; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0;")}>
                              <span>
                                <span style={S("display:block; font-size:14px; font-weight:600;")}>{rp.name}</span>
                                <span style={S("display:block; font-size:11.5px; color:#5C6B77;")}>{rp.themes}</span>
                              </span>
                              <span style={S("font-family:'IBM Plex Mono',monospace; font-size:13px; white-space:nowrap;")}>{rp.budgetFmt} <span style={S("color:#5C6B77; font-size:11px;")}>執行 {rp.rateFmt}</span></span>
                            </HoverBox>
                          ))}
                        </div>
                        <p style={S("margin:10px 2px 0; font-size:12px; color:#5C6B77;")}>会計項目（款・項・目・節）と政策意図は別軸です。<button onClick={v.goThemes} style={S("border:none;background:none;padding:0;color:#1798D0;cursor:pointer;font-size:12px;font-family:'IBM Plex Sans JP',sans-serif;")}>政策テーマ別の集計はこちら →</button></p>
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
                    <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>{v.compPrevLabel} と {v.compCurLabel} の当初予算を款ごとに比較します（甲府市は公表実データ）。</p>
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
                  <div style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; letter-spacing:0.18em; color:#0F76A3; margin-bottom:10px;")}>POLICY INTENT — 甲府市の政策意図サマリー</div>
                  <p style={S("margin:0 0 14px; font-size:15px; line-height:1.9; max-width:76ch;")}>令和8年度当初予算は、次の3つを重点の柱として編成されています。インフラは新設よりも長寿命化・維持管理へ重心を移しています。</p>
                  <ul style={S("margin:0 0 18px; padding:0 0 0 1.3em; display:flex; flex-direction:column; gap:8px; font-size:14.5px; line-height:1.8; max-width:80ch;")}>
                    <li><strong>こども・若者への投資</strong> — 保育の受け皿確保や応援金給付など、子育て関連を前年度比 +8.2% と最も高い伸びで重点配分</li>
                    <li><strong>災害に強いまちづくり</strong> — 自主防災組織の強化と、道路・橋りょうの予防保全への転換</li>
                    <li><strong>中心市街地のにぎわい再生</strong> — 空き店舗リノベーションと出店支援で、まちなかの回遊を回復</li>
                  </ul>
                  <div style={S("display:flex; gap:8px; flex-wrap:wrap;")}>
                    <span style={S("font-size:12px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:4px 12px;")}>出典：令和8年度 施政方針（PDF）</span>
                    <span style={S("font-size:12px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:4px 12px;")}>第七次甲府市総合計画</span>
                  </div>
                </section>

                <p style={S("margin:0 0 14px; font-size:13px; color:#5C6B77;")}>政策テーマは会計上の款・項とは別に、事業単位で「ゆるく」分類したものです。1つの事業が複数テーマに属することがあります。</p>

                <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(170px,1fr)); gap:10px; margin-bottom:28px;")}>
                  {v.themeCards.map((tc: any, i: number) => (
                    <HoverBox as="button" key={i} onClick={tc.open} style={S(`text-align:left; background:${tc.bg}; border:1.5px solid ${tc.bd}; border-radius:13px; padding:15px 16px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("border-color:#1798D0;")}>
                      <span style={S("display:block; font-size:14px; font-weight:700; margin-bottom:7px; color:#14181C;")}>{tc.name}</span>
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
                        <HoverBox as="button" key={i} onClick={tp.open} data-mq="tproj" style={S("display:grid; grid-template-columns:minmax(200px,2fr) minmax(140px,1.2fr) 96px 110px; align-items:center; gap:14px; border:1px solid #E3EBF0; background:#F7FAFC; border-radius:12px; padding:14px 18px; cursor:pointer; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("border-color:#1798D0; background:#FFFFFF;")}>
                          <span>
                            <span style={S("display:block; font-size:14.5px; font-weight:700; color:#14181C;")}>{tp.name}</span>
                            <span style={S("display:block; font-size:11.5px; color:#5C6B77; margin-top:2px;")}>{tp.summary}</span>
                          </span>
                          <span style={S("font-size:11.5px; color:#5C6B77; font-family:'IBM Plex Mono',monospace;")}>{tp.kanPath}</span>
                          <span style={S("text-align:right;")}><span style={S("display:block; font-family:'IBM Plex Mono',monospace; font-size:13.5px;")}>{tp.budgetFmt}</span><span style={S("display:block; font-size:10px; color:#5C6B77;")}>{tp.sub}</span></span>
                          <span>
                            <span style={S("display:flex; justify-content:space-between; font-size:10.5px; color:#5C6B77; margin-bottom:3px;")}><span>執行率</span><span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C; font-weight:600;")}>{tp.rateFmt}</span></span>
                            <span style={S("display:block; height:5px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${tp.barW}%; background:#1798D0;`)}></span></span>
                          </span>
                        </HoverBox>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* ==== 事業詳細 ==== */}
            {v.isProject && (
              <div data-screen-label="事業詳細" style={S("animation:fadeUp .35s ease both;")}>
                <HoverBox as="button" onClick={v.goBack} style={S("border:none; background:none; color:#5C6B77; font-size:13px; cursor:pointer; padding:0; margin-bottom:14px; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0;")}>← 戻る</HoverBox>

                <div style={S("display:flex; align-items:flex-start; justify-content:space-between; gap:18px; flex-wrap:wrap; margin-bottom:20px;")}>
                  <div>
                    <div style={S("display:flex; gap:6px; flex-wrap:wrap; margin-bottom:10px;")}>
                      <span style={S("font-size:11.5px; font-weight:600; background:#E3F4FC; color:#0F76A3; border-radius:999px; padding:3px 11px;")}>{v.projStatus}</span>
                      {v.projThemes.map((pt: any, i: number) => (
                        <HoverBox as="button" key={i} onClick={pt.open} style={S("font-size:11.5px; border:1px solid #DFE7EC; background:#FFFFFF; color:#5C6B77; border-radius:999px; padding:3px 11px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("color:#1798D0; border-color:#1798D0;")}>{pt.name}</HoverBox>
                      ))}
                    </div>
                    <h1 style={S("margin:0 0 8px; font-size:26px; font-weight:700;")}>{v.projName}</h1>
                    <div style={S("display:flex; gap:18px; flex-wrap:wrap; font-size:12.5px; color:#5C6B77;")}>
                      <HoverBox as="button" onClick={v.projKanOpen} style={S("border:none; background:none; padding:0; cursor:pointer; color:#1798D0; font-size:12.5px; font-family:'IBM Plex Mono',monospace;")} hoverStyle={S("text-decoration:underline;")}>{v.projKanPath}</HoverBox>
                      <span>所管：{v.projDept}</span>
                      <span>期間：{v.projPeriod}</span>
                    </div>
                  </div>
                  <div data-mq="statcard" style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:16px 22px; display:flex; gap:26px; align-items:center; flex-wrap:wrap;")}>
                    <div><div style={S("font-size:11px; color:#5C6B77;")}>{v.projBudgetLabel}</div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:20px; font-weight:600;")}>{v.projBudgetFmt}</div><div style={S("font-size:10.5px; color:#5C6B77;")}>{v.projBudgetSub}</div></div>
                    <div><div style={S("font-size:11px; color:#5C6B77;")}>支出済額</div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:20px; font-weight:600;")}>{v.projSpentFmt}</div></div>
                    <div><div style={S("display:flex; align-items:center; gap:5px; font-size:11px; color:#5C6B77;")}>執行率<button onMouseEnter={v.gRate} onClick={v.gRate} onMouseLeave={v.hideTip} style={S("width:15px; height:15px; border-radius:50%; border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; font-size:10px; line-height:1; cursor:help; padding:0; font-family:'IBM Plex Mono',monospace;")}>?</button></div><div style={S("font-family:'IBM Plex Mono',monospace; font-size:20px; font-weight:600; color:#1798D0;")}>{v.projRateFmt}</div></div>
                  </div>
                </div>

                {v.projHoseiShow && (
                  <div style={S("display:flex; align-items:center; gap:12px; background:#E3F4FC; border:1px solid #B9E0F2; border-radius:11px; padding:10px 16px; margin-bottom:14px; font-size:13px; flex-wrap:wrap;")}>
                    <span style={S("font-size:11.5px; font-weight:700; color:#0F76A3; border:1px solid #0F76A3; border-radius:999px; padding:2px 10px; white-space:nowrap;")}>補正あり</span>
                    <span style={S("line-height:1.6;")}>{v.projHoseiText}</span>
                    <span style={S("margin-left:auto; display:inline-flex; align-items:center; gap:8px; white-space:nowrap;")}>
                      <span style={S("font-family:'IBM Plex Mono',monospace; font-size:12px; color:#0F76A3; font-weight:600;")}>{v.projHoseiAfter}</span>
                      <span style={S("font-size:11.5px; border:1px solid #B9E0F2; color:#0F76A3; border-radius:999px; padding:3px 11px;")}>補正予算書（第1号）</span>
                    </span>
                  </div>
                )}

                <div style={S("height:10px; border-radius:999px; background:#E3EBF0; overflow:hidden; margin-bottom:26px;")}>
                  <div data-anim="bar" style={S(`height:100%; width:${v.projBarW}%; background:linear-gradient(90deg,#1798D0,#55BBE4); border-radius:999px;`)}></div>
                </div>

                <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:14px; margin-bottom:26px;")}>
                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:20px 22px;")}>
                    <h3 style={S("margin:0 0 8px; font-size:13px; font-weight:700; color:#5C6B77; letter-spacing:0.06em;")}>目的</h3>
                    <p style={S("margin:0; font-size:14px; line-height:1.85;")}>{v.projPurpose}</p>
                  </section>
                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:20px 22px;")}>
                    <h3 style={S("margin:0 0 8px; font-size:13px; font-weight:700; color:#5C6B77; letter-spacing:0.06em;")}>事業内容</h3>
                    <p style={S("margin:0; font-size:14px; line-height:1.85;")}>{v.projDesc}</p>
                  </section>
                </div>

                <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(320px,1fr)); gap:14px; margin-bottom:26px;")}>
                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:20px 22px;")}>
                    <h3 style={S("margin:0 0 14px; font-size:14px; font-weight:700;")}>四半期ごとの執行推移（累計）</h3>
                    <div style={S("display:flex; align-items:flex-end; gap:18px; height:150px; padding:0 6px;")}>
                      {v.projQuarters.map((q: any, i: number) => (
                        <div key={i} style={S("flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; height:100%; justify-content:flex-end;")}>
                          <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; color:#14181C;")}>{q.actLabel}</span>
                          <div style={S("display:flex; align-items:flex-end; gap:4px; width:100%; justify-content:center;")}>
                            <div data-anim="vbar" style={S(`width:22px; height:${q.planH}px; background:#DCE5EB; border-radius:4px 4px 0 0;`)} title="計画"></div>
                            <div data-anim="vbar" style={S(`width:22px; height:${q.actH}px; background:${q.actBg}; border:${q.actBorder}; border-radius:4px 4px 0 0;`)} title="実績"></div>
                          </div>
                          <span style={S("font-size:11px; color:#5C6B77;")}>{q.label}</span>
                        </div>
                      ))}
                    </div>
                    <div style={S("display:flex; gap:16px; margin-top:10px; font-size:11.5px; color:#5C6B77;")}>
                      <span style={S("display:inline-flex; align-items:center; gap:5px;")}><span style={S("width:10px;height:10px;background:#DCE5EB;border-radius:3px;")}></span>計画</span>
                      <span style={S("display:inline-flex; align-items:center; gap:5px;")}><span style={S("width:10px;height:10px;background:#1798D0;border-radius:3px;")}></span>実績</span>
                      <span style={S("display:inline-flex; align-items:center; gap:5px;")}><span style={S("width:10px;height:10px;border:1.5px dashed #9DACB7;border-radius:3px;")}></span>未到来</span>
                    </div>
                  </section>

                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:20px 22px;")}>
                    <h3 style={S("margin:0 0 14px; font-size:14px; font-weight:700;")}>契約・支出先の内訳</h3>
                    <div style={S("display:flex; flex-direction:column;")}>
                      <div style={S("display:grid; grid-template-columns:2fr 1.2fr 90px; gap:10px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:7px;")}>
                        <span>支出先・内容</span><span>契約方法</span><span style={S("text-align:right;")}>金額</span>
                      </div>
                      {v.projContracts.map((ct: any, i: number) => (
                        <div key={i} style={S("display:grid; grid-template-columns:2fr 1.2fr 90px; gap:10px; padding:10px 0; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center;")}>
                          <span><span style={S("display:block; font-weight:600;")}>{ct.to}</span><span style={S("display:block; font-size:11.5px; color:#5C6B77;")}>{ct.desc}</span></span>
                          <span><span style={S("display:block; font-size:12px; color:#5C6B77;")}>{ct.method}</span><span style={S("display:block; font-size:11px; color:#1798D0;")}>{ct.bid}</span></span>
                          <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{ct.amtFmt}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:20px 22px; margin-bottom:26px;")}>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:12px;")}>
                    <h3 style={S("margin:0; font-size:14px; font-weight:700;")}>成果指標（KPI）— お金と成果の突き合わせ</h3>
                    <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>出典：主要な施策の成果報告書（R7）</span>
                  </div>
                  <div data-mq="kpi" style={S("display:grid; grid-template-columns:minmax(180px,2fr) 1fr 1.4fr 70px; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:7px;")}>
                    <span>指標</span><span style={S("text-align:right;")}>目標</span><span style={S("text-align:right;")}>実績（R7年度）</span><span style={S("text-align:right;")}>状態</span>
                  </div>
                  {v.projKpis.map((kp: any, i: number) => (
                    <div key={i} data-mq="kpi" style={S("display:grid; grid-template-columns:minmax(180px,2fr) 1fr 1.4fr 70px; gap:12px; padding:11px 0; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center;")}>
                      <span style={S("font-weight:600;")}>{kp.name}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; color:#5C6B77;")}>{kp.target}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{kp.actual}</span>
                      <span style={S("text-align:right;")}><span style={S(`display:inline-block; font-size:11px; font-weight:700; color:${kp.stFg}; background:${kp.stBg}; border-radius:999px; padding:2px 10px;`)}>{kp.status}</span></span>
                    </div>
                  ))}
                  <p style={S("margin:10px 2px 0; font-size:12px; color:#5C6B77;")}>実績は前年度（R7）の値。今年度分は決算・成果報告書の公表後に更新されます（ダミー）。</p>
                </section>

                {v.showEvidence && (
                  <section style={S("margin-bottom:26px;")}>
                    <h3 style={S("margin:0 0 12px; font-size:14px; font-weight:700;")}>エビデンス（一次資料）</h3>
                    <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:12px;")}>
                      {v.projEvidence.map((ev: any, i: number) => (
                        <HoverBox as="a" key={i} href="#" style={S("display:block; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:13px; overflow:hidden; text-decoration:none; color:#14181C;")} hoverStyle={S("border-color:#1798D0; text-decoration:none;")}>
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
                )}

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:20px 22px;")}>
                  <div style={S("display:flex; align-items:baseline; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:12px;")}>
                    <h3 style={S("margin:0; font-size:14px; font-weight:700;")}>過年度の予算と執行実績</h3>
                    <HoverBox as="button" onClick={v.goHistory} style={S("border:none; background:none; color:#1798D0; font-size:12.5px; font-weight:600; cursor:pointer; padding:0; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("text-decoration:underline;")}>自治体全体の過年度実績 →</HoverBox>
                  </div>
                  <div data-mq="past" style={S("display:grid; grid-template-columns:64px 1fr 110px 110px 70px; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:7px;")}>
                    <span>年度</span><span>執行率</span><span style={S("text-align:right;")}>予算現額</span><span style={S("text-align:right;")}>支出済額</span><span style={S("text-align:right;")}>率</span>
                  </div>
                  {v.projPast.map((py: any, i: number) => (
                    <div key={i} data-mq="past" style={S("display:grid; grid-template-columns:64px 1fr 110px 110px 70px; gap:12px; padding:11px 0; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center;")}>
                      <span style={S("font-family:'IBM Plex Mono',monospace; font-weight:600;")}>{py.year}</span>
                      <span style={S("display:block; height:7px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${py.barW}%; background:#7FC9E8;`)}></span></span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{py.budgetFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{py.execFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; font-weight:600;")}>{py.rateFmt}</span>
                    </div>
                  ))}
                </section>
              </div>
            )}

            {/* ==== 過年度実績 ==== */}
            {v.isHistory && (
              <div data-screen-label="過年度の執行実績" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:20px;")}>
                  <div>
                    <h1 style={S("margin:0 0 6px; font-size:24px; font-weight:700;")}>過年度の執行実績</h1>
                    <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>款ごとに「予算はこうでした → 実際にこう使われました」を確認できます。</p>
                  </div>
                  <div style={S("display:inline-flex; border:1px solid #DFE7EC; border-radius:999px; overflow:hidden; background:#FFFFFF;")}>
                    {v.histTabs.map((ht: any, i: number) => (
                      <button key={i} onClick={ht.pick} style={S(`border:none; background:${ht.bg}; color:${ht.fg}; padding:8px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;`)}>{ht.label}</button>
                    ))}
                  </div>
                </div>

                <div style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:22px; display:flex; align-items:center; gap:26px; flex-wrap:wrap;")}>
                  <div>
                    <div style={S("font-size:12px; color:#5C6B77;")}>{v.histYearTitle} 一般会計 執行率</div>
                    <div style={S("font-family:'IBM Plex Mono',monospace; font-size:38px; font-weight:600; line-height:1.1;")}>{v.histOverallRate}</div>
                    <div style={S("font-size:11px; color:#5C6B77;")}>支出済 {v.histSub}</div>
                  </div>
                  <div style={S("flex:1; min-width:220px;")}>
                    <div style={S("height:12px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}>
                      <div data-anim="bar" style={S(`height:100%; width:${v.histOverallBarW}%; background:linear-gradient(90deg,#1798D0,#55BBE4); border-radius:999px;`)}></div>
                    </div>
                    <div style={S("display:flex; justify-content:space-between; font-size:11.5px; color:#5C6B77; margin-top:6px;")}>
                      <span>予算現額 <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{v.histBudgetFmt}</span></span>
                      <span>支出済額 <span style={S("font-family:'IBM Plex Mono',monospace; color:#14181C;")}>{v.histSpentFmt}</span></span>
                    </div>
                  </div>
                </div>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:22px;")}>
                  <div data-mq="hist" style={S("display:grid; grid-template-columns:minmax(110px,1fr) 2fr 100px 100px 64px 90px; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:8px;")}>
                    <span>款</span><span>執行率</span><span style={S("text-align:right;")}>予算現額</span><span style={S("text-align:right;")}>支出済額</span><span style={S("text-align:right;")}>率</span><span style={S("text-align:right;")}>不用額等</span>
                  </div>
                  {v.histRows.map((hr: any, i: number) => (
                    <HoverBox as="button" key={i} onClick={hr.open} data-mq="hist" style={S("width:100%; display:grid; grid-template-columns:minmax(110px,1fr) 2fr 100px 100px 64px 90px; gap:12px; padding:12px 0; border:none; border-bottom:1px solid #ECF2F6; background:none; font-size:13px; align-items:center; cursor:pointer; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;")} hoverStyle={S("background:#F1F6F9;")}>
                      <span style={S("font-weight:600; display:inline-flex; align-items:center; gap:8px;")}><span style={S(`width:10px; height:10px; border-radius:3px; background:${hr.sw};`)}></span>{hr.name}</span>
                      <span style={S("display:block; height:8px; border-radius:999px; background:#E3EBF0; overflow:hidden;")}><span data-anim="bar" style={S(`display:block; height:100%; width:${hr.barW}%; background:${hr.sw};`)}></span></span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{hr.budgetFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right;")}>{hr.spentFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; font-weight:600;")}>{hr.rateFmt}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; text-align:right; color:#5C6B77;")}>{hr.unusedFmt}</span>
                    </HoverBox>
                  ))}
                  <p style={S("margin:12px 2px 0; display:flex; align-items:center; gap:6px; font-size:12px; color:#5C6B77;")}>不用額等＝予算現額－支出済額（翌年度繰越を含む・ダミー値）。款をクリックすると内訳へ移動します。
                    <button onMouseEnter={v.gFuyou} onClick={v.gFuyou} onMouseLeave={v.hideTip} style={S("width:17px; height:17px; border-radius:50%; border:1px solid #C6D2DA; background:#FFFFFF; color:#5C6B77; font-size:11px; line-height:1; cursor:help; padding:0; font-family:'IBM Plex Mono',monospace; flex-shrink:0;")}>?</button>
                  </p>
                </section>

                {v.showEvidence && (
                  <section>
                    <h3 style={S("margin:0 0 12px; font-size:14px; font-weight:700;")}>エビデンス（一次資料）</h3>
                    <div style={S("display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:12px;")}>
                      {v.histEvidence.map((he: any, i: number) => (
                        <HoverBox as="a" key={i} href="#" style={S("display:block; background:#FFFFFF; border:1px solid #DFE7EC; border-radius:13px; overflow:hidden; text-decoration:none; color:#14181C;")} hoverStyle={S("border-color:#1798D0; text-decoration:none;")}>
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
                  <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>人口15〜25万人の類似規模の市と、規模・1人あたり歳出・歳出構成を比べます（ダミーデータ）。</p>
                </div>

                <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:20px 24px; margin-bottom:16px;")}>
                  <div data-mq="sim-h" style={S("display:grid; grid-template-columns:minmax(120px,1.2fr) 80px 100px 110px 2fr; gap:12px; font-size:11px; color:#5C6B77; border-bottom:1px solid #DFE7EC; padding-bottom:8px;")}>
                    <span>自治体</span><span style={S("text-align:right;")}>人口</span><span style={S("text-align:right;")}>一般会計</span><span style={S("text-align:right;")}>1人あたり歳出</span><span>歳出構成（ホバー／タップで内訳）</span>
                  </div>
                  {v.similarRows.map((sr: any, i: number) => (
                    <div key={i} data-mq="sim" style={S(`display:grid; grid-template-columns:minmax(120px,1.2fr) 80px 100px 110px 2fr; gap:12px; padding:12px 8px; border-bottom:1px solid #ECF2F6; font-size:13px; align-items:center; background:${sr.bg}; border-radius:8px;`)}>
                      <span style={S(`font-weight:${sr.fw}; display:inline-flex; align-items:center; gap:8px;`)}>{sr.name}<span style={S("font-size:10.5px; color:#0F76A3; font-weight:700;")}>{sr.badge}</span></span>
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

                <div style={S("display:flex; gap:6px; flex-wrap:wrap;")}>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>出典：財政状況資料集（総務省）</span>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>地方財政状況調査（決算統計）</span>
                </div>
                <p style={S("margin:12px 2px 0; font-size:12px; color:#5C6B77;")}>1人あたり歳出が高い＝非効率とは限りません。面積・高齢化率・保有施設などの条件が異なります。</p>
              </div>
            )}

            {/* ==== 基本情報 ==== */}
            {v.isBasic && (
              <div data-screen-label="基本情報" style={S("animation:fadeUp .35s ease both;")}>
                <div style={S("margin-bottom:20px;")}>
                  <h1 style={S("margin:0 0 4px; font-size:28px; font-weight:700;")}>{v.basicTitle}</h1>
                  <p style={S("margin:0; color:#5C6B77; font-size:13.5px;")}>{v.basicSub}</p>
                </div>

                <div data-mq="bfacts" style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:14px; margin-bottom:22px;")}>
                  {v.basicFacts.map((bf: any, i: number) => (
                    <section key={i} style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:14px; padding:16px 18px;")}>
                      <div style={S("font-size:12px; color:#5C6B77; margin-bottom:5px;")}>{bf.label}</div>
                      <div style={S("font-family:'IBM Plex Mono',monospace; font-size:22px; font-weight:600;")}>{bf.v}</div>
                      <div style={S("font-size:11.5px; color:#5C6B77; margin-top:3px;")}>{bf.note}</div>
                    </section>
                  ))}
                </div>

                <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(340px,1fr)); gap:18px;")}>
                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:22px 24px;")}>
                    <h2 style={S("margin:0 0 16px; font-size:16px; font-weight:700;")}>人口動態</h2>
                    <div style={S("display:flex; align-items:stretch; gap:10px; height:150px;")}>
                      {v.basicPopTrend.map((pt: any, i: number) => (
                        <div key={i} style={S("flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:5px;")}>
                          <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; color:#3A4750;")}>{pt.v}</span>
                          <div style={S("width:100%; max-width:46px; height:100px; display:flex; align-items:flex-end; justify-content:center; flex-shrink:0;")}>
                            <div style={S(`width:100%; height:${pt.h}%; background:${pt.bg}; border-radius:6px 6px 0 0; transition:height .5s ease;`)}></div>
                          </div>
                          <span style={S("font-family:'IBM Plex Mono',monospace; font-size:11px; color:#5C6B77;")}>{pt.y}</span>
                        </div>
                      ))}
                    </div>
                    <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(140px,1fr)); gap:10px; margin-top:16px;")}>
                      {v.basicPopStats.map((ps: any, i: number) => (
                        <div key={i} style={S("background:#F7FAFC; border-radius:10px; padding:10px 12px;")}>
                          <div style={S("font-size:11.5px; color:#5C6B77; margin-bottom:3px;")}>{ps.label}</div>
                          <div style={S("font-family:'IBM Plex Mono',monospace; font-size:16px; font-weight:600;")}>{ps.v}</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:22px 24px;")}>
                    <h2 style={S("margin:0 0 16px; font-size:16px; font-weight:700;")}>産業</h2>
                    {v.basicIndustry.map((ind: any, i: number) => (
                      <div key={i} style={S("margin-bottom:12px;")}>
                        <div style={S("display:flex; justify-content:space-between; gap:10px; font-size:12.5px; margin-bottom:4px;")}>
                          <span style={S("color:#14181C;")}>{ind.name}</span>
                          <span style={S("font-family:'IBM Plex Mono',monospace; color:#3A4750;")}>{ind.share}</span>
                        </div>
                        <div style={S("height:8px; background:#ECF2F6; border-radius:999px; overflow:hidden;")}>
                          <div style={S(`width:${ind.w}%; height:100%; background:${ind.sw}; border-radius:999px;`)}></div>
                        </div>
                      </div>
                    ))}
                    <div style={S("font-size:12px; color:#5C6B77; font-weight:700; margin:16px 0 8px;")}>特色ある産業・地場産業</div>
                    <div style={S("display:flex; flex-wrap:wrap; gap:6px;")}>
                      {v.basicSpecialties.map((sp: any, i: number) => (
                        <span key={i} style={S("font-size:12px; border:1px solid #C6D2DA; color:#3A4750; border-radius:999px; padding:4px 12px;")}>{sp.name}</span>
                      ))}
                    </div>
                  </section>

                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:22px 24px;")}>
                    <h2 style={S("margin:0 0 10px; font-size:16px; font-weight:700;")}>{v.basicLeaderTitle}</h2>
                    <div style={S("display:flex; flex-direction:column;")}>
                      {v.basicLeaders.map((ld: any, i: number) => (
                        <div key={i} data-mq="bleader" style={S("display:flex; gap:14px; align-items:baseline; padding:10px 0; border-bottom:1px solid #ECF2F6;")}>
                          <span style={S("font-family:'IBM Plex Mono',monospace; font-size:12px; color:#5C6B77; width:128px; flex-shrink:0;")}>{ld.term}</span>
                          <span style={S(`font-size:14px; font-weight:${ld.fw}; color:#14181C;`)}>{ld.name}</span>
                          <span style={S("font-size:12px; color:#5C6B77;")}>{ld.note}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section style={S("background:#FFFFFF; border:1px solid #DFE7EC; border-radius:16px; padding:22px 24px;")}>
                    <h2 style={S("margin:0 0 16px; font-size:16px; font-weight:700;")}>気候</h2>
                    <div style={S("display:grid; grid-template-columns:repeat(auto-fit, minmax(140px,1fr)); gap:10px;")}>
                      {v.basicClimate.map((cl: any, i: number) => (
                        <div key={i} style={S("background:#F7FAFC; border-radius:10px; padding:10px 12px;")}>
                          <div style={S("font-size:11.5px; color:#5C6B77; margin-bottom:3px;")}>{cl.label}</div>
                          <div style={S("font-family:'IBM Plex Mono',monospace; font-size:16px; font-weight:600;")}>{cl.v}</div>
                        </div>
                      ))}
                    </div>
                    <p style={S("font-size:12.5px; color:#5C6B77; line-height:1.8; margin:14px 0 0;")}>{v.basicClimateNote}</p>
                  </section>
                </div>

                <div style={S("display:flex; gap:6px; flex-wrap:wrap; margin-top:22px;")}>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>出典：国勢調査（総務省統計局）</span>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>経済センサス</span>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>気象庁 平年値</span>
                  <span style={S("font-size:11.5px; border:1px solid #C6D2DA; color:#5C6B77; border-radius:999px; padding:3px 11px;")}>一部ダミー値を含みます</span>
                </div>
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
                      <a href="#" style={S("font-weight:600;")}>{src.title} ↗</a>
                      <span><span style={S("display:inline-block; font-size:10.5px; font-weight:600; color:#0F76A3; border:1px solid #B9E0F2; border-radius:999px; padding:1px 9px;")}>{src.type}</span></span>
                      <span style={S("font-size:12.5px; color:#5C6B77;")}>{src.org}</span>
                      <span style={S("font-family:'IBM Plex Mono',monospace; font-size:12px;")}>{src.date}</span>
                      <span style={S("font-size:12px; color:#5C6B77;")}>{src.used}</span>
                    </div>
                  ))}
                  <p style={S("margin:12px 2px 0; font-size:12px; color:#5C6B77;")}>本プロトタイプでは資料名・日付はダミーです。実運用ではここから各資料の原本へリンクします。</p>
                </section>
              </div>
            )}

          </main>

          <footer data-mq-pad="" style={S("border-top:1px solid #DFE7EC; padding:16px 28px; font-size:12px; color:#5C6B77; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap;")}>
            <span>予算トレース — プロトタイプ。数値・事業名・資料名はすべてダミーです。<button onClick={v.goSources} style={S("border:none; background:none; padding:0; margin-left:8px; color:#1798D0; font-size:12px; cursor:pointer; font-family:'IBM Plex Sans JP',sans-serif;")}>データ出典・更新日一覧 →</button></span>
            <span style={S("font-family:'IBM Plex Mono',monospace;")}>SOURCE: 甲府市 R8年度当初予算（参考）</span>
          </footer>
        </div>
      )}

      {/* ==== 年度切替ポップオーバー ==== */}
      {v.fyOpen && (
        <>
          <div onClick={v.fyClose} style={S("position:fixed; inset:0; z-index:60;")}></div>
          <div style={S(`position:fixed; left:${v.fyX}px; top:${v.fyY}px; transform:translateX(-100%); background:#FFFFFF; border:1px solid #DFE7EC; border-radius:12px; box-shadow:0 10px 28px rgba(20,24,28,0.16); padding:6px; z-index:61; min-width:232px;`)}>
            <div style={S("font-size:10.5px; color:#5C6B77; padding:6px 12px 4px; letter-spacing:0.08em; font-family:'IBM Plex Mono',monospace;")}>年度を切り替え</div>
            {v.fyOptions.map((fo: any, i: number) => (
              <HoverBox as="button" key={i} onClick={fo.pick} style={S(`display:flex; width:100%; align-items:center; justify-content:space-between; gap:12px; border:none; background:${fo.bg}; border-radius:8px; padding:9px 12px; cursor:pointer; text-align:left; font-family:'IBM Plex Sans JP',sans-serif;`)} hoverStyle={S("background:#ECF2F6;")}>
                <span style={S(`font-size:13px; font-weight:${fo.fw}; color:#14181C;`)}>{fo.label}</span>
                <span style={S("font-family:'IBM Plex Mono',monospace; font-size:10.5px; color:#5C6B77; white-space:nowrap;")}>{fo.note}</span>
              </HoverBox>
            ))}
          </div>
        </>
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
