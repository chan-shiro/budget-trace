import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TITLE, OG_IMAGE } from "@/client/lib/site";
import CookieConsent from "@/client/components/CookieConsent";

// Google Tag Manager。コンテナは *.phh.jp を対象に設定されている。
// **本番ドメインでだけ読み込む** — Preview デプロイ（*.vercel.app）や dev で読み込むと、
// 公開前の試行がそのまま計測に混ざる。VERCEL_ENV は Vercel がビルド時に入れる
// （production / preview / development）ので、ローカルでは undefined = 無効。
const GTM_ID = "GTM-MQRPKN33";
const gtmEnabled = process.env.VERCEL_ENV === "production";

// Google Consent Mode v2 の**既定値**。www.phh.jp と同一で、計測系はすべて denied から始める。
// ⚠ **GTM より前に dataLayer へ入らなければ意味がない** — 後から入れると、GTM は
// 「既定＝granted」として一度発火してしまう。だから beforeInteractive で先に流す。
// `wait_for_update` は、同意バナーの判断が返るまでタグに待ってもらう猶予（ミリ秒）。
const CONSENT_DEFAULT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`;

export const metadata: Metadata = {
  // 相対パスの OG 画像などをこのドメインで絶対 URL に解決させる
  metadataBase: new URL(SITE_URL),
  // 各画面の generateMetadata は「甲府市の予算 — 予算トレース」の**完成形**を返すので、
  // テンプレートを被せない（`%s` をそのまま出す）
  title: { default: SITE_TITLE, template: "%s" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
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
        {/* ⚠ Consent Mode の既定値は GTM より先に入れる（後だと granted 扱いで一度発火する） */}
        {gtmEnabled && (
          <Script id="consent-default" strategy="beforeInteractive">
            {CONSENT_DEFAULT}
          </Script>
        )}
      </head>
      <body>
        {/* GTM の noscript iframe は body 直後に置くのが公式の指定 */}
        {gtmEnabled && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        {/* 描画をブロックしないよう afterInteractive で読む */}
        {gtmEnabled && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {/* 同意バナー。GTM を読む環境でだけ出す（読まないなら訊く必要が無い）。
            同意 Cookie は `.phh.jp` に置くので、www.phh.jp で同意済みなら出ない */}
        {gtmEnabled && <CookieConsent />}
      </body>
    </html>
  );
}
