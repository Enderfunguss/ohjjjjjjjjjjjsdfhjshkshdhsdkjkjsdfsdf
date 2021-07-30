let status = '';
let objects = [];
let audio = '';

function preload() {

}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('harold').innerHTML = 'status: detecting object..';
}

function modelLoaded() {
    console.log('coco loaded');
    status = true;
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        objects = result;
    }
}


function draw() {
    image(video, 0, 0, 500, 500);

    if (status != '') {
        var r = random(255);
        var g = random(255);
        var b = random(255);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById('harold').innerHTML = 'status: object detected!';

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + '' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == 'person' || objects[i].label == 'book' || objects[i].label == 'chair') {
                document.getElementById('babyDetect').innerHTML = 'baby found! :)';
                console.log('FOUND!!!');
            } else {
                document.getElementById('babyDetect').innerHTML = 'no baby found! :(';
                audio = new Audio('audio.mp3');
                audio.play();
            }
        }
        if (objects.length = 0) {
            document.getElementById('babyDetect').innerHTML = 'nothing found! :(';
            audio = new Audio('audio.mp3');
            audio.play();
        }
    }

}
