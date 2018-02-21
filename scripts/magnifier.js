var _browserZoomVal;
var _graphicalZoomVal;
var zoomDelta;

var offsetOnZoom;
var xOffset;
var yOffset;
var mouseDetectionoffset;

var keyPlus;
var keyMinus;

var windowWidth;
var windowHeight;
var bodyWidthBeforeGZ;
var bodyWidthAfterGZ;

var selectedText;
var refactoredContentContainer;

function initializeZoom() {
	_browserZoomVal = 1.0;
	_graphicalZoomVal = 1.0;
	zoomDelta = 0.1;

	offsetOnZoom = 10;
	mouseDetectionoffset = 100;

	windowWidth = $(window).width();
	windowHeight = $(window).height();
	xOffset = windowWidth/2;
	yOffset = windowHeight/2;

	bodyWidthBeforeGZ = $("body").width();
	bodyWidthAfterGZ = bodyWidthBeforeGZ;

	keyPlus = 187;
	keyMinus = 189;

	selectedText = "";

	$("body").before("<div id='mydiv'></div>");
	console.log("created");
	refactoredContentContainer = $("<div id='mydiv'></div>");
}

$(document).ready(function() {

	initializeZoom();

	$("#mydiv").hide(100);

	$(document).on('mousemove', function(e) {
		xOffset = getXCoord(e);
		yOffset = getYCoord(e);
		correctContentStartingPosition();
	});

	$(document).on('mouseout', function(e) {
		clearCoor();
	});

	$(document).on('keydown', function(e) {
		e.preventDefault();

		// Detect keydown: shift+plus and shift+minus
		if ((e.key == '+' || e.keyCode == keyPlus) && (e.shiftKey)) {
  			_browserZoomVal += zoomDelta;
      	} 

      	else if ((e.key == '-' || e.keyCode == keyMinus) && (e.shiftKey)) {
			_browserZoomVal -= zoomDelta;
      	}

      	else if ((e.metaKey || e.ctrlKey) && (e.key == '+' || e.keyCode == keyPlus)) {
      		_graphicalZoomVal += zoomDelta;
      	}

      	else if ((e.metaKey || e.ctrlKey) && (e.key == '-' || e.keyCode == keyMinus)) {
      		_graphicalZoomVal -= zoomDelta;
      	}

      	else if ((e.key == ' ' || e.keyCode == 32)) {
      		$("#mydiv").show(100);
      		$("*:not(body)").hover(
    			function (ev) {
    				selectedText = $(this).text();
    				refactorContent(selectedText);
    			},
    			function (ev) {
    				// Do nothing
    			}
 			);
 			
      	}

      	else if(e.key == "Escape") {
    		$("#mydiv").hide(100);
      	}

      	bodyWidthAfterGZ *= _graphicalZoomVal;
      	adjustWidthDuringGZ();

      	browserZoom();
      	graphicalZoom();
	});
});

function browserZoom() {
	document.body.style.zoom = _browserZoomVal;
}

function graphicalZoom() {
	$("body").css("transform", "scale("+_graphicalZoomVal+")");
	compensateGraphicalScaling();
}

function compensateGraphicalScaling() {
	var scaleToW = $("body").width() * _graphicalZoomVal;
	var scaleToH = $("body").height() * _graphicalZoomVal;

	var topOriginal = $('body').offset().top;
	var topNew = topOriginal * _graphicalZoomVal;

	$("body").css("position", "relative");
	$("body").css("left", (scaleToW-($("body").width()))/2);
	$("body").css("top", (scaleToH-($("body").height()))/2);

	if($(document).width() >= $(window).width()) {


		var mouseX = xOffset;
		var mouseY = yOffset;

		if (xOffset <= mouseDetectionoffset) {

			console.log("aaa" + offsetOnZoom);
			$("body").scrollLeft( 300 );
			offsetOnZoom++;
		}
	}
}

function getXCoord(event) {
    return event.clientX;
}

function getYCoord(event) {
    return event.clientY;
}

function clearCoor() {
}

function correctContentStartingPosition() {
	// if (yOffset <= mouseDetectionoffset) {
	// 	offsetOnZoom++;
	// 	$("body").css('margin-top', offsetOnZoom+'px');
	// } 
	// else {
	// 	if (xOffset <= mouseDetectionoffset) {
	// 		offsetOnZoom++;
	// 		$("body").css('margin-left', offsetOnZoom+'px');
	// 	} 
	// 	else if (xOffset >= $(window).width()-mouseDetectionoffset) {
	// 		offsetOnZoom--;
	// 		$("body").css('margin-left', offsetOnZoom+'px');
	// 	}	
	// }
}

function adjustWidthDuringGZ() {
	var shiftDelta = (bodyWidthAfterGZ - bodyWidthBeforeGZ) / 2;
	$("body").css("left", shiftDelta+"px");
}

function resetZoomToDefault() {

}

function refactorContent(contentToRefactor) {
	console.log("hi: "+contentToRefactor);
	$('#mydiv').empty().append(contentToRefactor);
}






