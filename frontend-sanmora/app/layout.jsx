import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Sanmora - Premium Visual Design",
  description: "A state of the art web experience built with Next.js and Vanilla CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.addEventListener('error', function(e) {
                  var isChunk = false;
                  if (e.message) {
                    var errorMsg = e.message;
                    isChunk = /chunk/i.test(errorMsg) || 
                              /Failed to fetch/i.test(errorMsg) || 
                              /dynamically imported module/i.test(errorMsg);
                  }
                  if (!isChunk && e.target && e.target.tagName === 'SCRIPT') {
                    var src = e.target.src || '';
                    isChunk = src.indexOf('/_next/static/') !== -1 || src.indexOf('chunk') !== -1;
                  }
                  if (isChunk) {
                    try {
                      var lastReload = sessionStorage.getItem('last-chunk-reload');
                      var now = Date.now();
                      if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
                        sessionStorage.setItem('last-chunk-reload', now.toString());
                        window.location.reload();
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }, true);
              })();
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
