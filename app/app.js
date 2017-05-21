/**
 * Created by Rhys Williams
 */

/**
 * Load Website
 */
function loadSite() {
    //Add All Events
    loadJSON();
}

/**
 * Do Functions Once All Events Added
 */
function initEventsAllAdded() {

    //Add Lazy Image Loading
    $(function () {
        $("img.lazy").lazyload({
            threshold: 200
        });
    });

    //Add Particles
    particlesJS.load('particles-js', 'resources/js/particles.json');

    //Set Scrolling
    $(function () {
        $("body").mousewheel(function (event, delta) {
            if (delta < 0) {
                speed = 0;
            } else {
                speed++;
            }

            this.scrollLeft -= (delta * 50);
            event.preventDefault();
            updateDate();
        });
    });

    //Show Site
    $("loading img").fadeOut(2000);
    $("loading").fadeOut(3000);
    $("#particles-js").fadeIn(10000);
    $("#songServiceAndSacrifice").trigger('play');
}

/**
 * Update Date Element on Scroll
 */
function updateDate() {
    var element = document.elementFromPoint(400, 0);
    $("#timelineIndicatorText").text(element.getAttribute("data-date"));
}

/**
 * Add all events from the events.json to an array and call addEvents
 */
function loadJSON() {
    $.getJSON("app/events_avatar.json", function (data) {
        var array = [];
        for (var i in data) {
            array.push(data[i]);
        }
        addEvents(array);
    });
}

/**
 * Adds all events from given array to the dom
 */
function addEvents(array) {
    //Sort Events by Date
    for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array.length; j++) {
            if (parseInt(array[i].eventDate) > parseInt(array[j].eventDate)) {
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }

    //Add Events to Dom
    for (var i = 0; i < array.length; i++) {
        var event = array[i];
        $("events").append(makeEvent(event.eventDate, event.eventName, event.eventShort, event.eventLong, event.eventImage, event.eventBackgroundImage, event.eventColour));
    }

    //Callback for all events successfully added
    initEventsAllAdded();
}

/**
 * Make event HTML element from input variables
 * @param eventDate
 * @param eventName
 * @param eventShort
 * @param eventLong
 * @param eventImage
 * @param eventBackgroundImage
 * @param eventColour
 * @returns {string}
 */
function makeEvent(eventDate, eventName, eventShort, eventLong, eventImage, eventBackgroundImage, eventColour) {
    var eventHtml = "";
    eventHtml += "<event data-date=\" " + formatDate(eventDate) + "\">";
    eventHtml += "  <eventTile style=\"background-color: " + eventColour + "\">";
    eventHtml += "      <eventImage>";
    eventHtml += "          <img class=\"eventImage lazy\" alt='There appears to be an error.' data-original=\"" + eventImage + "\">";
    eventHtml += "      <\/eventImage>";
    eventHtml += "      <eventInfo>";
    eventHtml += "          <p class=\"eventName\">" + eventName + "<\/p>";
    eventHtml += "          <p class=\"eventShortDescription\">" + eventShort + "<\/p>";
    eventHtml += "          <p class=\"eventLongDescription\">" + eventLong + "<\/p>";
    eventHtml += "      <\/eventInfo>";
    eventHtml += "  <\/eventTile>";
    eventHtml += "<img class=\"eventBackground rain lazy\" data-original=\"" + eventBackgroundImage + "\">";
    eventHtml += "<\/event>";
    return eventHtml;
}

/**
 * Format date to the corresponding format
 * @param year
 * @returns {string}
 */
function formatDate(year) {
    if (parseInt(year) < 0) {
        year = numeral(Math.abs(year)).format('0,0');
        return year + " BG";
    } else {
        year = numeral(Math.abs(year)).format('0,0');
        return year + " AG";
    }
}