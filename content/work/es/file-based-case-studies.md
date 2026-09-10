---
slug: file-based-case-studies
translationKey: file-based-case-studies
locale: es
title: Casos de estudio publicados desde archivos
description: Cómo descarté una base de datos propuesta y publiqué el portfolio con Markdown, metadatos validados y un fallback bilingüe explícito.
project: Portfolio
organization: Personal
projectType: personal
sortOrder: 900
publishedAt: 2026-08-19
role: Arquitecto y desarrollador frontend
period: 2026
technologies:
  - Nuxt Content
  - Vue
  - TypeScript
  - Markdown
skills:
  - Arquitectura frontend
  - Diseño de contenido
  - Internacionalización
areas:
  - frontend
  - architecture
  - content
  - e2e
featured: true
draft: false
---

## Contexto

Mi portfolio necesitaba explicar algo más que las pantallas terminadas. Un caso de estudio útil cuenta cómo entendí el problema, qué restricciones guiaron el trabajo, por qué hice una prueba de concepto y qué cambié cuando la primera solución chocó con la realidad.

La primera propuesta usaba una base de datos con bloques de contenido fijos y varios niveles de acceso. Ese diseño podía sostener un panel de administración y enlaces privados, pero ninguna de esas cosas era necesaria para la primera versión.

## El problema

El sistema de publicación necesitaba suficiente estructura para que los proyectos fueran filtrables, sin obligar a que todas las historias siguieran la misma plantilla. También tenía que funcionar en inglés y español, permitiendo publicar un caso antes de que ambas traducciones estuvieran listas.

Los esquemas rígidos facilitan el filtrado, pero una historia extensa necesita flexibilidad.

## Opciones consideradas

### Registros de base de datos con bloques fijos

Esta opción hacía explícitos los metadatos y las reglas de acceso, pero exigía hosting, migraciones, una interfaz de edición y trabajo operativo antes de publicar el primer artículo.

### Markdown sin estructura

Markdown hacía que escribir fuera simple, pero no ofrecía campos confiables para filtros, tarjetas, traducciones o metadatos consistentes.

### Markdown con frontmatter validado

Nuxt Content resolvió ambas necesidades. Markdown contiene el relato y un esquema pequeño de frontmatter guarda la información que consulta la aplicación.

## Decisión

Cada idioma se guarda como un documento Markdown separado. Las traducciones comparten una clave estable y el mismo slug público. Las tecnologías y las habilidades permanecen separadas: unas enumeran las herramientas utilizadas y las otras describen las capacidades aplicadas en el trabajo.

> Preferir el sistema de publicación más pequeño que proteja la calidad de la historia.

El inglés es el idioma de respaldo. Cuando falta el contenido en español, la interfaz lo comunica en lugar de mostrar el idioma equivocado silenciosamente. El control de idioma del artículo aparece solamente cuando existe una traducción disponible.

## Resultado

Publicar un caso de estudio ahora requiere un archivo Markdown. Su traducción es otro archivo con la misma identidad. El filtrado y la selección de idioma funcionan con metadatos validados, sin una base de datos ni un panel de administración.

## Qué viene después

El acceso privado puede quedar para una segunda versión. Si aparecen casos sensibles, diseñaré el acceso según sus destinatarios, vencimientos y restricciones reales de despliegue.
