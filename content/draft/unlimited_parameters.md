How to accept unlimited parameters in a JavaScript function
How is it possible to have a function that accepts an unlimited number of parameters?
Published Jun 22, 2020

Let’s say we have a function called join() whose job is to join all the strings we pass to it.

For example we write a prototype that accepts 2 strings:

const join = (string1, string2) => {
return string1 + string2
}
and when we call it, we get a string that is the concatenation the 2 arguments we pass:

join('hi', ' flavio') // 'hi flavio'
One simple way is to append additional parameters that default to an empty string, like this:

const join = (string1, string2, string3 = '') => {
return string1 + string2 + string3
}
but this approach does not scale well, because we’d need to add a large number of parameters and our code would look pretty bad.

Instead, we can use this syntax, with the spread operator (...) followed by the name of the parameter we want to use. Inside the function, the parameter is an array, so we can simply call its .join() method to concatenate the strings it contains, passing an empty string as argument (otherwise it defaults to concatenate strings adding a comma between them):

const join = (...strings) => {
return strings.join('')
}
In our case we can also simplify this using the implicit return syntax available in arrow functions:

const join = (...strings) => strings.join('')
and we can call this in the same way we did before:

join('hi', ' flavio') // 'hi flavio'
join('hi', ' flavio', ' it', ' is', ' a', ' beautiful day!') // ''hi flavio it is a beautiful day!'
