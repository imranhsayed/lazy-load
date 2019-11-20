## Lazy Load

WordPress theme to demonstrate lazy load

## Demo

![](lazy-load.gif)

## The Concept

We first add the lightweight image URL in the src and srset attributes, and the actual image URL and actual srcset into data-src and data-srcset respectively.
On initial page load, on window resize, scroll and change in orientation we call the lazyload() with debounce.
The lazy load function loops through each image on the page and checks if its in the viewport .
If it is in the viewport, takes the original image URLs from the data-src and data-srcset attributes and replace the lightweight image with the original one, so we get a blur effect.
We will also add a image container with off-white background and a proper set height( using padding in % ) so it shows when while the images are being loaded.

******* PLEASE STAR MY REPO TO SUPPORT ME ******

Please follow 🙏

Twitter - [@imranhsayed](https://twitter.com/imranhsayed)

Github - [imranhsayed](https://github.com/imranhsayed)

## Demo 2

![](lazy-load-2.gif)
