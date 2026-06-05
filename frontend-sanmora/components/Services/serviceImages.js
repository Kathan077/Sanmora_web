/** Image paths for services and categories (SVG, brand purple + blue). */

export function getServiceImagePath(serviceSlug) {
  return `/images/services/${serviceSlug}.svg`;
}

export function getCategoryImagePath(serviceSlug, categorySlug) {
  if (serviceSlug === "website-development") {
    if (categorySlug === "static-website") {
      return `/images/services/website-development/Static Website.jpeg`;
    }
    if (categorySlug === "dynamic-website") {
      return `/images/services/website-development/Dynamic Website.jpeg`;
    }
    if (categorySlug === "e-commerce") {
      return `/images/services/website-development/E-commerce pltform.jpeg`;
    }
    if (categorySlug === "custom-website-development") {
      return `/images/services/website-development/custom website.jpeg`;
    }
  }
  if (serviceSlug === "digital-marketing") {
    if (categorySlug === "seo-optimization") {
      return `/images/services/digital-marketing/Seo.png`;
    }
    if (categorySlug === "ppc-campaigns") {
      return `/images/services/digital-marketing/ppc.jpg`;
    }
    if (categorySlug === "social-media") {
      return `/images/services/digital-marketing/Social-media.jpg`;
    }
    if (categorySlug === "content-strategy") {
      return `/images/services/digital-marketing/contetstratergy.jpg`;
    }
  }
  return `/images/services/${serviceSlug}/${categorySlug}.svg`;
}
