---
title: Funcionseption
description: Revisamos las funciones recursivas y usos
img_small: cosa6_small.jpg
img: cosa2.jpg
alt: my second blog post
tags:
  - JS
  - Javascript
---

Las ` funciones recursivas` son funciones que se llaman a si mismas en si ejecución.  
En general está solución hace que la función sea más concisa y elegante.

```javascript
function recurs() {
  recurs()
}
```

Un ejemplo sencillo sería una función que nos sume todos números del `n` al `0` .  
Esto lo logramos sumando la función del número anterior más uno.

```javascript
function sumAll(num) {
  if (nun <= 0) {
    return num
  }
  return num + sumAll(num - 1)
}
```

Entonces si pedimos `sumAll()` de 4 hay que calcular el `sumAll()` de 3, el de 2 y el de 1 _(el cual es el corte y nos devuelve 1)_

```javascript
sumAll(4) = 4 + sumAll(3);.
sumAll(3) = 3 + sumAll(2);.
sumAll(2) = 2 + sumAll(1);.
sumAll(1) = 1;.
```

Lo cual se traduce a un cálculo directo.

```javascript
sumAll(4) = 4 + 3 + 2 + 1;.
```

Habiéndolo logrado, podemos mejorarlo haciendo más directo el código.

```javascript
const sumAll = (num) => {
  return num <= 1 ? nun : num + sumAll(num - 1)
}
```

#### Cosas importantes a recordar

- Un límite.

Si a una `funcion recursiva` no le ponemos un límites va a llamarse continuamente y va a dar `Maximum call stack size exceeded`. Eso es para que la computadora no explote

```javascript
const sumAll = (num) => {
  return num + sumAll(num - 1)
}
```

- Una Memoria

En caso que una `funcion recursiva` se llame a si misma dos o más veces en un mismo contexto una memoria interna es clave para optimizar y no quedarnos sin memoria.

```javascript
// La manera derrochadora
const sumExpo = (num) => {
  return num <= 1 ? nun : sumExpo(num - 2) + sumExpo(num - 1)
}
// La manera ahorradora
const sumExpo = (num, memo) => {
  let memo = memo || {}
  if (memo[num]) {
    return memo[num]
  }
  memo[num] = num <= 1 ? nun : sumExpo(num - 2, memo) + sumExpo(num - 1, memo)
  return memo[num]
}
```

De esta manera generamos una memoria interna que guarda los valores la primera vez que se necesitan y de ahí en adelante directamente se llama al valor, acelerando el proceso.

Obviamente se puede hacer más resumido, pero creo que dificulta más la lectura.

<!-- ### Otros ejemplos

{{ Spoiler }}

Productoria
Árbol utópico
Fractal(?)
Fibonacci -->
