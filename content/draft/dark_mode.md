How to invert colors using CSS
How to invert colors of elements and images using CSS
Published Oct 05, 2019

I had this problem. I added a “black on white” image on a page, only to realize that with dark mode, my page correctly changes the background to black, but the image remains white on black.

Kind of bad.

So I added this rule to my CSS to detect dark mode and automatically invert the color of the image:

@media (prefers-color-scheme: dark) {
.my-image {
filter: invert(100%);
}
}
It’s not 100% accurate in my case, because my dark background color is not perfectly black, but it’s better than nothing.

To make things perfect you could also add the image using a CSS background image instead of an img tag in HTML, and I could easily swap that in dark mode.
