let imageWidth = 394;
let imageGap = 10;
let mona;
let monaPixels;

let popSize = 25; //photos in each generation
let images = []; //the photos

let bestImage;


let mutationRate = 0.3; //chance for chromosome to mutate
let mutationAmount = 3; // how many datapoints mutate when a chromosome mutates
let mutationStrength = 50; //standard deviation of the gaussian for mutation


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

    for (let i = 0; i < popSize; i++) {
        images.push(new genome());
    }

}

function draw() {
    background(255);
    image(mona, imageWidth + imageGap, 0);
    bestImage.drawToCanv();

    images = EvaluateAndMakeNewPop();
}

function EvaluateAndMakeNewPop() {
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

    let toSelect = Math.ceil(popSize / 2);
    let selected = [];
    for (let i = 0; i < toSelect; i++) { selected.push(rouletteWheel()) };
    for (let i = selected.length; i < popSize; i++) {
        selected.push(random(selected));
        selected[i].mutate();
        if (random < 0.2) {
            selected[i].addRandomGene();
        }
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