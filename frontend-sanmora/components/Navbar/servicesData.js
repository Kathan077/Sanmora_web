// Shared service data for Sanmora Technologies.
// This serves as the single source of truth for the Navbar dropdown,
// the main Services page, and all dynamic category and sub-service pages.

export const servicesData = [
  {
    id: "website-development",
    slug: "website-development",
    name: "Website Development",
    subtitle: "Fast, clean, conversion-focused websites",
    icon: "code",
    color: "#0ea5e9",
    description:
      "We build websites that actually load instantly and convert visitors into customers. No bloated templates, just clean code built to scale.",
    benefits: [
      "Higher Google rankings through excellent Core Web Vitals",
      "Zero server maintenance headaches or complex server configs",
      "Easily editable content setups for marketing teams",
    ],
    features: [
      "Server-side rendering (SSR) via Next.js Framework for speed",
      "Framer Motion for smooth, interactive micro-animations",
      "Secure API integrations and modern payment gateways",
    ],
    techStack: ["Next.js", "React.js", "Vercel", "Framer Motion", "Tailwind CSS"],
    categories: [
      {
        name: "Static Website",
        slug: "static-website",
        icon: "layout",
        description: "Blazing-fast, SEO-optimized landing pages and marketing sites built for conversion.",
        longDescription:
          "We write clean, semantic code that Google's crawlers love. Our static websites load in milliseconds, securing higher search rankings and converting cold traffic into leads without complex database overhead.",
        overview:
          "Fully hand-coded static landing pages optimized for Google Lighthouse scores and smooth user flows.",
        features: [
          "Responsive, mobile-first layouts tested across all screen resolutions",
          "Perfect Google Lighthouse metrics and Core Web Vitals (LCP, CLS, INP)",
          "Lightweight integrations for forms, analytics, and CRM tracking",
          "CDN-backed deployment for global availability and zero downtime",
        ],
        benefits: [
          "Faster load speeds improve search engine rankings and lower bounce rates",
          "Extremely secure architecture with virtually zero server attack vectors",
          "Low-cost, zero-maintenance hosting on modern edge networks",
        ],
        techStack: ["HTML5", "CSS3", "JavaScript", "Next.js SSG", "Vercel", "Cloudflare CDN"],
      },
      {
        name: "Dynamic Website",
        slug: "dynamic-website",
        icon: "database",
        description: "Data-driven web portals, secure dashboards, and custom client tools.",
        longDescription:
          "Build high-performance web applications that respond instantly to user interactions. From member portal logins and custom dashboards to booking engines and automated workflows, we build with secure authentication and solid database frameworks.",
        overview:
          "Full-stack web applications featuring secure authorization, real-time database sync, and smooth client dashboards.",
        features: [
          "Secure user authentication (OAuth, JWT) and role-based permissions",
          "High-performance RESTful and GraphQL APIs connected to robust databases",
          "Custom administration dashboards for managing orders and app workflows",
          "Real-time system updates using WebSockets and event-driven architectures",
        ],
        benefits: [
          "Automate manual business tasks to save hours of daily operations",
          "Consolidate fragmented business spreadsheets into one secure platform",
          "Scalable database foundations ready to grow alongside your user base",
        ],
        techStack: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "JWT / OAuth"],
      },
      {
        name: "E-Commerce",
        slug: "e-commerce",
        icon: "shopping-cart",
        description: "High-conversion online stores built with seamless checkouts and fast load times.",
        longDescription:
          "Frictionless shopping experiences engineered to convert. We construct high-performance storefronts integrated with modern payment gateways (Stripe, Razorpay, PayPal), optimized search, and clean catalog configurations.",
        overview:
          "Custom online stores built to reduce cart abandonment and streamline transaction pipelines.",
        features: [
          "Fast-loading product catalogs with smart filters and stock alerts",
          "Secure checkouts integrated with top-tier global payment processors",
          "Intuitive client dashboards for tracking orders and shipments",
          "Automated coupon codes, localized tax calculations, and shipping rules",
        ],
        benefits: [
          "Frictionless checkout experience increases your average order value",
          "Detailed conversion funnel analytics to see exactly where customers drop off",
          "Headless architectures built to support heavy traffic spikes during flash sales",
        ],
        techStack: ["Next.js Commerce", "Stripe", "WooCommerce", "Shopify Hydrogen", "Sanity CMS"],
      },
      {
        name: "Custom Website Development",
        slug: "custom-website-development",
        icon: "layers",
        description: "Headless CMS setups that let your marketing team edit content without code.",
        longDescription:
          "Empower your marketing team to launch new campaigns, publish case studies, and edit copy instantly without developer assistance—using fast headless setups (Sanity, Strapi, WordPress) that keep your codebase clean and safe.",
        overview:
          "Easy-to-manage content architectures connected to lightning-fast frontend templates.",
        features: [
          "Custom editor screens designed specifically for your marketing workflows",
          "Instant live-preview environments to proof content before launching",
          "SEO metadata fields built directly into content templates",
          "Multi-language translation pipelines to scale into new regions",
        ],
        benefits: [
          "Marketing teams ship campaigns same-day without developer blockages",
          "Pre-designed visual blocks keep pages consistent with brand guidelines",
          "Zero risk of editors accidentally breaking code layouts",
        ],
        techStack: ["Sanity", "Contentful", "Strapi", "WordPress", "Next.js", "GraphQL"],
      },
    ],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing",
    name: "Digital Marketing",
    subtitle: "Campaigns that drive revenue, not just clicks",
    icon: "line-chart",
    color: "#ec4899",
    description:
      "Stop throwing ad spend at empty impressions. We design, launch, and optimize acquisition funnels that bring in real, qualified leads.",
    benefits: [
      "Steady stream of high-intent organic search traffic",
      "Immediate lead generation pipelines through search and social ads",
      "Clear, readable reports on actual return on ad spend (ROAS)",
    ],
    features: [
      "Google and Meta Ads built on clean event tracking",
      "Ahrefs-backed SEO audits and content cluster maps",
      "Custom analytics reporting you can actually understand",
    ],
    techStack: ["Google Ads", "Meta Ads", "Google Analytics 4", "Ahrefs", "Looker Studio"],
    categories: [
      {
        name: "SEO Optimization",
        slug: "seo-optimization",
        icon: "search",
        description: "Technical audit strategies and semantic content clusters that compound organic traffic.",
        longDescription:
          "Climb to the top of Google results with search optimization built on raw technical site health, deep search intent mapping, and high-quality link profile building—driving sustainable, free customer acquisition.",
        overview:
          "Strategic SEO planning covering crawler efficiency, semantic page structure, and high-impact content clustering.",
        features: [
          "Technical crawlers audits covering indexation, broken links, schema, and page speeds",
          "Keyword analysis mapped to intent levels (informational, commercial, transactional)",
          "On-page optimization targeting meta tags, URL hierarchy, and heading structure",
          "Durable domain authority development through organic outreach and link acquisition",
        ],
        benefits: [
          "Generate consistent inbound leads without recurring advertising costs",
          "Reach buyers at the exact moment they search for your solutions",
          "A stronger authority score that makes all future search campaigns more effective",
        ],
        techStack: ["Google Search Console", "Ahrefs", "Screaming Frog", "GA4", "Semrush"],
      },
      {
        name: "Paid Advertisement",
        slug: "ppc-campaigns",
        icon: "line-chart",
        description: "High-yield search, display, and social ad setups optimized for conversion and ROAS.",
        longDescription:
          "Convert ad spend into profit. We construct, run, and scale paid media pipelines across Google, Meta, and LinkedIn with tight audience targeting, split-tested copy, and reliable conversion attribution.",
        overview:
          "Paid customer acquisition setups designed for immediate pipeline growth and data transparency.",
        features: [
          "Ad grouping by keyword intent, competitor matches, and remarketing pools",
          "End-to-end event tracking using pixels, API tags, and custom data parameters",
          "Continuous split testing of ad copy, visuals, and landing page pairs",
          "Daily bid adjustments and negative keyword lists to prevent wasted budget",
        ],
        benefits: [
          "Instantly fill your sales pipeline while long-term organic strategies mature",
          "Clear, predictable cost-per-lead (CPL) and return-on-ad-spend (ROAS) data",
          "Instantly test and validate message positioning with direct, live feedback",
        ],
        techStack: ["Google Ads", "Meta Business Suite", "LinkedIn Campaign Manager", "GTM", "GA4"],
      },
      {
        name: "Social Media",
        slug: "social-media",
        icon: "share-2",
        description: "Organic content engines and community management that build loyal brand followings.",
        longDescription:
          "Turn social media channels into active channels of engagement. We build content systems, interactive calendars, and custom graphics styled to capture your brand tone and start conversations.",
        overview:
          "Multi-channel social strategies balancing organic community nurturing with performance boosts.",
        features: [
          "Detailed content plans featuring custom graphics, carousels, and videos",
          "Profile optimization (bios, links, highlights) matching your visual guidelines",
          "Active community responses and direct message triage workflows",
          "Social advertising boosts to amplify high-performing organic posts to target groups",
        ],
        benefits: [
          "Build trust and stay top-of-mind during long business sales cycles",
          "Create a human, accessible connection with your users and partners",
          "Generate customer feedback directly from your primary social channels",
        ],
        techStack: ["Meta Business Suite", "LinkedIn", "Canva", "Buffer", "Hootsuite", "Sprout Social"],
      },
      {
        name: "Content Strategy",
        slug: "content-strategy",
        icon: "edit-3",
        description: "Research-driven content schedules that educate buyers and support sales teams.",
        longDescription:
          "We build detailed content architectures that answer your customers' most burning questions. From downloadable whitepapers and deep-dive case studies to automated newsletter flows, we construct content that closes deals.",
        overview:
          "Audience personas and buyer-journey mappings translated into actionable writing roadmaps.",
        features: [
          "Deep-dive interviews with your sales reps to map customer friction points",
          "Writing schedules matching search volume and product launch timelines",
          "Professional content production covering guides, blogs, and case studies",
          "Modular content repurposing (turning one whitepaper into social posts, emails, and briefs)",
        ],
        benefits: [
          "Equip your sales team with resources that pre-educate buyers before calls",
          "Build industry authority by sharing real knowledge instead of generic summaries",
          "Keep messaging and brand tone completely aligned across all touchpoints",
        ],
        techStack: ["Notion", "Google Docs", "Ahrefs", "Grammarly", "Figma", "WordPress / CMS"],
      },
    ],
  },
  {
    id: "logo-designing",
    slug: "logo-designing",
    name: "Logo Designing",
    subtitle: "Memorable visual identities that build trust",
    icon: "pen-tool",
    color: "#fb923c",
    description:
      "A great brand isn't just a logo—it's how people recognize you in a crowded room. We design identity systems that look premium on any screen or print medium.",
    benefits: [
      "Instant credibility with enterprise clients and investors",
      "Total brand consistency across web, social, and print",
      "Fully scalable vector assets that never look blurry",
    ],
    features: [
      "Custom vector logo designs with dark and light variations",
      "Cohesive brand style guides and color palettes",
      "Production-ready typography sets and stationery",
    ],
    techStack: ["Adobe Illustrator", "Figma", "Photoshop"],
    categories: [
      {
        name: "Brand Identity",
        slug: "brand-identity",
        icon: "shield",
        description: "Complete design frameworks that define your brand voice, colors, and aesthetics.",
        longDescription:
          "Define how your company presents itself to the world. We build comprehensive visual identity packages—from color contrast pairs and typography standards to custom graphic patterns and brand imagery guidelines.",
        overview:
          "High-end visual asset kits that keep every customer interaction aligned with your brand message.",
        features: [
          "Primary, secondary, and sub-mark logo lockups for any screen resolution",
          "Custom accessibility-tested color palettes for web and print applications",
          "Cohesive corporate font pairings for presentation decks and marketing copy",
          "Custom social media layout templates and branded graphics packages",
        ],
        benefits: [
          "Maintain total visual consistency across third-party websites and partners",
          "A premium visual standard immediately builds trust with enterprise partners",
          "Speed up asset creation using a unified visual component design system",
        ],
        techStack: ["Figma", "Adobe Illustrator", "Adobe InDesign", "Coolors", "Fontshare"],
      },
      {
        name: "Vector Graphics",
        slug: "vector-graphics",
        icon: "image",
        description: "Scale-free vector artwork, icons, and illustrations optimized for digital layouts.",
        longDescription:
          "Hand-crafted, scalable vector graphics built to look incredibly crisp at any size—whether embedded as a mobile app icon or printed on a physical billboard.",
        overview:
          "Bespoke graphic illustration systems optimized for lightweight web loads and print setups.",
        features: [
          "Bespoke icon sets designed to match your application's user interface",
          "Custom illustrations for website hero containers, empty states, and guides",
          "Production-ready exports in SVG, PDF, EPS, and high-DPI raster packs",
          "Simplified vector nodes to optimize file weight and frontend render times",
        ],
        benefits: [
          "Perfect rendering without pixelation across different screens",
          "Extremely small file sizes compared to PNG/JPG, improving page loading speed",
          "Receive clean, raw master source files so your team can edit them later",
        ],
        techStack: ["Adobe Illustrator", "Figma", "Inkscape", "SVGOMG", "Lottie (optional)"],
      },
      {
        name: "Corporate Guidelines",
        slug: "corporate-guidelines",
        icon: "briefcase",
        description: "Actionable brand books that outline exactly how to use your brand assets.",
        longDescription:
          "Stop off-brand assets from polluting your company channels. We draft clear, practical brand style books that outline logo positioning, incorrect usage examples, voice instructions, and templates.",
        overview:
          "Structured guidelines that protect and align your brand identity across teams.",
        features: [
          "Detailed safe-space and minimum size rules for placing logos",
          "Hex, RGB, and CMYK color code standards for digital and physical use",
          "Custom templates for corporate slide decks, email footers, and cards",
          "Imagery style sheets defining tone, lighting, and photography guidelines",
        ],
        benefits: [
          "Onboard new design teams and marketing partners in minutes",
          "Prevent low-quality, off-template graphics from hurting brand value",
          "Save design revision cycles with strict layout rules from day one",
        ],
        techStack: ["Figma", "Adobe InDesign", "PDF", "Notion / Google Slides templates"],
      },
      {
        name: "Typography",
        slug: "typography",
        icon: "edit-3",
        description: "Cohesive type scales and font loading strategies that reinforce brand tone.",
        longDescription:
          "Pairing fonts is a science. We build custom typography systems that ensure perfect readability, balanced visual hierarchy, and fast loading performance on modern browsers.",
        overview:
          "Readability audits and custom font scales matched to your brand's digital template needs.",
        features: [
          "Contrast type pairings selected to highlight headlines and body text",
          "Web font performance setup, including subsetting and font fallbacks",
          "Strict type scales defined for headlines, subtext, buttons, and form inputs",
          "Optional letterform adjustments to create a completely custom logo wordmark",
        ],
        benefits: [
          "Clean layout reading hierarchy increases page views and form completion rates",
          "Unique typography styling helps your brand stand out from generic sites",
          "Developers can build with consistent, clear typography tokens",
        ],
        techStack: ["Google Fonts", "Adobe Fonts", "Fontshare", "Figma", "CSS / Tailwind tokens"],
      },
    ],
  },
  {
    id: "software-development",
    slug: "software-development",
    name: "Software Development",
    subtitle: "Custom SaaS platforms and backend engineering",
    icon: "cube",
    color: "#8b5cf6",
    description:
      "We turn complex business logic into clean, structured software. Whether you need a multi-tenant SaaS product or a custom API gateway, we build for security and scale.",
    benefits: [
      "Robust, maintainable codebases that run smoothly",
      "Enterprise-grade security foundations built in early",
      "Flexible database schemas ready for future feature additions",
    ],
    features: [
      "Multi-tenant database architectures and isolation setups",
      "Secure API gateways and microservices communication",
      "Dockerized cloud infrastructure with auto-scaling capabilities",
    ],
    techStack: ["Node.js", "Docker", "AWS ECS", "PostgreSQL", "Prisma ORM"],
    categories: [
      {
        name: "Custom SaaS",
        slug: "custom-saas",
        icon: "cloud-server",
        description: "Multi-tenant platforms featuring secure subscriber data isolation and integrated billing.",
        longDescription:
          "Turn your digital idea into a subscription-ready SaaS. We design scalable multi-tenant architectures featuring secure organization data isolation, subscription plan hooks (Stripe), team invitation flows, and flexible user role systems.",
        overview:
          "Enterprise-ready SaaS engines built for rapid iteration and secure data boundaries.",
        features: [
          "Multi-tenant database architectures ensuring strict client data separation",
          "Automated subscription management and billing configurations via Stripe",
          "Team management flows with invitation emails and role-based permissions",
          "Audit logs, usage metering, and features flags to manage tier access",
        ],
        benefits: [
          "Scale your business model using automated subscription billing pipelines",
          "Introduce new features to users without worrying about service downtime",
          "Meet enterprise security audits with audit trails and isolated databases",
        ],
        techStack: ["Node.js", "Next.js", "PostgreSQL", "Prisma", "Stripe", "AWS / Vercel"],
      },
      {
        name: "API Development",
        slug: "api-development",
        icon: "link",
        description: "High-throughput REST and GraphQL endpoints designed for security and scalability.",
        longDescription:
          "Integrate systems and power applications with reliable APIs. We build secure, documented, and versioned endpoints configured to handle heavy request volume with low latency and clean error handling.",
        overview:
          "Highly observable backend APIs featuring strict access limits and clear documentation.",
        features: [
          "REST or GraphQL API layout with automated OpenAPI and Swagger specifications",
          "Secure OAuth2 authentication, API keys, and rate-limiting to protect endpoints",
          "Webhook event delivery systems with automatic retry queues",
          "Seamless integrations with third-party tools like CRMs and payment channels",
        ],
        benefits: [
          "Decouple front-end applications to run and update services independently",
          "Speed up third-party integrations with clear, predictable API agreements",
          "Spot and fix background errors before they affect your user experience",
        ],
        techStack: ["Node.js", "Express", "Fastify", "GraphQL", "Postman", "Redis", "Docker"],
      },
      {
        name: "Database Architecture",
        slug: "database-architecture",
        icon: "database",
        description: "Robust data schemas built for query speed, transactional integrity, and scale.",
        longDescription:
          "Avoid scaling bottlenecks by modeling data correctly from day one. We configure normalized schemas, query indexes, caching layers, and backup scripts designed to support high transactional throughput.",
        overview:
          "Database scaling designs optimized for your specific application query patterns.",
        features: [
          "Relational and non-relational database schemas with migration tracking",
          "Index optimization and query refinement to speed up slow database calls",
          "Automated point-in-time recovery setups and backup verification scripts",
          "Read replicas, load pools (pgBouncer), and Redis caching layers",
        ],
        benefits: [
          "Eliminate transaction lockups and race conditions under heavy load",
          "Query speeds stay fast even as your table records grow 100x",
          "Clear database design makes future feature development fast and clean",
        ],
        techStack: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Redis", "pgBouncer", "AWS RDS"],
      },
      {
        name: "Cloud Infrastructure",
        slug: "cloud-infrastructure",
        icon: "cpu",
        description: "Observable, reproducible cloud environments managed via Infrastructure as Code.",
        longDescription:
          "Run your systems on secure cloud setups. We configure deployment pipelines, log monitoring platforms, secrets management, and automated scaling parameters that prevent surprise bills.",
        overview:
          "Production-ready setups on AWS and GCP built for stability and easy recovery.",
        features: [
          "Infrastructure as Code (Terraform) for reproducible cloud resources",
          "Automated CI/CD build scripts with zero-downtime rolling deploys",
          "Real-time log management and alert configurations (Datadog, CloudWatch)",
          "Strict security setups including WAF rules, SSL, and IAM role locks",
        ],
        benefits: [
          "Dramatically reduce application downtime using auto-scaling clusters",
          "Stop staging deviations by matching test and live cloud setups",
          "Full cost dashboards prevent surprise spikes in cloud provider invoices",
        ],
        techStack: ["AWS", "Docker", "Kubernetes / ECS", "Terraform", "GitHub Actions", "Vercel"],
      },
    ],
  },
  {
    id: "application-development",
    slug: "application-development",
    name: "Application Development",
    subtitle: "High-performance iOS and Android mobile apps",
    icon: "smartphone",
    color: "#10b981",
    description:
      "We build mobile apps that feel fast, smooth, and native. Using cross-platform frameworks, we ship your app to stores from a single, maintainable codebase.",
    benefits: [
      "Cut development and maintenance costs in half with a shared codebase",
      "Fast feature updates without maintaining double the code",
      "Reliable offline support and secure user data syncing",
    ],
    features: [
      "Cross-platform React Native and Flutter setups",
      "Polished UI animations and native screen transitions",
      "App Store and Google Play launch support and config",
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin"],
    categories: [
      {
        name: "iOS Development",
        slug: "ios-development",
        icon: "smartphone",
        description: "Native Swift applications built specifically for Apple's ecosystem guidelines.",
        longDescription:
          "Launch visual, high-performance iPhone and iPad apps. We code natively using Swift and SwiftUI to ensure perfect frame rates, Apple compliance, offline storage logic, and clean notifications integration.",
        overview:
          "Fully native iOS builds optimized for Apple hardware capabilities and store approval.",
        features: [
          "Responsive SwiftUI and UIKit layouts optimized for all iOS screen sizes",
          "Complete TestFlight beta configuration and App Store Connect management",
          "Advanced pushes, background updates, and deep-linking pipelines",
          "Offline-first local database configurations (CoreData / SQLite)",
        ],
        benefits: [
          "Premium native feel increases user retention in competitive app categories",
          "Use iOS-specific capabilities (widgets, Apple Pay, FaceID) to differentiate",
          "Clean Swift code matching Apple's latest software engineering principles",
        ],
        techStack: ["Swift", "SwiftUI", "Xcode", "TestFlight", "Firebase", "App Store Connect"],
      },
      {
        name: "Android Development",
        slug: "android-development",
        icon: "phone",
        description: "Native Kotlin apps optimized for diverse device models and Play Store setups.",
        longDescription:
          "Reach Android users around the globe. We build native Kotlin apps tested across major OEM devices, screen aspect ratios, and OS versions to guarantee a reliable experience for everyone.",
        overview:
          "Kotlin apps built with strict performance profiling and Play Console publishing support.",
        features: [
          "Jetpack Compose reactive layout setups following modern Material 3 rules",
          "Play Store deployment management, including staged rollout setups",
          "Push notification networks and deep links to specific screens",
          "Offline data synchronization configured for low-connectivity environments",
        ],
        benefits: [
          "Broad device compatibility without compromising layout quality or features",
          "Staged store deployments let you test updates with small user cohorts first",
          "Modular app architecture makes adding team members and new features fast",
        ],
        techStack: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase", "Gradle", "Play Console"],
      },
      {
        name: "React Native",
        slug: "react-native",
        icon: "layers",
        description: "Build iOS and Android applications from a single JavaScript codebase.",
        longDescription:
          "Accelerate your mobile time-to-market. React Native allows us to share business logic, visual components, and API integration paths between iOS and Android—massively reducing your development budget.",
        overview:
          "Cross-platform app codebases that leverage your web team's React capabilities.",
        features: [
          "Shared layout components with custom platform overrides where needed",
          "Robust application navigation structures and local state management",
          "Native module bridges for camera, face authorization, and file storage",
          "Over-the-air (OTA) updates to fix bugs instantly without store review wait times",
        ],
        benefits: [
          "Dramatically reduce launch times by coding once for both stores",
          "Deliver features to iOS and Android users at the exact same time",
          "Re-use utility functions and types from your existing React web apps",
        ],
        techStack: ["React Native", "Expo", "TypeScript", "Redux / Zustand", "React Navigation", "Firebase"],
      },
      {
        name: "Flutter",
        slug: "flutter",
        icon: "play",
        description: "High-performance cross-platform apps built from a single Dart codebase.",
        longDescription:
          "Develop gorgeous, animation-heavy interfaces. Flutter's custom rendering engine gives us total control over every single pixel, ensuring your brand visuals look identical on any device.",
        overview:
          "Dart-based applications optimized for smooth 60fps animations and custom styles.",
        features: [
          "Custom visual widgets designed to match your brand styling precisely",
          "Smooth 60fps animations and responsive screen transition gestures",
          "State management configurations designed for fast API responses",
          "Single-codebase builds easily adaptable to web or desktop apps in the future",
        ],
        benefits: [
          "Eliminate visual mismatches between iOS and Android versions",
          "Hot-reload speeds up styling cycles during the build process",
          "Stable application code backed by a strong Dart compilation process",
        ],
        techStack: ["Flutter", "Dart", "Firebase", "Bloc / Riverpod", "Codemagic", "Fastlane"],
      },
    ],
  },
];
