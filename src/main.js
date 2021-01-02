let imageWidth = 394;
let imageGap = 10;
let mona;
let monaPixels;

let popSize = 20; //photos in each generation
let images = []; //the photos

let bestImage;


let mutationRate = 0.1; //chance for chromosome to mutate
let mutationAmount = 2; // how many datapoints mutate when a chromosome mutates
let mutationStrength = 40; //standard deviation of the gaussian for mutation


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

    startEvaluation();
}

function startEvaluation() {



}

function endEvaluation() {
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

    //let toSelect = Math.ceil(popSize / 2);
}

//selects from images based on fitness
function rouletteWheel() {
    let total = 0;
    for (let img in images) {
        total += images[img].fitness;
    }

    let probs = [];

    console.log(probs);
    for (let img in images) {
        probs[img] = (images[img].fitness / total);
    }

    let choice = random();
    console.log(choice);
    for (let p in probs) {
        if (choice < probs[p]) {
            chosen = images[p];
        } else {
            choice -= probs[p];
        }
    }
}