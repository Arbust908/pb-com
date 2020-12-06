---
title: ' { Hola Mundo! } '
description: Arranca el Blog con nuxt + content
img_small: cosa1_small.jpg
img: cosa1.jpg
alt: Primer blog post
tags:
  - general
  - vue
  - nuxt
  - tailwind
---

Finalmente! El dichoso blog.  
Tras muchos intentos, ideas y proyectos empesados aqui estamos. Un blog. Llevo su tiempo y quizas la tecnologia correcta pero **este** es un blog facil de administrar con estilos a medida, **SSR** _(Server side render)_, **SEO friendly** _(es decir que tiene los metadatos indicados, comple con las reglas de )_

## El primer titulo

This is some more info

```
var add2 = function(number) {
  return number + 2;
}
```

```js
var add2 = function (number) {
  return number + 2
}
```

```html
<div class="row">
  <div class="col-md-6 col-md-offset-3">
    <h1>Hello World</h1>
  </div>
</div>
```

## This is another heading

This is some more info

## This is a heading

This  
is some more info

<!--more-->

### This is a sub heading This is some more info

### This is another sub heading

This is some more info

```js{1,3-5}[server.js]
const http = require('http')
const bodyParser = require('body-parser')

http.createServer((req, res) => {
  bodyParser.parse(req, (error, body) => {
    res.end(body) })
  }).listen(3000)
```

This is some more info

<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.
[^bignote]:
    Here's one with multiple paragraphs and code.  
    Indent paragraphs to include them in the footnote.  
    `{ my code }`  
    Add as many paragraphs as you like.
