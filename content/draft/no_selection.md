How to disable text selection using CSS
Find out how to disable text selection using the CSS property `user-select`
Published Jul 30, 2019

By default browsers let us select the text in the browser using the keyboard, pressing the cmd-A combination on a Mac for example, or using the mouse.

How can you disable that, to make your web page behave more like an app and less like a document?

Use the user-select: none; CSS rule.

You need to use browser prefixes, as https://caniuse.com/#feat=user-select-none tells us:

-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
One thing I use sometimes is to make all the app interface unselectable applying user-select: none; on the body element, then I can re-enable it on specific elements, using:

user-select: text;
