Arrow functions vs regular functions in JavaScript
How are arrow functions different than regular functions in JS?
Published Jun 08, 2020

https://www.youtube.com/watch?v=LaqYB8wVeKA

Regular functions are the “old school” functions we use since the JavaScript inception:

function run() {

}
They can be run directly:

run()
or they can be assigned to a variable:

const run = function run() {

}

run()
When you do so, the function can also be anonymous:

const run = function () {

}

run()
The only difference is that now in the stack trace that appears when there is an error, you won’t see the function name any more.

Arrow functions, introduced in ES6 in 2015, are kinda like this last version of regular functions, because they do not have a name. Never.

The syntax “footprint” is smaller:

const run = () => {

}

run()
If we have one parameter, we can omit the parentheses:

const run = param => {

}

run()
And if we only have one statement, we can also omit the curly braces:

const run = param => 'running'
run()
In this case, the return value is the string 'running'.

Both arrow functions and regular functions can be used as object methods.

Now comes the biggest difference between those 2 functions, and it’s related to how this is bound in a method.

Consider this example:

const car = {
brand: 'Ford',
model: 'Fiesta',
start: function() {
console.log(`Started ${this.brand} ${this.model}`)
},
stop: () => {
console.log(`Stopped ${this.brand} ${this.model}`)
}
}
this in the start() method refers to the object itself.

But in the stop() method, which is an arrow function, it doesn’t.

this is not bound to the object instance. It points to what this points to in the outer scope.

This implies that arrow functions are not suitable to be used for object methods when you want to access this.

How to check if a JavaScript value is an array?
Find out how to determine if a JavaScript value is an array using the `Array.isArray()` method
Published Sep 25, 2019

Sometimes you got passed an object in a function, and you need to check if this is an array.

Maybe if it’s an array you perform some operation, and if it’s not an array you perform something else.

How can you determine if an object is an array?

Use the isArray() static method provided by the Array built-in object, introduced in ECMAScript 5:

const list = [1, 2, 3]
Array.isArray(list) //true
