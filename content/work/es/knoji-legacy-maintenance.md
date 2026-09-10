---
slug: knoji-legacy-maintenance
translationKey: knoji-legacy-maintenance
locale: es
title: Modernizar el código de Knoji sin reescribir la plataforma
description: Cómo amplié por etapas los datos estructurados de una plataforma procedural en PHP sin alterar su generación de páginas ni poner en riesgo el SEO
project: Knoji
organization: Knoji · Demand.io
projectType: professional
sortOrder: 60
role: Líder técnico e implementador principal
period: "Octubre de 2024 a junio de 2025; seguimiento del equipo hasta noviembre de 2025"
technologies:
  - PHP
  - JSON-LD
  - Schema.org
  - MySQL
  - ezSQL
  - HTML renderizado en el servidor
skills:
  - Datos estructurados
  - SEO técnico
  - Modernización de sistemas legacy
  - Normalización de datos
  - Serialización defensiva
areas:
  - frontend
  - backend
  - architecture
  - data
  - legacy
featured: false
draft: false
---

## Contexto y restricciones

Las páginas de comercios de Knoji combinan códigos de cupón, ofertas, políticas del comercio, calificaciones, preguntas frecuentes y orientación para el checkout. La misma información sirve a dos públicos: las personas que deciden si confiar en una promoción y usarla, y las máquinas que intentan entender la página.

Lideré el equipo responsable de evolucionar esta parte de la plataforma y fui el implementador principal del trabajo de datos estructurados que se describe acá. La implementación se desarrolló en dos fases: la consolidación de preguntas frecuentes en octubre de 2024 y luego una expansión más amplia del schema de comercios entre mayo y junio de 2025. El equipo siguió manteniendo comportamientos relacionados de SEO y schema hasta noviembre de 2025.

No era una aplicación greenfield. Las páginas de comercios se armaban a partir de grandes templates procedurales en PHP, variables compartidas, resultados directos de la base de datos y muchos módulos comerciales condicionales. Durante la primera fase, había dos layouts de comercios casi duplicados en uso. El orden de las promociones también era lógica de negocio: la posición de un código dependía de su estado, tipo, reglas de ubicación y los módulos que ya se habían renderizado por encima.

Reescribir ese proceso habría mezclado un cambio de SEO con una migración de producto mucho más grande. Tenía que mejorar la salida legible por máquinas sin alterar la página visible ni sus reglas de ordenamiento.

## El problema

El problema inicial era la duplicación de la semántica de preguntas frecuentes. Los templates de comercios contenían preguntas frecuentes estáticas sobre cupones, mientras que las Merchant Information Questions (MIQ) dinámicas se consultaban y renderizaban por separado. El marcado estructurado reflejaba esos caminos separados en lugar de presentar una entidad de preguntas frecuentes coherente.

El primer intento mostró el verdadero problema de mantenimiento. Agregar un wrapper `FAQPage` era fácil. Lo difícil era saber cuándo estaban disponibles todas las preguntas, mantener alineados ambos layouts y serializar las respuestas dinámicas de forma segura. La puntuación o el HTML del contenido podían romper el JSON armado a mano. Si lo emitíamos demasiado pronto, todavía faltaban los registros MIQ.

Ese episodio reveló una brecha más amplia. Knoji ya emitía algo de schema a nivel de página, pero las políticas de los comercios, las ofertas normalizadas, las tablas de cupones y las instrucciones de checkout seguían desconectadas de la capa de datos estructurados.

## Investigación

Rastreé la página renderizada hacia atrás desde `views/header-head.php`, que incluía globalmente `views/schema.php`, hasta ambos layouts de comercios y sus componentes compartidos. El modelo de dominio útil estaba implícito en variables de los templates, en lugar de estar representado mediante clases o servicios:

- Las preguntas estáticas se definían donde se renderizaba su HTML.
- Las respuestas MIQ llegaban desde una consulta y un componente separados.
- Los grupos de promociones, como códigos vigentes, códigos antiguos, ofertas con enlace y ubicaciones sticky, se modificaban mientras se armaba la página.
- Las políticas del comercio, los descuentos para clientes, las calificaciones, los productos de la barra lateral y los datos de las tablas de cupones usaban estructuras diferentes.

Decidí adaptar los datos estructurados al proceso de renderizado existente. Los mismos registros de preguntas frecuentes podían alimentar la salida visible y la legible por máquinas. Antes de mapear las promociones a entidades `Offer`, necesitaba normalizarlas en una estructura intermedia.

```text
Antes

template de FAQ estáticas -------> FAQ visible
consulta MIQ + componente -------> marcado MIQ visible
arrays de promociones -----------> ubicación procedural
schema.php ----------------------> bloques JSON-LD independientes limitados

Después

registros de FAQ estáticas --+------> FAQ visible
registros MIQ ---------------+------> un encoder de FAQPage

arrays de promociones ---> registros de visualización normalizados ---> schemas Offer / ItemList
datos del comercio -----------------------------------------------> Organization / Product
tablas e instrucciones visibles ---------------------------------> Dataset / HowTo
```

## Opciones consideradas

Consideré tres límites para el trabajo:

1. Modificar cada template de manera independiente. Esto minimizaba el movimiento inicial, pero preservaba la lógica duplicada de preguntas frecuentes y haría que cada agregado de schema fuera específico de cada layout.
2. Reemplazar el pipeline de páginas de comercios. Esto podía producir una arquitectura más limpia, pero aumentaba mucho el riesgo de regresiones en el orden de las promociones, los módulos estacionales, los enlaces de tracking y la salida sensible al SEO.
3. Agregar un punto de compatibilidad. Mantener el flujo de renderizado establecido, normalizar los datos necesarios para la salida estructurada y centralizar la serialización de JSON-LD.

Elegí la tercera opción. Mejoraba un aspecto transversal sin fingir que el código base circundante ya se había modernizado.

## Decisión técnica

La decisión tenía dos partes.

Primero, representar las preguntas frecuentes como registros con una `question` y una `answer`, donde una respuesta podía ser un string o un closure sobre los datos de la página. Los registros estáticos seguían generando su HTML visible. Los registros MIQ se recopilaban durante el renderizado y luego ambos conjuntos se pasaban a un emisor compartido `faq_lds.php` una vez que existían los datos necesarios.

Segundo, introducir un paso de normalización para las promociones. `_code_sorter.php` copiaba objetos de promociones heterogéneos y agregaba campos comunes orientados al schema, como `name`, `description`, `url`, `couponCode`, valores de descuento, fechas de validez, tipo de visualización y orden de visualización. Así, `schema.php` podía mapear esos registros a arrays de Schema.org sin reescribir el sistema de ubicación visible.

Todos los bloques pasaban por un helper `outputJsonLd()` respaldado por `json_encode`, en lugar de armar fragmentos de JSON mediante interpolación de strings. Un formateador numérico separado forzaba un punto como separador decimal y eliminaba de los precios del schema los separadores de miles dependientes del locale.

Mantuve sin cambios el renderizado visible, el acceso a la base de datos y las variables existentes de los comercios. Así reduje el riesgo, aunque la generación del schema siguió acoplada a las variables globales de los templates. Una migración posterior debería eliminar ese acoplamiento.

## Implementación y despliegue gradual

### Fase 1: una representación de preguntas frecuentes

A lo largo de seis commits, desde el [7 de octubre](https://github.com/demandio/knoji/commit/77b2414461391cbb4d6b7aa30eed0b2803a3eeff) hasta el [10 de octubre de 2024](https://github.com/demandio/knoji/commit/7efd0cea3731af73b205250d5dce0ed97b8b89a5), pasé de un wrapper inicial de Microdata para las MIQ a un emisor compartido de JSON-LD `FAQPage`. La secuencia importa porque registra las correcciones:

- Consolidé las entradas estáticas y las MIQ en lugar de emitir bloques de preguntas frecuentes que competían entre sí.
- Moví la emisión al final de cada layout para que todas las respuestas dinámicas estuvieran disponibles.
- Agregué el camino compartido al layout legacy después de cubrir inicialmente solo la variante más nueva.
- Reemplacé los fragmentos de entradas interpolados por `json_encode`.
- Eliminé un límite temporal de 12 preguntas para que la salida representara todas las preguntas frecuentes combinadas.

El layout experimental se eliminó más adelante cuando el equipo revirtió su split test. Como el layout anterior ya usaba el emisor compartido, la página activa conservó el comportamiento consolidado.

### Fase 2: expansión del schema de comercios

La [consolidación de mayo de 2025](https://github.com/demandio/knoji/commit/0530f80394a221499b5d62c315645d7a6c47562d) aplicó la misma estrategia más allá de las preguntas frecuentes. Las páginas de comercios incorporaron representaciones estructuradas para:

- el comercio como una `Organization`;
- la disponibilidad de cupones como un `Product` con `AggregateOffer` y registros `Offer` individuales;
- las promociones ordenadas como un `ItemList`;
- la identidad de la página como una `WebPage`;
- los productos relacionados de la barra lateral y sus ofertas.

El trabajo posterior mapeó las políticas de los comercios y los descuentos para clientes a registros `PropertyValue`, modeló las dos tablas visibles de cupones como estructuras `Dataset` y replicó las tres instrucciones visibles de checkout como registros `HowToStep`. Los cambios de Dataset y HowTo fueron desarrollados en coautoría con GitHub Copilot; seguí siendo responsable de integrarlos y revisarlos dentro del flujo legacy de la página.

El despliegue fue incremental en lugar de una reescritura del schema en una sola versión. Pequeños commits posteriores corrigieron la estructura de la salida y, en [`22669787`](https://github.com/demandio/knoji/commit/22669787d795eab2e13236bbfd8d968a80a78786), reforzaron la serialización decimal después de identificar precios sensibles al locale.

### Seguimiento del equipo

El trabajo continuó bajo la responsabilidad del equipo en lugar de terminar con mi último commit de implementación. Integrantes del equipo agregaron contenido estacional que pasaba por la representación compartida de preguntas frecuentes, separaron la inclusión en el sitemap de la indexabilidad de la página, corrigieron los conteos visibles de cupones y revisaron el texto sobre confiabilidad para cumplir con las normas. Como las preguntas frecuentes visibles y el JSON-LD compartían datos, la corrección de textos de agosto de 2025 actualizó ambas representaciones a la vez. En noviembre, el equipo también reforzó el manejo de fechas para el schema Article en el archivo central de schema.

## Resultado

Las páginas de comercios pasaron a ofrecer más información legible por máquinas y con reglas más consistentes, sin reemplazar el sistema procedural. El trabajo dejó estos puntos de conexión:

- Las preguntas frecuentes podían actualizarse una vez y reflejarse en las representaciones visible y estructurada.
- Las promociones heterogéneas pasaban por una estructura normalizada antes del mapeo al schema.
- La codificación de JSON-LD y el formato decimal tenían reglas de salida compartidas.

El resultado se limita a la arquitectura y la cobertura. Todavía no tengo evidencia de Search Console, resultados enriquecidos, tráfico, conversión o ingresos que permita atribuirles un efecto en SEO.

## Qué no funcionó

La implementación fue iterativa de manera intencional y varias decisiones iniciales no sobrevivieron al contacto con el ciclo de vida completo de la página:

- El primer commit llamaba JSON-LD al cambio, pero implementaba un wrapper de Microdata.
- El primer bloque JSON combinado se armó a mano y era vulnerable a puntuación inválida y comas finales.
- Al principio, el emisor se ejecutaba antes de que todas las preguntas frecuentes dinámicas estuvieran disponibles.
- El layout más nuevo de comercios se cubrió antes que el layout legacy, lo que requirió un cambio posterior.
- Se introdujo un límite temporal de preguntas frecuentes y luego se eliminó.
- El normalizador de promociones duplicaba solo una parte de un pipeline de ubicación mucho más grande, por lo que la equivalencia con todas las reglas visibles de ordenamiento todavía necesita una verificación del resultado renderizado.

La revisión actual de la evidencia también encontró problemas que me impiden presentar la implementación como completamente validada: una interpolación externa insegura de preguntas frecuentes, argumentos que no coinciden en los closures de preguntas frecuentes, una incompatibilidad en la construcción de `ItemList` y defectos en el helper de descripción de Dataset. Son tareas posteriores concretas, no motivos para ocultar el diseño más amplio, pero el caso de estudio sigue siendo un borrador hasta que se vuelvan a validar páginas representativas y cada bloque emitido.

## Validación todavía necesaria

Antes de publicar este caso de estudio, necesito recuperar el contexto original del PR y del ticket ENG y probar una matriz de páginas de comercios con datos presentes, ausentes y casos límite. El JSON-LD renderizado debería extraerse y verificarse con Schema.org y las herramientas relevantes de Google, incluidos valores mayores y menores que 1.000, entidades duplicadas y paridad con las preguntas frecuentes visibles, políticas, tablas de cupones, orden de ofertas e instrucciones.

Solo Search Console o evidencia comparable de producción podría respaldar afirmaciones sobre indexación o apariencia en los resultados de búsqueda. Google también limita la visibilidad práctica de los resultados enriquecidos de FAQ y HowTo, por lo que la validez sintáctica y la cobertura semántica no deberían confundirse con una presentación garantizada en los resultados de búsqueda.

## Reflexión

Producir JSON-LD no era la parte difícil. Había que encontrar dónde intervenir para mejorar la salida legible por máquinas sin desestabilizar una página sensible a los ingresos y al SEO, construida sobre años de reglas implícitas.

Un diseño greenfield probablemente empezaría con objetos de dominio tipados y derivaría de ellos tanto el HTML como los datos estructurados. En Knoji tuve que hacer lo contrario: descubrir el modelo de dominio oculto en los templates, normalizar los datos en el punto más acotado posible y preservar el comportamiento hasta verificar cada dependencia. Esta historia incluye mis commits y las correcciones posteriores del equipo.
