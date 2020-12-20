Chaining method calls in JavaScript
Published Jul 03, 2020

In JavaScript sometimes we can chain method calls, like this:

car.start().drive()
It’s pretty convenient to do so.

Instead of writing

car.start()
car.drive()
we can simplify in a one-liner.

This is possible if each method returns the object itself. In other words, the implementation must be something like this:

const car = {
start: function() {
console.log('start')
return this
},
drive: function() {
console.log('drive')
return this
}
}
It’s important to note that you can’t use arrow functions, because this in an arrow function used as object method is not bound to the object instance.

I like to use arrow functions all the time, and this is one of the cases where you can’t.

Chained method calls are great when you are not returning a set of values from the method, otherwise you obviously need to assign a method call to a variable, and chaining is not possible:

const result = car.start()
if (result) {
car.drive()
}
