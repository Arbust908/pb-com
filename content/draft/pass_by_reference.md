Are values passed by reference or by value in JavaScript?
Published Jun 27, 2020

The answer is: it depends!

Primitive types are passed by value.

Objects are passed by reference.

Primitive types are numbers, strings, booleans, null, undefined and symbols.

Everything that’s not a primitive type is an object. Arrays are objects. Functions are objects.

When you pass a number to a function, it’s copied into the function:

const increment = num => {
num = num + 1
}

const num = 2
increment(num)

console.log(num) //2
If you pass an object, it’s passed by reference, so if you modify one of its properties, also the original object is modified:

const increment = num => {
num.value = num.value + 1
}

const num = {
value: 2
}

increment(num)

console.log(num.value) //3
