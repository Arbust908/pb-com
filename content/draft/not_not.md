What does the double negation operator !! do in JavaScript?
You might find the `!!` operator used in the wild. What does it mean?
Published Sep 01, 2019

Suppose you have an expression, which gives you a result.

You want this result to be a boolean. Either true or false.

Not a string, 0, an empty string, undefined, NaN or whatever. true or false.

The !! operator does that.

And in reality it’s two negation operators one after the other. There’s no !! operator in JavaScript. But there’s !.

It first negates the result of the expression, then it negates it again. In this way if you had a non-zero number, a string, an object, an array, or anything that’s truthy, you’ll get true back.

Otherwise you’ll get false.
