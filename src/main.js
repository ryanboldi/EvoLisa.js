let imageWidth = 394;
let imageGap = 10;
let mona;

let bestImage;


function preload() {
    mona = new Image();
    mona.src = "Mona.jpg";

    bestImage = createGraphics(imageWidth, imageWidth);
}

function setup() {
    createCanvas(800, 800);

}

function draw() {
    background(255);
    drawingContext.drawImage(mona, imageWidth + imageGap, 0);
    image(bestImage, 0, 0);
}