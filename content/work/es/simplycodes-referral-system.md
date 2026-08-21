---
slug: simplycodes-referral-system
translationKey: simplycodes-referral-system
locale: es
title: Rediseñando el recorrido de referidos para ambas partes en SimplyCodes
description: Cómo reformulé las experiencias de quien invita y de la persona invitada en torno a un pipeline existente de atribución y recompensas entre servicios.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 20
role: Responsable principal del mantenimiento frontend y del rediseño
period: Abril–julio de 2024
technologies:
  - Nuxt
  - Vue
  - TypeScript
  - GTM
  - GA4
skills:
  - Diseño de producto
  - Arquitectura frontend
  - Ingeniería de crecimiento
  - Coordinación entre equipos
areas:
  - frontend
  - architecture
  - product
  - e2e
featured: true
draft: false
---

## Contexto

SimplyCodes ya tenía las bases de un programa de referidos: códigos de invitación únicos, validación de referidos, atribución a través de la autenticación, seguimiento de actividad y recompensas. La experiencia web todavía no comunicaba ese sistema como un recorrido coherente.

Como principal responsable del mantenimiento frontend, estuve a cargo del rediseño desde la idea inicial de producto hasta la implementación. Definí la forma de las experiencias de quien invita y de la persona invitada, traduje la mecánica de recompensas en pasos comprensibles y coordiné con el equipo de backend para que el nuevo recorrido respetara los contratos de atribución existentes.

El objetivo no era reemplazar la infraestructura de referidos. Era hacer que esa infraestructura fuera comprensible y útil para ambas partes de la invitación.

## Dos audiencias, dos preguntas

Un flujo de referidos sirve a dos personas con motivaciones diferentes.

Quien invita necesita entender por qué vale la pena compartir, dónde encontrar su enlace, cómo enviarlo y si sus amigos completaron el recorrido. La persona invitada llega con menos contexto. Necesita entender quién la invitó, por qué debería confiar en la oferta y qué tiene que hacer después.

Tratar a ambas audiencias como una única página genérica de adquisición habría hecho que el programa fuera más difícil de explicar. Separé la experiencia en dos recorridos conectados:

- una página para quien invita, donde puede descubrir el programa, desbloquear un código de referido, compartirlo y ver su progreso;
- una landing page para la persona invitada que convierte un enlace compartido en un camino claro de registro, instalación y compra.

`[Imagen: las páginas de quien invita y de la persona invitada, una al lado de la otra, en desktop y mobile]`

## Diseñando el recorrido de quien invita

La página de quien invita se adapta al estado de autenticación. Quienes no iniciaron sesión primero ven la explicación del programa y un llamado a la acción que los devuelve a la página de referidos después de iniciar sesión. Quienes ya iniciaron sesión ven su enlace único, los controles para compartir y el progreso de los referidos completados.

Las opciones para compartir también se adaptan al dispositivo. En mobile, los SMS y el menú nativo para compartir son las acciones más directas. En desktop, la interfaz permite copiar el enlace, compartirlo en X y redactar una invitación por email. La interacción de email incluye estados de validación, pendiente, éxito y error, en lugar de tratar la entrega como una acción invisible.

Revisé el mensaje para cada canal y agregué parámetros de origen a los enlaces de SMS y X. Esto mantuvo el mismo destino del referido y, a la vez, hizo visible en la URL el origen del tráfico compartido. También conservé la navegación de búsqueda habitual del sitio para que la experiencia de referidos se sintiera parte de SimplyCodes y no una página de campaña aislada.

La presentación del progreso muestra cinco posiciones visuales, pero la interfaz por sí sola no es la autoridad respecto de la elegibilidad de los referidos ni de los límites de las recompensas. Esas reglas pertenecen al servicio de recompensas y a su configuración de actividades.

## Diseñando el recorrido de la persona invitada

La página de la persona invitada tenía que convertir la recomendación de otra persona en un próximo paso creíble. La organicé en torno a una propuesta de valor concisa, seguida de una explicación específica para cada dispositivo sobre cómo completar el recorrido.

En mobile, los pasos hacen énfasis en crear una cuenta, descargar la app y hacer una compra. En desktop, hacen énfasis en crear una cuenta, instalar la extensión del navegador, comprar con la extensión y activar las recompensas antes de la compra. Los llamados a la acción aparecen al principio y al final de la página, con una acción adicional en mobile junto al primer paso instructivo.

La página solo se renderiza para una persona visitante sin sesión y con un código de referido válido. Los enlaces inválidos y quienes ya iniciaron sesión vuelven a la experiencia estándar de descubrimiento. Para las invitaciones válidas, trasladé el código a la URL de inicio de sesión mientras el middleware de referidos existente conservaba el contexto de atribución en una cookie. Ese traspaso conectó la página rediseñada con la autenticación sin pedirle a la persona usuaria que entendiera el mecanismo subyacente.

También revisé los metadatos de la página y la presentación al compartir en redes sociales para que la invitación mantuviera su coherencia antes de que la persona destinataria llegara al sitio.

## Límites del sistema

El recorrido completo atravesaba varios servicios a cargo de distintos equipos. Mi alcance incluía el concepto de producto, los recorridos web responsivos, las interacciones para compartir, el traspaso a autenticación con contexto de referidos, los metadatos y la integración frontend. Los servicios de backend existentes seguían siendo responsables de la identidad, la persistencia, la calificación, la moderación y las recompensas.

```text
Mi alcance frontend

Página de quien invita
  -> obtener un código de referido existente
  -> compartir /invite/:code
  -> validar la ruta de la persona invitada
  -> conservar el contexto del referido
  -> derivar a la persona invitada al inicio de sesión

Pipeline existente entre servicios

Autenticación
  -> crear o resolver la persona usuaria de SimplyCodes
  -> pasar el contexto de referrer, referee y code a Karma

Karma
  -> guardar la relación de referido
  -> observar la instalación, el registro y la compra que reúne los requisitos
  -> aplicar las reglas de elegibilidad y actividad
  -> crear actividades de recompensa pendientes de moderación
```

Este límite fue importante durante el diseño. El frontend podía explicar los pasos probables y presentar información sobre las recompensas, pero no podía convertirse en una segunda fuente de verdad para las reglas de calificación o pago. La coordinación con el equipo de backend mantuvo el recorrido de la persona usuaria alineado con los contratos que ya eran responsables de esas decisiones.

## Decisiones de implementación

El rediseño reutilizó el pipeline de referidos establecido en lugar de introducir otro mecanismo de atribución. El middleware de la ruta validaba el código de invitación antes de renderizar la landing page y conservaba su contexto de referido. El traspaso al inicio de sesión incluía explícitamente el mismo código, lo que mantenía comprensible la transición y permitía que la autenticación continuara el recorrido.

Las analíticas existentes distinguían las vistas de la página de quien invita con y sin sesión iniciada, los métodos para compartir, los envíos de email y las vistas de la landing page de la persona invitada. Mis cambios en las opciones para compartir agregaron información del canal a determinados enlaces, pero la evidencia disponible no abarca la creación de la cuenta, la instalación, la compra que reúne los requisitos ni la entrega de la recompensa. Por ese motivo, no presento los eventos de la página como un funnel de adquisición completo.

La comunicación de las recompensas puso de manifiesto otra restricción importante. Los incentivos pueden cambiar independientemente de un release del frontend. El sistema más amplio proporcionaba configuración de actividades y la interfaz actual lee algunos valores desde allí, pero durante el rediseño los textos de campaña no se generaban uniformemente a partir de la configuración. La lección duradera fue tratar el lenguaje de los incentivos como datos de producto siempre que fuera posible y revisar cualquier texto promocional restante cuando cambiaran las reglas.

## Iteración después del rediseño

Después de la primera implementación hubo varias correcciones puntuales. Ajusté la navegación de la persona invitada a partir del feedback, restauré el comportamiento estándar de búsqueda en la página de quien invita y revisé los textos para compartir y la presentación en redes sociales a medida que evolucionaba el mensaje del producto.

No fueron cambios en la atribución en sí. Fueron mejoras en la confianza y la continuidad: un encabezado que se comportaba como el resto del producto, mensajes apropiados para cada canal y una vista previa compartida que presentaba el destino con precisión.

## Resultado

El resultado fue un recorrido web coherente para ambas partes, construido en torno al sistema de referidos existente. Quienes invitaban recibieron formas de compartir apropiadas para cada dispositivo y una vista más clara del progreso. Las personas invitadas recibieron un camino enfocado desde la recomendación hasta la creación de la cuenta y la instalación del producto. El rediseño también estableció límites explícitos de integración entre el frontend, la autenticación, SimplyCodes API y los servicios de Karma.

La evidencia analítica y de despliegue disponible para este caso de estudio no demuestra un aumento de la conversión, adquisición incremental ni tasas de finalización de recompensas. Esos resultados siguen abiertos hasta que se puedan recuperar y validar los dashboards correspondientes del funnel.

## Reflexión

Los productos de referidos no son solo generadores de enlaces. Son recorridos de confianza que abarcan a dos personas usuarias y varios sistemas. La interfaz tiene que conservar la atribución sin exponer la complejidad técnica, explicar los incentivos sin convertir los textos promocionales en políticas y seguir siendo útil cuando la autenticación o la calificación ocurren en otro lugar.

Estar a cargo del rediseño implicó dar forma a esa experiencia completa y, al mismo tiempo, respetar dónde terminaba la responsabilidad del frontend. La solución más sólida no fue un nuevo backend de referidos, sino un contrato más claro entre la intención de la persona usuaria, el estado de la interfaz y los servicios que ya eran responsables de hacer realidad el referido.
