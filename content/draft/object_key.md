How to check if a key exists in a JavaScript object
Published May 31, 2020

Given a JavaScript object, you can check if a property key exists inside its properties using the in operator.

Say you have a car object:

const car = {
color: 'blue'
}
We can check if the color property exists using this statement, that results to true:

'color' in car
We can use this in a conditional:

if ('color' in car) {

}
Another way is to use the hasOwnProperty() method of the object:

car.hasOwnProperty('color')
When inheritance is an important part of your applications structure, the difference is that in will result true even for properties inherited by parent objects. hasOwnProperty() doesn’t. It will only return true if the object has that property directly - not one of its ancestors.

I use a fallback mechanism when I want one property and fallback to a default value if that does not exist:

car.brand || 'Ford'
If the brand property key does not exist on the object, this statement results to the Ford string.
