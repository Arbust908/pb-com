---
slug: fym
translationKey: fym
locale: es
title: Manteniendo útil a FYM mientras planifico su reemplazo
description: Cómo asumí la responsabilidad de un sistema para un consultorio odontológico con una década de antigüedad, estabilicé su entrega, incorporé el borrado recuperable y diseñé un camino de menor riesgo hacia su reemplazo
project: FYM
organization: Consultorio odontológico
projectType: professional
sortOrder: 80
role: Responsable de mantenimiento de la aplicación legada y líder de modernización
period: 2025 - actualidad
technologies:
  - Symfony 2.8
  - PHP
  - PostgreSQL 11
  - Doctrine
  - Twig
  - GitHub Actions
  - Hono
  - Nuxt
skills:
  - Modernización de sistemas legados
  - Diseño del ciclo de vida de los datos
  - Ingeniería de despliegue
  - Diseño de interfaces
  - Arquitectura de migración
areas:
  - frontend
  - backend
  - architecture
  - data
  - legacy
featured: false
draft: false
---

## Recibir FYM

FYM es el sistema operativo de un consultorio odontológico. Conecta fichas de pacientes, turnos, historias clínicas, odontogramas, radiografías, planes de tratamiento, trabajos de laboratorio, facturación y acceso del personal. Cuando lo recibí de su desarrollador anterior, la aplicación se había mantenido prácticamente estática durante cerca de diez años, pero la empresa todavía dependía de ella para el trabajo diario.

Funcionaba con Symfony 2.8, Doctrine 2, Twig, AdminLTE 2, Bower y Assetic, con un árbol de dependencias administrado manualmente y PostgreSQL 11. Los paquetes no podían actualizarse de manera segura, las actualizaciones automáticas del esquema estaban prohibidas, y las imágenes clínicas y los registros financieros hacían que cualquier pérdida de datos fuera inaceptable.

Mi responsabilidad tenía dos horizontes: mantener la aplicación existente confiable y útil en el presente, mientras creaba una ruta incremental para salir de un stack que ya no podía actualizarse de manera convencional.

## Reconstrucción de la entrega

La primera tarea fue trasladar FYM a una nueva configuración de servidor sin interrumpir el funcionamiento del consultorio. Reconstruí cómo se ejecutaba la aplicación, preservé sus dependencias congeladas y configuré PHP, Nginx, PostgreSQL, permisos, comportamiento del caché y generación de assets.

Después establecí un proceso de despliegue con GitHub Actions adaptado a la estructura de consola de Symfony 2, la gestión manual del caché, los permisos del sistema de archivos y el comportamiento de PHP y OPcache en el servidor. Esto reemplazó un estado de servidor no documentado por un proceso repetible orientado a producción. Todavía necesito recuperar los logs de la transición original y de la transferencia de la base de datos antes de presentar la migración completa como verificada de manera independiente.

Esto estableció la regla para todo lo que siguió: FYM podía mejorarse, pero cada cambio debía preservar la continuidad clínica y administrativa.

## El borrado recuperable como cambio del sistema

El ejemplo más contundente fue el borrado de pacientes. Un borrado destructivo era demasiado riesgoso para un registro conectado con turnos, antecedentes de atención, tratamientos, pagos e imágenes. Ocultar a un paciente en una sola pantalla tampoco alcanzaba; el mismo paciente podía reaparecer en búsquedas, calendarios, informes o registros relacionados.

Incorporé un ciclo de vida recuperable para los registros de pacientes:

- timestamps de borrado y recuperación;
- el miembro del personal responsable de cada acción;
- acciones restringidas de borrado y recuperación;
- una vista separada para pacientes eliminados;
- interfaces de confirmación y recuperación;
- casos de tests funcionales que cubrían el ciclo de vida previsto.

La funcionalidad inicial expuso cuán transversal era realmente el borrado. El trabajo posterior agregó SQL de migración compatible con PostgreSQL, registró el filtro de borrado lógico de Doctrine, eliminó a los pacientes borrados de los listados comunes y corrigió conteos, búsquedas, paginación y consultas de registros de atención.

Más adelante propagué el mismo límite a los selectores de profesionales, la gestión de usuarios y el catálogo de tratamientos. Fue menos un botón para borrar que una definición gradual de qué significaba que un registro estuviera "activo" en toda la aplicación.

```text
Solicitud de borrado
       |
       v
registro marcado como borrado + responsable/momento conservados
       |
       +----> las consultas comunes lo excluyen
       |
       +----> los turnos y las vistas de atención relacionados toleran su ausencia
       |
       +----> la vista restringida de recuperación puede restaurarlo
```

## Mejora del uso diario

Una vez que el despliegue y el comportamiento del ciclo de vida de los registros fueron más seguros, trabajé sobre problemas más pequeños que afectaban el uso cotidiano del sistema de la empresa.

- Las pantallas de pacientes, tratamientos, laboratorio, inicio de sesión, perfil y gestión de usuarios recibieron acciones más claras, tablas y formularios más coherentes, y mejoras de presentación responsive.
- Las vistas de turnos y los feeds de eventos se reforzaron frente a pacientes borrados o faltantes.
- Se corrigieron la presentación de moneda argentina, el parseo de entradas y la precisión de los valores financieros.
- La carga de turnos sin límites se reemplazó por consultas por rango de fechas que coincidían con el intervalo visible del calendario.

Estos cambios evitan modos de falla conocidos y expresan con mayor claridad los flujos de trabajo diarios. Harían falta estudios de usabilidad, conciliación contable y mediciones de rendimiento antes de afirmar un efecto cuantificado.

## Elección de una migración incremental

Había tres opciones generales:

1. Seguir aplicando parches indefinidamente. Esto protegía la continuidad a corto plazo, pero dejaba al consultorio con dependencias congeladas y conocimiento específico del servidor.
2. Reescribirlo y reemplazarlo de una sola vez. Esto ofrecía un destino limpio, pero acoplaba el rediseño del producto, la migración de datos, la transferencia de imágenes, la paridad de flujos de trabajo y el reemplazo de infraestructura en un solo evento de alto riesgo.
3. Separar la salida de datos del reemplazo del producto. Estabilizar la aplicación legada, exponer un límite de migración de solo lectura, verificar las copias de manera independiente y reemplazar los flujos de trabajo en incrementos controlados.

Elegí la tercera dirección. El stack final todavía no está definido de manera intencional. Primero necesito un inventario de datos confiable, un proceso de copia repetible y evidencia sobre qué flujos de trabajo deben preservarse. Esto evita que la elección de un framework se convierta en la estrategia de migración.

## Prueba del límite de migración

Para poner a prueba ese límite, construí un prototipo local junto al repositorio legado. Un servicio independiente en TypeScript usa Hono y un esquema de PostgreSQL obtenido por introspección para brindar acceso autenticado y de solo lectura a 29 entidades legadas. Una capa de serialización traduce los nombres de la base de datos en español a nombres de API en inglés sin modificar FYM.

El prototipo también hace un inventario de los archivos subidos de pacientes y devuelve los archivos de imagen originales. Un explorador en Nuxt permite inspeccionar los conteos de entidades, campos, relaciones y registros paginados, mientras mantiene la credencial de la API en el servidor.

```text
FYM legado
Symfony 2.8 + PostgreSQL + imágenes de pacientes
               |
               | acceso autenticado de solo lectura
               v
Prototipo de API de migración
Hono + traducción de campos + inventario de imágenes
               |
               v
Interfaz de inspección en Nuxt
esquema, relaciones, conteos, registros de muestra
               |
               v
Futuros flujos de copia verificada y reemplazo
stack de destino todavía por determinar
```

Esto resuelve una incertidumbre arquitectónica: los datos de FYM pueden inspeccionarse mediante un límite separado sin cambiar la aplicación ni el esquema de producción. Todavía no demuestra una migración segura. Quedan pendientes los tests de contrato, una gestión de imágenes más segura, checksums, un seguimiento confiable de actualizaciones, el despliegue y una copia sanitizada de punta a punta.

La interfaz de backup planificada y el receptor de sincronización con SQLite son solamente trabajo de diseño. No se entregó ninguna GUI de backup, receptor, aplicación clínica de reemplazo ni cambio a producción mediante este workspace de modernización.

## Estado actual del trabajo

### Entrega de la aplicación legada

**Trabajo:** Compatibilidad del servidor y despliegue repetible. **Evidencia:** Incluido en commits, publicado en el repositorio remoto y respaldado por ejecuciones exitosas de automatización orientadas a producción.

### Ciclo de vida de los registros y flujos de trabajo diarios

**Trabajo:** Borrado recuperable, filtrado de registros activos, mejoras de interfaz, correcciones financieras, arreglos de turnos y consultas acotadas del calendario. **Evidencia:** Incluido en commits y publicado en el repositorio remoto; todavía es necesario verificar el uso en producción y los resultados medidos.

### Límite de migración

**Trabajo:** API Hono de solo lectura, traducción de campos, inventario de imágenes e interfaz de inspección en Nuxt. **Evidencia:** Implementado como prototipo local sin commit; no fue entregado ni desplegado.

### Migración futura

**Trabajo:** Interfaz de backup, receptor de sincronización, aplicación de reemplazo y cambio definitivo. **Evidencia:** Solamente planes de arquitectura; no se afirma que ninguno esté construido ni completo.

## Continuidad ahora, reemplazo después

FYM ahora tiene un proceso de despliegue repetible, semántica de borrado recuperable, una gestión más segura de registros inactivos, consultas acotadas de turnos e interfaces más claras. En paralelo, el prototipo demuestra una forma de inspeccionar datos legados sin convertir a la aplicación antigua en la base de cada decisión futura.

El valor está en reducir el riesgo por etapas en lugar de ocultarlo detrás del anuncio de una reescritura. La empresa puede seguir usando FYM mientras el camino de migración se pone a prueba con sus datos reales y sus restricciones operativas.

## Qué expuso el trabajo

La primera implementación de borrado lógico no fue la definitiva. Su SQL original usaba sintaxis específica de MySQL aunque FYM funcionaba con PostgreSQL, y al principio el filtrado no se aplicaba en todas partes. Cada flujo de trabajo relacionado expuso otra vía por la que los datos inactivos podían regresar.

El prototipo expuso brechas similares: el esquema generado tiene 29 entidades mientras que los planes anteriores describen 30, varios campos de sincronización propuestos no pueden capturar todas las actualizaciones, y la transferencia de imágenes necesita una validación de rutas y streaming más sólidos.

Estos hallazgos reforzaron el enfoque de migración: usar prototipos para exponer incógnitas, pero no confundir una arquitectura plausible con una transferencia verificada.

## Próximos pasos

FYM demuestra sobre todo el cuidado de un sistema bajo restricciones. El desafío de ingeniería no era simplemente escribir código más nuevo; era aprender dónde un sistema antiguo codificaba las reglas operativas reales del consultorio, mejorar esas reglas sin perder datos y crear puntos de separación a través de los cuales el sistema finalmente pueda reemplazarse.

La próxima decisión no es simplemente "¿qué framework debería reemplazar a Symfony?". Es determinar si el límite de migración puede producir una copia completa, repetible y verificable de manera independiente. Solo entonces deberían definirse el stack de reemplazo y el cambio flujo por flujo.

Este caso de estudio seguirá siendo un borrador hasta que se confirmen mi función pública, el permiso de publicación, la evidencia del despliegue en producción y el material de validación sanitizado.
