Custom errors in JavaScript
Published Jun 29, 2020

JavaScript gives us a set of 8 error objects, which are raised in a try/catch expression depending on the error type. They are:

Error
EvalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError
I analyzed them all in the JavaScript errors tutorial.

Here I want to explain how to create your own custom errors by extending the base Error class:

class OutOfFuelError extends Error {}

class FlatTireError extends Error {}
Custom errors allow you to behave differently based on the specific error type, without resorting to use error messages to understand the kind of error.

try {
//some code
} catch (err) {
if (err instanceof OutOfFuelError) {
//handle error
} else if (err instanceof FlatTireError) {
//handle error
}
}
Before you can do so, of course the error must be explicitly thrown in your code:

try {
const car = new Car() //imagine we have a Car object

if (!car.fuel) {
throw new OutOfFuelError('No fuel!')
}
if (car.flatTire) {
throw new FlatTireError('Flat tire!')
}
} catch (err) {
if (err instanceof OutOfFuelError) {
//handle error
} else if (err instanceof FlatTireError) {
//handle error
}
}
During the error creation you can also customize anything related to the class, even customizing the parameters received by the constructor if you need:

class OutOfFuelError extends Error {
constructor(message) {
super(message)
this.name = "OutOfFuelError"
}
}
