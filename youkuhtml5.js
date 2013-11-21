var html5video = document.getElementById('youku-html5player-video');
$('#x-video-button').click(function () {
	html5video.play();
	$(this).css("display","none");
});
