How to get last element of an array in JavaScript?
Find out how to get last element of an array in JavaScript
Published Sep 26, 2019

Suppose you have an array, like this:

const colors = ['red', 'yellow', 'green', 'blue']
How can you get the last item in the array?

In this case the array has 4 items.

You know you can get the first item using colors[0], the second using colors[1] and so on.

To get the last item without knowing beforehand how many items it contains, you can use the length property to determine it, and since the array count starts at 0, you can pick the last item by referencing the <array>.length - 1 item.

In this case:

const lastItem = colors[colors.length - 1]
