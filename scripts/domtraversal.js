var allelements = null;
var currentelem_index = 0;
var currentState = "PAUSED";

var u = null;

$(document).ready(function() {
	readFromBegining();

	$(document).keydown(function(e) {
		if(e.key == "Escape") {
			setToPaused();
		}
	});
});

function readFromBegining() {
	allelements = $("*");
	currentelem_index = 0;
	currentState = "READING";

	findTheNextOne();
}

function findTheNextOne() {

	do {
		var currentelem = allelements[currentelem_index];
		currentelem_index++;
	}
	while(!doesItSpeak(currentelem));
	speakMe(currentelem);
}

function doesItSpeak(elem) {
	console.log($(elem)[0].tagName);
	if($(elem)[0].tagName == "A"){
		return true;
	}
	return false;
}

function speakMe(elem) {
	$(elem).focus();
	$('html', 'body').animate({

	});

	//console.log(elem);
	u = new SpeechSynthesisUtterance($(elem).text());
	u.onend = function(event) {
		if(currentState == "READING") {
			findTheNextOne();
		} else if(currentState == "READONBACK") {

		}
	}
	speechSynthesis.speak(u);
}

// Finds and reads the next node, starting from the current position
function findTheNextOne() {

}

function setToPaused() {
	currentState = "PAUSED";
	speechSynthesis.cancel();
}









