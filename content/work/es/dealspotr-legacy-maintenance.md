---
slug: dealspotr-legacy-maintenance
translationKey: dealspotr-legacy-maintenance
locale: es
title: Manteniendo productivo a Dealspotr
description: Cómo lideré la evolución incremental de un producto legado en PHP y jQuery mientras protegía su circuito consolidado de usuarios y afiliados.
project: Dealspotr
organization: Dealspotr · Demand.io
projectType: professional
sortOrder: 50
role: Responsable técnico e implementador principal
period: "2024 - 2025"
technologies:
  - PHP
  - jQuery
  - JavaScript
  - MySQL
  - Google Analytics
  - Nginx
  - Kubernetes
  - JSON-LD
skills:
  - Modernización de sistemas legados
  - Gestión de riesgos
  - Entrega incremental
  - Analítica de producto
  - Liderazgo técnico
areas:
  - frontend
  - backend
  - architecture
  - legacy
  - e2e
featured: false
draft: false
---

## Un producto maduro que todavía generaba valor

Dealspotr era una comunidad consolidada de cupones cuyas páginas de comercios ayudaban a los compradores a encontrar y usar promociones. Esas páginas también eran una parte clave de nuestra estrategia de monetización: gestionaban la revelación de códigos, registraban interacciones y visitas salientes a los comercios, y contenían ofertas que generaban comisiones.

Para ese momento, gran parte de la aplicación tenía casi ocho años. Estaba renderizada principalmente en el servidor con PHP, y jQuery se encargaba de las interacciones del lado del cliente. Años de decisiones de producto estaban incorporados en los templates, el estado compartido, el orden de las promociones y el comportamiento específico de cada tarjeta.

Lideré el esfuerzo para mantener este sistema útil y productivo. El objetivo no era disfrazarlo de software greenfield. Era entregar los cambios que el negocio necesitaba sin convertir cada pedido en otro parche que dificultara el trabajo del siguiente ingeniero.

## Un control simple sobre años de supuestos

Agregar filtros y ordenamiento de promociones es un ejemplo representativo. El pedido parecía acotado: permitir que los compradores limitaran el feed a códigos de cupón, ofertas o promociones para todo el sitio, y luego lo ordenaran por Mejores, Más recientes o Usadas por última vez.

El feed no era una lista convencional. Mezclaba promociones comunes con ubicaciones preferenciales, códigos de revendedores y newsletters, ofertas no verificadas, promociones de competidores, financiación, liquidaciones, descuentos para audiencias específicas y anuncios propios. Esas tarjetas no compartían una única estructura de datos completa, y su posición afectaba el texto, la revelación, la votación, el modal, la analítica y el comportamiento de salida.

Por lo tanto, un filtro del lado del cliente podía ocultar las ofertas equivocadas, anular un ranking cuidadosamente seleccionado, duplicar el comportamiento de los clics o romper la acción que hacía valiosa una promoción.

## Mapeo de las reglas invisibles

Antes de cambiar la interfaz, rastreé el recorrido completo desde la preparación de promociones en el servidor hasta el renderizado de tarjetas y la mejora progresiva con jQuery. El modelo de dominio útil era implícito: la vigencia, el tipo, la ubicación, la prioridad comercial y el comportamiento de fallback de una promoción surgían a lo largo de varias etapas, en vez de provenir de un único objeto autoritativo.

```text
Antes

base de datos y caché
  -> preparar grupos de promociones del comercio
  -> intercalar tarjetas y módulos comerciales
  -> renderizar distintas variantes de tarjetas
  -> asociar interacciones directas con jQuery

Después

base de datos y caché
  -> preparar un conjunto más amplio de candidatos
  -> preservar las reglas de ubicación existentes
  -> normalizar los metadatos de las tarjetas
  -> filtrar y ordenar en el navegador
  -> gestionar las interacciones mediante elementos padre estables
```

Esa investigación estableció tres reglas para el cambio:

- El feed inicial debía conservar el comportamiento de ubicación y ranking seleccionado por el servidor.
- Ambas familias de tarjetas debían seguir siendo la fuente de sus valores visibles y específicos de cada interacción.
- Reordenar una tarjeta no podía cambiar el texto, la revelación, la votación, el modal, la analítica ni el comportamiento de salida.

Con una cobertura automatizada limitada para estas interacciones, la exposición por etapas, la analítica y el seguimiento en producción también debían formar parte del modelo de seguridad.

## Creación de un punto de separación en lugar de otro parche

Un parche directo dentro de la página existente habría sido lo más rápido, pero habría profundizado el acoplamiento. Reemplazar el feed con un frontend moderno habría creado el problema opuesto: demasiado riesgo antes de entregar algún valor.

Elegí un camino intermedio. Extrajimos la densa grilla de promociones a un límite específico, preservando sus condiciones de ordenamiento y sus renderizadores de tarjetas existentes. El servidor siguió decidiendo qué ofertas existían y cómo se presentaban; jQuery mejoraba progresivamente el conjunto renderizado.

En el límite de las tarjetas, introduje un contrato de metadatos compartido para el tipo de promoción, el descuento, la fecha de creación, la fecha del último uso, el estado de alcance a todo el sitio y la vigencia. Esto le dio al navegador un único lenguaje coherente sin obligar a reescribir de inmediato cada fuente legada de promociones.

## Mover tarjetas sin romper sus acciones

El filtrado seleccionaba y reordenaba elementos que ya estaban renderizados. Mover esas tarjetas expuso supuestos en los handlers directos de clic, así que los comportamientos clave pasaron a usar delegación de eventos mediante elementos padre estables.

La primera versión no resolvió todas las interacciones. El trabajo posterior corrigió la gestión de clics, el filtrado, los límites de visualización y el ranking predeterminado. Coordiné ese refuerzo con el equipo para que el estado intacto Todas + Mejores siguiera respetando el orden seleccionado por el servidor.

Esa iteración es central para la historia. Mantener un producto antiguo significa hacerse cargo de lo que enseña la producción, no tratar el primer merge como la línea de llegada.

## De la exposición controlada al uso cotidiano

Los controles comenzaron detrás de cohortes ponderadas. Adjuntamos el contexto del experimento a la analítica, agregamos overrides para realizar pruebas reproducibles y aumentamos gradualmente la exposición antes de habilitar la experiencia para todo el público.

Esto limitó el alcance inicial de posibles daños y nos dio una forma de observar el comportamiento mientras corregíamos supuestos. Por sí solo, no demuestra una mejora en la conversión, así que considero la disponibilidad general como un resultado de entrega y no como un experimento exitoso.

## Un límite que siguió dando resultados

La extracción resultó útil más allá del filtrado. En 2025, reutilicé el mismo límite de renderizado para recopilar datos de promociones destinados a datos estructurados Offer y WebPage. Los valores existentes específicos de cada tarjeta podían alimentar una salida legible por máquinas sin crear otra interpretación independiente de cada promoción.

Apliqué el mismo principio incremental en la capa de infraestructura. Una allowlist selectiva de Nginx trasladó un grupo definido de rutas de comercios a SimplyCodes, mientras que el resto siguió pasando por Dealspotr. Después, el equipo alineó los enlaces internos y amplió la migración con el tiempo. Podíamos mover el tráfico deliberadamente sin exigir un reemplazo completo de una sola vez.

## Manteniendo modificable a Dealspotr

Los compradores obtuvieron una forma disponible para todo el público de limitar y reordenar un feed mixto de promociones. El resultado a más largo plazo fue un conjunto de límites más claros alrededor de una de las áreas más complejas de la página:

- La lógica de ubicación quedó aislada de la página principal del comercio.
- Los distintos tipos de tarjetas compartían un contrato para el comportamiento del lado del cliente.
- Las interacciones dinámicas dejaron de depender por completo de la ubicación inicial en el DOM.
- Los datos estructurados podían reutilizar la información procesada de las promociones.
- Parte del tráfico podía migrarse mientras la aplicación legada seguía en línea.

No conservo informes que respalden una afirmación cuantificada sobre ingresos, tráfico o SEO. El resultado defendible es más simple: un canal consolidado de usuarios y monetización siguió recibiendo trabajo de producto sin esperar una reescritura.

## Deuda mantenida a propósito

El sistema siguió siendo PHP procedural y jQuery. El estado compartido, los registros legados inconsistentes, los fallbacks específicos de cada tarjeta y la cobertura automatizada limitada todavía hacían que los cambios fueran costosos. Algunos comportamientos en producción requirieron correcciones posteriores, y los recorridos de datos estructurados y redirecciones se beneficiarían de una validación conservada más sólida.

Me detuve antes de hacer una limpieza general porque una refactorización no relacionada habría aumentado el riesgo sin mejorar el resultado inmediato. La siguiente inversión valiosa sería agregar cobertura de caracterización para combinaciones representativas de tarjetas y acciones críticas, y luego trasladar la normalización de promociones a un modelo explícito del lado del servidor.

## Cuidado antes que reinvención

Liderar sistemas legados muchas veces implica resistir la reescritura que uno disfrutaría construir. Dealspotr era antiguo, pero todavía servía a los usuarios y sostenía al negocio. Su antigüedad hacía que entender y preservar su comportamiento fuera más importante, no menos.

Mi función era mantenerlo productivo: descubrir reglas implícitas, elegir el límite útil más pequeño, coordinar la entrega incremental y volver cuando la producción expusiera supuestos que habíamos pasado por alto. El sistema no se modernizó de una sola vez, pero siguió siendo útil y se volvió más fácil de modificar donde el negocio más lo necesitaba.
