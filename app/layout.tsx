import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1f38',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://newsopia.vercel.app'),
  title: {
    default: 'Newsopia — Breaking News, Trending Stories & Latest Headlines',
    template: '%s | Newsopia',
  },
  description:
    `Stay informed with Newsopia — breaking news, trending stories, and in-depth coverage across tech, business, politics, sports, and more.`,
  keywords: [
    'news',
    'breaking news',
    'trending news',
    'India news',
    'technology news',
    'business news',
    'sports news',
    'entertainment news',
    'politics news',
    'world news',
    'science news',
    'health news',
    'startup news',
    'Newsopia',
  ],
  authors: [{ name: 'Newsopia' }],
  creator: 'Newsopia',
  publisher: 'Newsopia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://newsopia.vercel.app',
    siteName: 'Newsopia',
    title: 'Newsopia — Breaking News, Trending Stories & Latest Headlines',
    description:
      'Stay informed with Newsopia — your daily source for breaking news, trending stories, and in-depth coverage across technology, business, politics, sports, entertainment, and more.',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Newsopia Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsopia — Breaking News, Trending Stories & Latest Headlines',
    description:
      'Stay informed with Newsopia — your daily source for breaking news, trending stories, and in-depth coverage.',
    images: ['/icon-512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  alternates: {
    canonical: 'https://newsopia.vercel.app',
  },
  category: 'news',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SCZ6MYC8XM"></Script>
        <Script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-SCZ6MYC8XM');
          `}
        </Script>
        {/* Ad Script 1 - 160x300 */}
        <Script id="at-options-1" strategy="beforeInteractive">{`
          atOptions = {
            'key' : 'f1b8e51703a545445c8f7b14add3964f',
            'format' : 'iframe',
            'height' : 300,
            'width' : 160,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/f1b8e51703a545445c8f7b14add3964f/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 2 - 160x600 */}
        <Script id="at-options-2" strategy="beforeInteractive">{`
          atOptions = {
            'key' : 'b2efc22cb5163a0f57f6571edfa0f5b0',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/b2efc22cb5163a0f57f6571edfa0f5b0/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 3 - 300x250 */}
        <Script id="at-options-3" strategy="beforeInteractive">{`
          atOptions = {
            'key' : '59b15ab927b540d077ad073ee468820b',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/59b15ab927b540d077ad073ee468820b/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 4 - 320x50 */}
        <Script id="at-options-4" strategy="beforeInteractive">{`
          atOptions = {
            'key' : 'a6d4a8a4b73d73c2a7f435b36da104a4',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/a6d4a8a4b73d73c2a7f435b36da104a4/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 5 - 468x60 */}
        <Script id="at-options-5" strategy="beforeInteractive">{`
          atOptions = {
            'key' : '1b8c1e6a070dcec0519459d511e9b1e7',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/1b8c1e6a070dcec0519459d511e9b1e7/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 6 - 728x90 */}
        <Script id="at-options-6" strategy="beforeInteractive">{`
          atOptions = {
            'key' : 'd8113f3108cabf3d121938b6b859840e',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/d8113f3108cabf3d121938b6b859840e/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 7 - Native */}
        <Script async data-cfasync="false" src="https://pl29426959.profitablecpmratenetwork.com/1b24974d21ee0f4e53d757afc5cab70d/invoke.js" strategy="afterInteractive" />

        {/* Ad Script 8 */}
        <Script src="https://pl29426960.profitablecpmratenetwork.com/91/5c/64/915c64e5f846d37482e2f7078ae190d1.js" strategy="afterInteractive" />

        {/* Script 9 - One-time click redirect */}
        <Script id="one-time-redirect" strategy="afterInteractive">{`
          (function() {
            function handleFirstClick() {
              if (!sessionStorage.getItem('redirected')) {
                sessionStorage.setItem('redirected', '1');
                window.open('https://www.profitablecpmratenetwork.com/nfuuvba269?key=b8c0fc4eff4983932bf9754fa83da99b', '_blank');
              }
              document.removeEventListener('click', handleFirstClick);
            }
            document.addEventListener('click', handleFirstClick);
          })();
        `}</Script>

        {/*ANTI-ADBLOCK JS SYNC*/}
        <Script src="https://comradegoodsfloor.com/b2/97/e1/b297e1f8c56313e5eb5221a6b688ce1f.js" strategy="afterInteractive" />

        {/* Structured Data - WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Newsopia',
              url: 'https://newsopia.vercel.app',
              description:
                'Stay informed with Newsopia — your daily source for breaking news, trending stories, and in-depth coverage.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://newsopia.vercel.app/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Newsopia',
              url: 'https://newsopia.vercel.app',
              logo: 'https://newsopia.vercel.app/icon-512.png',
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}