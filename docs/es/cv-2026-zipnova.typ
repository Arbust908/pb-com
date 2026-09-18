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

#section[Perfil]
#descript[
  Desarrollador frontend senior con más de 10 años construyendo productos web y experiencia con React, Next.js y TypeScript. Trabajé en una PWA logística que procesaba cerca de 1.000 envíos diarios y estuve a cargo de la aplicación web y la extensión de SimplyCodes. Evalúo diseños en Figma y Adobe XD, desarrollo bibliotecas de componentes y uso analítica para evaluar decisiones de interfaz. Mi experiencia incluye sistemas de diseño con Storybook, pruebas con Vitest y liderazgo de equipos frontend.
]

#v(6pt)
#sectionsep

#section("Experiencia")

#job(
  position: "Desarrollador Front-End, luego Desarrollador Full-Stack",
  institution: [Product.ai],
  date: "Oct 2022 a Ago 2026",
  description: [
    - Estuve a cargo de la aplicación web y la extensión de SimplyCodes, incluida la interfaz de checkout y la lógica central usada por más de 70.000 usuarios en Chrome Web Store, con una calificación de 4,6/5.

    - Me incorporé para trabajar en un nuevo sistema de diseño con Storybook y pruebas con Vitest. Evalué propuestas de interfaz a partir de archivos de diseño en Figma y otras herramientas.

    - Construí un motor de pruebas A/B compatible con SSR y caché en Redis que nos aportó los datos para decidir qué funcionalidades lanzar, con controles simples de buckets para que los POs ajustaran los experimentos sin intervención de ingeniería.

    - Lideré la migración de la plataforma Vue y Nuxt con Vite, que redujo el bundle un 28% y llevó el First Contentful Paint a menos de 1,2 segundos.

    - Contribuí a la aplicación móvil de cupones de SimplyCodes con React Native en un equipo de dos desarrolladores. En la etapa final amplié mi trabajo al backend con Node.js y TypeScript, desarrollando funcionalidades de punta a punta con Docker, Redis, PostgreSQL y CI/CD hasta el despliegue.
  ],
)

#v(3pt)

#job(
  position: "Desarrollador Front-End Senior",
  institution: "BitPatagonia",
  date: "Jul 2020 a Oct 2022",
  description: [
    - Hice crecer el equipo frontend de 1 a 5 desarrolladores mientras entregábamos una PWA logística multilingüe que procesaba cerca de 1.000 envíos diarios con más de 99% de disponibilidad.

    - Lideré la migración a React y Next.js desde Vue y Nuxt, con Redux para el estado y Zod para validar datos, mientras el equipo continuaba entregando producto.

    - Evalué diseños de interfaz y construí paneles de gestión conectados a servicios en Express y SQL. Incorporé GTM y Google Analytics para reportes operativos y de producto.
  ],
)

#v(3pt)

#job(
  position: "Desarrollador Front-End",
  institution: "Viafoura",
  date: "Mar 2021 a Dic 2021",
  description: [
    - Mantuve el cliente de interacción social en sus implementaciones Backbone v1 y Vue/Vuex v2, con ambas generaciones en uso activo.

    - Modularicé widgets legacy y construí herramientas propias que redujeron un 60% el tamaño entregado al cliente; luego aporté contexto técnico a la planificación de v3.
  ],
)

#pagebreak()

#section("Experiencia, continuación")

#job(
  position: "Desarrollador Front-End",
  institution: "Forian",
  date: "Jun 2020 a Mar 2021",
  description: [
    - Desarrollé y mantuve el frontend de comercio electrónico de Biotrack con Vue y TypeScript, aplicando prácticas de accesibilidad con Vuetify.

    - Colaboré con el equipo de backend en Laravel y Product Owners de Estados Unidos para entregar funcionalidades y resolver requisitos de API.
  ],
)

#v(3pt)

#job(
  position: "Desarrollador Full-Stack Senior",
  institution: "PointMore",
  date: "Ene 2020 a Mar 2021",
  description: [
    - Cofundé la agencia con 3 exdesarrolladores de Digital House y fui el desarrollador frontend principal en aplicaciones de comercio electrónico y gestión para clientes.

    - Diseñé y evalué interfaces en Figma y Adobe XD, y construí bibliotecas de componentes con Tailwind. Entregué aplicaciones SSR con Next.js y Nuxt e integré APIs.
  ],
)

#v(3pt)

#job(
  position: "Desarrollador Full-Stack Semi-Senior",
  institution: "Digital House",
  date: "Jul 2016 a Jul 2020",
  description: [
    - Trabajé como único desarrollador frontend en una plataforma de contenido en Laravel con integraciones externas y una API REST interna.

    - Evolucioné la interfaz desde plantillas Blade a componentes reutilizables con Vue, Nuxt y Tailwind; modernicé el CMS con Vue y Node y capacité al equipo durante la transición.

    - Diseñé componentes de la aplicación y, en paralelo al trabajo de producto, dicté 5 meses de clases de programación sobre frontend, PHP, Laravel y SQL.
  ],
)

#v(6pt)
#sectionsep

#section("Habilidades")

#oneline-title-item(
  title: "Idiomas",
  content: [Español (Nativo), Inglés (Fluido)],
)

#oneline-title-item(
  title: "Frontend",
  content: [
    React, TypeScript, Next.js, JavaScript, HTML, CSS, Tailwind, Redux, Zod,
    React Native, Vue 3, Nuxt, Vite
  ],
)

#oneline-title-item(
  title: "Diseño y calidad",
  content: [
    Sistemas de diseño, bibliotecas de componentes, Storybook, Vitest,
    Figma, Adobe XD, accesibilidad, Core Web Vitals, SSR
  ],
)

#oneline-title-item(
  title: "Backend y datos",
  content: [
    Node.js, Express, Laravel, PHP, PostgreSQL, SQL, Redis, APIs REST
  ],
)

#oneline-title-item(
  title: "Producto y entrega",
  content: [
    Analítica de producto, pruebas A/B, GTM, GA4, liderazgo técnico, mentoría,
    Git, CI/CD, Claude Code, Codex
  ],
)

#oneline-title-item(
  title: "Enlaces",
  content: [
    #link("https://github.com/Arbust908")[https://github.com/Arbust908] | #link("https://panchoblanco.dev")[https://panchoblanco.dev]
  ],
)

#set document(
  author: "Francisco Blanco",
  title: "CV de Francisco Blanco, Frontend Senior",
)
