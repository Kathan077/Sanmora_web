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
  title: "Sanmora Studio | Web Development & Digital Marketing Company in Ahmedabad",
  description: "Sanmora Studio is the premier web development company, web design agency, and digital marketing company in Ahmedabad. We build premium Next.js websites, Shopify ecommerce stores, custom software, and high-impact SEO.",
  verification: {
    google: "HmTa_ABl4g4bvL8xkwB0BUONqxT0Kp1vw_CR8fAfui8",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Sanmora Studio",
              "image": "https://sanmora.in/logo/Footer_logo.png",
              "@id": "https://sanmora.in/#localbusiness",
              "url": "https://sanmora.in",
              "telephone": "+91 95864 74211",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ahmedabad",
                "addressLocality": "Ahmedabad",
                "addressRegion": "Gujarat",
                "postalCode": "380001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 23.0225,
                "longitude": 72.5714
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://www.facebook.com/share/1JFKX4zXoJ/",
                "https://www.instagram.com/_sanmora/",
                "https://youtube.com/@sanmoratechno?si=9SxRVDpHOLFUtYDV",
                "https://in.linkedin.com/company/sanmora"
              ]
            })
          }}
        />
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
