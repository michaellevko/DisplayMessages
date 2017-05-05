
/*
 * Callback function to refresh the display by
 * checking messages time frames and loading
 * data and templates accordingly.
 */
function refreshDisplay() {
    // Check messages only for /screen routes
    var h = $('body > h1');
    if (h[0].innerHTML.indexOf('Screen') > -1) {
        // request messages from server based on screenId
        var screenId = (h[0].innerHTML.split('-'))[1];
        $.get('/update/' + screenId, function (messages) {
            var currMsg = getCurrMessage(messages);
            loadDisplay(currMsg);
            setTimeout('refreshDisplay()', 10000);
        });
    }
}

// /*
//  * Sends HTTP GET request to server for messages
//  * corresponding with screenId from browser url
//  * Returns array of messages matching screenId
//  */
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
        if (checkDates(messages[m].timeFrames.dates, dDate) &&
            checkWeekly(messages[m].timeFrames.weekly, dDay, dHHMM)) {
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
        $("div#parent").load(message.template.html + " #container", function () {
            setMsgData(message);
            setCSS(message.template.css);
        });
    } else {
        $("div#parent").load("templates/default.html #default");
        setCSS("");
    }
}

/*
 * Inserts textFields and imgFields of message to template
 */
function setMsgData(message) {
    var textFields = $(".text");
    for (i=0; i<message.texts.length; i++) {
        textFields[i].innerHTML = message.texts[i];
    }
    var imgFields = $(".img");
    for (i=0; i<message.images.length; i++) {
        imgFields[i].src = message.images[i];
    }
}

/*
 * Replaces current css in index.html with template_x.css
 */
function setCSS(cssFile) {
    var link = $('link#DynamicCSS');
    if (link.length > 0) {
        link.remove()
    }
    if (cssFile !== "") {
        $("head").append("<link id='DynamicCSS' rel='stylesheet' href=" + cssFile + " />");
    }
}

/*
 * Checks if message yyyy-mm match current date.
 * Returns true if match, false otherwise.
 */
function checkDates(currMsgDates, currDate) {
    var isValid = false;
    if (new Date(currMsgDates[0]) <= currDate &&
        new Date(currMsgDates[1]) > currDate) {
        isValid = true;
    }
    return isValid;
}

/*
 * Checks for each weekly timeframe of message
 * against current time
 * Returns true if match is found
 */
function checkWeekly(currMsgWeekly, dDay, ddHMM) {
    var isValid = false;
    for(x in currMsgWeekly) {
        if(checkDays(currMsgWeekly[x].days, dDay)) {
            if(checkHour(currMsgWeekly[x].hours, ddHMM)) {
                isValid = true;
                break;
            }
        }
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
function checkHour(currMsgHours, currHour) {
    var isValid = false;
    if (currMsgHours[0] <= currHour &&
        currMsgHours[1] > currHour) {
        isValid = true;
    }
    return isValid;
}