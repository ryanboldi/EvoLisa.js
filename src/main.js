let imageWidth = 394;
let imageGap = 10;
let mona;
let monaPixels;

let bestImage;

function preload() {
    bestImage = new genome();
    mona = loadImage("https://raw.githubusercontent.com/ryanboldi/EvoLisa.js/main/Mona.jpg")
}

function setup() {
    createCanvas(800, 800);
    //console.log(bestImage.getPixelArray());

    mona.loadPixels();
    let monaInfo = mona.get();
    monaInfo.set();
    monaPixels = monaInfo.pixels;
    console.log(monaPixels);
}

function draw() {
    background(255);
    image(mona, imageWidth + imageGap, 0);
    bestImage.drawToCanv();
}
