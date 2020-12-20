How can you tell what type a value is, in JavaScript?
Published Jun 06, 2020

https://www.youtube.com/watch?v=uMcbpZtODdE

JavaScript has a few built-in types, including numbers, strings, booleans, objects.

Using the typeof operator we can check what is the type of a value assigned to a variable.

For example:

typeof 'test'
Note that it’s not a function, it’s an operator, so parentheses are not required.

Using it, we will get a string back, returning one of the following values:

'number'
'string'
'boolean'
'undefined'
'bigint'
'symbol'
'object'
'function'
Note that there is no null type, and

typeof null
will return 'object'.

Arrays will return 'object' too:

typeof [1, 2, 3] //'object'
Functions are a special kind of objects, as we can add properties and methods to functions:

const talk = () => {}
talk.test = true
but they have their own value 'function' if we use the typeof operator.
