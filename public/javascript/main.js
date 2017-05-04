
/*
 * Callback function to refresh the display by
 * checking messages time frames and loading
 * data and templates accordingly.
 */
function refreshDisplay() {
    var messages = initMessages();
    var currMsg = getCurrMessage(messages);
    loadDisplay(currMsg);
    setTimeout('refreshDisplay()', 5000);
}

/*
 * Returns message from 'messages' array argument
 * according to timeFrame attribute
 */
function getCurrMessage(messages) {
    // Variables
    var currMessage;               // message to return
    var today = new Date();
    var dDate = new Date(today.toISOString()
            .split('T')[0]),            // current date in ISO format
        dDay = today.getDay(),          // current day in week
        dHour = today.getHours(),       // current hour in day
        dMinute = today.getMinutes();   // current minute in day
        if (dHour < 10) { dHour = '0' + dHour; }
        if (dMinute < 10) { dMinute = '0' + dMinute; }
    var dHHMM = dHour + ':' + dMinute;  // HH:MM format

    // Iterate on every msg in messages and return msg
    // matching current timeframe
    for (m in messages) {
        // Check timeFrame match
        if (checkDates(messages[m].timeFrames.Date, dDate) &&
            checkDays(messages[m].timeFrames.Days, dDay) &&
            checkTime(messages[m].timeFrames.Hours, dHHMM)) {
                currMessage = messages[m];
                break;
        }
    }
    return currMessage;
}

/*
 * Loads the html template for 'message' argument
 * to be displayed on screen.
 *
 * Using anonymous selecting for generic method for all templates
 */
function loadDisplay(message) {
    if (message !== undefined) {
        $("body").load(message.template[0] + " #container", function () {
            setMsgData(message);
            setCSS(message.template[1]);
        });
    } else {
        $("body").load("index.html #default");
        setCSS("templates/default.css");
    }
}

/*
 * Inserts textFields and imgFields of message to template
 */
function setMsgData(message) {
    var textFields = $(".text");
    for (i=0; i<message.textFields.length; i++) {
        textFields[i].innerHTML = message.textFields[i];
    }
    var imgFields = $(".img");
    for (i=0; i<message.imgFields.length; i++) {
        imgFields[i].src = message.imgFields[i];
    }
}

/*
 * Replaces current css in index.html with template_x.css
 */
function setCSS(cssFile) {
    var link = $("head > link");
    if (link.length > 0) {
        link.remove()
    }
    $("head").append("<link rel='stylesheet' href="+cssFile+" type='text/css' />");
}

/*
 * Checks if message yyyy-mm match current date.
 * Returns true if match, false otherwise.
 */
function checkDates(currMsgDates, currDate) {
    var isValid = false;
    if (currMsgDates[0] <= currDate &&
        currMsgDates[1] > currDate) {
        isValid = true;
    }
    return isValid;
}

/*
 * Checks if message days match current day.
 * Returns true if match, false otherwise.
 */
function checkDays(currMsgDays, currDay) {
    var isValid = false;
    for (d in currMsgDays) {
        if (currDay == currMsgDays[d]) {
            isValid = true;
            break;
        }
    }
    return isValid;
}

/*
 * Checks if message hours match current hour.
 * Returns true if match, false otherwise.
 */
function checkTime(currMsgHours, currHour) {
    var isValid = false;
    if (currMsgHours[0] <= currHour &&
        currMsgHours[1] > currHour) {
        isValid = true;
    }
    return isValid;
}