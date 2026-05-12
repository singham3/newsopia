import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Newsopia - Your Daily Source',
  description: 'Your daily source for the latest news across technology, business, health, entertainment, science, and sports.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
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
        <script src="https://comradegoodsfloor.com/b2/97/e1/b297e1f8c56313e5eb5221a6b688ce1f.js"></script>

      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 