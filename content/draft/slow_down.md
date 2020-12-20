How to slow down a loop in JavaScript
Published Apr 15, 2020

I had a loop where I wanted to call an API multiple times, e.g. 500 times.

APIs implement rate limiting and even if not, it’s just unkind to make those many requests in a very short time.

So I wanted to slow down the loop. How?

Turns out it’s pretty simple, once you set up a sleep() function, that you don’t need to change:

const sleep = (milliseconds) => {
return new Promise(resolve => setTimeout(resolve, milliseconds))
}
Then you can call await sleep(1000) to stop 1 second in every iteration, like this:

const list = [1, 2, 3, 4]
const doSomething = async () => {
for (const item of list) {
await sleep(1000)
console.log('🦄')  
 }
}

doSomething()
