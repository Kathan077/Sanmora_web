export const blogPosts = [
  {
    id: 6,
    title: "How Website Speed Affects Google Rankings",
    excerpt: "If your website takes more than 3 seconds to load, you're not just losing users—you are actively dropping in Google search rankings. Here is how Google evaluates speed and how to optimize it.",
    category: "SEO & Performance",
    date: "Jun 09, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    content: `
We have all heard the advice: "build a fast website." But for most business owners, speed is seen as a secondary UX goal—something to fix after the launch, once the design is polished and the copywriting is approved.

But behind the scenes, Google treats page speed as a primary ranking factor. Since the introduction of the Page Experience Update and the Core Web Vitals initiative, Google has made it clear: slow sites get lower search visibility. If your website takes more than 3 seconds to load, you're not just losing visitors; you're actively being pushed down the search results by faster competitors.

At Sanmora, we've seen this play out in real time across multiple projects. Here is exactly how Google evaluates your website's speed, why milliseconds dictate your search position, and how to optimize it.

### The metrics that matter: Core Web Vitals
Google doesn't just measure a generic "load time" anymore. Instead, they use three specific metrics—known as the Core Web Vitals—to evaluate how real users experience your page speed:

1. **Largest Contentful Paint (LCP):** This measures how long it takes for the largest element on the screen (usually a hero image or a main headline) to render. To keep Google happy, your LCP should occur within **2.5 seconds** of the page starting to load.
2. **Interaction to Next Paint (INP):** Newly introduced as a ranking factor in 2024 to replace First Input Delay (FID), INP measures the user interface's responsiveness. When a user clicks a button or opens a menu, does it react instantly? A good INP is under **200 milliseconds**.
3. **Cumulative Layout Shift (CLS):** This measures visual stability. Have you ever tried to read an article on your phone, only for the text to jump down because a slow image or ad loaded at the top? Google penalizes pages that shift around, as it ruins the user experience.

### Why Google cares about milliseconds
Google's business model relies on providing the best possible search experience. If a user clicks a search result and faces a blank screen for 5 seconds, they will click back to Google and try another link. To Google, this is a failed search session.

Furthermore, slow sites eat up Google's **crawl budget**. Googlebot uses automated scripts to crawl and index billions of web pages daily. If your server takes 2 seconds to respond to each request, Google's crawlers will scan fewer pages on your site, leading to delayed indexing of your new content or product updates.

### The tangible cost of slowness: An Ahmedabad case study
Let's look at a real world example from our work here in Ahmedabad. We recently audited a local B2B manufacturer in the GIDC Industrial Estate. They had a massive catalog of industrial products, but their site was built on a heavy, unoptimized WordPress theme with dozens of active plugins. 

Their homepage took **6.8 seconds** to load on mobile devices, and their search rankings for high intent keywords like "industrial valve exporter Gujarat" had dropped to the second page of Google.

We rebuilt their website using Next.js, optimized their product images, and used static site generation (SSG) to pre render their product catalogs. The results were immediate:
  Page load time dropped from **6.8s to 1.2s**.
  The bounce rate decreased by **42%**.
  Within 45 days, their site regained top 3 organic rankings for their core product keywords, leading to a **180% increase in monthly quote inquiries**.

### Actionable steps to speed up your website today
If you want to protect and improve your Google rankings, here is the performance roadmap we recommend:

  **Optimize your images:** Never upload raw photos from digital cameras or smartphones. Resize them to their exact container dimensions and convert them to modern formats like WebP or AVIF.
  **Implement a CDN:** Use a Content Delivery Network like Cloudflare or Vercel Edge Network. This caches your website's static files in servers worldwide, serving them to users from the closest geographic location.
  **Limit third party scripts:** Google Tag Manager, tracking pixels, hotjar maps, and chat widgets are notorious for blocking the main thread. Defer non critical scripts so they load only after the main content is visible.
  **Minimize CSS & JS bundle sizes:** Use code splitting and tree shaking to ensure you only ship the code that is actually needed for the active page.

> A fast website is no longer a luxury or an afterthought. It is the very foundation of your organic marketing and user retention strategy.
    `
  },
  {
    id: 1,
    title: "We got tired of sending WhatsApp updates, so we built our own client portal",
    excerpt: "The honest story of why we spent three weeks building a custom dashboard instead of using Slack or Trello, and how it completely changed our client handoffs.",
    category: "Inside Sanmora",
    date: "Jun 02, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo 1522071820081 009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    content: `
We’ve all been there. You’re working hard on a feature branch, and suddenly your phone buzzes. It’s a WhatsApp message from a client asking for a quick staging link, followed by another asking if the latest landing page design has been updated in Figma. 

For a long time at Sanmora, this was our normal. We tried Slack, but clients found it too noisy. We tried Trello, but clients forgot their logins. The result? Project management scattered across three different chat threads, email chains, and shared drives.

So, three weeks ago, we decided to do something about it. We built our own client portal.

### Why build when you can buy?
Before writing a single line of React code, we researched client portal SaaS products. Most of them were either overly complicated enterprise platforms or glorified file sharing folders that cost $150/month per user. 

None of them integrated with our exact workflow. We wanted a portal that could:
1. **Show real time build status:** Directly pull deployment status from Vercel/Netlify.
2. **Embed live interactive Figma files:** So clients can leave comments directly inside the portal without navigating to Figma's complex UI.
3. **Offer a simple timeline view:** A clean, zero login progress bar showing what phase the project is in.

### The Stack we chose
We built the portal inside our Next.js monorepo using:
  **Frontend:** Next.js (App Router) + Tailwind CSS + Framer Motion
  **Database:** Supabase (for quick auth and row level security)
  **APIs:** Vercel webhook integration for deployment statuses

### What we learned from the launch
Since deploying the portal for our active Ahmedabad and remote clients, our daily WhatsApp notifications have dropped by roughly 70%. More importantly, the feedback loops are much faster. Clients love having a single URL where they can preview the live staging build and approve design mockups in one click.

> Sometimes, the best solution to agency friction isn't another third party subscription. It’s just building the bridge yourself.
    `
  },
  {
    id: 2,
    title: "Stop obsessing over 100/100 Lighthouse scores. Focus on this instead.",
    excerpt: "A perfect score on paper doesn't mean your website feels fast to a real user. Here is a realistic look at the web performance optimizations that actually matter.",
    category: "Performance",
    date: "May 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo 1460925895917 afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    featured: false,
    content: `
Every frontend developer has spent late nights chasing the holy grail: a perfect 100/100 score on Google Lighthouse. You optimize images, you defer scripts, you inline critical CSS, and you squeeze every byte out of your bundle. 

But here’s a hard truth we’ve realized after launching over 50 production sites: a 100/100 score on your developer machine doesn't guarantee your user thinks your site is fast.

### The Lighthouse illusion
Lighthouse runs in a simulated environment. It throttles CPU and network speeds based on standardized profiles. But real users don't live in simulations. They are on patchy 4G networks in moving trains, or using older budget smartphones with slow Javascript execution engines.

If your site gets a 100 Lighthouse score but takes 4 seconds of blank white screen before showing the first paint (FCP), your users are still going to bounce.

### What to focus on instead

Rather than obsessing over the score badge, focus on these user centric metrics:

1. **Largest Contentful Paint (LCP):** How fast does the main hero image or headline load? If the user sees content instantly, they perceive the site as fast, even if background analytics scripts are still loading.
2. **Cumulative Layout Shift (CLS):** Does the page jump around when images or custom fonts load? There is nothing more frustrating than trying to click a button, only for a layout shift to move it, causing you to click an ad instead.
3. **First Input Delay (FID) / Interaction to Next Paint (INP):** When a user clicks a menu link, does it respond instantly? Delay here makes a site feel sluggish and broken.

### The Sanmora Performance Checklist
Here is the practical checklist we use for our builds:
  Always set explicit width and height dimensions on images to prevent layout shifts.
  Prioritize hero images using the \`priority\` attribute in Next.js.
  Limit custom web fonts. Fetching 5 different weights of a custom font can delay text rendering by seconds.

> Stop optimizing for Google's algorithms and start optimizing for human patience. Your conversions will thank you.
    `
  },
  {
    id: 3,
    title: "Why most local businesses in Ahmedabad are losing clients online",
    excerpt: "It's rarely a pricing issue—it's almost always a local search visibility gap. Here is a simple, no nonsense roadmap we use to help local brands get found on Google Maps.",
    category: "Local SEO",
    date: "May 10, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo 1557804506 669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    featured: false,
    content: `
We speak with a lot of local business owners in Ahmedabad. From boutique design studios to manufacturing suppliers in GIDC, the complaint is often the same: *"We have a beautiful website, but we aren't getting inquiries through it. Everyone just contacts us via references."*

When we look under the hood, the problem is rarely their product, pricing, or website design. It is simply that their business is invisible to anyone searching locally.

### The power of "Near Me" searches
When someone in Vastrapur or Satellite searches for "best web design studio Ahmedabad" or "structural engineer near me", Google doesn't just show standard search results. It highlights the Local Map Pack (the top 3 map locations with ratings and contact details).

If you are not in those top three results, you are missing out on more than 60% of all high intent search traffic.

### How to optimize your Local SEO today

You don’t need a massive marketing agency budget to fix this. Here is the exact roadmap we give our local clients:

1. **Claim and Verify Google Business Profile (GBP):** Make sure your business name matches your real world branding. Don't stuff keywords into your name or Google might suspend your listing.
2. **Match your NAP (Name, Address, Phone):** Ensure your address and contact details are identical across your website footer, Google listing, and business directories.
3. **Collect Consistent Reviews:** Ask your satisfied clients for reviews, and make sure to reply to them. Google loves active listings.
4. **Build Local Citations:** Get listed on trusted local business portals.

> Local search is a winner take all game. By spending just a few hours optimizing your local footprint, you can stand out from competitors who are still relying entirely on word of mouth.
    `
  },
  {
    id: 4,
    title: "I compared Framer Motion and Vanilla CSS animations: Here is the truth",
    excerpt: "Fluid interactions make a website feel alive, but at what performance cost? A developer's breakdown of when to reach for a JS library versus basic CSS transitions.",
    category: "Design & Dev",
    date: "Apr 18, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo 1507238691740 187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    featured: false,
    content: `
As frontend developers, we love eye candy. Seeing a card slide in smoothly or a menu morph gracefully gives us an instant dopamine hit. But as performance advocates, we also know that shipping heavy JavaScript libraries can kill page responsiveness.

In our recent projects, we sat down to benchmark two main approaches: **Framer Motion** (the industry favorite React animation library) and **Vanilla CSS/Transitions**.

Here is what we discovered.

### When Framer Motion wins
Framer Motion is incredible for complex layout animations. If you are building a dashboard where items can be reordered in a grid, or cards expand to modal views, doing this in vanilla CSS is a nightmare. 

Framer Motion's \`layout\` prop handles all the mathematical calculations (bounding client rects) automatically, giving you fluid 60fps animations out of the box.

### When Vanilla CSS is the correct choice
If all you need is a button that glows on hover, a menu overlay that fades in, or an entry animation when a page loads, **do not use Framer Motion**.

Framer Motion adds roughly 30kb (gzipped) to your initial JavaScript bundle. For a simple landing page, that extra JS can delay your Time to Interactive (TTI). Vanilla CSS transitions run on the browser's compositor thread, meaning they are incredibly light and won't block the main thread.

### Our Rule of Thumb at Sanmora
  Use **Vanilla CSS** for micro interactions, hovers, simple fades, and translation animations.
  Use **Framer Motion** for state driven UI changes, layout transitions, exit/entry page transitions, and complex drag and drop interfaces.

> Choose the lighter tool whenever possible. Your bundle size will thank you.
    `
  },
  {
    id: 5,
    title: "Why we stopped building standard Shopify templates for high growth brands",
    excerpt: "Pre made templates are fine to start, but they bottleneck you when traffic spikes. How we move growing e commerce stores to custom Next.js frontends.",
    category: "E Commerce",
    date: "Mar 30, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo 1511512578047 dfb367046420?q=80&w=2070&auto=format&fit=crop",
    featured: false,
    content: `
Shopify is a fantastic tool. It has democratized retail commerce and allowed thousands of founders to launch online storefronts in a weekend. But when an e commerce brand hits a certain scale—usually around 10,000 active visitors a day—standard Shopify templates start showing their limits.

At Sanmora, we've stopped building standard Liquid based Shopify themes for high growth merchants. Instead, we transition them to a **headless commerce** model.

### The template bottleneck
Standard Shopify themes load everything in a monolithic bundle. Every app installed (reviews, currency converters, size charts) injects custom script tags into the theme header. 

Over time, this results in a bloated website that feels sluggish. For e commerce, every 100ms delay in page load time can reduce conversion rates by up to 7%.

### The Headless solution
With headless commerce, we separate the backend (Shopify managing inventory, cart, payments) from the frontend. We build a completely custom, static frontend using Next.js.

  **Speed:** The website is pre rendered at build time. Clicking a product page feels instantaneous because there is no server side database query to wait for.
  **Design freedom:** No longer constrained by the Liquid template structure. Designers can build any immersive layout they want.
  **Security:** Since the public facing site is just static HTML/JS files, there is no direct database or server endpoint for hackers to target.

> Transitioning to headless requires a development team to maintain, but for brands looking to scale their digital experience, it is the single best investment they can make.
    `
  }
];
