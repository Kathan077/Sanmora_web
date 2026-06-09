/** Image paths for services and categories (SVG, brand purple + blue). */

export function getServiceImagePath(serviceSlug) {
  return `/images/services/${serviceSlug}.svg`;
}

/** Primary image for a category (used in Row 1 / sub-service cards). */
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
  if (serviceSlug === "software-development") {
    if (categorySlug === "custom-saas") {
      return `/images/services/software-development/saas.jpeg`;
    }
    if (categorySlug === "api-development") {
      return `/images/services/software-development/api-devlopment.jpeg`;
    }
    if (categorySlug === "database-architecture") {
      return `/images/services/software-development/database-architecture.jpeg`;
    }
    if (categorySlug === "cloud-infrastructure") {
      return `/images/services/software-development/cloud-infrastructure.jpeg`;
    }
  }
  if (serviceSlug === "logo-designing") {
    if (categorySlug === "brand-identity") {
      return `/images/services/logo-designing/WhatsApp Image 2026-06-05 at 16.16.00.jpeg`;
    }
    if (categorySlug === "vector-graphics") {
      return `/images/services/logo-designing/WhatsApp Image 2026-06-05 at 17.19.53.jpeg`;
    }
    if (categorySlug === "corporate-guidelines") {
      return `/images/services/logo-designing/WhatsApp Image 2026-06-05 at 17.28.21.jpeg`;
    }
    if (categorySlug === "typography") {
      return `/images/services/logo-designing/typography.jpg`;
    }
  }
  if (serviceSlug === "application-development") {
    if (categorySlug === "ios-development") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.32.13.jpeg`;
    }
    if (categorySlug === "android-development") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.33.05.jpeg`;
    }
    if (categorySlug === "react-native") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.41.44.jpeg`;
    }
    if (categorySlug === "flutter") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.51.51.jpeg`;
    }
  }
  return `/images/services/${serviceSlug}/${categorySlug}.svg`;
}

/**
 * Detail page primary image (Row 1). Must be different from the card image.
 */
export function getCategoryDetailPrimaryImagePath(serviceSlug, categorySlug) {
  if (serviceSlug === "website-development") {
    if (categorySlug === "static-website") {
      return `/images/services/website-development/Static web.png`;
    }
    if (categorySlug === "dynamic-website") {
      return `/images/services/website-development/Dynamic web.jpg`;
    }
    if (categorySlug === "e-commerce") {
      return `/images/services/website-development/E-commerce.jpg`;
    }
    if (categorySlug === "custom-website-development") {
      return `/images/services/website-development/custom web.jpg`;
    }
  }
  if (serviceSlug === "digital-marketing") {
    if (categorySlug === "seo-optimization") {
      return `/images/services/digital-marketing/seo web.jpg`;
    }
    if (categorySlug === "ppc-campaigns") {
      return `/images/services/digital-marketing/ppc web.jpg`;
    }
    if (categorySlug === "social-media") {
      return `/images/services/digital-marketing/social web.jpg`;
    }
    if (categorySlug === "content-strategy") {
      return `/images/services/digital-marketing/content web.jpg`;
    }
  }
  if (serviceSlug === "software-development") {
    if (categorySlug === "custom-saas") {
      return `/images/services/software-development/saas web.jpg`;
    }
    if (categorySlug === "api-development") {
      return `/images/services/software-development/api web.jpg`;
    }
    if (categorySlug === "database-architecture") {
      return `/images/services/software-development/database web.jpg`;
    }
    if (categorySlug === "cloud-infrastructure") {
      return `/images/services/software-development/cloud web.jpg`;
    }
  }
  if (serviceSlug === "logo-designing") {
    if (categorySlug === "brand-identity") {
      return `/images/services/logo-designing/Brand web.jpg`;
    }
    if (categorySlug === "vector-graphics") {
      return `/images/services/logo-designing/Vector web.jpg`;
    }
    if (categorySlug === "corporate-guidelines") {
      return `/images/services/logo-designing/Corporate web.jpg`;
    }
    if (categorySlug === "typography") {
      return `/images/services/logo-designing/typography web.jpg`;
    }
  }
  if (serviceSlug === "application-development") {
    if (categorySlug === "ios-development") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.33.05.jpeg`;
    }
    if (categorySlug === "android-development") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.41.44.jpeg`;
    }
    if (categorySlug === "react-native") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.51.51.jpeg`;
    }
    if (categorySlug === "flutter") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.32.13.jpeg`;
    }
  }
  return getCategoryImagePath(serviceSlug, categorySlug);
}

/**
 * Detail page secondary image (Row 2). Must be different from the card image and primary image.
 */
export function getCategoryDetailSecondaryImagePath(serviceSlug, categorySlug) {
  if (serviceSlug === "website-development") {
    if (categorySlug === "static-website") {
      return `/images/services/website-development/static Why.jpg`;
    }
    if (categorySlug === "dynamic-website") {
      return `/images/services/website-development/Dynamic Why.jpg`;
    }
    if (categorySlug === "e-commerce") {
      return `/images/services/website-development/e-commerce why.jpg`;
    }
    if (categorySlug === "custom-website-development") {
      return `/images/services/website-development/custom-why.jpg`;
    }
  }
  if (serviceSlug === "digital-marketing") {
    if (categorySlug === "seo-optimization") {
      return `/images/services/digital-marketing/seo why.jpg`;
    }
    if (categorySlug === "ppc-campaigns") {
      return `/images/services/digital-marketing/ppc why.jpg`;
    }
    if (categorySlug === "social-media") {
      return `/images/services/digital-marketing/social why.jpg`;
    }
    if (categorySlug === "content-strategy") {
      return `/images/services/digital-marketing/content why.jpg`;
    }
  }
  if (serviceSlug === "software-development") {
    if (categorySlug === "custom-saas") {
      return `/images/services/software-development/saas why.jpg`;
    }
    if (categorySlug === "api-development") {
      return `/images/services/software-development/api why.jpg`;
    }
    if (categorySlug === "database-architecture") {
      return `/images/services/software-development/database why.jpg`;
    }
    if (categorySlug === "cloud-infrastructure") {
      return `/images/services/software-development/cloud why.jpg`;
    }
  }
  if (serviceSlug === "logo-designing") {
    if (categorySlug === "brand-identity") {
      return `/images/services/logo-designing/Brand why.jpg`;
    }
    if (categorySlug === "vector-graphics") {
      return `/images/services/logo-designing/vector why.jpg`;
    }
    if (categorySlug === "corporate-guidelines") {
      return `/images/services/logo-designing/corporate why.jpg`;
    }
    if (categorySlug === "typography") {
      return `/images/services/logo-designing/typography why.jpg`;
    }
  }
  if (serviceSlug === "application-development") {
    if (categorySlug === "ios-development") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.41.44.jpeg`;
    }
    if (categorySlug === "android-development") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.51.51.jpeg`;
    }
    if (categorySlug === "react-native") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.32.13.jpeg`;
    }
    if (categorySlug === "flutter") {
      return `/images/services/application-development/WhatsApp Image 2026-06-05 at 18.33.05.jpeg`;
    }
  }
  return getCategoryImagePath(serviceSlug, categorySlug);
}
