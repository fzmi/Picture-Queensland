/**
 * script-event.js
 */
// Define time bounds of the events.
const EVENT_PERIOD = {
	"gold-rush": [1858, 1880],
	"ww1": [1914, 1918],
	"ww2": [1939, 1945]
};

const TROPHY_REQUIREMENT = 3;
const EVENT_REQUIREMENT = 3;

// Get the current event from the path name.
// e.g. ../event/gold-rush.php -> gold-rush
var event = document.location.pathname.split('/').slice(-1)[0].replace(/\.[^/.]+$/, "");
if (event == "") {
	event = "ww1"; // default (for debugging)
}

// [[recordId, marker, recordValue]]
var eventRecords = [];
var eventId = {};
var unlockedrecords = [];

var stories = {};
var unlockedStories = [];

var trophyUnlocked = false;

// [recordId, marker, recordValue]
var currentRecord = [];

// The current image url for the selected record.
var url = "";
var img = new Image();

// 0 = gameOver, 1 = gameOn, 2 = gamePause
var gameState = 0;
var gameTimestamp = 0;
var finishTime = 0;

// Leaflet custom map pin icon (locked)
var redIcon = L.icon({
	iconUrl: '../images/icons/map-pin.png',
	shadowUrl: '../css/images/marker-shadow.png',
	iconSize:     [30, 30], // size of the icon
	shadowSize:   [30, 30], // size of the shadow
	shadowAnchor: [10, 15], // the same for the shadow
	popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

// Leaflet custom map pin icon (unlocked)
var greenIcon = L.icon({
	iconUrl: '../images/icons/map-pin-visited.png',
	shadowUrl: '../css/images/marker-shadow.png',
	iconSize:     [30, 30], // size of the icon
	shadowSize:   [30, 30], // size of the shadow
	shadowAnchor: [10, 15], // the same for the shadow
	popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
});

/**
 * Get the year from the dcterms:temporal string.
 * e.g. "ca. 1940" -> "1940"
 * @param {String} year dcterms:temporal string
 * @returns {String} the year string
 */
function getYear(year) {
	if (year) {
		// This is regex: https://en.wikipedia.org/wiki/Regular_expression
		return year.match(/[\d]{4}/); 
	}
}

function abbrToFull(event) {
	switch(event) {
		case "gold-rush":
			return "Gold Rush";
		case "ww1":
			return "World War I";
		case "ww2":
			return "World War II";
	}
}

/**
 * Get the coordinates from the dcterms:spatial string.
 * e.g. "Brisbane, Queensland; -27.46888,153.022827" -> [-27.46888, 153.022827]
 * @param {String} spatial dcterms:spatial string
 * @returns {Array} the list of coordinates
 */
function getCoords(spatial) {
	if (spatial) {
		var spatialList = spatial.split(";");
		if (spatialList[1]) {
			var latLong = spatialList[1].split(",");
			var lat = latLong[0].trim();
			var long = latLong[1].trim();
			if (!isNaN(lat) && !isNaN(long)) {
				return [lat, long];
			}
		}
	}
}

/* ------------------------------------------------ */
/*				    EVENT SECTION					*/
/* ------------------------------------------------ */

var storyPanelShow = false;

function toggleStoryPanel() {
	storyPanelShow = !storyPanelShow;
	if (storyPanelShow) {
		$(".story-thumbnail").remove();
		$("#story").css("height", "17vh");
		if (unlockedStories.length > 0) {
			$("#story p").remove();
			for (i = 0; i < unlockedStories.length; i++) {
				$("#story-list").prepend("<button class='story-thumbnail' onclick='showStoryOverlay(" + unlockedStories[i] + ")'><img src='" + 
				eventRecords[eventId[unlockedStories[i]]][2]["150_pixel_jpg"] + "'>")	
			}
		}
	} else {
		$("#story").css("height", "0");
	}
}

/**
 * Event Section: Handle the "Unlock this image"/"View image" buttons of the map popups.
 * @param {*} recordId the id of the record
 */
function mapPinButtonClick(recordId) {
	// Get the marker from the recordId given.
	var marker = eventRecords[eventId[recordId]][1];
	
	// The user has not unlocked this image.
	if (marker.getIcon() == redIcon) {
		enterChallenge(recordId);

	// The user has unlocked this image.
	} else if (marker.getIcon() == greenIcon) {
		showPopupOverlay(recordId);
	}
}

/**
 * Event Section: Unlock the map popup content of the given record.
 * @param {*} recordId the id of the record
 */
function mapPinUnlock(recordId) {
	$("#map-popup-image-" + recordId).addClass("map-popup-visited");
	$("#map-popup-question-" + recordId).addClass("map-popup-visited");
	$("#map-popup-button-" + recordId).html("View image");
}

/**
 * Event Section: Open the full-screen record presentation overlay.
 * @param {*} recordId the id of the record
 */
function showPopupOverlay(recordId) {
	$("#map-popup-overlay").css("display", "flex");
	var record = eventRecords[eventId[recordId]][2];
	var imgUrl = record["1000_pixel_jpg"];
	$("#map-popup-overlay img").prop("src", imgUrl);
	$("#map-popup-overlay h3").html(record["dc:title"]);
	$("#map-popup-overlay p:nth-last-child(2)").html(record["dc:description"]);
}

/**
 * Event Section: Close the full-screen record presentation overlay.
 */
function closePopupOverlay() {
	$("#map-popup-overlay").css("display", "none");
}

function showStoryOverlay(recordId) {
	$("#story-popup-overlay").css("display", "flex");

	var record = eventRecords[eventId[recordId]][2];
	var imgUrl = record["1000_pixel_jpg"];
	$(".story-popup-overlay-image").attr("src", imgUrl);
	$(".story-popup-overlay-story").html(stories[recordId]);
	$(".story-popup-overlay-description").html(record["dc:title"]);
}

function closeStoryOverlay() {
	$("#story-popup-overlay h3").remove();
	$("#story-popup-overlay").css("display", "none");
}

function showTrophyOverlay() {
	if (trophyUnlocked) {
		$(".trophy-popup-image").attr("src", "../images/trophies/trophy-" + event + "-unlocked.png");
		$("#trophy-popup-overlay h3").html(abbrToFull(event) + " Trophy");
	} else {
		$(".trophy-popup-image").attr("src", "../images/trophies/trophy-" + event + "-locked.png");
		$("#trophy-popup-overlay h3").html("Locked");
	}
	$("#trophy-popup-overlay").css("display", "flex");
}

function closeTrophyOverlay() {
	$("#trophy-popup-overlay").css("display", "none");
}

function showLeaderboardOverlay() {
	$("#leaderboard-popup-overlay").css("display", "flex");
}

function closeLeaderboardOverlay() {
	$("#leaderboard-popup-overlay").css("display", "none");
}

/* ------------------------------------------------ */
/*				  CHALLENGE SECTION					*/
/* ------------------------------------------------ */

/**
 * Event Section -> Challenge Section, reset all interface of the challenge section.
 * @param {*} recordId the id of the record
 */
function enterChallenge(recordId) {
	// Navigation Bar
	$("#event-nav-back").css("width", "50px");
	$("#event-nav-back").css("opacity", "1");
	$(".map-button-random").css("display", "none");
	$(".map-button-random").css("opacity", "0");

	$("#event-nav-close").css("margin-right", "-100px");

	// Hide Event Section
	$("#map-data").css("display", "none");

	// Show Challenge Section
	$(".game-canvas").css("display", "flex");
	$(".game").css("display", "unset");
	$(".drop-zone-paused").css("display", "none");

	// Reset Info Zone (right panel)
	$(".info-zone-timer").html("0.0");
	$(".info-zone-button").css("display", "flex");
	$(".info-zone-result").css("display", "none");
	$(".info-zone-result2").css("display", "none");

	// Reset Drop Zone (left panel)
	$(".drop-zone-background").css("opacity", "0.2");
	$(".drop-zone-info").css("display", "block");
	$(".drop-zone-description").css("display", "none");
	loadImage(recordId);
}

/**
 * Challenge Section: Initialise the image of the game.
 * @param {*} recordId the id of the record
 */
function loadImage(recordId) {
	// Load the image of the given record.
	if (recordId) {
		url = eventRecords[eventId[recordId]][2]["1000_pixel_jpg"];
		currentRecord = eventRecords[eventId[recordId]];
	// Load a random image if not specify recordId.
	} else {
		var num = Math.floor(Math.random() * (eventRecords.length - 0 + 1));
		url = eventRecords[num][2]["1000_pixel_jpg"];
		currentRecord = eventRecords[num];
	}
	$(".drop-zone-background").css("background-image", "url('" + url + "')");

	img.url = url;
	("#the-game").src += '';
}
	
/**
 * Challenge Section: Start the game.
 */
function gameStart() {
	$(".drop-zone-info").css("display", "none");
	$(".drop-zone-background").css("opacity", "0.2");
	$("#game-start").html("Pause");
	$("#game-start").css("background-color", "rgba(63,160,239,1)");
	$(".game").css("display", "unset");
	$(".drop-zone-puzzles").css("display", "block");

	gameTimestamp = 0;
	timer();
}

function gameSuccess() {
	gameOver("win");
}

/**
 * Challenge Section: The running timer when the game is on.
 */
function timer() {
	var interval = setInterval(function() {
		// Dealing with floating number precision.
		if (gameState == 1) {
			gameTimestamp = ((gameTimestamp * 10 + 1) / 10).toFixed(1);
			$(".info-zone-timer").html(gameTimestamp);
		} else {
			clearInterval(interval);
			// gameTimestamp = 0;
		}
	}, 100);
}

function gamePause() {
	$(".drop-zone-paused").css("display", "flex");
	$("#game-start").html("Resume");
	$("#game-start").css("background-color", "rgba(115,24,44,1)");
}

function gameResume() {
	$(".drop-zone-paused").css("display", "none");
	$("#game-start").html("Pause");
	$("#game-start").css("background-color", "rgba(63,160,239,1)");
	timer();
}

function gameRestart() {
	$(".drop-zone-paused").css("display", "none");
	$(".drop-zone-info").css("display", "block");

	$("#game-start").html("Start");
	$("#game-start").css("background-color", "rgba(91,153,90,1)");
	$(".game").css("display", "none");
	$(".drop-zone-puzzles").css("display", "none");

	gameTimestamp = 0;
	$(".info-zone-timer").html("0.0");
}

/**
 * Challenge Section: Handle when the game is finished. 
 * @param {*} state Either "win" or "fail"
 */
function gameOver(state) {

	gameState = 0;
	finishTime = gameTimestamp;
	$(".info-zone-timer").html(finishTime);

	var recordId = currentRecord[0];
	var marker = currentRecord[1];
	var recordvalue = currentRecord[2];

	// Drop Zone (left panel)
	$(".drop-zone-background").css("opacity", "1");
	$(".drop-zone-puzzles").css("display", "none");
	$(".drop-zone-description h3").html(recordvalue["dc:title"]);
	$(".drop-zone-description p").html(recordvalue["dc:description"]);
	$(".drop-zone-description").css("display", "block");

	$(".drop-zone-info").css("display", "none");
	$(".drop-zone-paused").css("display", "none");

	// Info Zone (right panel)
	$("#game-start").html("Start");
	$("#game-start").css("background-color", "rgba(91,153,90,1)");
	$(".info-zone-button").css("display", "none");

	// Unlock the record.
	marker.setIcon(greenIcon);
	mapPinUnlock(recordId);
	unlockedrecords.push(recordId);

	// Insert the visited record id into the local storage.
	var visitedRecords = JSON.parse(localStorage.getItem("visited"));
	if (visitedRecords) {
		visitedRecords.push(recordId);
		localStorage.setItem("visited", JSON.stringify(visitedRecords));
		// localStorage.setItem("visited-count", localStorage.getItem("visited-count") + 1);
	} else {
		localStorage.setItem("visited", JSON.stringify([recordId]));
		// localStorage.setItem("visited-count", JSON.stringify(1));
	}

	if (stories[recordId]) {
		unlockedStories.push(recordId);

		var stories2 = JSON.parse(localStorage.getItem("story-visited"));
		if (stories2) {
			stories2.push(recordId);
			localStorage.setItem("story-visited", JSON.stringify(stories2));
		} else {
			var array = [recordId];
			console.log("e" + array);
			localStorage.setItem("story-visited", JSON.stringify(array));
		}

		var unlocked = unlockedStories.length;
		$("#progress-bar p").html("Story (" + unlocked + "/"+ TROPHY_REQUIREMENT +")");
		$(".progress-bar-color").css("width", Math.round(unlocked / TROPHY_REQUIREMENT * 100) + "%");
		$("#story-popup-overlay > article").prepend("<h3>You just discovered a new story!</h3>");
		showStoryOverlay(recordId);
		if (unlocked == 1) {
			$("#story p").remove();
		}
		$("#story-list").prepend("<button class='story-thumbnail' onclick='showStoryOverlay(" + recordId + ")'><img src='" + 
			eventRecords[eventId[recordId]][2]["150_pixel_jpg"] + "'></button>")
		if (unlocked == TROPHY_REQUIREMENT) {
			$("#event-nav-trophy img").attr("src", "../images/trophies/trophy-unlocked.png");
			
			var unlockedTrophies = JSON.parse(localStorage.getItem("trophies"));
			if (unlockedTrophies) {
				unlockedTrophies.push(event);
				if (unlockedTrophies.length == EVENT_REQUIREMENT) {
					// If collected all of the trophies, unlock the final trophy.
					unlockedTrophies.push("all");
					localStorage.setItem("trophies", JSON.stringify(unlockedTrophies));
				} else {
					localStorage.setItem("trophies", JSON.stringify(unlockedTrophies));
				}
			} else {
				localStorage.setItem("trophies", JSON.stringify([event]));
			}
			trophyUnlocked = true;
			showTrophyOverlay();
		}
	}

	// If the user already has a name, directly hide the name prompt section.
	var name = localStorage.getItem("name");
	if (state == "win") {
		if (name) {
			nameSubmit(name);
			leaderboard(name, finishTime);
		} else {
			$(".info-zone-result").css("display", "block");
		}
	} else {
		$(".info-zone-result").css("display", "none");
		$(".info-zone-result2").css("display", "block");
		if (name != null) {
			$(".info-zone-result2 h3").html("You can do it, " + name + " :)");
		} else {
			$(".info-zone-result2 h3").html("You can do it, time traveller :)");
		}
	}
}

/**
 * Challenge Section: Submit the name of the player when the game is finished.
 * @param {*} name the name of the player, null to be anonymous
 */
function nameSubmit(name) {
	$(".info-zone-result").css("display", "none");
	$(".info-zone-result2").css("display", "block");
	if (name != null) {
		$(".info-zone-result2 h3").html("Congratulations, " + name + "!");
	} else {
		$(".info-zone-result2 h3").html("Congratulations, time traveller!");
	}
}

/**
 * Challenge Section -> Event Section.
 */
function exitChallenge() {

	gameState = 0;

	// Navigation Bar
	$("#event-nav-back").css("width", "0");
	$("#event-nav-back").css("opacity", "0");
	$(".map-button-random").css("display", "block");
	$(".map-button-random").css("opacity", "1");

	$("#event-nav-close").css("margin-right", "0");
	
	// Hide Challenge Section
	$(".game-canvas").css("display", "none");
	$(".game").css("display", "none");

	// Show Event Section
	$("#map-data").css("display", "unset");
	// $("#")

	$("#game-start").html("Start");
	$("#game-start").css("background-color", "rgba(91,153,90,1)");
}

/* ------------------------------------------------ */
/*				   DOCUMENT READY					*/
/* ------------------------------------------------ */

$(document).ready(function() {

	$(".game").ready(function()	{
		// alert("game ready");
	});

	// Show the loading screen.
	$(".loading-screen").css("display", "block");

	/* ------------------------------------------------ */
	/*				  LOCAL STORAGE						*/
	/* ------------------------------------------------ */

	var data = {
		// Picture Queensland dataset.
		resource_id: RESOURCE_ID,
		limit: 2000
	};

	// Read all the records from the local storage.
	slqFromCache = JSON.parse(localStorage.getItem("slqData_" + data.resource_id));
	if (slqFromCache) {
		iterateRecords(slqFromCache);
	} else {
		$.ajax({
			url: DATASET_URL,
			data: data,
			dataType: "jsonp",
			cache: true,
			success: function(results) {
				localStorage.setItem("slqData_" + data.resource_id, JSON.stringify(results));
				iterateRecords(results);
			}	
		});
	}

	// Read the stories-text.json file.
	$.getJSON("../js/stories-text.json", function(data) {
		stories = data;
	});

	// Read the visited records from the local storage.
	visitedRecords = JSON.parse(localStorage.getItem("visited"));
	if (visitedRecords) {
		for (i = 0; i < visitedRecords.length; i++) {
			var record = eventRecords[eventId[visitedRecords[i]]];
			if (record) {
				var marker = record[1];
				marker.setIcon(greenIcon);
			}
		}
	}

	// Read the unlocked stories from the local storage.
	var unlocked = JSON.parse(localStorage.getItem("story-visited"));
	if (unlocked) {
		for (i = 0; i < unlocked.length; i++) {
			// Check if every unlocked story belongs to the current event.
			if (eventRecords[eventId[unlocked[i]]] && eventRecords[eventId[unlocked[i]]][0] == unlocked[i]) {
				unlockedStories.push(unlocked[i]);
			}
		}
	}
	var count = unlockedStories.length;
	$("#progress-bar p").html("Story (" + count + "/"+ TROPHY_REQUIREMENT +")");
	$(".progress-bar-color").css("width", Math.round(count / TROPHY_REQUIREMENT * 100) + "%");
	if (count >= TROPHY_REQUIREMENT) {
		$("#event-nav-trophy img").attr("src", "../images/trophies/trophy-unlocked.png");
	}

	if (localStorage.getItem("trophies")) {
		var unlockedTrophies = JSON.parse(localStorage.getItem("trophies"));
		if (unlockedTrophies && unlockedTrophies.includes(event)) {
			trophyUnlocked = true;
		}
	}

	/* ------------------------------------------------ */
	/*				   BUTTON CLICKS					*/
	/* ------------------------------------------------ */

	// (Event Section) Handle the close action for the map popup fullscreen overlay.
	$("#map-popup-overlay").click(function() {
		closePopupOverlay();
	});

	$("#story-popup-overlay").click(function() {
		closeStoryOverlay();
	});

	$("#event-nav-trophy").click(function() {
		showTrophyOverlay();
		$.get("header.php", {a: "aaaa"});

	});

	$("#trophy-popup-overlay-close").click(function() {
		closeTrophyOverlay();
	});

	$(".map-button-leaderboard").click(function() {
		showLeaderboardOverlay();
	})

	$("#leaderboard-popup-overlay button").click(function() {
		closeLeaderboardOverlay();
	})

	// (Event Section) Handle the "Play" button on the top-right.
	$(".map-button-random").click(function() {
		enterChallenge();
	});

	// (Challenge Section) Handle the "back" button on the top-left.
	$("#event-nav-back").click(function() {
		exitChallenge();
	});

	// (Challenge Section) Handle the "Start" button in the info panel.
	$("#game-start").click(function() {
		switch (gameState) {
			case 0:
				gameState = 1;
				gameStart();
				break;
			case 1:
				gameState = 2;
				gamePause();
				break;
			case 2:
				gameState = 1;
				gameResume();
				break;
		}
	});

	// (Challenge Section) Handle the restart button in the info panel.
	$("#game-restart").click(function() {
		if (gameState == 1 || gameState == 2) {
			gameState = 0;
			gameRestart();
		}
	});

	$("#game-give-up").click(function() {
		gameState = 0;
		gameTimestamp = 0;
		gameOver("fail");
	});

	// (Challenge Section) Handle the "Submit" name button when the game is finished.
	$("#info-zone-result-button-submit").click(function(event) {
		var name = $("#info-zone-result-name").val();
		if (name === "") {
			$("#info-zone-result-name").addClass("error");
		} else {
			localStorage.setItem("name", name);
			nameSubmit(name);
		}
		event.preventDefault();
	});

	// (Challenge Section) Handle the "Don't show my name" button when the game is finished.
	$("#info-zone-result-button-ignore").click(function(event) {
		nameSubmit(null);
		event.preventDefault();
	});

	// (Challenge Section) Remove the error red border of the text field if the user starts typing.
	$("#info-zone-result-name").keydown(function() {
		$(this).removeClass("error");
	});

	/* ------------------------------------------------ */
	/*				   	  TOOLTIPS						*/
	/* ------------------------------------------------ */

	$("#event-nav-back").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});

	$("#event-nav-story").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});

	$("#event-nav-close").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});

	$("#trophy-popup-overlay button").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});

	$("#leaderboard-popup-overlay button").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});

	$("#game-restart").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});

	$("#game-give-up").tooltip({
		track: true,
		show: {duration: 300, delay: 100}
	});
});

/**
 * Iterate over the records from the dataset.
 * @param {*} results each record of the dataset
 */
function iterateRecords(results) {
	// Queensland
	var myMap = L.map("map-data").setView([-27.45, 153.05], 12);
	L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png", {
		maxZoom: 19,
		minZoom: 6,
		subdomains: 'abcd',
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors \
		&copy; <a href="https://carto.com/attributions">CARTO</a>',
	}).addTo(myMap);

	// set the bounding box of the map, prevent user drags the map to nowhere
	var southWest = L.latLng(-29.5, 138)
	var northEast = L.latLng(-9, 155);
	var bounds = L.latLngBounds(southWest, northEast);
	myMap.setMaxBounds(bounds);
	
	// Iterate over each record and add a marker using the Latitude field (also containing longitude)
	$.each(results.result.records, function(recordID, recordValue) {
		var latLong = getCoords(recordValue["dcterms:spatial"]);
		var year = getYear(recordValue["dcterms:temporal"]);
		// filter out the entries outside of the bounding box and the year period.
		if (latLong && latLong[0] > -29.5 && latLong[0] < -9 && latLong[1] > 138 && latLong[1] < 155
			&& year >= EVENT_PERIOD[event][0] && year <= EVENT_PERIOD[event][1]) {
			// Position the marker and add to map
			var marker = L.marker([latLong[0], latLong[1]], {icon: redIcon}).addTo(myMap);
													
			// Associate a popup with the record's information
			popupWindow = "<section class='map-popup' id='map-popup-" + recordID + "'>\
				<strong class='map-popup-title'>" + recordValue["dc:title"] + " (" + year + ")</strong><br>\
				<img src='" + recordValue["150_pixel_jpg"] + "' alt='Event Image' class='map-popup-image' \
				id='map-popup-image-" + recordID + "'><br>\
				<p class='map-popup-question' id='map-popup-question-" + recordID + "'>?</p>\
				<a onclick='mapPinButtonClick("+ recordID + ")' class='map-popup-button' id='map-popup-button-" + 
				recordID + "'>Unlock this image</a></section>";
			marker.bindPopup(popupWindow);

			marker.on('click', function() {
				if (marker.getIcon() == greenIcon) {
					mapPinUnlock(recordID);
				}
				console.log(recordID);
			});
			eventRecords.push([recordID, marker, recordValue]);
			eventId[recordID] = eventRecords.length - 1;
		}
	});

	// Allow loading screen delay when processing the map
	setTimeout(function() {
		$(".loading-screen").css("display", "none");
	}, 2000);
}
