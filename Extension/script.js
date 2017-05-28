
function cleanPage() {

	var images = document.body.getElementsByTagName("img");

	var gifs = [];
	// Grab all image elements that have *.gif in their src attr
	for(let image of images)
	{
		if (image.hasAttribute("src"))
		{
			var src = image.getAttribute("src").toLowerCase();
			if (src.endsWith(".gif") || src.includes(".gif?"))
			{
				gifs.push(image);
			}
		}
	}

	// Replace the src attr name with gifffer
	for(let gif of gifs)
	{
		gif.setAttribute("data-gifffer", gif.getAttribute("src"));
		gif.removeAttribute("src");
	}

	var videos = document.body.getElementsByTagName("video");
	for(let video of videos)
	{
		video.removeAttribute("autoplay");
		video.removeAttribute("playsinline");
		video.removeAttribute("webkit-playsinline");
		video.setAttribute("preload", "none");
	}
	
	// Load Gifffer
	Gifffer();
}

document.addEventListener("DOMContentLoaded", function(event) {

	cleanPage();

	// Re-clean when there are element changes in the DOM
	var observer = new MutationObserver(function(mutations) {
		cleanPage();
	});

	var config = { childList: true };
	observer.observe(document.getElementsByTagName("body")[0], config);
});
