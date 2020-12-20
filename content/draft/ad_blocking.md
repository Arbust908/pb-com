How to detect if an Adblocker is being used with JavaScript
A strategy I use to add my own ad to the site if I know an adblocker is being used
Published May 09, 2020

It’s pretty common for prosumers and technical people like programmers to use an adblocker.

On my website, I estimate about 20% to 25% of the visitors use an adblocker of some sorts.

I have no problems in that, even though I support the blog using ads, but one thing I wanted to do was to promote one of my products only if you had an adblocker enabled, so you don’t see an ad from Carbon, the network I use, but a link to something I do want to promote.

I’d hate to see this technique used to show a “disable the adblocker!” kind of message, because I find it annoying when I see it used. If you do so, consider the option to promote your own products instead of advertising other people’s products. Just an idea.

If you have an adblocker enabled right now, you can see a “Sponsor” right after the title - well, that’s the product I want to promote - a thing I’m currently building and I am testing the idea by seeing how many people sign up to the waiting list.

Without an adblocker, that place is busy with an ad, so I don’t want to have too many ads at the same time and cripple the experience to the nice people that help keeping this blog running.

This JavaScript snippet helps me do the thing.

let adBlockEnabled = false
const ad = document.createElement('div')
ad.innerHTML = '&nbsp;'
ad.className = 'adsbox'
document.body.appendChild(ad)
window.setTimeout(function() {
if (ad.offsetHeight === 0) {
adblockEnabled = true
}
ad.remove()
console.log('Blocking ads? ', adblockEnabled)
}
}, 100)
Make sure you place it at the bottom of the page to run it when the DOM is loaded, or wait for the DOMContentLoaded event.

Once you know the adblockEnabled value, you can add your own custom ad to the page.

Here’s the script I use to do that:

if (adblockEnabled) {
const link = document.createElement('a')
link.setAttribute('href', 'https://prototyped.dev')
link.setAttribute('target', '\_blank')
const img = document.createElement('img')
img.src = '/img/prototyped.png'
img.style.paddingBottom = '30px'
img.style.margin = '0 auto'
img.style.maxWidth="65%";
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
img.style.filter="invert(100%)"
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
const newColorScheme = e.matches ? "dark" : "light"
if (newColorScheme === 'light') {
img.style.filter = ''
} else {
img.style.filter="invert(100%)"
}
})
link.appendChild(img)
document.querySelector('.prototyped').classList.remove('hidden')
document.querySelector('.prototyped').appendChild(link)
}
I load an image, invert it if it’s dark mode, make it a link to the https://prototyped.dev website, the new idea I’m testing, and I add it to the page.
