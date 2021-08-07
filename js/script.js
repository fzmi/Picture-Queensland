/**
 * script.js
 */

/**
 * Animation of showing timeline, icons and desciption overlay.
 */
function welcomeAnimation() {
	$("#description").css("right", "20px");
	$("#timeline").css("left", "-330px");
	$("#menu-icon").css("left", "35px");
	$("#help-icon").css("left", "35px");

	$(".main").css("background-position", "0% 0%");
}

/**
 * Display a "Welcome back" message after the user closes the tab and re-opens.
 */
function welcomeBack() {
	var name = localStorage.getItem("name");
	if (name) {
		$("#welcome-back p").html("<strong>Welcome back,</strong> " + name + "!");
	} else {
		$("#welcome-back p").html("<strong>Welcome back,</strong> anonymous time traveller!");
	}
	$("#welcome-back").css("top", "20px");
	sessionStorage.setItem("visited-session", true);
	setTimeout(function () {
		$("#welcome-back").css("top", "-20vh");
	}, 3000);
}

var mouseDownX;
var mouseDownY;

function mouseDown(event) {
	mouseDownX = event.pageX;
	mouseDownY = event.pageY;
}

function mouseUp(event, url) {
	if (event.pageX == mouseDownX && event.pageY == mouseDownY) {
		window.location.href = url;
	}
}

function dragFunction(offset) {
	// Get the center of div to rotate.
	var boundingBox = document.getElementById('timeline').getBoundingClientRect();
	var centerX = (boundingBox.left + boundingBox.right) / 2;
	var centerY = (boundingBox.top + boundingBox.bottom) / 2;

	// Get the mouse position.
	var mouseX = event.pageX;
	var mouseY = event.pageY;

	var radians = Math.atan2(mouseX - centerX, mouseY - centerY);
	var degree = Math.round((radians * (180 / Math.PI) * -1) + 100);

	var rotateCSS = 'rotate(' + (degree + offset) + 'deg)';

	// Prevent the wheel being dragged out of the screen.
	if (degree + offset > -60 && degree + offset < 60) {
		$('#timeline').css({
			'transform': rotateCSS,
			'-moz-transform': rotateCSS,
			'-webkit-transform': rotateCSS
		});
	}
}

function changeName() {
	var name = localStorage.getItem("name");
	if (name) {
		var newName = prompt("Please enter your name.", name);
	} else {
		var newName = prompt("Please enter your name.");
	}
	if (newName != null) {
		localStorage.setItem("name", newName);
		$("#side-menu-profile-user-name").html(newName);
	}
}

$(document).ready(function () {

	// Don't show the "Picture Queensland" welcome screen if already seen.
	if (localStorage.getItem("visited-welcome")) {
		welcomeAnimation();
		if (!sessionStorage.getItem("visited-session")) {
			setTimeout(function () {
				welcomeBack();
			}, 1000);
		}
		sessionStorage.setItem("visited-session", true);
	} else {
		$("#welcome-page").css("display", "unset");
	}

	var name = localStorage.getItem("name");
	if (name) {
		$("#side-menu-profile-user-name").html(name);
	} else {
		$("#side-menu-profile-user-name").html("Anonymous user");
	}

	// Read the number of pictures unlocked, update to the menu.
	var unlockedStories = JSON.parse(localStorage.getItem("visited"));
	if (unlockedStories) {
		var count = unlockedStories.length;
		if (count > 1) {
			$("#side-menu-profile-user-count").html("" + count + " pictures unlocked");
		} else if (count == 1) {
			$("#side-menu-profile-user-count").html("1 picture unlocked");
		} else {
			$("#side-menu-profile-user-count").html("0 pictures unlocked");
		}
	} else {
		$("#side-menu-profile-user-count").html("0 pictures unlocked");
	}

	var unlockedTrophies = JSON.parse(localStorage.getItem("trophies"));
	if (unlockedTrophies) {
		for (i = 0; i < unlockedTrophies.length; i++) {
			$("#side-menu-trophy-" + unlockedTrophies[i] + " img").attr("src",
				"images/trophies/trophy-" + unlockedTrophies[i] + "-unlocked.png").css("filter", "unset");
			$("#side-menu-trophy-" + unlockedTrophies[i]).css("background-color", "#EEEEEE");
		}
	}

	// Handle the "Let's get started" button on the welcome screen.
	$("#welcome-page-start").click(function () {
		$("#welcome-page").css("height", "0");
		$("#welcome-page h1").css("margin-top", "0");
		welcomeAnimation();
		localStorage.setItem("visited-welcome", true);
		sessionStorage.setItem("visited-session", true);
	});

	$(".menu-open").click(function () {
		$("#side-menu").css("width", "300px");
	});

	$(".menu-close").click(function () {
		$("#side-menu").css("width", "0");
	});

	$("#menu-clear").click(function () {
		// Delete the cookie for debugging purpose.
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();
	});

	$(".timeline-button div[title]").tooltip({
		track: true,
		show: { duration: 300, delay: 200 }
	});

	// Make the timeline draggable. (can not use for loop btw)
	$('.drag-1').draggable({
		handle: '.timeline-button-1',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(80);
		}
	});

	$('.drag-2').draggable({
		handle: '.timeline-button-2',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(50);
		}
	});

	$('.drag-3').draggable({
		handle: '.timeline-button-3',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(20);
		}
	});

	$('.drag-4').draggable({
		handle: '.timeline-button-4',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(-10);
		}
	});

	$('.drag-5').draggable({
		handle: '.timeline-button-5',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(-40);
		}
	});

	$('.drag-6').draggable({
		handle: '.timeline-button-6',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(-70);
		}
	});

	$('.drag-7').draggable({
		handle: '.timeline-button-7',
		opacity: 0.001,
		helper: 'clone',
		drag: function (event) {
			dragFunction(-100);
		}
	});

	$("#side-menu-trophy-items div").tooltip({
		track: true,
		show: { duration: 300, delay: 100 }
	});
});
