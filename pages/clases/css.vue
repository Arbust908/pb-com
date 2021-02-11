<template>
  <main>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Cascadas</h2>
      <p>
        CSS significa <em>Cascading Style Sheets</em> o Hoja de Estilos en
        cascada. Ahora vamos a ver como se escriben peor lo importante de
        entender de la "cascada" es que las reglas se aplican de arriba hacia
        abajo y si hay dos reglas que tienen elmismo objetivo la segunda es la
        que "pisa" la anterior
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Reglas</h2>
      <p>En CSS se habla de reglas, estas estan compuestas de 3 partes</p>
      <ol>
        <li>Un selector que nos indiqua a que elemento/s vamos a afectar</li>
        <li>
          El atributo que queremos cambiar (difiera a los atributos de HTML)
        </li>
        <li>El valor de ese atributo</li>
      </ol>
      <h3 class="text-2xl text-blueGray-500">Ejemplo</h3>
      <pre>
        <code>
selector {
    atributo: valor;
}
        </code>
      </pre>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Selectores</h2>
      <p>
        Vamos a ver varios tipos de selectores. El mas basico es el
        <code>TAG</code> o la etiqueta. Es el nombre que se usa en HTML como por
        ejemplo <code>h3 { atributo: valor; }</code> afectaria a los h3 que se
        encuentran en el archivo.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">Atributos</h2>
      <p>
        Atributos hay muchos y como ya vimos los navegadores les dan algunos a
        las etiquetas ya. En esta primera vez vamos a ver solo un par. Estos son
      </p>
      <p>
        <code>{{ '&lt;title>' }}</code>
        es la etiqueta que usamos para ponerle titulo a nuestra pagina. En
        navegadores actuales es lo que se ve en la pestaña y en las busquedas de
        Google y todo eso.
      </p>
      <ol>
        <li><code>color</code> cambia el color del texto</li>
        <li><code>background-color</code> cambia el color de fondo</li>
        <li><code>font-size</code> cambia el tamaño de la tipografia</li>
        <li><code>padding</code> agrega espacio interno a un elemento*</li>
        <li><code>margin</code> agrega espacio externo entre elementos*</li>
        <li><code>width</code> especifica el ancho de un elemento</li>
        <li><code>height</code> especifica el alto de un elemento</li>
        <li><code>box-sizing</code> especifica como se mide el elemento*</li>
      </ol>
      <small>* vamos a ver ejemlos para que tenga mas sentido</small>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">color</h2>
      <pre>
        <code>
p {
    color: red;
}
        </code>
      </pre>
      <p>
        esto nos va a convertir todos los parrafos en color rojo. :D
        <br />
        que pasa si quiero algun otro color? El navegador tiene varios colores
        predeterminados como <code>sienna</code>, <code>whitesmoke</code>. Pero
        si queremos algun otro podemos usar otros formatos de color como HEX,
        RGB y RGBA (que nos da el canal alpha que da transparencia)
      </p>
      <h3 style="color: sienna">Esto esta con color sienna</h3>
      <h3 style="color: whitesmoke">Esto esta con color whitesmoke</h3>
      <h3 style="color: #17bd43">Esto esta con color #17bd43 que es hex</h3>
      <h3 style="color: rgb(23, 189, 67)">
        que es lo mismo que rgb(23, 189, 67) en RGB
      </h3>
      <h3 style="color: rgba(23, 189, 67, 1)">
        o rgba(23, 189, 67, 1) en RGBA
      </h3>
      <h3 style="color: rgba(23, 189, 67, 0.5)">
        notemos que si bajamos el ultimo se ve mas tenue rgba(23, 189, 67, 0.5)
      </h3>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">background-color</h2>
      <p>funciona igual que color, tomando los mismos colores y tipos</p>
      <h3 style="background-color: sienna">Esto esta con color sienna</h3>
      <h3 style="background-color: whitesmoke">
        Esto esta con color whitesmoke
      </h3>
      <h3 style="background-color: #17bd43">
        Esto esta con color #17bd43 que es hex
      </h3>
      <h3 style="background-color: rgb(23, 189, 67)">
        que es lo mismo que rgb(23, 189, 67) en RGB
      </h3>
      <h3 style="background-color: rgba(23, 189, 67, 1)">
        o rgba(23, 189, 67, 1) en RGBA
      </h3>
      <h3 style="background-color: rgba(23, 189, 67, 0.5)">
        notemos que si bajamos el ultimo se ve mas tenue rgba(23, 189, 67, 0.5)
      </h3>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">font-size</h2>
      <p>
        Con esto vamos a poder cambiar el tamaño de los textos sin importar que
        etiqueta usemos
      </p>
      <p style="font-size: 30px">
        Estos dos textos son etiquetas p pero con distintos font-size: 30px;
      </p>
      <p style="font-size: 8px">
        Estos dos textos son etiquetas p pero con distintos font-size: 8px;
      </p>
      <p>
        Es super simple, hasta que nos ponemos con los tipos de medidas. La mas
        comun es pixel o <code>px</code>. Pero tambien tenemos porcentual o
        <code>%</code>, <code>em</code> o <code>rem</code>. <br />
        Estas ultimas son medidas relativas. Hay otras que vamos a encontrar
        <a href="https://www.w3schools.com/cssref/css_units.asp">ACA</a>.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">padding</h2>
      <p>
        este es el espacio que tiene la caja internamente. Nos permite darle
        "aire" interno a una caja.
      </p>
      <h3>Ejemplo</h3>
      <h2 class="bg-emerald-300 border-2 border-emerald-600 p-4">
        como podemos ver aca lo verde es el padding. Podemos ver que es parte de
        la misma caja por el borde que denota el final de la misma
      </h2>
      <p>
        para escribirlo ponemos <code> selector { padding: 20px }</code> eso le
        va a poner padding de 20px en todos lados.
        <code> selector { padding: 20px }</code> es igual a
        <code> selector { padding: 20px 20px 20px 20px}</code>. <br />
        y que significa eso?
        <code> selector { padding: arriba derecha abajo izquierda}</code>
        Estas ultimas son medidas relativas. Hay otras que vamos a encontrar
        <a href="https://www.w3schools.com/cssref/css_units.asp">ACA</a>.
      </p>
    </section>
    <section
      class="w-full min-h-screen flex flex-col items-center pt-6 max-w-2xl mx-auto"
    >
      <h2 class="text-3xl font-bold">margin</h2>
      <p>
        este es el espacio que tiene la caja internamente. Nos permite darle
        "aire" interno a una caja.
      </p>
      <h3>Ejemplo</h3>
      <h2 class="bg-emerald-300 border-2 border-emerald-600 p-4">
        como podemos ver aca lo verde es el padding. Podemos ver que es parte de
        la misma caja por el borde que denota el final de la misma
      </h2>
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
  content: '0' counter(item-number);
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
