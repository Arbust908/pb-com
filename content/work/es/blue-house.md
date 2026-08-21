---
slug: blue-house
translationKey: blue-house
locale: es
title: Construyendo un servicio de datos sobre cotizaciones del dólar en Argentina
description: Cómo construí Blue House para recopilar cotizaciones actuales e históricas del dólar en Argentina, exponerlas mediante una API y facilitar la comprensión de sus variaciones.
project: Blue House
organization: Proyecto personal
projectType: personal
sortOrder: 70
role: Creador y desarrollador full stack
period: Julio - agosto de 2026
technologies:
  - Bun
  - TypeScript
  - PostgreSQL
  - Drizzle ORM
  - Zod
  - Nuxt
  - Vue
  - Tailwind CSS
  - Docker
skills:
  - Desarrollo de producto
  - Diseño de APIs
  - Ingeniería de datos
  - Arquitectura de sistemas
  - Desarrollo full stack
areas:
  - frontend
  - backend
  - architecture
  - data
  - product
  - e2e
featured: false
draft: false
---

## Resumen del proyecto

Blue House es un proyecto personal para recopilar, consultar y presentar cotizaciones del peso argentino frente al dólar estadounidense. Lo construí porque las fuentes disponibles no me ofrecían una única interfaz confiable tanto para las cotizaciones actuales como para las variaciones históricas. El MVP combina ingesta de datos actuales e históricos, almacenamiento en PostgreSQL, una API documentada y un panel responsive en Nuxt. Demuestra el recorrido completo del producto, pero todavía no la operación ni la adopción de un servicio público maduro.

## Por qué un mismo dólar tiene varias cotizaciones

En Argentina, preguntar por "la cotización del dólar" no alcanza. La cotización oficial convive con el dólar blue, o del mercado paralelo, y con alternativas como el dólar mayorista, los dólares financieros, el dólar cripto y el dólar tarjeta. Cada uno refleja una forma distinta de acceder a los dólares o de determinar su valor.

Para la mayoría de los visitantes, la primera comparación útil es entre el oficial y el blue. Las demás cotizaciones aportan contexto, pero darles a las siete el mismo peso visual haría que el producto fuera más difícil de recorrer. Por eso, Blue House trata la jerarquía del dominio como parte del producto en lugar de mostrar una tabla indiferenciada de números.

`[Imagen: las cotizaciones oficial y blue destacadas por delante de las otras cinco cotizaciones del dólar en Argentina]`

## El problema

Quería encontrar los últimos valores de compra y venta, entender las variaciones durante un período elegido y recuperar el valor disponible cerca de una fecha histórica. DolarAPI proporcionaba observaciones actuales para siete categorías de cotización, mientras que Ambito proporcionaba series históricas. Ninguna fuente cubría por sí sola el caso de uso completo, y sus payloads diferían en los nombres, las fechas, los formatos numéricos y en si una serie contenía valores separados de compra y venta.

Eso llevó al proyecto más allá de envolver un endpoint de terceros. Necesitaba normalizar dos proveedores sin borrar la procedencia de los datos, evitar que las tareas programadas duplicaran o corrompieran información, definir una semántica temporal que contemplara Buenos Aires y exponer el resultado mediante una interfaz que siguiera siendo útil en un teléfono.

## Exploración y prueba de concepto

Usé el primer corte vertical para probar si podía convertir los datos de los proveedores en una línea de tiempo coherente. El poller inicial obtenía observaciones en vivo, las validaba con Zod, generaba huellas digitales deterministas y las almacenaba en PostgreSQL. Después amplié un límite por vez:

- las importaciones históricas mensuales pusieron a prueba los números y las fechas localizados de Ambito, además de sus respuestas con estructuras desiguales;
- las migraciones SQL pusieron a prueba si el esquema podía evolucionar junto con el producto;
- el panel puso a prueba si el modelo permitía hacer comparaciones útiles;
- las rutas de la API y un explorador pusieron a prueba el acceso más allá del panel;
- el trabajo con contenedores ARM64 puso a prueba el despliegue en el entorno de destino.

Este enfoque expuso temprano los interrogantes operativos y sobre los datos, antes de que agregara cuentas, control de acceso o conceptos de monetización alrededor de un núcleo inestable.

## Definición de los límites del producto y del sistema

### Un proveedor o una capa interna de datos

Consultar DolarAPI directamente habría dado como resultado el producto más pequeño posible para cotizaciones actuales, pero no habría proporcionado el comportamiento histórico que necesitaba. En cambio, convertí PostgreSQL en la fuente interna de registro y conservé el proveedor en cada observación.

### Una aplicación o un workspace con varios paquetes

Separé la recopilación y la presentación en un workspace de Bun con un poller, una aplicación web en Nuxt y un paquete de dominio compartido. Esto mantuvo el trabajo con los proveedores fuera del recorrido de las solicitudes sin duplicar las definiciones de las cotizaciones entre servicios.

### Protecciones en la aplicación o coordinación respaldada por la base de datos

Un bloqueo en memoria protegería solamente un proceso. Los advisory locks de PostgreSQL coordinan las invocaciones del poller mediante la base de datos compartida. Las huellas digitales y la inserción segura ante conflictos hacen que los reintentos exactos sean idempotentes, mientras que los registros de ejecución conservan el estado y la cantidad de filas de cada intento.

## Arquitectura y flujo de datos

```text
DolarAPI: observaciones actuales ----+
                                     |
Ambito: datos históricos mensuales --+---> Poller en Bun
                                            |
                                            +-- Validación y normalización con Zod
                                            +-- Huellas SHA-256 que contemplan al proveedor
                                            +-- Advisory locks de PostgreSQL
                                            +-- Inserción transaccional y estado de ejecución
                                            |
                                            v
                                        PostgreSQL
                                            |
                                            v
                                     API Nuxt / Nitro
                                        |          |
                                        v          v
                                  Panel público    Documentación de la API
                                                   y probador de solicitudes
```

El poller tiene comandos y bloqueos separados para el trabajo en vivo y el histórico. El sondeo en vivo valida la respuesta completa antes de escribirla. El sondeo histórico procesa un mes calendario por categoría de cotización e invocación, usando la última ejecución exitosa como checkpoint. Esto mantiene acotadas las cargas retroactivas y permite reintentarlas, pero no demuestra que una base de datos desplegada contenga el historial completo hasta el límite admitido de enero de 2002.

Cada observación registra su proveedor, categoría, timestamp de origen, valores de compra y venta, y huella digital. PostgreSQL usa valores `numeric(14,4)` de escala fija, y las respuestas de cotizaciones actuales los conservan como strings decimales. Como la huella incluye el proveedor, el timestamp y los valores, los reintentos exactos se ignoran, mientras que las observaciones corregidas todavía pueden almacenarse.

La inserción de observaciones y la finalización exitosa de la ejecución comparten una transacción. Si alguna falla, ambas se revierten y la ejecución se marca como fallida por separado. Los tests unitarios cubren la estructura de la transacción; los tests de rollback y contención de bloqueos con PostgreSQL real siguen siendo parte de la verificación del despliegue.

## Conversión de las observaciones en una API

El backend en Nitro separa la validación HTTP, las consultas al repositorio y los cálculos del servicio. Sus endpoints implementados cubren:

- las últimas cotizaciones para todas las categorías o para una sola;
- el historial crudo o agrupado por día de Buenos Aires;
- la variación durante períodos que van desde 24 horas hasta un año;
- la comparación y la brecha con respecto a la cotización oficial;
- la conversión individual y por lotes de montos en pesos con fecha a dólares.

Los límites expresados solo como fecha y los grupos diarios usan `America/Argentina/Buenos_Aires` en lugar de días UTC. La conversión histórica primero busca la última observación disponible hasta el momento solicitado. Si no existe ninguna ese día, busca en días cercanos e informa si usó un valor anterior, uno posterior o el promedio simple de ambos. La respuesta incluye las observaciones de origen, lo que permite inspeccionar la estimación en vez de presentarla como una cotización autoritativa.

También construí documentación navegable y un probador de endpoints que genera ejemplos y muestra el estado, la duración y las respuestas formateadas. Esto convirtió el comportamiento de la API en parte del producto, en lugar de dejarlo como conocimiento contenido únicamente en el código fuente.

`[Imagen: documentación interactiva de la API con una solicitud y una respuesta formateada]`

## Diseño de la vista pública

El panel sigue una dirección serena de "boletín cambiario". Las cotizaciones oficial y blue ocupan las tarjetas más grandes, mientras que las otras cinco categorías forman un grupo secundario. Un gráfico con siete series muestra la evolución durante períodos seleccionables, y la vigencia de los datos permanece visible sin imitar una terminal de trading.

Los proveedores no actualizan todas las cotizaciones al mismo tiempo, así que el gráfico combina todos los timestamps de las observaciones y arrastra hacia adelante el último valor conocido de cada categoría. La vista de 24 horas usa observaciones crudas; los períodos más largos usan la observación final de cada día de Buenos Aires.

La interfaz incluye temas claro y oscuro persistentes, cifras tabulares, layouts responsive, un tratamiento visible del foco y soporte para movimiento reducido. Estas medidas están implementadas, pero todavía hacen falta auditorías de teclado, contraste, dispositivos móviles y tecnologías de asistencia antes de afirmar que cumple con WCAG.

`[Imagen: panel de Blue House en layouts de escritorio y móvil, incluidos los temas claro y oscuro]`

## Resultado y estado actual

Blue House ahora tiene un MVP funcional de punta a punta:

- un workspace de Bun con varios paquetes, compartido por el poller y la aplicación web;
- ingesta de datos actuales e históricos incrementales desde dos proveedores;
- observaciones validadas en PostgreSQL, con procedencia preservada y sin duplicados;
- seguimiento de ejecuciones del poller, advisory locks y finalización transaccional exitosa;
- APIs de cotizaciones actuales, historial, variación, comparación y conversión;
- un panel responsive y documentación interactiva de la API;
- Dockerfiles de varias etapas para el poller y el panel, además de una compilación exitosa de la imagen web para ARM64 y un disparador de despliegue.

Los tests unitarios cubren la validación de proveedores, las huellas digitales, los rangos históricos y las zonas horarias, los cálculos del servicio, el fallback de conversión, la validación de solicitudes y las líneas de tiempo de los gráficos. Todavía no se verificaron el estado actual del despliegue, el funcionamiento del scheduler, la cobertura histórica completa, la recuperación de backups, la concurrencia con una base de datos real, el uso, la latencia ni la adopción. El despliegue se dispara manualmente en lugar de ser continuo, y el último despliegue web demostrado no contiene los cambios más recientes del poller.

## Qué cambió

Al principio, el proyecto llegó a incluir detección de anomalías. Los datos disponibles no permitían distinguir de manera confiable un error de una actualización demorada o de un movimiento legítimo del mercado, así que eliminé la funcionalidad y simplifiqué el modelo de timestamps en lugar de exponer una señal débil como si fuera un análisis confiable.

La ingesta histórica también pasó de una carga retroactiva implícita de una sola vez a checkpoints mensuales. Las ejecuciones más pequeñas hicieron que las fallas fueran observables y que se pudieran reintentar.

Estos cambios aclararon el MVP: primero preservar y explicar los datos de origen; agregar interpretación solamente cuando su comportamiento pueda validarse.

## Reflexión y próximos pasos

Blue House me enseñó cómo encajan los límites de un producto de datos pequeño: adaptadores de proveedores, migraciones de base de datos, semántica de tareas programadas, cálculos del servicio, compilaciones de contenedores, documentación de la API y un sistema visual específico del dominio.

El próximo paso es obtener evidencia operativa, no ampliar la superficie: migraciones repetibles, tests de deduplicación y rollback con una base de datos real, compilación de ambos contenedores, verificaciones del scheduler y de backups, y mediciones de vigencia y confiabilidad en el despliegue.

Exploré alternativas de caché respaldado por Redis, colas, límites de solicitudes, cuentas, claves de API, webhooks y posibles niveles de servicio. Ninguna está publicada. Solo serán útiles cuando el tráfico y las necesidades de los consumidores muestren dónde el caché, la entrega asincrónica o el control de acceso resuelven un problema observado.

Este caso de estudio seguirá siendo un borrador hasta que se completen la evidencia del despliegue, la cobertura histórica, la accesibilidad y la evidencia de resultados.
