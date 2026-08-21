---
slug: simplycodes-blog-contentful-migration
translationKey: simplycodes-blog-contentful-migration
locale: es
title: Construyendo el blog de SimplyCodes sobre una plataforma compartida de Contentful
description: Cómo implementé el frontend del blog de SimplyCodes sobre una plataforma de contenido reutilizable construida por el equipo, que redujo el trabajo duplicado y las solicitudes innecesarias al origen.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 30
role: Responsable principal de la implementación frontend
period: Julio de 2024–febrero de 2025
technologies:
  - Contentful
  - Nuxt
  - Vue
  - TypeScript
skills:
  - Arquitectura frontend
  - Integración de CMS
  - SEO técnico
  - Ingeniería de crecimiento
areas:
  - frontend
  - architecture
  - content
  - e2e
featured: true
draft: false
---

## Contexto

SimplyCodes necesitaba un blog que pudiera sostener contenido editorial sin hacer que la aplicación web fuera responsable de obtener, reformular y filtrar datos sin procesar del CMS. También tenía que integrarse en una plataforma más amplia de la empresa: otros productos publicaban contenido similar, por lo que reconstruir el mismo modelo y la misma vía de entrega para cada sitio duplicaría el trabajo de ingeniería e infraestructura.

Fui el principal responsable de la implementación frontend para SimplyCodes. El backend fue construido por el equipo. Mi responsabilidad era convertir su API respaldada por Contentful en la experiencia para quienes leen: descubrimiento de artículos, layouts responsivos, renderizado de contenido enriquecido, navegación, metadatos y superficies de adquisición medibles.

El trabajo comenzó con el frontend inicial de Contentful en julio de 2024. La migración continuó por etapas hasta que la aplicación pasó a cargar artículos únicamente desde Contentful en febrero de 2025.

## El límite arquitectónico

La decisión más importante fue dónde debía residir la complejidad del CMS. El navegador no consultaba Contentful directamente. En cambio, el frontend solicitaba una API de blog orientada al producto, construida y operada por el equipo.

```text
Contentful
    |
    v
API de blog construida por el equipo
    +-- aplicar filtros de producto
    +-- paginar listas de artículos
    +-- normalizar estructuras de respuesta compartidas
    +-- cachear respuestas de la API
    |
    v
Frontend de Nuxt
    +-- renderizar las páginas de índice y de artículo
    +-- componer widgets específicos del producto
    +-- generar navegación y metadatos
    +-- medir interacciones de adquisición
```

Este límite mantuvo las credenciales y los detalles de las consultas al CMS fuera del cliente. También permitió que el backend filtrara por categoría o pilar de contenido antes de devolver una página de resultados, en lugar de enviar la colección completa de artículos a cada visitante. Las rutas de la API estaban detrás de una caché compartida de respuestas, lo que reducía el trabajo repetido contra el origen.

## Reutilizando la estructura del blog

Tratamos un artículo como un contrato a nivel de la empresa, en lugar de un objeto exclusivo de SimplyCodes. Las definiciones compartidas de TypeScript describían listas de artículos, autores, imágenes, categorías, pilares, metadatos y respuestas de artículos completos. El mismo paquete compartido también contenía contratos de blog para otro producto de la empresa.

En el frontend de SimplyCodes, consumí esos contratos directamente en las capas de consulta y presentación. Esto les dio al frontend y al backend un vocabulario común, sin dejar de permitir un renderizado específico para cada producto. SimplyCodes podía agregar sus propios widgets y tratamiento visual sin bifurcar las estructuras subyacentes de autores y artículos.

La reutilización le ahorró dinero a la empresa de forma cualitativa por dos vías. Los equipos no necesitaban modelar de manera independiente los mismos conceptos de blog para cada producto, y el backend centralizado podía encargarse una sola vez del filtrado y el cacheo, en lugar de repetir ese trabajo en cada frontend. No registramos un monto en dólares que se pudiera respaldar, por lo que no atribuyo una cifra financiera al ahorro.

## Implementando la experiencia de lectura

El frontend tenía dos superficies principales: un índice para el descubrimiento y una página de artículo para la lectura.

El índice convertía la ruta actual en filtros de categoría y pilar, y luego enviaba esos filtros a la API. La precarga del lado del servidor hacía que el conjunto inicial de artículos estuviera disponible en el HTML renderizado, mientras que la paginación basada en cursores permitía cargar más sin descargar el catálogo completo. El contenido destacado, las tarjetas de artículos y la selección editorial se componían a partir de las mismas respuestas tipadas.

La página de artículo combinaba la respuesta normalizada con un layout responsivo de tres columnas. Según el tamaño del viewport, quienes leían recibían una tabla de contenidos persistente o para mobile, el cuerpo del artículo, una selección editorial, contexto del autor, artículos recientes y controles para compartir. Separé los datos de presentación del artículo en un composable para que el formato de fechas, el tiempo de lectura, los detalles del autor, la selección de imágenes y la construcción de la URL canónica no se acumularan dentro del componente de página.

`[Imagen: el índice del blog de SimplyCodes y la página de artículo en tamaños desktop y mobile]`

## Renderizando contenido estructurado de forma segura

El texto enriquecido de Contentful tenía que admitir más que párrafos e imágenes. El renderer vinculaba las entradas estructuradas con componentes reutilizables de Vue, con extensiones específicas de SimplyCodes para contenido interactivo o con muchos datos. Esto permitía que el equipo editorial compusiera artículos más ricos mientras el frontend conservaba el control del marcado y la presentación.

Los bloques embebidos también expusieron un caso límite de la migración: un widget de nivel de bloque ingresado como contenido inline podía producir HTML anidado inválido y problemas de hidratación. La capa de consulta normalizaba esas entradas antes de renderizarlas y convertía los widgets conocidos de nivel de bloque al tipo correcto de nodo de texto enriquecido. Ese paso defensivo protegía el renderizado del servidor sin obligar al componente de página a entender una estructura malformada del CMS.

La tabla de contenidos se generaba a partir de los encabezados del artículo. Más adelante corregí sus etiquetas y el comportamiento de deduplicación para que los encabezados repetidos o con formato siguieran generando una navegación útil, en lugar de enlaces ambiguos.

## Preservando el comportamiento de búsqueda y SEO

Una migración de CMS no está completa cuando el texto del artículo aparece en pantalla. Las páginas del blog también tenían que seguir siendo útiles como puntos de entrada desde buscadores.

Integré URLs canónicas, títulos de página, descripciones, campos de Open Graph, tarjetas de Twitter, fechas y horas de publicación y modificación, y datos estructurados de artículos en la ruta de renderizado de Nuxt. Como los artículos se precargaban durante el renderizado del servidor, los crawlers y las vistas previas de enlaces no dependían de una solicitud exclusiva del cliente para entender la página.

También mejoré el desplazamiento por el blog con breadcrumbs, acceso a la búsqueda, tablas de contenidos, selección editorial y enlaces a artículos recientes. Estas funcionalidades conectaron el contenido migrado con el resto del producto, en lugar de tratar el blog como una salida aislada del CMS.

## Conectando el contenido con el crecimiento

El blog era tanto una superficie editorial como un canal de adquisición. Una vez establecidas las bases de la migración, agregué superficies de promoción del producto dentro de la experiencia del blog y luego sumé atribución de campaña a sus llamados a la acción.

Esto permitió medir esas ubicaciones sin mezclar la lógica de crecimiento con el modelo de contenido. Contentful seguía siendo responsable de la estructura editorial, el frontend controlaba la interacción y la presentación, y los parámetros de atribución conectaban determinados llamados a la acción con el recorrido analítico.

## Resultado

El resultado fue el frontend de un blog respaldado por Contentful, capaz de renderizar artículos estructurados, elementos embebidos específicos del producto, navegación responsiva y metadatos orientados a buscadores sobre una API construida por el equipo.

La arquitectura redujo la implementación duplicada entre productos al compartir contratos de blog y evitó trabajo innecesario al filtrar, paginar y cachear las respuestas antes de que llegaran al frontend. Para SimplyCodes, la misma base sostuvo tanto la lectura editorial como recorridos medibles de regreso al producto.

Este caso de estudio no afirma un aumento específico del tráfico, una tasa de aciertos de caché, una reducción del tiempo de publicación ni un ahorro en dólares porque esos registros no están disponibles. El resultado respaldado es arquitectónico: la reutilización redujo la cantidad necesaria de código específico del producto, mientras que el filtrado y el cacheo en el backend redujeron la transferencia evitable de datos y el trabajo repetido contra el origen.

## Reflexión

La parte más sólida de esta migración no fue un único componente. Fue la separación de responsabilidades entre una plataforma de contenido compartida y una experiencia específica del producto.

Mantener el acceso a Contentful, la normalización, el filtrado y el cacheo detrás de la API simplificó el frontend y les dio a otros productos una base reutilizable. Mantener el renderizado y el comportamiento de adquisición en SimplyCodes me permitió construir para su audiencia sin forzar a todos los productos a usar la misma interfaz.

Si volviera a abordar la migración, agregaría verificaciones explícitas de paridad para las URLs, los metadatos, los elementos embebidos y la estructura de encabezados al comienzo del cambio de sistema. Esas verificaciones harían que la seguridad de la migración fuera tan visible y repetible como los contratos tipados que respaldaron la experiencia final.
