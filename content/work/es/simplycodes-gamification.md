---
slug: simplycodes-gamification
translationKey: simplycodes-gamification
locale: es
title: Recompensas aleatorias confiables en SimplyCodes
description: Cómo conecté recompensas definidas por el servidor con una animación de Lottie por etapas y el resto de la experiencia web.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 40
role: Ingeniero frontend
period: Junio de 2023 a enero de 2024
technologies:
  - Nuxt
  - Vue
  - TypeScript
  - Lottie
skills:
  - Arquitectura frontend
  - Modelado de estados
  - Integración de animaciones
  - UX conductual
areas:
  - frontend
  - architecture
  - product
featured: true
draft: false
---

## Contexto

El equipo de SimplyCodes quería recompensar comportamientos de compra útiles más allá de enviar códigos de cupón. Junto con nuestro manager, desarrollamos una experiencia capaz de reconocer actividad relacionada con compras, incluido un camino para que las personas usuarias reclamaran Tokens faltantes cuando habían hecho una compra sin usar un cupón de SimplyCodes. El objetivo más amplio era darles un motivo para volver haciendo visibles la obtención, el progreso y el canje.

Los equipos de producto y diseño definieron el concepto de las recompensas y su personalidad visual. Mi responsabilidad fue implementar y hacer evolucionar la experiencia frontend: progreso, misiones, actividad reciente, premios recientes, información sobre Tokens y la revelación animada del premio.

No alcanzaba con agregar puntos a la interfaz. Cuando los Tokens pasaron a canjearse por una recompensa aleatoria, la presentación no podía decidir el resultado, mostrarlo antes de tiempo ni volver a sortearlo.

## El servidor decide la recompensa

Un prototipo inicial podía elegir una bolsa y un monto de dinero en el navegador. Eso servía para demostrar la interacción, pero no era un límite seguro para producción. Cualquier persona que pudiera inspeccionar o manipular el cliente podía influir en la aleatoriedad generada por el navegador.

En producción, el servicio de recompensas tomaba la decisión. Una solicitud de canje devolvía la bolsa y el monto seleccionados antes de iniciar la animación. Luego, el cliente actualizaba el saldo y el historial, y usaba la respuesta solamente para elegir la presentación correcta.

```text
La persona usuaria gasta Tokens
  -> el frontend bloquea la interacción
  -> el servicio de recompensas valida la solicitud
  -> el servicio selecciona y registra el resultado
  -> el frontend recibe la bolsa y el monto
  -> se actualizan el saldo y el historial
  -> la revelación de Lottie presenta el resultado registrado
```

Esta separación protegía una invariante importante: los controles de animación podían cambiar la rapidez con la que alguien veía un resultado, pero no el resultado que recibía. Cerrar, volver a reproducir u omitir la presentación no daba otra oportunidad de generar una recompensa al azar.

El servicio remoto seguía siendo responsable de los saldos, la elegibilidad, los valores de las recompensas y la selección aleatoria. No dupliqué esas reglas en la interfaz ni traté al navegador como una segunda fuente de verdad.

## Convertir archivos de Lottie en una interacción

El equipo de diseño entregó animaciones de Lottie con distintos momentos correspondientes a las etapas de apertura de una bolsa de premios. No eran videos pasivos que simplemente podían reproducirse de principio a fin. La interfaz tenía que reaccionar en puntos específicos y, al mismo tiempo, mantenerse sincronizada con el resultado del servidor.

Reemplacé la implementación de videos segmentados por una secuencia controlada por Lottie y la coordiné mediante eventos del ciclo de vida y de frames de la animación. La interacción inicializaba el reproductor, entraba en una sección en loop mientras esperaba a la persona usuaria, reanudaba la revelación cuando esta lo indicaba y pasaba al resultado en dinero en el momento previsto. La ilustración de la bolsa se seleccionaba a partir del resultado devuelto por el servicio.

```text
Bolsa cerrada
  -> comienza la apertura
  -> la animación llega al punto de espera
  -> los frames intermedios se reproducen en loop
  -> la persona usuaria abre la bolsa
  -> se reanudan los frames finales
  -> aparece el resultado en dinero registrado
```

`[Imagen: la secuencia de la bolsa de premios desde el estado cerrado, pasando por la revelación de Lottie, hasta el resultado en dinero]`

Modelé la animación como una vista de un estado que el servidor ya había definido. El estado de red, el modal, la animación y la recompensa estaban relacionados, pero no eran intercambiables. Al mantenerlos separados pude deshabilitar acciones duplicadas durante una solicitud, evitar transiciones prematuras y permitir que se omitiera la animación sin cambiar el resultado.

## Integrar la animación con el sistema de recompensas

La revelación del premio funcionaba como parte de una experiencia web más amplia, no como un juego aislado. A lo largo de varios releases, conecté el estado de recompensas del servicio con los lugares donde las personas usuarias necesitaban contexto:

- progreso hacia la siguiente recompensa, calculado a partir de hitos proporcionados por el servicio;
- misiones de la página Play con estados de carga y finalización;
- llamados a la acción de las misiones que podían abrir un destino dentro de la app, navegar a otra ruta, abrir un enlace externo o registrar una actividad con seguimiento;
- actividad reciente de la cuenta y premios recientes respaldados por la API;
- formularios de recuperación de compras que admitían reclamos con o sin cupón;
- información sobre Tokens que explicaba cómo se podían obtener y canjear.

También ayudé a cambiar el nombre visible de "Karma" a "Tokens". No fue solo reemplazar una etiqueta. Los valores dinámicos y las explicaciones sobre obtención y canje sacaron parte de las reglas económicas de los textos estáticos de la interfaz.

`[Imagen: el progreso de recompensas, las misiones, la actividad reciente y la información sobre Tokens como un único recorrido conectado]`

## Límites del sistema

La experiencia atravesaba varias capas con responsables diferentes. El navegador orquestaba la intención de la persona usuaria y la presentación; no determinaba si una misión reunía los requisitos, cuánto otorgaba una compra ni qué premio se seleccionaba.

```text
Web de SimplyCodes
  -> mostrar saldos, progreso, misiones e historial
  -> dirigir las acciones de las misiones
  -> enviar información para recuperar una compra
  -> solicitar un canje y presentar su resultado

SimplyCodes API y servicios de recompensas
  -> registrar actividades que reúnen los requisitos
  -> validar saldos y elegibilidad
  -> completar misiones
  -> seleccionar y persistir recompensas
  -> devolver el estado autoritativo de la cuenta
```

Ese límite también orientó el manejo de errores. La interfaz mostraba estados de carga, vacío, completado, saldo insuficiente, canjeado y retiro de dinero, y luego actualizaba los datos remotos después de las mutaciones en lugar de predecir localmente el saldo resultante.

## Evolución

```text
Junio de 2023      Economía dinámica y presentación del progreso
Agosto de 2023     Misiones y direccionamiento de acciones
Agosto de 2023     La selección de recompensas salió de los prototipos del navegador
Septiembre de 2023 Actividad, premios recientes y revelación de premios con Lottie
Septiembre de 2023 El lenguaje visible pasó de Karma a Tokens
Enero de 2024      Ampliación de la información sobre Tokens
```

El orden importó. Primero explicamos el estado de la cuenta. Después agregamos formas concretas de obtener recompensas y las conectamos con la actividad y el canje. La animación llegó cuando el servidor ya controlaba el resultado.

## Resultado

El resultado fue un frontend coherente para un ecosistema de recompensas administrado por el servidor. Las personas usuarias podían entender cómo obtener Tokens, ver su progreso y actividad, recuperar el crédito faltante de una compra, gastar Tokens y experimentar una revelación visualmente rica cuya presentación no podía elegir un resultado aleatorio más conveniente.

La evidencia disponible demuestra la implementación y su despliegue por etapas, pero no un cambio medible en la retención, la frecuencia de compra o el canje. Esas afirmaciones permanecen fuera de alcance hasta que se puedan recuperar las analíticas de cohortes y del funnel.

## Reflexión

La gamificación se vuelve un problema de sistemas cuando el progreso virtual adquiere valor tangible. Para que el resultado sea confiable, el servidor debe decidir y la animación tiene que ser prescindible. Una persona debería poder omitir toda la presentación y recibir exactamente la recompensa ya registrada.

Lo más importante no fue la animación, sino el contrato entre el servicio y el cliente. El servicio decidía qué ocurría. La interfaz comunicaba esa decisión y respondía a las acciones de cada persona.
