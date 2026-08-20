---
slug: file-based-case-studies
translationKey: file-based-case-studies
locale: es
title: Diseñando un sistema de casos de estudio basado en archivos
description: Simplificar la publicación del portfolio usando Markdown, metadatos estructurados y un fallback bilingüe predecible.
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
featured: true
draft: false
---

## Contexto

Mi portfolio necesitaba explicar algo más que las pantallas terminadas. Un caso de estudio útil tiene que conservar cómo se entendió un problema, qué restricciones guiaron el trabajo, por qué se justificó una prueba de concepto y qué cambió cuando la primera solución se enfrentó con la realidad.

La primera propuesta usaba una base de datos con bloques de contenido fijos y varios niveles de acceso. Ese diseño podía sostener un panel de administración y enlaces privados, pero ninguna de esas cosas era necesaria para la primera versión.

## El problema

El sistema de publicación necesitaba suficiente estructura para que los proyectos fueran filtrables, sin obligar a que todas las historias siguieran la misma plantilla. También tenía que funcionar en inglés y español, permitiendo publicar un caso antes de que ambas traducciones estuvieran listas.

Estos requisitos compiten entre sí: los esquemas rígidos facilitan el filtrado, mientras que una narrativa extensa necesita flexibilidad.

## Opciones consideradas

### Registros de base de datos con bloques fijos

Hacían explícitos los metadatos y las reglas de acceso, pero agregaban hosting, migraciones, una interfaz de edición y trabajo operativo antes de que existiera el primer artículo.

### Markdown sin estructura

Markdown hacía que escribir fuera simple, pero no ofrecía campos confiables para filtros, tarjetas, traducciones o metadatos consistentes.

### Markdown con frontmatter validado

Nuxt Content ofreció el punto medio. Markdown contiene la narrativa y un esquema pequeño de frontmatter contiene la información que la aplicación necesita consultar.

## Decisión

Cada idioma se guarda como un documento Markdown separado. Las traducciones comparten una clave estable y el mismo slug público. Las tecnologías y las habilidades permanecen separadas: unas describen las herramientas utilizadas y las otras, las capacidades que demuestra el trabajo.

> Preferir el sistema de publicación más pequeño que proteja la calidad de la historia.

El inglés es el idioma de respaldo. Cuando falta el contenido en español, la interfaz lo comunica en lugar de mostrar el idioma equivocado silenciosamente. El control de idioma del artículo aparece solamente cuando existe una traducción disponible.

## Resultado

Agregar un caso de estudio ahora significa agregar un archivo Markdown. Agregar su traducción significa sumar otro archivo con la misma identidad. El filtrado y la selección de idioma funcionan desde metadatos validados, sin una base de datos ni una superficie de administración.

## Qué viene después

El acceso privado sigue siendo una posible segunda versión, no un requisito oculto dentro de la primera. Si aparecen casos sensibles, el modelo de acceso podrá diseñarse a partir de destinatarios, vencimientos y restricciones de despliegue reales.
