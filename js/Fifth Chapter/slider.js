$('#G').slider();
$("#G").on("slide", function(slideEvt) {
	$("#greenSlider").text(slideEvt.value);
});
