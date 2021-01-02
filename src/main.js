let imageWidth = 200;
let imageGap = 10;
let mona;
let monaPixels;

let popSize = 2; //photos in each generation
let images = []; //the photos

let startPolys = 100;
let bestImage;


let mutationRate = 0.4; //chance for chromosome to mutate
let mutationAmount = 1; // how many datapoints mutate when a chromosome mutates
let mutationStrength = 10; //standard deviation of the gaussian for mutation


function preload() {
    mona = loadImage("https://raw.githubusercontent.com/ryanboldi/EvoLisa.js/main/mona_200.jpg");
}

function setup() {
    createCanvas(imageWidth * 2 + imageGap, imageWidth);

    mona.loadPixels();
    let monaInfo = mona.get();
    monaInfo.set();
    monaPixels = monaInfo.pixels;
    //console.log(monaPixels);

    for (let i = 0; i < popSize; i++) {
        images.push(new genome());
    }

}

function draw() {
    background(255);
    image(mona, imageWidth + imageGap, 0);


    console.log("finished gen");
    images = EvaluateAndMakeNewPop();
    bestImage.img.background(255);
    bestImage.drawToCanv();
}

function EvaluateAndMakeNewPop() {
    for (let i in images) {
        images[i].compareToGoal();
    }

    let bestFitness = 0;

    for (let i in images) {
        if (images[i].fitness > bestFitness) {
            bestFitness = images[i].fitness;
            bestImage = images[i];
        }
    }

    let toSelect = Math.ceil(popSize / 2);
    let selected = [];
    for (let i = 0; i < toSelect; i++) { selected.push(rouletteWheel()) };
    for (let i = selected.length; i < popSize; i++) {
        selected.push(random(selected));
        selected[i].mutate();
    }

    return selected
}

//selects from images based on fitness
function rouletteWheel() {
    let total = 0;
    for (let img in images) {
        //console.log(images[img].fitness);
        total += images[img].fitness;
    }

    let probs = [];

    for (let img in images) {
        probs[img] = (images[img].fitness / total);
    }
    let choice = random();
    for (let p in probs) {
        if (choice < probs[p]) {
            chosen = images[p];
            return (chosen);
            break;
        } else {
            choice -= probs[p];
        }
    }
}