import { seoPagesData } from "@/data/seoPagesData";

// Next.js dynamic sitemap.xml route configuration.
// Accessible at https://sanmora.in/sitemap.xml

export default async function sitemap() {
  const baseUrl = "https://sanmora.in";

  // 1. Core Static Web Pages
  const staticRoutes = [
    "",
    "/about-us",
    "/blog",
    "/case-studies",
    "/careers",
    "/consultation",
    "/services",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic SSG SEO Targeted Pages
  const seoRoutes = seoPagesData.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Combine static and dynamic arrays
  return [...staticRoutes, ...seoRoutes];
}
