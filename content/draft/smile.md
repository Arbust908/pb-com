The HTML `picture` tag
Discover the basics of working with images and the HTML `picture` tag, and how to make them responsive
Published Aug 15, 2019

HTML gives us the picture tag, which does a very similar job of the srcset attribute of an img tag, and the differences are very subtle.

You use picture when instead of just serving a smaller version of a file, you completely want to change it. Or serve a different image format.

The best use case I found is when serving a WebP image, which is a format still not widely supported. In the picture tag you specify a list of images, and they will be used in order, so in the next example, browsers that support WebP will use the first image, and fallback to JPG if not:

<picture>
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="An image">
</picture>
The source tag defines one (or more) formats for the images. The img tag is the fallback in case the browser is very old and does not support the picture tag.

In the source tag inside picture you can add a media attribute to set media queries.

The example that follows kind of works like the above example with srcset:

<picture>
  <source media="(min-width: 500w)" srcset="dog-500.png" sizes="100vw">
  <source media="(min-width: 800w)" srcset="dog-800.png" sizes="100vw">
  <source media="(min-width: 1000w)" srcset="dog-1000.png"	sizes="800px">
  <source media="(min-width: 1400w)" srcset="dog-1400.png"	sizes="800px">
  <img src="dog.png" alt="A dog image">
</picture>
But that’s not its use case, because as you can see it’s much more verbose.

The picture tag is recent but is now supported by all the major browsers except Opera Mini and IE (all versions).

The HTML `figure` tag
Discover the basics of working with the HTML `figure` tag
Published Aug 18, 2019

Often used along with the img tag is the figure tag.

figure is a semantic tag often used when you want to display an image with a caption. You use it like this:

<figure>
    <img src="dog.png"
         alt="A nice dog">
    <figcaption>A nice dog</figcaption>
</figure>
The figcaption tag wraps the caption text.

Responsive images using `srcset`
How to use the HTML img tag srcset attribute to define responsive images
Published May 07, 2020

The srcset attribute of the img tag allows you to set responsive images that the browser can use depending on the pixel density or window width, according to your preferences. This way, it can only download the resources it needs to render the page, without downloading a bigger image if it’s on a mobile device, for example.

Here’s an example, where we give 4 additional images for 4 different screen sizes:

<img src="dog.png"
  alt="A picture of a dog"
  srcset="dog-500.png 500w,
         dog-800.png 800w,
       dog-1000.png 1000w,
       dog-1400.png 1400w">
In the srcset we use the w measure to indicate the window width.

Since we do so, we also need to use the sizes attribute:

<img src="dog.png"
  alt="A picture of a dog"
  sizes="(max-width: 500px) 100vw, (max-width: 900px) 50vw, 800px"
  srcset="dog-500.png 500w,
         dog-800.png 800w,
       dog-1000.png 1000w,
       dog-1400.png 1400w">
In this example the (max-width: 500px) 100vw, (max-width: 900px) 50vw, 800px string in the sizes attribute describes the size of the image in relation to the viewport, with multiple conditions separated by a comma.

The media condition max-width: 500px sets the size of the image in correlation to the viewport width. In short, if the window size is < 500px, it renders the image at 100% of the window size.

If the window size is bigger but < 900px, it renders the image at 50% of the window size.

And if even bigger, it renders the image at 800px.

The vw unit of measure can be new to you, and in short we can say that 1 vw is 1% of the window width, so 100vw is 100% of the window width.

A useful website to generate the srcset and progressively smaller images is https://responsivebreakpoints.com/.
