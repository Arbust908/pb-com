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
    rol: 'Front-End Engineer',
    company: 'Demand.io',
    start: '10/18/2022',
    end: null,
    description:
      'As a Front-End Engineer, I collaborate with the team to develop and maintain multiple products. Leading migration from Vue 2 to Vue 3 + Vite (Nuxt 3), reducing bundle size by 28% and first contentful paint to < 1.2s. Championing design-system adoption (Tailwind V4 + Storybook) enabling faster feature delivery with WCAG AA compliance. Our main stack is based on Vue, utilizing Nuxt 3, UnoCSS or TailwindCSS, and TypeScript. Our product lineup includes an app developed using React Native, a project in which I am actively involved. Additionally, I engage in brainstorming new features in collaboration with the UI and Back-End teams.',
    more: 'Spearheaded migration of core app from Vue 2 to Vue 3 + Vite (Nuxt 3), cutting bundle size by 28% and reducing first contentful paint to < 1.2s. Championed design-system adoption (Tailwind V4 + Storybook) enabling 3 squads to ship features 30% faster with consistent WCAG AA compliance. Solo handled full migration to TanStack Query, modernizing data fetching layer across entire application. Developed mobile applications using React Native (Expo) serving 1k daily active users. Mentored 2 junior developers; one promoted to mid-level within 12 months. Maintenance and upgrade on Multi-Language Full-stack products (PHP, jQuery 4, CSS) improving feature turn around time by 25% in ticket velocity. I spearheaded an initiative to migrate our legacy code to our current stack.',
  },
  bitpatagonia: {
    rol: 'Senior Front-End Engineer',
    company: 'BitPatagonia',
    start: '07/01/2020',
    end: '10/18/2022',
    description:
      'Built front-end team from 0 to 5 developers delivering a multilingual logistics PWA processing 1k daily shipments with > 99% uptime. Led migration from Vue to React with Next.js.',
    more: 'As Front-end Lead I lead a team of 5 developers in the development of multiple web applications. Our main stack is based on Vue (Vite, Vue 3, UnoCSS or TailwindCSS, Pinia, Vue Router, and Typescript). Even so, we are now migrating our first proprietary product to Next.js. Beyond this product, we also have and maintain a management system for a logistics company in the form of a PWA, a management panel for our mining companies, and two institutional pages. All these products contain i18n to handle multiple languages (usually English and Spanish).',
  },
  viafoura: {
    rol: 'Front-End Developer',
    company: 'Viafoura',
    start: '03/01/2021',
    end: '12/31/2021',
    description:
      'Maintain and evolve Viafoura\'s Product (a social engagement script) built in multiple technologies (Backbone in v1 and Vue, Vuex in v2). I also took part in the brainstorming of the v3 product and new features in coordination with the UI and Back-end teams.',
    more: 'Modularised legacy Backbone widgets into Vue components, built into a custom tool reducing on-client size by 60%.',
  },
  forian: {
    rol: 'Senior Front-End Developer',
    company: 'Forian',
    start: '06/01/2020',
    end: '03/31/2021',
    description:
      'Development and maintain the Biotrack Product in an open collaboration with the backend team. Using Vue with Typescript, Vuetify (for accessibility standards, WCAG & ADA), Vuex and Vue Router to achieve the Jira tickets handed down by the USA POs (Product Owners).',
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
    start: '01/01/2017',
    end: '07/01/2020',
    description:
      'Develop a website with a content editing system and integration with external systems. Paired with an internal Editable REST Api. Laravel + SASS / Vue + Tailwind / Node + ORM(Homemade).Prototype and design in Adobe XD.',
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
    rol: 'Ingeniero Front-End',
    description:
      'Como Ingeniero Front-End, colaboro con el equipo para desarrollar y mantener multiples productos. Lidere la migracion de Vue 2 a Vue 3 + Vite (Nuxt 3), reduciendo el tamano del bundle en un 28% y el First Contentful Paint a menos de 1.2s. Promovi la adopcion del design system (Tailwind V4 + Storybook) permitiendo una entrega de funcionalidades 30% mas rapida con cumplimiento consistente de WCAG AA. Nuestro stack principal se basa en Vue, utilizando Nuxt 3, UnoCSS o TailwindCSS y TypeScript. Nuestra linea de productos incluye una aplicacion desarrollada usando React Native, un proyecto en el que estoy activamente involucrado. Adicionalmente, participo en sesiones de brainstorming para nuevas funcionalidades en colaboracion con los equipos de UX y Back-End.',
    more: 'Lidere la migracion del nucleo de la aplicacion de Vue 2 a Vue 3 + Vite (Nuxt 3), reduciendo el tamano del bundle en un 28% y el First Contentful Paint a menos de 1.2s. Promovi la adopcion del design system (Tailwind V4 + Storybook) permitiendo que 3 squads entreguen funcionalidades 30% mas rapido con cumplimiento consistente de WCAG AA. Maneje de forma independiente la migracion completa a TanStack Query, modernizando la capa de fetching de datos en toda la aplicacion. Desarrolle aplicaciones moviles usando React Native (Expo) atendiendo a 1k usuarios activos diarios. Mentoree a 2 desarrolladores junior; uno promovido a nivel medio en 12 meses. Mantenimiento y actualizacion de productos Full-Stack multiidioma (PHP, jQuery 4, CSS) mejorando el tiempo de entrega de funcionalidades en un 25% en velocidad de tickets. Lidere una iniciativa para migrar nuestro codigo legacy a nuestro stack actual.',
  },
  bitpatagonia: {
    rol: 'Front-End Sr',
    description:
      'Construi el equipo de Front-End desde 0 hasta 5 desarrolladores, entregando una PWA logistica multilingue que procesa 1k envios diarios con un uptime mayor al 99%. Lidere la migracion de Vue a React con Next.js.',
    more: 'Como Lider de Front-End, dirigi un equipo de 5 desarrolladores en el desarrollo de multiples aplicaciones web. Nuestro stack principal se basa en Vue (Vite, Vue 3, UnoCSS o TailwindCSS, Pinia, Vue Router y TypeScript). Sin embargo, ahora estamos migrando nuestro primer producto propietario a Next.js. Ademas de este producto, tambien mantenemos un sistema de gestion para una empresa logistica en forma de PWA, un panel de gestion para nuestras empresas mineras y dos paginas institucionales. Todos estos productos contienen i18n para manejar multiples idiomas (generalmente Ingles y Espanol).',
  },
  viafoura: {
    rol: 'Desarrollador Front End',
    description:
      'Desarrollar y mantener el Producto Biotrack en colaboracion abierta con el equipo de Backend. Usando Vue con Typscript, Vuetify (por Estandares de Accesibilidad, WCAG & ADA), Vuex y Vue Router para completar los tickets de Jira entregados por los POs (Product Owners) de Estados Unidos.',
    more: null,
  },
  forian: {
    rol: 'Desarrollador Front End Sr',
    description:
      'Desarrollar y mantener el Producto Biotrack en colaboracion abierta con el equipo de Backend. Usando Vue con Typscript, Vuetify (por Estandares de Accesibilidad, WCAG & ADA), Vuex y Vue Router para completar los tickets de Jira entregados por los POs (Product Owners) de Estados Unidos.',
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
      'Desarrollo de una web con sistemas de edicion de contenido e interaccion con otros sistemas externos. Conexion con Api REST interna con CRUD. Laravel + SASS / Vue + Tailwind / Node + ORM (Propio). Prototipado y diseno en Adobe XD.',
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
    description: 'Graphic Design',
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
    description: 'Disenador Grafico',
  },
  slc: {
    place: 'St Luke\'s College',
    description: 'Bachillerato (Bilingue)',
  },
}

// Skills data
const webSkillList
  = 'Vue 3, Vite, UnoCSS, Pinia, TypeScript, Nuxt 3, Prisma, Vue, Nuxt, Tailwind, React, Next, Vitest, Jest, HTML, CSS (Scss Sass), Scrum, Bootstrap, PHP, POO, Git, MySQL, UML, JavaScript, Laravel, Node, Express, Handlebars, SEO, GTM'
const adobeSkillList = 'Photoshop, Illustrator, InDesign'
const otherSkillListEn = 'Photography, Video Editing, Unity & C#, Maya, 3DMax, ZBrush'
const otherSkillListEs = 'Fotografia, Edicion de Video, Unity & C#, Maya, 3DMax, ZBrush'

const skillsData = {
  web: { list: webSkillList, titleEn: 'Web Development', titleEs: 'Desarrollo Web' },
  adobe: { list: adobeSkillList, titleEn: 'Adobe Suite CC', titleEs: 'Adobe Suite CC' },
  other: { listEn: otherSkillListEn, listEs: otherSkillListEs, titleEn: 'Others', titleEs: 'Otros' },
}

// Languages data
const languagesData = {
  es: { nameEn: 'Spanish', nameEs: 'Espanol', levelEn: 'Mother Tongue', levelEs: 'Lengua Madre' },
  en: { nameEn: 'English', nameEs: 'Ingles', levelEn: 'Native', levelEs: 'Nativo' },
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
    const skillRecords: NewCvSkill[] = [
      { slug: 'web', skillList: skillsData.web.list, sortOrder: 0 },
      { slug: 'adobe', skillList: skillsData.adobe.list, sortOrder: 1 },
      { slug: 'other', skillList: otherSkillListEn, sortOrder: 2 }, // EN list as base
    ]

    await db.insert(cvSkills).values(skillRecords)

    // Seed skill translations
    const skillTranslations: NewCvTranslation[] = [
      { entityType: 'skill', entitySlug: 'web', locale: 'en', field: 'title', value: skillsData.web.titleEn },
      { entityType: 'skill', entitySlug: 'web', locale: 'es', field: 'title', value: skillsData.web.titleEs },
      { entityType: 'skill', entitySlug: 'adobe', locale: 'en', field: 'title', value: skillsData.adobe.titleEn },
      { entityType: 'skill', entitySlug: 'adobe', locale: 'es', field: 'title', value: skillsData.adobe.titleEs },
      { entityType: 'skill', entitySlug: 'other', locale: 'en', field: 'title', value: skillsData.other.titleEn },
      { entityType: 'skill', entitySlug: 'other', locale: 'es', field: 'title', value: skillsData.other.titleEs },
      // For 'other', the list differs by locale
      { entityType: 'skill', entitySlug: 'other', locale: 'en', field: 'list', value: otherSkillListEn },
      { entityType: 'skill', entitySlug: 'other', locale: 'es', field: 'list', value: otherSkillListEs },
    ]

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
