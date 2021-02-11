<template>
  <main>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Etiquetas</h2>
      <p>
        HTML es <strong>Hyper Text Markup Languaje</strong>. En humano, un
        lenguaje de etiquetas que tienen meta informacion que le dicen al
        navegador que es y como se deberia mostrar
      </p>
      <p>
        Estas etiquetas tienen una estructura basica que la mayoria sigue.
    </p>
        <ol>
            <li>Llave de inicio <code>{{ '&lt;' }}</code></li>
            <li>Nombre de etiqueta</li>
            <li>Llave de cierre <code>{{ '>' }}</code></li>
        </ol>
        <p>
        Esto es una etiqueta de inicio. Depues necesitamos una de cierre, la cual comparte en su mayoria la estructura
        </p>
        <ol>
            <li>Llave de inicio <code>{{ '&lt;/' }}</code> en formato cierre</li>
            <li>Nombre de etiqueta</li>
            <li>Llave de cierre <code>{{ '>' }}</code></li>
        </ol>
        <p>
        Todo lo que este entre estas etiquetas es el contenido de la etiqueta. No es obligatorio que las estiquetas tengan contenido, pero es lo mas comun. Hasta pueden tener otras etiquetas adrentro. Esto se llama Anidamiento, una etiqueta dentro de otra.
      </p>
      <h3 class="text-2xl text-blueGray-500">Ejemplo</h3>
      <code>{{ '&lt;tag> contenido &lt;/tag>' }}</code>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">html</h2>
      <p>
        <code>{{ '&lt;html>' }}</code>
        es la etiqueta que deberia estar primera y "encapsular" todas las otras
        etiquetas
      </p>
       <p>
        Toda etiqueta <code>{{ '&lt;html>' }}</code> va a tener una etiqueta <code>{{ '&lt;head>' }}</code> y una <code>{{ '&lt;body>' }}</code> aunque no lo pongamos, los navegadores saben y las rellenan.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">head</h2>
      <p>
        <code>{{ '&lt;head>' }}</code>
        contiene mucha metadata para el sitio que (en general) no se muestran en
        la pantalla directamente, pero si habilitan contenido
      </p>
      <p>
        <code>{{ '&lt;title>' }}</code>
        es la etiqueta que usamos para ponerle titulo a nuestra pagina. En
        navegadores actuales es lo que se ve en la pestaña y en las busquedas de
        Google y todo eso.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">body</h2>
      <p>
        <code>{{ '&lt;body>' }}</code>
        contiene el contenido principal de la web. Lo que no se encuentre dentro
        de aca no se va a mostrar. Despues veremos CSS, pero en general se ve
        como una mala practica ponerle estilos al
        <code>{{ '&lt;body>' }}</code>
      </p>
      <p>
        Dentro de la etiqueta
        <code>{{ '&lt;body>' }}</code>
        vamos a encontrar todo tipo de etiquetas, las mas faciles y utiles son
        <code>{{ '&lt;h1>' }}</code
        >, <code>{{ '&lt;h2>' }}</code
        >, <code>{{ '&lt;h3>' }}</code
        >, <code>{{ '&lt;h4>' }}</code
        >, <code>{{ '&lt;h5>' }}</code
        >, <code>{{ '&lt;h6>' }}</code
        >. Estos son las cabezeras o Headings. Marcan el titulo prinicpal de la
        pagina y cada seccion y las sub secciones, quizas bajadas y hasta
        descripcciones de imagenes. Una mala practica es tener mas de un
        <code>{{ '&lt;h1>' }}</code
        >, esto es porque la primer cabezera deberia ser lo mas importante de
        nuestra pagina.
      </p>
      <p>
        Tambien tenemos la etiqueta
        <code>{{ '&lt;p>' }}</code
        >. Esta viene a ser la de parrafo. Contiene bloques de texto. Es el
        soldado razo de las etiquetas
      </p>
      <p>
        Por ultimo de las estiquetas mas comunes tenmos
        <code>{{ '&lt;img>' }}</code
        >. Esta tiene sus complejudades las cuales veremos en el apartado de
        <strong>Atributos</strong>, pero el resumen es que nos permite mostrar
        imagenes.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">head II</h2>
      <p>
        Volviendo a la etiqueta
        <code>{{ '&lt;head>' }}</code>
      </p>
      <p>
        las proximas etiquetas que vamos a ver son
        <code>{{ '&lt;link>' }}</code> que nos van a permitir vincular otros
        archivos, como CSSs, Imagenes y JSs
      </p>
      <p>
        por otro lado tenemos
        <code>{{ '&lt;style>' }}</code> que nos deja escribir css en el archivo
        html, tiene sus ventajas como sus desventajas, pero es la forma mas
        directa de asignar reglas de estilos.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Atributos</h2>
      <p>
        Las etiquetas de HTML aparte de tener un nombre y un contenido al que
        contienen pueden tener atributos que lo modifican. Mas adelante veremos
        muchos, para que sirven y cuando usarlos. Aun asi como mensionamos
        antes, el caso mas comun, es el de las imagenes.
      </p>
      <pre>
          <code> &lt;img src="direccion de mi imagen" /> </code>
      </pre>
      <p>
        En esta simple estiqueta de imagen vemos varias cosas. <br />
        <ol>
            <li>el nombre <code>img</code></li>
            <li>el atributo <code>src</code></li>
            <li>el valor del atributo <code>direccion de mi imagen</code>. Tengamos en cuenta que para asignarle un valor de ponemos un <code>=</code> y encerramos el valor en comillas simples <code>''</code> o dobles <code>""</code></li>
            <li>que no tiene una etiqueta de cierre, sino que es autocerrado</li>
        </ol>
      <!-- eslint-disable-next-line prettier/prettier -->
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Archivo basico HTML</h2>
      <h3 class="text-2xl text-blueGray-500">Ejemplo</h3>
      <pre>
        <code>
&lt;html>
    &lt;head>
        &lt;title> Mi gran pagina &lt;/title>
    &lt;/head>
    &lt;body>
        &lt;h1> Mi gran pagina &lt;/h1>
        &lt;h2> El primer contenido de mi web &lt;/h2>
        &lt;p> Esto seria mi contendido magico en la web. Super interesante &lt;/p>
        &lt;h3> El segundo contenido de mi web &lt;/h3>
        &lt;p> Se repite un poco pero esto seria mi contendido magico en la web. Super interesante &lt;/p>
    &lt;/body>
&lt;/html>
        </code>
      </pre>
    </section>
  </main>
</template>

<style scoped>
p {
  @apply mb-4;
}
p::first-letter {
  @apply text-lg font-bold uppercase;
}
code {
  @apply bg-violet-500 text-blueGray-100 px-1 rounded;
}
pre {
  @apply bg-violet-500 text-blueGray-100 p-6 my-3 rounded-xl shadow-xs;
}
pre > code {
  all: unset;
}
ol {
    counter-reset: item-number;
    @apply w-full pl-4 mb-4;
}
ol li {
    counter-increment: item-number;
}
ol li::before {
  content: "0" counter(item-number);
  @apply inline-block font-bold text-blueGray-500 transform rotate-12 mr-2;
}
main {
  scroll-snap-type: y mandatory;
}
section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>
