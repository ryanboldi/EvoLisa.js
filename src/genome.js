class genome {
    constructor() {
        this.img = createGraphics(imageWidth, imageWidth);
        this.genes = []; //array of chromosomes.

        for (let i = 0; i < 1000; i++) {
            this.addRandomGene();
        }

        this.fitness = 0;
    }

    drawToCanv() {
        for (let chrom in this.genes) {
            this.img = this.genes[chrom].drawToImage(this.img);
        }
        image(this.img, 0, 0);
    }

    addRandomGene() {
        this.genes.push(new chrom(random(0, imageWidth), random(0, imageWidth), random(0, imageWidth), random(0, imageWidth), random(0, imageWidth), random(0, imageWidth), random(0, 256), random(0, 256), random(0, 256), random(0, 256)));
    }

    getPixelArray() {
        this.img.loadPixels();
        return (this.img.pixels);
    }

    compareToGoal() {
        let testPixels = this.getPixelArray();
        let goalPixels = monaPixels;

        let fitness = 0;
        for (let i in goalPixels) {
            fitness += (255 - (Math.abs(goalPixels[i] - testPixels[i])));
        }

        console.log(fitness);
    }
}