#import "@preview/silver-dev-cv:1.0.2": *

#show: cv.with(
  font-type: "PT Serif",
  continue-header: "false",
  name: "Francisco Blanco",
  address: "Buenos Aires, Argentina",
  lastupdated: "false",
  pagecount: "false",
  date: "2026-08-25",
  contacts: (
    (text: "me@panchoblanco.dev", link: "mailto:me@panchoblanco.dev"),
    (text: "+54 9 11 3175 2829", link: "tel:+5491131752829"),
    (text: "linkedin.com/in/franmblanco", link: "https://linkedin.com/in/franmblanco"),
  ),
)

#section[Profile]
#descript[
  Senior frontend and product engineer with 10+ years of experience, focused on Vue, Nuxt, and TypeScript. I use product analytics to decide what to ship, build accessibility-aware interfaces, and work across frontend and backend when the product needs it. I started by building products and teaching developers, then moved into team leadership, platform ownership, and full-stack delivery.
]

#v(6pt)
#sectionsep

#section("Experience")

#job(
  position: "Front-End Developer, later Full-Stack Developer",
  institution: [Demand.io],
  date: "Oct 2022 to Aug 2026",
  description: [
    - Owned the SimplyCodes web app and browser extension, including checkout UI and core extension logic used by 70,000+ Chrome Web Store users with a 4.6/5 rating.

    - Led the Vue 2 to Vue 3, Nuxt 3, and Vite migration, which reduced the bundle by 28% and brought First Contentful Paint below 1.2 seconds.

    - Built SSR and Redis-cache-aware A/B testing infrastructure. One documented experiment showed the existing coupon interaction significantly outperformed its redesign, so the team retained the control.

    - Built referral, reward, and CMS integrations. On Dealspotr and Knoji, I isolated existing business rules so we could change legacy products without broad rewrites.

    - Expanded into Node.js and TypeScript backend delivery in the final phase, working with Docker, Redis, PostgreSQL, and CI/CD alongside the frontend platform.
  ],
)

#v(3pt)

#job(
  position: "Senior Front-End Developer",
  institution: "BitPatagonia",
  date: "Jul 2020 to Oct 2022",
  description: [
    - Grew the frontend team from 1 to 5 developers while delivering a multilingual logistics PWA that processed around 1,000 shipments per day at more than 99% uptime.

    - Led the Vue and Nuxt to React and Next.js migration with Redux and Zod while the team continued product delivery.

    - Built management dashboards, connected them to Express and SQL services, and added analytics for operational and product reporting.
  ],
)

#v(3pt)

#job(
  position: "Front-End Developer",
  institution: "Viafoura",
  date: "Mar 2021 to Dec 2021",
  description: [
    - Maintained the social engagement client across its Backbone v1 and Vue/Vuex v2 implementations, keeping both generations in active use.

    - Modularized legacy widgets and built custom tooling that cut delivered client size by 60%, then contributed technical context to v3 planning.
  ],
)

#pagebreak()

#section("Experience, continued")

#job(
  position: "Senior Full-Stack Developer",
  institution: "PointMore",
  date: "Jan 2020 to Mar 2021",
  description: [
    - Co-founded the agency with 3 former Digital House developers and served as lead frontend developer on client e-commerce and management applications.

    - Delivered Nuxt and Next.js SSR applications, integrated APIs, and designed component libraries and interfaces when clients had no existing system.
  ],
)

#v(3pt)

#job(
  position: "Semi-Senior Full-Stack Developer",
  institution: "Digital House",
  date: "Jul 2016 to Jul 2020",
  description: [
    - Worked as the sole frontend developer on a Laravel content platform with external integrations and an internal REST API.

    - Evolved the UI incrementally from Blade templates to reusable components, then to Vue, Nuxt, and Tailwind; moved the CMS to Vue and Node and taught the team Vue during the transition.

    - Designed application components and, alongside product work, taught 5 months of coding classes covering frontend, PHP, Laravel, and SQL.
  ],
)

#v(6pt)
#sectionsep

#section("Skills")

#oneline-title-item(
  title: "Languages",
  content: [Spanish (Native), English (Fluent)],
)

#oneline-title-item(
  title: "Frontend",
  content: [
    TypeScript, JavaScript, Vue 3, Nuxt, Pinia, React, Next.js, HTML, CSS,
    Tailwind, UnoCSS, Vite
  ],
)

#oneline-title-item(
  title: "Quality",
  content: [
    Accessibility-aware UI, design systems, Storybook, SSR, Core Web Vitals,
    bundle optimization, Vitest
  ],
)

#oneline-title-item(
  title: "Backend and Data",
  content: [
    Node.js, Express, Laravel, PHP, PostgreSQL, SQL, Redis, REST APIs, Zod,
    Contentful CMS
  ],
)

#oneline-title-item(
  title: "Product and Delivery",
  content: [
    Product analytics, A/B testing, GTM, GA4, Docker, CI/CD, Git, technical
    leadership, mentoring
  ],
)

#oneline-title-item(
  title: "Links",
  content: [
    #link("https://github.com/Arbust908")[https://github.com/Arbust908] | #link("https://panchoblanco.dev")[https://panchoblanco.dev]
  ],
)

#set document(
  author: "Francisco Blanco",
  title: "Francisco Blanco CV",
)
