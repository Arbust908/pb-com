---
slug: simplycodes-gamification
translationKey: simplycodes-gamification
locale: es
title: Haciendo confiables las recompensas aleatorias en SimplyCodes
description: Cómo conecté un flujo de recompensas cuya autoridad reside en el servidor con una revelación de Lottie en varias etapas y una experiencia web más amplia orientada a la fidelización.
project: SimplyCodes
organization: SimplyCodes · Demand.io
projectType: professional
sortOrder: 40
role: Ingeniero frontend
period: Junio de 2023–enero de 2024
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

No se trataba simplemente de agregar puntos a la interfaz. Una vez que los Tokens se podían canjear por una recompensa aleatoria, la experiencia tenía que resultar lúdica sin permitir que la lógica de presentación decidiera el resultado, lo revelara antes de tiempo ni volviera a sortearlo.

## Diseñando en torno a la autoridad

Un prototipo inicial podía elegir una bolsa y un monto de dinero en el navegador. Eso servía para demostrar la interacción, pero no era un límite seguro para producción. Cualquier persona que pudiera inspeccionar o manipular el cliente podía influir en la aleatoriedad generada por el navegador.

El flujo de producción trataba al servicio de recompensas como autoridad. Una solicitud de canje devolvía la bolsa y el monto de la recompensa seleccionados antes de que avanzara la revelación. Luego, el cliente actualizaba el saldo y el historial de la persona usuaria, y usaba la respuesta únicamente para elegir la presentación correcta.

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

## Convirtiendo archivos de Lottie en una interacción

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

La decisión de ingeniería clave fue modelar la animación como una vista de un estado que ya era autoritativo. El estado de red, el estado del modal, el estado de la animación y el estado de la recompensa estaban relacionados, pero no eran intercambiables. Mantener esas responsabilidades separadas permitió deshabilitar acciones duplicadas durante una solicitud, evitar transiciones prematuras y admitir que se omitiera la animación sin cambiar el resultado.

## Construyendo el recorrido más amplio de recompensas

La revelación del premio funcionaba como parte de una experiencia web más amplia, no como un juego aislado. A lo largo de varios releases, conecté el estado de recompensas del servicio con los lugares donde las personas usuarias necesitaban contexto:

- progreso hacia la siguiente recompensa, calculado a partir de hitos proporcionados por el servicio;
- misiones de la página Play con estados de carga y finalización;
- llamados a la acción de las misiones que podían abrir un destino dentro de la app, navegar a otra ruta, abrir un enlace externo o registrar una actividad con seguimiento;
- actividad reciente de la cuenta y premios recientes respaldados por la API;
- formularios de recuperación de compras que admitían reclamos con o sin cupón;
- información sobre Tokens que explicaba cómo se podían obtener y canjear.

También ayudé a migrar el lenguaje visible para las personas usuarias de “Karma” a “Tokens”. Fue más que reemplazar una etiqueta: los valores dinámicos de las recompensas y las explicaciones más claras sobre obtención y canje redujeron la cantidad de política económica incorporada en textos estáticos de la interfaz.

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

Esta progresión fue importante. Primero hicimos comprensible el estado de la cuenta, luego les dimos a las personas usuarias caminos concretos para obtener recompensas y después conectamos esos caminos con la actividad y el canje. La animación agregó disfrute solo después de que la interacción tuvo un límite de autoridad confiable.

## Resultado

El resultado fue un frontend coherente para un ecosistema de recompensas administrado por el servidor. Las personas usuarias podían entender cómo obtener Tokens, ver su progreso y actividad, recuperar el crédito faltante de una compra, gastar Tokens y experimentar una revelación visualmente rica cuya presentación no podía elegir un resultado aleatorio más conveniente.

La evidencia disponible demuestra la implementación y su despliegue por etapas, pero no un cambio medible en la retención, la frecuencia de compra o el canje. Esas afirmaciones permanecen fuera de alcance hasta que se puedan recuperar las analíticas de cohortes y del funnel.

## Reflexión

La gamificación se convierte en un problema de sistemas en cuanto el progreso virtual adquiere valor tangible. El disfrute depende de la expectativa, pero la confianza depende de hacer que el servidor sea la autoridad y que la animación sea prescindible. Una persona usuaria debería poder omitir cada detalle visual y aun así recibir exactamente el resultado ya registrado para la transacción.

Por lo tanto, la parte más duradera de este trabajo no fue solo la animación. Fue el contrato entre el estado de las recompensas controlado por el servicio y la presentación controlada por el cliente: el servicio decidía qué ocurría, mientras que la interfaz hacía que esa decisión fuera comprensible, responsiva y disfrutable.
