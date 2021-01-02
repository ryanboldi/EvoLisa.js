class chrom {
    constructor(x1, y1, x2, y2, x3, y3, r, g, b, a) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    drawToImage(gra) {
        gra.fill(this.r, this.g, this.b, this.a);
        gra.noStroke();
        gra.triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);

        return gra;
    }

    mutate() {
        let data = [this.x1,
        this.y1,
        this.x2,
        this.y2,
        this.x3,
        this.y3,
        this.r,
        this.g,
        this.b,
        this.a];

        let choices = [];
        for (let i in data) choices.push(i);
        //pick mutationAmount indexes
        for (let i = 0; i < mutationAmount; i++) {
            data[random(choices)] += randomGaussian(0, mutationStrength);
        }

        //check that the mutations didn't break any values
        for (let i = 0; i < 6; i++) {
            while (data[i] > windowHeight) data[i] = random(0, windowHeight);
            while (data[i] < 0) data[i] = random(0, windowHeight);
        }
        for (let i = 6; i < data.length; i++) {
            while (data[i] > 255) data[i] = random(0, 255);
            while (data[i] < 0) data[i] = random(0, 255);
        }

        //reassign values now
        this.x1 = data[0];
        this.y1 = data[1];
        this.x2 = data[2];
        this.y2 = data[3];
        this.x3 = data[4];
        this.y3 = data[5];
        this.r = data[6];
        this.g = data[7];
        this.b = data[8];
        this.a = data[9];
    }



}