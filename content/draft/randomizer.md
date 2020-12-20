How to shuffle elements in a JavaScript array
Published May 30, 2020

Short answer:

let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
list = list.sort(() => Math.random() - 0.5)
Long answer:

I had the need to shuffle the elements in a JavaScript array.

In other words, I wanted to remix the array elements, to have them in a different order than the previous one.

Starting from an array like this:

[1, 2, 3, 4, 5, 6, 7, 8, 9]
I wanted something different any time I ran the operation, like this:

[4, 8, 2, 9, 1, 3, 6, 5, 7]
[5, 1, 2, 3, 7, 4, 9, 6, 8]
[3, 1, 4, 7, 8, 6, 2, 9, 5]
Here is the process I came up with. Given the array list:

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
We can call the sort() method, which accepts a function that returns a value between -0.5 and 0.5:

list.sort(() => Math.random() - 0.5)
This function is ran for every element in the array. You can pass 2 elements of the array, like this: list.sort((a, b) => Math.random() - 0.5) but in this case we’re not using them. If the result of this operation is < 0, the element a is put to an index lower than b, and the opposite if the result is > 0.

You can read all the details on Array.sort() here.

Calling sort() on a list does not change the original array value.

Now you can assign the result of this operation to a new variable, like this:

const shuffled = list.sort(() => Math.random() - 0.5)
or you can also overwrite the existing list, if you declare that as a let variable:

let list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
list = list.sort(() => Math.random() - 0.5)
