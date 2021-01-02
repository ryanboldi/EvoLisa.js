let imageWidth = 394;
let imageGap = 10;
let mona;

let bestImage;

function preload() {
    bestImage = new genome();
    mona = new Image();
    mona.src = "Mona.jpg";
}

function setup() {
    createCanvas(800, 800);
    console.log(bestImage.getPixelArray());
}

function draw() {
    background(255);
    drawingContext.drawImage(mona, imageWidth + imageGap, 0);
    bestImage.drawToCanv();
}
