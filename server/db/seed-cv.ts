import * as dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import {
  type NewCvExperience,
  type NewCvLanguage,
  type NewCvSkill,
  type NewCvStudy,
  type NewCvTranslation,
  cvExperiences,
  cvLanguages,
  cvSkills,
  cvStudies,
  cvTranslations,
} from './schema'

dotenv.config()

const client = createClient({
  url: import.meta.env.TURSO_DATABASE_URL!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN!,
})

const db = drizzle(client)

// Convert MM/DD/YYYY to ISO date
function parseDate(dateStr: string | null): string | null {
  if (!dateStr)
    return null
  const [month, day, year] = dateStr.split('/')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// Experience data from locales
const experiencesEn = {
  demandio: {
    rol: 'Front-End Engineer (Contract)',
    company: 'Demand.io',
    start: '10/18/2022',
    end: null,
    description:
      'Architect and maintain SimplyCodes, a Chrome extension (70,000+ Chrome Web Store users, 4.6★) — own both the UI layer (checkout overlays, in-page widgets) and core extension logic (checkout detection, content-script injection, cross-context messaging).',
    more: 'Led migration from Vue 2 to Vue 3 + Vite (Nuxt 3), reducing bundle size by 28% and first contentful paint to < 1.2s. Championed design-system adoption (Tailwind V4 + Storybook), enabling faster feature delivery with WCAG AA compliance. Managed dynamic blog content via Contentful CMS, integrating with the Nuxt frontend. Built referral tracking infrastructure and optimized conversion funnels to drive user acquisition. Led multiple A/B testing initiatives using GTM and GA4, analyzing user behavior and conversion metrics to inform product decisions. Stack: Vue, Nuxt 3, UnoCSS/TailwindCSS, TypeScript, React Native (Expo).',
  },
  bitpatagonia: {
    rol: 'Senior Front-End Engineer',
    company: 'BitPatagonia',
    start: '07/01/2020',
    end: '10/18/2022',
    description:
      'Built front-end team from 1 to 5 developers delivering a multilingual logistics PWA processing 1k daily shipments with > 99% uptime. Implemented comprehensive analytics infrastructure using GTM and GA to track user behavior and conversion funnels. Led migration from Vue to React, improving performance and developer experience across the platform using Next.js, Redux, and Zod.',
    more: 'Developed web apps with management systems and metric panels using Nuxt (Vue) and Next.js (React) for SSR/SEO optimization, state management, PWA capabilities, and SQL DB integration via Express REST APIs.',
  },
  viafoura: {
    rol: 'Front-End Developer (Concurrent Contract)',
    company: 'Viafoura',
    start: '03/01/2021',
    end: '12/31/2021',
    description:
      'Maintained and evolved Viafoura\'s social engagement script built in multiple technologies (Backbone in v1, Vue/Vuex in v2). Participated in brainstorming the v3 product and new features in coordination with the UI and Back-End teams.',
    more: 'Modularised legacy Backbone widgets into Vue components, built into a custom tool reducing on-client size by 60%.',
  },
  forian: {
    rol: 'Senior Front-End Developer (Concurrent Contract)',
    company: 'Forian',
    start: '06/01/2020',
    end: '03/31/2021',
    description:
      'Developed and maintained the Biotrack product in open collaboration with the Back-End team. Built with Vue, TypeScript, Vuetify (WCAG & ADA accessibility), Vuex, and Vue Router, delivering features against Jira tickets from US-based Product Owners.',
    more: null,
  },
  pointmore: {
    rol: 'Senior Full Stack Developer',
    company: 'PointMore',
    start: '01/01/2020',
    end: '03/31/2021',
    description:
      'Developed web apps with management systems and metric panels using Nuxt (Vue) and Next.js (React) for SSR/SEO optimization, state management, PWA capabilities, and SQL DB integration via Express REST APIs.',
    more: 'Point More is an Agency I started with 3 other ex-Digital House developers. Even though we all are Full Stack developers I\'m the main Front End dev. As a team, we take projects too large in scope for one dev. Usually, we build Complex eCommerce that need to have a pristine SEO ranking for that end I apply my knowledge to build PWA ready web apps that manage session information in Vuex states. For external data y connect to backend services via REST APIs using Axios. Depending on client demand we use an existing Component Library (like Vue-bootstrap), if not, I usually build a custom component library with the help of TailwindCSS styling. If our client doesn\'t have a design of their own I also take part in the Design phase using Adobe XD o Figma From time to time we have taken projects that did have an existing codebase in other languages or frameworks which we work on top (Laravel, React, Plain HTML + CSS + Alpine)',
  },
  digitalhouse_dev: {
    rol: 'Semi-Senior Full Stack Developer',
    company: 'Digital House',
    start: '07/01/2016',
    end: '07/01/2020',
    description:
      'Developed a website with a content editing system and integration with external systems, paired with an internal REST API. Laravel + SCSS / Vue + Tailwind / Node + ORM (Homemade). Prototyped and designed in Adobe XD.',
    more: 'I started as the only Front End developer in this project where the continents were that we should use Laravel as our framework. As a styling library, I wrote various SASS functions with the company\'s brand\'s manual to be used in the Blade templates. As a second version, for security and speed, we migrated all backend CMS to a Vue + Node service and served all data to the Laravel Front End via APIs. I upgraded all our Blade templates into Blade Components for reusability and maintainability. For new Components, I had to design them and get them approved, which I did with Adobe XD. We then migrated our Blade Components to Vue components for optimization. This meant I had to teach our team Vue. As the last version we migrated our complete Laravel Front End to Nuxt and switched our SASS library for TailwindCSS.',
  },
  digitalhouse: {
    rol: 'Coding Teacher',
    company: 'Digital House',
    start: '07/01/2016',
    end: '12/01/2018',
    description: 'Teach Code. Html + CSS, PHP, SQL, Laravel and JS.',
    more: 'I was at the head of the classroom in various commissions for 5 months teaching and training non-developers in our Full-Stack technologies (HTML, CSS, JS, SQL, and PHP with Laravel).The curriculum started with simple web pages with HTML and CSS up to an Advanced level with responsive mobile-first designs. Then we embarked into the backend with simple server responses with PHP and server-rendered dynamic pages. We learned SQL databases with MySQL and made PDO connections with our PHP backends. After that I explained the Basis of OOP (Object-oriented Programming), SOLID design pattern, and ACID. After a concept-heavy unit we start building a full-stack application with Laravel as a framework. Finally we explore client dynamic pages adding Javascript to the Laravel Apps. All students were evaluated in an application they had to build on their own in the span of 1 month consisting of one or more CRUDs, a login with a user profile, and dynamic front ends. As a plus I taught via workshops CSS Grid, animation with keyframes and SASS',
  },
}

const experiencesEs = {
  demandio: {
    rol: 'Ingeniero Front-End (Contrato)',
    description:
      'Arquitecto y mantengo SimplyCodes, una extension de Chrome (mas de 70.000 usuarios en la Chrome Web Store, 4.6★) — a cargo tanto de la capa de UI (overlays de checkout, widgets in-page) como de la logica central de la extension (deteccion de checkout, inyeccion de content scripts, mensajeria entre contextos).',
    more: 'Lidere la migracion de Vue 2 a Vue 3 + Vite (Nuxt 3), reduciendo el tamano del bundle en un 28% y el First Contentful Paint a menos de 1.2s. Promovi la adopcion del design system (Tailwind V4 + Storybook), permitiendo una entrega de funcionalidades mas rapida con cumplimiento de WCAG AA. Administre contenido dinamico del blog mediante Contentful CMS, integrado con el frontend en Nuxt. Construi infraestructura de tracking de referidos y optimice los funnels de conversion para impulsar la adquisicion de usuarios. Lidere multiples iniciativas de A/B testing usando GTM y GA4, analizando el comportamiento de usuarios y metricas de conversion para informar decisiones de producto. Stack: Vue, Nuxt 3, UnoCSS/TailwindCSS, TypeScript, React Native (Expo).',
  },
  bitpatagonia: {
    rol: 'Front-End Sr',
    description:
      'Construi el equipo de Front-End desde 1 hasta 5 desarrolladores, entregando una PWA logistica multilingue que procesa 1k envios diarios con un uptime mayor al 99%. Implemente infraestructura de analitica integral usando GTM y GA para seguir el comportamiento de usuarios y los funnels de conversion. Lidere la migracion de Vue a React, mejorando el rendimiento y la experiencia de desarrollo en toda la plataforma usando Next.js, Redux y Zod.',
    more: 'Desarrolle web apps con sistemas de gestion y paneles de metricas usando Nuxt (Vue) y Next.js (React) para optimizacion de SSR/SEO, manejo de estado, capacidades PWA e integracion con base de datos SQL via APIs REST en Express.',
  },
  viafoura: {
    rol: 'Desarrollador Front End (Contrato Concurrente)',
    description:
      'Mantuve y evolucione el script de engagement social de Viafoura, construido con multiples tecnologias (Backbone en v1, Vue/Vuex en v2). Participe en el brainstorming del producto v3 y nuevas funcionalidades en coordinacion con los equipos de UI y Back-End.',
    more: null,
  },
  forian: {
    rol: 'Desarrollador Front End Sr (Contrato Concurrente)',
    description:
      'Desarrolle y mantuve el producto Biotrack en colaboracion abierta con el equipo de Back-End. Construido con Vue, TypeScript, Vuetify (accesibilidad WCAG y ADA), Vuex y Vue Router, entregando funcionalidades segun tickets de Jira de Product Owners en EE.UU.',
    more: null,
  },
  pointmore: {
    rol: 'Desarrollo Full Stack Sr',
    description:
      'Desarrollo de web apps con sistemas de gestion y panel de metricas para una variedad de clientes. Web Apps construidas en Nuxt para ofrecer SSR y optimizacion de SEO, componentizacion en Vue, manejo de estado interno con Vuex y la posibilidad de ser instaladas como PWA. Conexion con Api REST via AXIOS a servicios en Express con DB en SQL (via Sequelize). Prototipados y disenos en Adobe XD o Figma.',
    more: 'Point More es una agencia que comence con otros 3 ex desarrolladores de Digital House. Aunque todos somos desarrolladores Full Stack, yo soy el desarrollador principal de Front End. Como equipo, tomamos proyectos con un alcance demasiado grande para un desarrollador. Por lo general, creamos un comercio electronico complejo que debe tener una clasificacion SEO impecable para ese fin. Aplico mi conocimiento para crear aplicaciones web listas para PWA que administran la informacion de la sesion en los estados de Vuex. Para datos externos, conectese a los servicios de backend a traves de las API REST utilizando Axios. Dependiendo de la demanda del cliente, usamos una biblioteca de componentes existente (como Vue-bootstrap), si no, generalmente construyo una biblioteca de componentes personalizada con la ayuda del estilo TailwindCSS. Si nuestro cliente no tiene un diseno propio, tambien participo en la fase de diseno usando Adobe XD o Figma. De vez en cuando hemos tomado proyectos que tenian una base de codigo existente en otros lenguajes o frameworks sobre los que trabajamos (Laravel, React, Plain HTML + CSS + Alpine)',
  },
  digitalhouse_dev: {
    rol: 'Desarrollo Full Stack SSr',
    description:
      'Desarrolle un sitio web con un sistema de edicion de contenido e integracion con sistemas externos, junto con una API REST interna. Laravel + SCSS / Vue + Tailwind / Node + ORM (propio). Prototipado y diseno en Adobe XD.',
    more: 'Comence como el unico desarrollador de Front End en este proyecto donde estaban los continentes que deberiamos usar Laravel como nuestro marco. Como biblioteca de estilos, escribi varias funciones de SASS con el manual de la marca de la compania para usarlas en las plantillas Blade. Como segunda version, por seguridad y velocidad, migramos todos los CMS backend a un servicio Vue + Node y entregamos todos los datos al Laravel Front End a traves de API. Actualice todas nuestras plantillas Blade a componentes Blade para su reutilizacion y mantenimiento. Para los componentes nuevos, tuve que disenarlos y obtener su aprobacion, lo que hice con Adobe XD. Luego migramos nuestros componentes Blade a componentes Vue para optimizarlos. Esto significaba que tenia que ensenarle Vue a nuestro equipo. Como ultima version, migramos nuestro Laravel Front End completo a Nuxt y cambiamos nuestra biblioteca SASS por TailwindCSS.',
  },
  digitalhouse: {
    rol: 'Profesor de programacion',
    description:
      'Dictar clases de programacion. Html + CSS, PHP, SQL, Laravel y JS',
    more: 'Estuve a la cabeza del aula en varias comisiones durante 5 meses ensenando y capacitando a no desarrolladores en nuestras tecnologias Full-Stack (HTML, CSS, JS, SQL y PHP con Laravel). El plan de estudios comenzo con paginas web simples con HTML y CSS hasta un nivel avanzado con disenos receptivos para dispositivos moviles. Luego nos embarcamos en el backend con respuestas de servidor simples con PHP y paginas dinamicas renderizadas por el servidor. Aprendimos bases de datos SQL con MySQL e hicimos conexiones PDO con nuestros backends PHP. Despues de eso, explique las bases de OOP (Programacion orientada a objetos), el patron de diseno SOLID y ACID. Despues de una unidad de concepto pesado, comenzamos a construir una aplicacion de pila completa con Laravel como marco. Finalmente, exploramos las paginas dinamicas del cliente agregando Javascript a las aplicaciones de Laravel. Todos los estudiantes fueron evaluados en una aplicacion que tuvieron que construir por su cuenta en el lapso de 1 mes que consta de uno o mas CRUD, un inicio de sesion con un perfil de usuario y frontales dinamicos. Como plus ensene a traves de talleres CSS Grid, animacion con keyframes y SASS',
  },
}

// Study data
const studiesEn = {
  dh: {
    place: 'Digital House',
    date: '2016',
    description:
      'Full Stack Web Development! HTML 5, CSS 3, Scrum, Bootstrap, PHP, POO, GitHub, MySQL, UML',
  },
  up: {
    place: 'UP - Universidad de Palermo',
    date: '2009 - 2013',
    description: 'Multimedia Design (coursework)',
  },
  slc: {
    place: 'St Luke\'s College',
    date: '1996 - 2008',
    description: 'Bachelor Degree (Bilingual)',
  },
}

const studiesEs = {
  dh: {
    place: 'Digital House',
    description:
      'Desarrollo Web Full Stack! HTML 5, CSS 3, Scrum, Bootstrap, PHP, POO, GitHub, MySQL, UML',
  },
  up: {
    place: 'UP - Universidad de Palermo',
    description: 'Diseno Multimedial (cursada)',
  },
  slc: {
    place: 'St Luke\'s College',
    description: 'Bachillerato (Bilingue)',
  },
}

// Skills data
const skillsData = {
  webcore: {
    list: 'TypeScript, JavaScript (ES6+), HTML5, CSS3, PHP, REST, MySQL, Git, Sass, SCSS',
    titleEn: 'Web Core',
    titleEs: 'Fundamentos Web',
  },
  frameworks: {
    list: 'React, Next.js, Vue, Nuxt 4, React Native (Expo), TanStack Query, Pinia, Zustand, Redux, Vuex, Tailwind/UnoCSS, Node.js (Express, Handlebars, Nest), Prisma ORM, Drizzle, Laravel',
    titleEn: 'Frameworks & Libraries',
    titleEs: 'Frameworks y Librerias',
  },
  browserapis: {
    list: 'Chrome Extensions (Manifest V3), Content Scripts, Service Workers, chrome.storage / runtime / tabs / scripting, WebExtensions API',
    titleEn: 'Browser APIs',
    titleEs: 'APIs del Navegador',
  },
  testing: {
    list: 'Cypress, Playwright, Vitest, Jest, Storybook, Accessibility (WCAG AA), Auditability',
    titleEn: 'Testing & Quality',
    titleEs: 'Testing y Calidad',
  },
  tools: {
    list: 'CI/CD Pipelines, Vite, GTM, GA, PostHog, AI-assisted (Claude Code, Antigravity), Design Systems, Agile/Scrum, SEO, SSR/SSG/ISR, i18n',
    titleEn: 'Tools',
    titleEs: 'Herramientas',
  },
}

// Languages data
const languagesData = {
  es: { nameEn: 'Spanish', nameEs: 'Espanol', levelEn: 'Native', levelEs: 'Nativo' },
  en: { nameEn: 'English', nameEs: 'Ingles', levelEn: 'Fluent', levelEs: 'Fluido' },
}

async function seed() {
  try {
    // Check if already seeded
    const existingExps = await db.select().from(cvExperiences)
    if (existingExps.length > 0) {
      return
    }

    // Seed experiences
    const expKeys = Object.keys(experiencesEn) as (keyof typeof experiencesEn)[]
    const experienceRecords: NewCvExperience[] = expKeys.map((slug, idx) => ({
      slug,
      company: experiencesEn[slug].company,
      startDate: parseDate(experiencesEn[slug].start)!,
      endDate: parseDate(experiencesEn[slug].end),
      sortOrder: idx,
    }))

    await db.insert(cvExperiences).values(experienceRecords)

    // Seed experience translations
    const expTranslations: NewCvTranslation[] = []
    for (const slug of expKeys) {
      const en = experiencesEn[slug]
      const es = experiencesEs[slug]

      // EN translations
      expTranslations.push(
        { entityType: 'experience', entitySlug: slug, locale: 'en', field: 'rol', value: en.rol },
        {
          entityType: 'experience',
          entitySlug: slug,
          locale: 'en',
          field: 'description',
          value: en.description,
        },
      )
      if (en.more) {
        expTranslations.push({
          entityType: 'experience',
          entitySlug: slug,
          locale: 'en',
          field: 'more',
          value: en.more,
        })
      }

      // ES translations
      expTranslations.push(
        { entityType: 'experience', entitySlug: slug, locale: 'es', field: 'rol', value: es.rol },
        {
          entityType: 'experience',
          entitySlug: slug,
          locale: 'es',
          field: 'description',
          value: es.description,
        },
      )
      if (es.more) {
        expTranslations.push({
          entityType: 'experience',
          entitySlug: slug,
          locale: 'es',
          field: 'more',
          value: es.more,
        })
      }
    }

    await db.insert(cvTranslations).values(expTranslations)

    // Seed studies
    const studyKeys = Object.keys(studiesEn) as (keyof typeof studiesEn)[]
    const studyRecords: NewCvStudy[] = studyKeys.map((slug, idx) => ({
      slug,
      dateRange: studiesEn[slug].date,
      sortOrder: idx,
    }))

    await db.insert(cvStudies).values(studyRecords)

    // Seed study translations
    const studyTranslations: NewCvTranslation[] = []
    for (const slug of studyKeys) {
      const en = studiesEn[slug]
      const es = studiesEs[slug]

      studyTranslations.push(
        { entityType: 'study', entitySlug: slug, locale: 'en', field: 'place', value: en.place },
        {
          entityType: 'study',
          entitySlug: slug,
          locale: 'en',
          field: 'description',
          value: en.description,
        },
        { entityType: 'study', entitySlug: slug, locale: 'es', field: 'place', value: es.place },
        {
          entityType: 'study',
          entitySlug: slug,
          locale: 'es',
          field: 'description',
          value: es.description,
        },
      )
    }

    await db.insert(cvTranslations).values(studyTranslations)

    // Seed skills
    const skillKeys = Object.keys(skillsData) as (keyof typeof skillsData)[]
    const skillRecords: NewCvSkill[] = skillKeys.map((slug, idx) => ({
      slug,
      skillList: skillsData[slug].list,
      sortOrder: idx,
    }))

    await db.insert(cvSkills).values(skillRecords)

    // Seed skill translations
    const skillTranslations: NewCvTranslation[] = []
    for (const slug of skillKeys) {
      const { titleEn, titleEs } = skillsData[slug]
      skillTranslations.push(
        { entityType: 'skill', entitySlug: slug, locale: 'en', field: 'title', value: titleEn },
        { entityType: 'skill', entitySlug: slug, locale: 'es', field: 'title', value: titleEs },
      )
    }

    await db.insert(cvTranslations).values(skillTranslations)

    // Seed languages
    const languageRecords: NewCvLanguage[] = [
      { slug: 'es', sortOrder: 0 },
      { slug: 'en', sortOrder: 1 },
    ]

    await db.insert(cvLanguages).values(languageRecords)

    // Seed language translations
    const langTranslations: NewCvTranslation[] = []
    for (const [slug, data] of Object.entries(languagesData)) {
      langTranslations.push(
        { entityType: 'language', entitySlug: slug, locale: 'en', field: 'name', value: data.nameEn },
        { entityType: 'language', entitySlug: slug, locale: 'en', field: 'level', value: data.levelEn },
        { entityType: 'language', entitySlug: slug, locale: 'es', field: 'name', value: data.nameEs },
        { entityType: 'language', entitySlug: slug, locale: 'es', field: 'level', value: data.levelEs },
      )
    }

    await db.insert(cvTranslations).values(langTranslations)
  }
  catch (error) {
    console.error('Seed failed:', error)
    import.meta.exit(1)
  }
}

seed().then(() => {
  import.meta.exit(0)
})
