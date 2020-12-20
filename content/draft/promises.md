How to wait for 2 or more promises to resolve in JavaScript
Say you need to fire up 2 or more promises and wait for their result. How to do that?
Published Oct 25, 2019

Say you need to fire up 2 or more promises and wait for their result.

And you want to go on, once you have both resolved.

How can you do so, in JavaScript?

You use Promise.all():

const promise1 = //...
const promise2 = //...

const data = await Promise.all([promise1, promise2])

const dataFromPromise1 = data[0]
const dataFromPromise2 = data[1]
If you prefer using pure promises and not async/await, use this syntax:

const promise1 = //...
const promise2 = //...

Promise.all([promise1, promise2]).then(data => {
const dataFromPromise1 = data[0]
const dataFromPromise2 = data[1]
})
