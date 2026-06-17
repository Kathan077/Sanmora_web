// Next.js dynamic robots.txt route configuration.
// Accessible at https://sanmora.in/robots.txt

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/private/"],
    },
    sitemap: "https://sanmora.in/sitemap.xml",
  };
}
