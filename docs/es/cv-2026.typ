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
  Ingeniero frontend y de producto senior con más de 10 años de experiencia, especializado en Vue, Nuxt y TypeScript. Uso analítica de producto para decidir qué construir, desarrollo interfaces con criterios de accesibilidad y trabajo tanto en frontend como en backend cuando el producto lo requiere. Empecé construyendo productos y enseñando programación; con el tiempo asumí el liderazgo de equipos, plataformas frontend y entregas full stack.
]

#v(6pt)
#sectionsep

#section("Experiencia")

#job(
  position: "Desarrollador Front-End, luego Desarrollador Full-Stack",
  institution: [Demand.io],
  date: "Oct 2022 a Ago 2026",
  description: [
    - Estuve a cargo de la aplicación web y la extensión de SimplyCodes, incluida la interfaz de checkout y la lógica central usada por más de 70.000 usuarios en Chrome Web Store, con una calificación de 4,6/5.

    - Lideré la migración de Vue 2 a Vue 3, Nuxt 3 y Vite, que redujo el bundle un 28% y llevó el First Contentful Paint a menos de 1,2 segundos.

    - Construí infraestructura de pruebas A/B compatible con SSR y caché en Redis. Un experimento documentado mostró que la interacción de cupones existente superaba significativamente al rediseño, por lo que el equipo mantuvo el control.

    - Construí integraciones de referidos, recompensas y CMS. En Dealspotr y Knoji aislé reglas de negocio existentes para modificar productos legacy sin reescrituras amplias.

    - En la etapa final amplié mi trabajo al backend con Node.js y TypeScript, usando Docker, Redis, PostgreSQL y CI/CD junto con la plataforma frontend.
  ],
)

#v(3pt)

#job(
  position: "Desarrollador Front-End Senior",
  institution: "BitPatagonia",
  date: "Jul 2020 a Oct 2022",
  description: [
    - Hice crecer la función de frontend de 1 a 5 desarrolladores mientras entregábamos una PWA logística multilingüe que procesaba cerca de 1.000 envíos diarios con más de 99% de disponibilidad.

    - Lideré la migración de Vue y Nuxt a React y Next.js con Redux y Zod mientras el equipo continuaba entregando producto.

    - Construí paneles de gestión, los conecté con servicios en Express y SQL, e incorporé analítica para reportes operativos y de producto.
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
  position: "Desarrollador Full-Stack Senior",
  institution: "PointMore",
  date: "Ene 2020 a Mar 2021",
  description: [
    - Cofundé la agencia con 3 exdesarrolladores de Digital House y fui el desarrollador frontend principal en aplicaciones de comercio electrónico y gestión para clientes.

    - Entregué aplicaciones SSR con Nuxt y Next.js, integré APIs y diseñé bibliotecas de componentes e interfaces cuando los clientes no tenían un sistema existente.
  ],
)

#v(3pt)

#job(
  position: "Desarrollador Full-Stack Semi-Senior",
  institution: "Digital House",
  date: "Jul 2016 a Jul 2020",
  description: [
    - Trabajé como único desarrollador frontend en una plataforma de contenido en Laravel con integraciones externas y una API REST interna.

    - Evolucioné la interfaz de forma incremental desde plantillas Blade a componentes reutilizables y luego a Vue, Nuxt y Tailwind; migré el CMS a Vue y Node y enseñé Vue al equipo durante la transición.

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
    TypeScript, JavaScript, Vue 3, Nuxt, Pinia, React, Next.js, HTML, CSS,
    Tailwind, UnoCSS, Vite
  ],
)

#oneline-title-item(
  title: "Calidad",
  content: [
    Interfaces con criterios de accesibilidad, sistemas de diseño, Storybook,
    SSR, Core Web Vitals, optimización de bundles, Vitest
  ],
)

#oneline-title-item(
  title: "Backend y datos",
  content: [
    Node.js, Express, Laravel, PHP, PostgreSQL, SQL, Redis, APIs REST, Zod,
    Contentful CMS
  ],
)

#oneline-title-item(
  title: "Producto y entrega",
  content: [
    Analítica de producto, pruebas A/B, GTM, GA4, Docker, CI/CD, Git,
    liderazgo técnico, mentoría
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
  title: "CV de Francisco Blanco",
)
