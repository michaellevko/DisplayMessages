
// Variables
var template1 = ["templates/template_1.html", "templates/template_1.css"],
    template2 = ["templates/template_2.html", "templates/template_2.css"],
    template3 = ["templates/template_3.html", "templates/template_3.css"],
    imagePath = "Images/SampleImage";

/*
Constructor for a display message
 */
function MessageObj(name, template, texts, pics, timeFrames) {
    this.name = name;
    this.template = template;
    this.textFields = [];
    for (i=0;i<10 && i<texts.length;i++) {
        this.textFields[i] = texts[i];
    }
    this.imgFields = [];
    for (i=0;i<5 && i<pics.length;i++) {
        this.imgFields[i] = pics[i];
    }
    this.timeFrames = timeFrames;
}

/*
function generates 'numOfLines' number of text lines to be
displayed in messageObj
 */
function generateTextLines(numOfLines){
    var textLines = [];
    for (i=1; i<=numOfLines; i++){
        textLines.push("SomeText-" + i + "...");
    }
    return textLines;
}

/*
function to return image paths for 'numOfPics' number of images
to be displayed in messageObj
 */
function getImages(numOfPics){
    var images = [];
    for (i=1; i<=numOfPics; i++){
        images.push(imagePath + i + ".jpg");
    }
    return images;
}

/*
Initialization for local defined messages according to Assignment 1
 */
function initMessages() {

    var m1 = new MessageObj(
        "message1",
        template1,
        generateTextLines(4),
        getImages(2),
        { Days: [1, 3], Hours: ["06:00", "12:00"],
            Date: [new Date("2017-01-01"), new Date("2017-12-31")] });

    var m2 = new MessageObj(
        "message2",
        template2,
        generateTextLines(10),
        getImages(1),
        { Days: [2, 3], Hours: ["10:00", "16:00"],
            Date: [new Date("2017-03-01"), new Date("2017-04-30")] });

    var m3 = new MessageObj(
        "message3",
        template3,
        generateTextLines(0),
        getImages(0),
        { Days: [0, 1, 2, 3, 4, 5, 6], Hours: ["08:00", "22:00"],
            Date: [new Date("2017-05-01"), new Date("2017-06-15")] });

    var m4 = new MessageObj(
        "message4",
        template1,
        generateTextLines(2),
        getImages(0),
        { Days: [1], Hours: ["15:00", "19:00"],
            Date: [new Date("2017-03-29"), new Date("2017-04-15")] });

    var m5 = new MessageObj(
        "message5",
        template2,
        generateTextLines(7),
        getImages(2),
        { Days: [1, 2, 3], Hours: ["01:00", "23:00"],
            Date: [new Date("2017-04-01"), new Date("2017-04-30")] });

    return [m1, m2, m3, m4, m5];
}