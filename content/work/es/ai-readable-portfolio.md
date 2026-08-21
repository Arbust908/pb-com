---
slug: ai-readable-portfolio
translationKey: ai-readable-portfolio
locale: es
title: Negociando Markdown para la página de inicio de un portfolio legible por IA
description: Agregar una representación compacta y opcional y una capa de descubrimiento sin cambiar la experiencia en el navegador.
project: Portfolio
organization: Personal
projectType: personal
sortOrder: 910
publishedAt: 2026-08-12
role: Desarrollador full-stack
period: 2026
technologies:
  - Nuxt
  - Nitro
  - HTTP
  - Markdown
skills:
  - Mejora progresiva
  - Diseño de API
  - SEO técnico
areas:
  - backend
  - architecture
  - content
  - e2e
featured: false
draft: true
---

## Contexto

Un portfolio tiene dos públicos con necesidades diferentes. Las personas se benefician de la navegación, la tipografía, el movimiento y el diseño responsivo. Los clientes automatizados necesitan los mismos datos centrales en una representación que sea fácil de descubrir y procesar.

El objetivo no era reemplazar el sitio web ni mantener un segundo sistema de contenido. Era hacer que la página de inicio existente fuera más útil para los clientes que piden Markdown explícitamente.

## Restricciones

- Las solicitudes normales de los navegadores todavía tenían que recibir la página HTML diseñada.
- La respuesta alternativa tenía que reutilizar los datos existentes del CV en lugar de duplicarlos.
- Los cachés necesitaban una señal que indicara que HTML y Markdown eran representaciones diferentes.
- El descubrimiento podía abarcar varias rutas públicas, pero el soporte de Markdown tenía que anunciarse con precisión.

## Enfoque

Agregué negociación de contenido en la capa de middleware del servidor. Para las solicitudes `GET` y `HEAD` a `/`, el middleware verifica que exista un tipo de medio `text/markdown` explícito. Las solicitudes `GET` que coinciden reciben Markdown; las solicitudes `HEAD` que coinciden reciben los mismos encabezados sin cuerpo. Las demás solicitudes continúan por el pipeline normal de renderizado de Nuxt.

El Markdown se arma en el momento de la solicitud a partir de los endpoints existentes de experiencia, habilidades e idiomas. Incluye un resumen del perfil, enlaces a las secciones principales del sitio y al catálogo de la API, dos roles recientes, grupos de habilidades e idiomas hablados. Si falla una solicitud de datos, las secciones restantes todavía pueden renderizarse.

Actualmente, solo la página de inicio tiene una representación en Markdown. `/cv`, `/work` y los casos de estudio individuales siguen siendo HTML incluso cuando un cliente envía `Accept: text/markdown`.

## Protocolo

Un build local de producción devolvió la siguiente respuesta ante una solicitud explícita:

```http
GET / HTTP/1.1
Accept: text/markdown

HTTP/1.1 200 OK
Content-Type: text/markdown; charset=utf-8
Vary: Accept
Cache-Control: public, max-age=300, s-maxage=300
```

La solicitud `HEAD` equivalente devolvió los encabezados de Markdown sin cuerpo. Al alternar solicitudes locales de HTML y Markdown, también se obtuvo cada vez la representación solicitada. Las solicitudes con `Accept: text/html`, como las de un navegador, recibieron HTML como antes.

El parser actual se mantiene pequeño de manera intencional, pero no es un parser de `Accept` completo según los estándares. Busca la subcadena `text/markdown`, por lo que `Accept: text/markdown;q=0` todavía devuelve Markdown. Es necesario implementar los valores de calidad y la precedencia de los rangos de medios antes de poder describir la negociación como totalmente conforme.

## Representación

Medido sobre la misma página de inicio compilada localmente el 21 de agosto de 2026:

| Representación | Cuerpo de la respuesta | Contenido incluido |
|---|---:|---|
| HTML | 34.401 bytes | Documento visual, estilos, estado de la aplicación y contenido del CV |
| Markdown | 1.732 bytes | 222 palabras que abarcan el perfil, dos roles recientes, cinco grupos de habilidades y dos idiomas |

Esto representa un cuerpo de respuesta un 95,0 % más pequeño para la representación enfocada. La comparación es una medición local del payload, no una afirmación sobre latencia, precisión del modelo ni ahorro de ancho de banda en producción.

## Descubrimiento

La negociación es una parte de una capa de descubrimiento más amplia. La página de inicio, el CV y el índice de trabajos exponen encabezados `Link` de RFC 8288 que dirigen a los clientes a:

- un catálogo de linksets que describe los endpoints estructurados del CV;
- un índice de habilidades para agentes con un hash de contenido para sus instrucciones de consulta del CV;
- el sitemap XML.

El sitio también publica reglas para crawlers que distinguen entre indexación para buscadores, entrenamiento de modelos y uso de IA durante la recuperación. En conjunto, estos recursos permiten que un cliente pase de una página orientada a personas a documentación para máquinas y JSON estructurado sin tener que adivinar nombres de rutas.

`[Imagen: flujo de la solicitud desde la negociación de HTML o Markdown hasta los datos del CV y los recursos de descubrimiento]`

## Estado de la verificación

La implementación en el código fuente y el build local de producción se comportan como se describió, pero el entorno desplegado todavía no preserva la negociación de punta a punta. El dominio apex redirige a `www`; en ese host, una solicitud explícita de Markdown actualmente recibe HTML cacheado sin `Vary: Accept`. Los endpoints de descubrimiento están desplegados, pero los cuerpos de sus respuestas todavía anuncian el dominio `.com` obsoleto, y el sitemap desplegado todavía hace referencia a la ruta anterior `/portfolio`.

Por ese motivo, este caso de estudio sigue siendo un borrador y la reducción medida no se presenta como un resultado desplegado.

## Resultado

La implementación demuestra una forma acotada de mejora progresiva: una URL puede preservar su experiencia visual en el navegador y, al mismo tiempo, ofrecer una representación compacta a partir de los mismos datos subyacentes. También expuso una lección importante sobre sistemas: los encabezados correctos de la aplicación no son suficientes cuando un caché perimetral no varía según el encabezado de negociación.

Los próximos pasos son corregir el comportamiento del caché en producción y el dominio anunciado, reemplazar la búsqueda de subcadenas por un parseo correcto de `Accept` y luego extender la negociación a los casos de estudio basados en archivos sin crear una segunda fuente de verdad.
