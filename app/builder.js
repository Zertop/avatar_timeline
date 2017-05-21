function changeBackgroundImage() {
    var element = document.getElementById("backgroundImageSelect");
    element.click();

    element.onchange = function () {
        var file = element.files[0];
        changeImageTo(document.getElementsByClassName("eventBackground")[0], file);
    };
}

function changeEventImage() {
    var element = document.getElementById("eventImageSelect");
    element.click();

    element.onchange = function () {
        var file = element.files[0];
        changeImageTo(document.getElementsByClassName("eventImage")[0], file);
    };
}

function submit() {

    //Progress Bar
    $('progress').attr({max: 2});

    var backgroundImageXHR = uploadBackgroundImage ();

    var eventImageXHR = uploadEventImage ();

    var interval = setInterval(function () {
        if (backgroundImageXHR.readyState == XMLHttpRequest.DONE){
            $('progress').attr({value: 1});
            if (eventImageXHR.readyState == XMLHttpRequest.DONE) {
                $('progress').attr({value: 2});
                uploadJSON(eventImageXHR.responseText, backgroundImageXHR.responseText);
                clearInterval(interval);
            }
        }
    },1000);
}

function uploadBackgroundImage () {
    //Upload Background Image
    var backgroundData = new FormData();
    var backgroundDataFile = document.getElementById("backgroundImageSelect").files[0];
    backgroundData.append("file_upload", backgroundDataFile);

    var backgroundImageXHR = new XMLHttpRequest();
    backgroundImageXHR.onreadystatechange = function () {
        if (backgroundImageXHR.readyState == XMLHttpRequest.DONE) {
            console.log(backgroundImageXHR.responseText);
        }
    };
    backgroundImageXHR.open("POST", "https://cdn.rhyswilliams.co.za/avatar_timeline/upload.php", true);
    backgroundImageXHR.send(backgroundData);
    return backgroundImageXHR;
}

function uploadEventImage () {
    //Upload Event Image
    var eventData = new FormData();
    var eventDataFile = document.getElementById("eventImageSelect").files[0];
    eventData.append("file_upload", eventDataFile);

    var eventImageXHR = new XMLHttpRequest();
    eventImageXHR.onreadystatechange = function () {
        if (eventImageXHR.readyState == XMLHttpRequest.DONE) {
            console.log(eventImageXHR.responseText);
        }
    };
    eventImageXHR.open("POST", "https://cdn.rhyswilliams.co.za/avatar_timeline/upload.php", true);
    eventImageXHR.send(eventData);
    return eventImageXHR;
}

function uploadJSON (eventImageName, backgroundImageName) {
    //Upload JSON Data
    var jsonXHR = new XMLHttpRequest();
    jsonXHR.onreadystatechange = function () {
        if (jsonXHR.readyState == XMLHttpRequest.DONE) {
            console.log(jsonXHR.responseText);
            alert("DONE");
            window.location.reload(false);
        }
    };
    jsonXHR.open("POST", "https://cdn.rhyswilliams.co.za/avatar_timeline/add_to_json.php", true);
    jsonXHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    jsonXHR.send("json_string=" + makeJSONAddition(eventImageName, backgroundImageName));
}

function makeJSONAddition(eventImageName, backgroundImageName) {
    var jsonOut = {
        "eventDate": $("#timelineIndicatorText").text(),
        "eventName": $(".eventName").text(),
        "eventShort": $(".eventShortDescription").text(),
        "eventLong": $(".eventLongDescription").text(),
        "eventImage": "https://cdn.rhyswilliams.co.za/avatar_timeline/images/" + eventImageName,
        "eventBackgroundImage": "https://cdn.rhyswilliams.co.za/avatar_timeline/images/" + backgroundImageName,
        "eventColour": $("eventTile")[0].style.getPropertyValue("background-color"),
    };
    return JSON.stringify(jsonOut);
}

function changeImageTo(element, file) {
    var reader = new FileReader();
    reader.onloadend = function () {
        element.src = reader.result;
    };
    reader.readAsDataURL(file);
}