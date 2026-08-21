---
slug: simplycodes-ab-testing
translationKey: simplycodes-ab-testing
locale: es
title: Construyendo un motor basado en datos
description: Cómo hicimos medibles los experimentos de producto a través de analytics, renderizado en el servidor, hidratación y caché de páginas con variantes.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 10
role: Líder full-stack
period: Noviembre de 2025
technologies:
  - Nuxt
  - TypeScript
  - Nitro
  - Redis
  - GTM
  - GA4
skills:
  - Infraestructura de experimentación
  - Analítica de producto
  - Arquitectura SSR
  - Liderazgo técnico
areas:
  - frontend
  - architecture
  - data
  - product
  - e2e
featured: true
draft: false
---

## Contexto

El equipo de SimplyCodes quería que las decisiones de producto surgieran del comportamiento de los usuarios en lugar de la intuición. Los tests A/B también podían ofrecernos una manera neutral de resolver opiniones de producto contrapuestas: definir el comportamiento esperado, exponer grupos comparables a un cambio controlado y usar el resultado para decidir qué se publicaba.

La oportunidad inmediata era Peelie, la interacción usada para revelar un código de cupón en las páginas de comercios. Nuestra hipótesis era que un slider más claro y deliberado aumentaría la interacción significativa y reduciría las revelaciones accidentales. La tasa de copia de cupones era la métrica principal, pero la prominencia de la interacción también hacía riesgoso un experimento poco confiable. Como líder full-stack, lideré el equipo que construyó el camino de entrega y medición necesario para probarlo de manera segura.

## El primer experimento

Empezamos con un módulo externo de split testing para Nuxt. El primer test de Peelie usó una asignación ponderada para preservar la interfaz existente para la mayoría de los visitantes y enviar grupos más pequeños a los tratamientos “Unlock” y “Show Code”. Conectamos la variante seleccionada con las impresiones de cupones y las interacciones de copia, y luego pusimos el identificador del experimento a disposición del pipeline de analytics más amplio.

Esa implementación nos dio una forma rápida de probar la UI y la instrumentación, pero no nos dio suficiente control sobre la asignación dentro de nuestra arquitectura de producción. Las páginas de comercios se renderizaban en el servidor y su HTML se almacenaba en caché. Una variante seleccionada solo en el navegador podía no coincidir con la respuesta del servidor, cambiar durante la hidratación o heredar marcado generado para otro grupo.

Revertimos el tratamiento en lugar de recopilar datos de un experimento cuyo camino de entrega no nos resultaba confiable.

## Validar la medición antes que el tratamiento

La reversión cambió la siguiente pregunta. Antes de preguntar si una nueva interacción con cupones funcionaba mejor, necesitábamos saber si la asignación y analytics funcionaban correctamente cuando la experiencia visible no cambiaba.

Introdujimos grupos ocultos al estilo A/A y enviamos su asignación mediante los mismos eventos de analytics planificados para el tratamiento. Este trabajo expuso defectos de instrumentación, incluida la selección de eventos y el nombre exacto del campo `test_variant`. Corregir esos problemas antes de evaluar la UI evitó que problemas de reporting se convirtieran en conclusiones de producto.

El paso A/A confirmó que el contexto del experimento llegaba a analytics. También estableció una práctica de equipo: validar el camino de medición antes de confiar en las diferencias entre tratamientos.

## Requisitos expuestos por el prototipo

La primera implementación convirtió un experimento de UI en un problema de sistemas. Una herramienta confiable necesitaba ofrecer:

- asignación ponderada para despliegues controlados;
- una asignación estable que persistiera entre solicitudes;
- validación cuando regresara una cookie de variante anterior o inválida;
- asignación lo suficientemente temprana como para participar del renderizado en el servidor;
- la misma variante durante la hidratación y la navegación en el cliente;
- contexto del experimento en los eventos de analytics;
- segmentación por rutas para que un test se ejecutara solo donde correspondía;
- una partición del caché HTML por variante.

Reemplazamos la dependencia por una pequeña implementación local en TypeScript para que esas reglas fueran explícitas y verificables dentro de la aplicación.

## La restricción del caché de páginas

El caché fue el requisito que más cambió la arquitectura.

Las páginas de comercios usaban Nitro y Redis para cachear HTML renderizado en el servidor. Sin un caché que contemplara las variantes, la primera respuesta renderizada para una URL podía convertirse en la respuesta compartida por todos los visitantes de esa página. Un visitante asignado al control podía recibir el marcado de un tratamiento, o la asignación de analytics podía no coincidir con la interfaz que efectivamente se había mostrado. Cualquiera de los dos resultados perjudicaría la experiencia y los datos del experimento.

Variar el caché según el encabezado `Cookie` completo aislaría las respuestas, pero también generaría una fragmentación excesiva del caché porque las cookies no relacionadas producirían nuevas entradas. Iteramos desde una variación amplia por cookies, pasando por un encabezado dedicado a la variante, hasta una cookie específica del test llamada `peelie-a-b`. Esto le dio a cada variante del experimento su propia partición del caché de páginas, sin darle a cada cookie no relacionada una copia separada de la página.

```text
Solicitud
  -> leer la cookie peelie-a-b
  -> seleccionar la partición de caché de la variante
  -> asignar una variante ponderada cuando la cookie está ausente o es inválida
  -> guardar la asignación en el estado del servidor de Nuxt
  -> renderizar HTML específico de la variante
  -> hidratar con la misma asignación
  -> adjuntar test_variant a los eventos de analytics
```

## Arquitectura e implementación

Una configuración centralizada definía el nombre, la cookie, las rutas, las variantes y los pesos de cada experimento. El middleware de rutas del lado del servidor verificaba esa configuración antes de renderizar una página coincidente.

Para un visitante recurrente, el middleware validaba y reutilizaba la variante persistida. Para un visitante nuevo, combinaba la identidad disponible de analytics con un valor aleatorio de respaldo, seleccionaba una variante a partir de pesos acumulados y escribía el resultado en una cookie de 30 días. La persistencia, más que la semilla inicial por sí sola, mantenía estables las solicitudes posteriores.

El middleware también escribía el nombre seleccionado en `useState` de Nuxt. De esta manera, el composable de split testing podía renderizar el tratamiento correcto durante SSR y reutilizar el estado serializado durante la hidratación. En el cliente, el composable leía la misma cookie para la navegación posterior. El store de la aplicación exponía la variante formateada a la capa de datos de GTM para que los eventos de GA4 pudieran interpretarse en el contexto de la interfaz mostrada.

Los tests cubrían límites ponderados, asignaciones desiguales, cookies de analytics ausentes, semillas de respaldo, variantes persistidas válidas e inválidas, coincidencia de rutas y estructura de la configuración. El objetivo no era probar resultados aleatorios; era proteger las invariantes que hacían significativos los datos resultantes.

## Peelie como piloto

El piloto local usó cuatro grupos con el mismo peso: dos controles y dos tratamientos con slider, uno que conservaba el logo del comercio y otro que simplificaba la presentación en dispositivos móviles. Los controles duplicados nos daban otra comparación de referencia, mientras que los tratamientos probaban si un gesto más explícito producía una interacción con cupones más clara y con mayor intención.

Refinamos los tratamientos en desktop y mobile sin cambiar el contrato de asignación subyacente. En paralelo, otro ingeniero del equipo usó split testing mientras desarrollaba PostClick V2, agregando contexto de variante a sus eventos de impresión, copia y voto. Ese trabajo siguió un camino de implementación separado, pero reforzó que la experimentación se estaba convirtiendo en una capacidad del equipo en lugar de ser el caso especial de un componente.

## Resultado

El control obtuvo una victoria estadísticamente significativa en la tasa de copia de cupones, por lo que eliminamos los tratamientos de Peelie y conservamos la interacción existente. Fue una decisión de producto exitosa: el propósito de la experimentación no era justificar la publicación de un rediseño, sino hacer que tanto cambiar como conservar la experiencia pudiera defenderse con evidencia.

El resultado reutilizable fue la propia capacidad de testing. El equipo tenía un camino explícito desde la hipótesis hasta la entrega ponderada, la validación de analytics, el renderizado consistente con SSR, el caché que contemplaba las variantes y la limpieza posterior a una decisión. Los experimentos ahora podían aportar datos de comportamiento a los desacuerdos, en lugar de hacer que una opinión ganara por defecto.

```text
Pregunta de producto
  -> hipótesis
  -> verificación de instrumentación A/A
  -> tratamiento controlado
  -> evidencia de GTM y GA4
  -> conservar, promover, revisar o eliminar
```

## Qué no funcionó

La implementación inicial más rápida no era adecuada para el sistema que tenía que alojarla. El módulo externo nos ayudó a crear un prototipo, pero su abstracción no contemplaba el nivel de control de SSR y caché que requerían nuestras páginas de comercios.

Nuestra primera instrumentación tampoco estaba lista para respaldar una decisión. Las correcciones de eventos y nombres de campos detectadas durante la validación A/A demostraron por qué analytics debe probarse como parte del camino del producto, en lugar de tratarse como una tarea de reporting posterior al lanzamiento.

Por último, variar el HTML cacheado según cada cookie era técnicamente simple, pero operativamente ineficiente. Limitar la identidad del caché a la variante del experimento preservó tanto el aislamiento de la asignación como el valor del caché de páginas.

## Reflexión

Trabajar basándose en datos empieza antes de leer un dashboard. Si la asignación cambia entre los límites de renderizado, las páginas cacheadas mezclan tratamientos o los eventos de exposición describen una interfaz diferente de la que vio el visitante, una mayor cantidad de datos solo genera más confianza en una conclusión equivocada.

Por lo tanto, el resultado más importante del experimento de Peelie fue más amplio que el control ganador. Le dio al equipo una forma repetible de convertir un desacuerdo de producto en una pregunta verificable, comprobar el sistema de medición y aceptar la respuesta incluso cuando esa respuesta era conservar lo que ya teníamos.
