he Math.random() will generate a pseudo-random floating number (a number with decimals) between 0 (inclusive) and 1 (exclusive).
Here, the random number doesn’t mean that you always get a unique number. It generates the same number only after some interval. The interval here is very long, so you probably won’t get the same number twice.
To generate a random number, we can use:
Math.random(); //0.6140915758927235 may be you get different value
Defining our own random number function:
function rand(maxLimit = 100) {
return Math.random() _ maxLimit;
}  
rand(10); // 5.500949568251157
To get whole numbers, we can use:
Math.floor() → to round down
Math.ceil() → to round up
Math.round() → to nearest number
// using Math.floor
function rand(maxLimit = 100) {
let rand = Math.random() _ maxLimit;
return Math.floor(rand);
}
// the above code generates any numbers between 0 to maxLimit-1
To get a random number between two numbers (min included, max excluded):
function rand(min, max) {
let randomNum = Math.random() _ (max - min) + min;
return Math.floor(randomNum);
}
rand(10, 20);
In the above code, (max-min) + min is just to handle if there is any case when the max is less than the min. In such a case, where max is less than min:
max = 5, min = 10
(max - min) + min => (5 - 10) + 5 => -5 + 5 => 0
To get random numbers including min and max element, we can change Math.floor to Math.round :
function rand(min, max) {
let randomNum = Math.random() _ (max - min) + min;
return Math.round(randomNum);
}
rand(10, 20);
Generating Random Hex Colours
We know that hex colours have 1–9 and a-f .
To generate random colours:
Store hex values on array
Use math.rand to get index
Create a color string of length six or three.

function rand(min, max) {
let randomNum = Math.random() \* (max - min) + min;
return Math.round(randomNum);
}

var generateColor = function () {
// hex numbers
var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var color = '#';
// we will generate hex color with 6 digit length
for (var i = 0; i < 6; i++) {
let index = rand(0,15);
// Append hex value at the index
color += hex[index];
}
return color;
};
