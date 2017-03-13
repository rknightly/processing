function Symbol(x, y, pos) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
    this.pos = pos;
    this.lifeTicker = 0;
    this.value;
    this.switchInterval = round(random(2, 20));
    this.first = true;

    this.setToRandomSymbol = function() {
        this.value = String.fromCharCode(
            0x30A0 + round(random(0, 96))
        );
    }

    this.update = function() {
        if (this.lifeTicker > 2) {
            this.first = false;
        }
        this.lifeTicker += 1;
    }

    this.shouldChange = function() {
        return (round(random(0, 50)) == 1);
    }

    this.show = function() {
        if (this.first) {
            fill(180, 255, 180, this.alpha);
        }
        else {
            fill(0, 255, 70, this.alpha);
        }
        textAlign(CENTER);
        text(this.value, this.x, this.y);
    }
}
