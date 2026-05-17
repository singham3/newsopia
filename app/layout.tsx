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
  metadataBase: new URL('https://newsopia.webomint.com'),
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
    url: 'https://newsopia.webomint.com',
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
    canonical: 'https://newsopia.webomint.com',
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
        <meta name="p:domain_verify" content="7bb7dc35350aedd7c0851219b75baa5a"/>

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
            'key' : '9d67087869ff70ac6a0a1da93eb14f3c',
            'format' : 'iframe',
            'height' : 300,
            'width' : 160,
            'params' : {}
          };
        `}</Script>
        <Script async data-cfasync="false" src="https://comradegoodsfloor.com/9d67087869ff70ac6a0a1da93eb14f3c/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 2 - 160x600 */}
        <Script id="at-options-2" strategy="beforeInteractive">{`
          atOptions = {
            'key' : '278841d55b93dbc79dc3773642de2fad',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        `}</Script>
        <Script src="https://comradegoodsfloor.com/278841d55b93dbc79dc3773642de2fad/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 3 - 300x250 */}
        <Script id="at-options-3" strategy="beforeInteractive">{`
          atOptions = {
            'key' : '1ba1f80c5a20c9921a4eb80401c5c6a2',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/1ba1f80c5a20c9921a4eb80401c5c6a2/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 4 - 320x50 */}
        <Script id="at-options-4" strategy="beforeInteractive">{`
          atOptions = {
            'key' : 'f6998ad0fa3335207706c961ebf696db',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/f6998ad0fa3335207706c961ebf696db/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 5 - 468x60 */}
        <Script id="at-options-5" strategy="beforeInteractive">{`
          atOptions = {
            'key' : 'e8091eb6290da014a96ba7651a2d5e90',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/e8091eb6290da014a96ba7651a2d5e90/invoke.js" strategy="beforeInteractive" />

        {/* Ad Script 6 - 728x90 */}
        <Script id="at-options-6" strategy="beforeInteractive">{`
          atOptions = {
            'key' : '187a22bd4a6233ca47505325a2b70bf9',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        `}</Script>
        <Script src="https://www.highperformanceformat.com/187a22bd4a6233ca47505325a2b70bf9/invoke.js" strategy="beforeInteractive" />

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
                window.open('https://comradegoodsfloor.com/s6tqatsn60?key=6c7dd53437f1a23c2fbbe9da311e8976', '_blank');
              }
              document.removeEventListener('click', handleFirstClick);
            }
            document.addEventListener('click', handleFirstClick);
          })();
        `}</Script>

        {/*ANTI-ADBLOCK JS SYNC*/}
        <Script src="https://comradegoodsfloor.com/5e/fb/1d/5efb1d7078bbf5993f6135d9cbf6222d.js" strategy="afterInteractive" />
        <Script src="https://comradegoodsfloor.com/e4/c8/bd/e4c8bdca236bb73edca9f1c10a600b48.js" strategy="afterInteractive" />

        {/* Structured Data - WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Newsopia',
              url: 'https://newsopia.webomint.com',
              description:
                'Stay informed with Newsopia — your daily source for breaking news, trending stories, and in-depth coverage.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://newsopia.webomint.com/?q={search_term_string}',
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
              url: 'https://newsopia.webomint.com',
              logo: 'https://newsopia.webomint.com/icon-512.png',
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