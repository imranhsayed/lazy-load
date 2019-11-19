

/*
* Calls the given function after the given interval.
*
* @param {Object} func Function name.
* @param {number} wait Time in milliseconds.
*
* @return {Function} Debounced function.
*/
const debounce = ( func, wait ) => {

	let timeout;

	/**
	 * Debounce function.
	 */
	return function() {

		const context = this,
		      args = arguments;

		/**
		 * Later function.
		 */
		const later = function() {
			timeout = null;
			func.apply( context, args );
		};

		clearTimeout( timeout );

		timeout = setTimeout( later, wait );
	};

};

// When the content is loaded.
document.addEventListener('DOMContentLoaded', function() {

	// Get all the images on the page that have 'data-src' attribute.
	let lazyloadImages = document.querySelectorAll('[data-src]');

	/**
	 * Lazy load function.
	 *
	 * Loops through each img on the page and checks if its in the viewport.
	 * If it is in the viewport, takes the original image size from the 'data-src', and 'data-srcset' attributes and
	 * replaces the lightweight image
	 */
	function lazyload () {

		// Loop through each image on the page.
		lazyloadImages.forEach(function( img ) {

			// Get the top position of each image.
			const imgTop = img.getBoundingClientRect().top;

			// Check id image in Viewport ( If the image top position is less than window's inner height.
			if( imgTop < window.innerHeight ) {

				// Get the original image size from the 'data-src' attributed and replace the lightweight image with the original one.
				const dataSrc = img.getAttribute( 'data-src' );
				img.setAttribute( 'src', dataSrc );

				// Get the original image size from the 'data-srcset' attributed and replace the lightweight image with the original one.
				const dataSrcSet = img.getAttribute( 'data-srcset' );

				if ( dataSrcSet ) {
					img.setAttribute( 'srcset', dataSrcSet );
				}
			}
		});

		// If there are no images on the page, remove the events.
		if( 0 === lazyloadImages.length ) {
			document.removeEventListener("scroll", lazyload);
			window.removeEventListener("resize", lazyload);
			window.removeEventListener("orientationChange", lazyload);
		}
	}

	/**
	 * Add events on 'scroll', 'resize' and 'orientationchange'
	 * Also use debounce to avoid multiple functions calls within the same time interval.
	 */
	document.addEventListener("scroll", debounce( lazyload, 300 ) );
	window.addEventListener("resize", debounce( lazyload, 300 ));
	window.addEventListener("orientationChange", debounce( lazyload, 300 ));

	// Call the lazyload() first time the window loads.
	lazyload();

});
