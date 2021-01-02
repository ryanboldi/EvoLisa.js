let imageWidth = 394;
let imageGap = 10;
let mona;
let monaPixels;

let popSize = 10; //photos in each generation
let images = []; //the photos

let bestImage;


function preload() {
    bestImage = new genome();
    mona = loadImage("https://raw.githubusercontent.com/ryanboldi/EvoLisa.js/main/Mona.jpg");
}

function setup() {
    createCanvas(800, 800);

    mona.loadPixels();
    let monaInfo = mona.get();
    monaInfo.set();
    monaPixels = monaInfo.pixels;
    //console.log(monaPixels);

    initEvolution();
}

function draw() {
    background(255);
    image(mona, imageWidth + imageGap, 0);
    bestImage.drawToCanv();
}


function initEvolution() {
    for (let i = 0; i < popSize; i++) {
        images.push(new genome());
    }

    for (let i in images) {
        images[i].compareToGoal();
    }

    let bestFitness = 0;
    bestImage;

    for (let i in images) {
        if (images[i].fitness > bestFitness) {
            bestFitness = images[i].fitness;
            bestImage = images[i];
        }
    }
    console.log(bestImage);
}