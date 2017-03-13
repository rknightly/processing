var symbolSize = 16;
var streams = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);

    var x = 0;
    for(var i=0; i <= width/symbolSize; i++) {
        var stream = new Stream(x);
        streams.push(stream);
        x += symbolSize;
    }


    textSize(symbolSize);
}

function draw() {
    background(0, 180);
    streams.forEach(function(stream) {
        stream.update();
        stream.render();

        if (stream.isComplete()) {
            stream.reset();
        }
    });

}

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
}

function Stream(x) {
    this.symbols = [];
    this.totalSymbols = round(random(height / symbolSize * 0.9, height / symbolSize));
    this.decaySpeed = 0.2;
    this.fallFreq = round(random(1, 2));
    this.x = x
    this.y = random(0, -height);

    this.update = function() {
        if (frameCount % this.fallFreq == 0) {
            var symbol = new Symbol(this.x, this.y, this.symbols.length);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            this.y += symbolSize;
            if (this.y > height + symbolSize) {
                this.doneAdding = true;
            }
        }
        if (this.symbols.length > this.totalSymbols) {
            this.symbols.shift();
        }
        console.log(this.symbols.length);
    }

    this.render = function() {
        for(var i=this.symbols.length-1; i>=0; i--){
            var symbol = this.symbols[i];

            var alpha = map(i, 0, this.symbols.length-1, 0, 255);
            if (symbol.first) {
                fill(180, 255, 180, symbol.alpha);
            } else {
                fill(0, 255, 70, symbol.alpha);
            }
            text(symbol.value, symbol.x, symbol.y);
            // symbol.rain();
            if (symbol.shouldChange()) {
                symbol.setToRandomSymbol();
            }
            symbol.update();
            symbol.alpha = map(i,
                            this.symbols.length - this.totalSymbols,
                            this.symbols.length,
                            0,
                            255);
        }
    }
    this.isComplete = function() {
        complete = false;
        if (this.symbols.length > 0) {
            if (this.symbols[0].y > height + symbolSize) {
                complete = true;
            }
        }
        return complete;
    }

    this.reset = function() {
        this.y = random(0, -height);
        this.symbols = [];
        this.totalSymbols = round(random(5, 30));
        this.fallFreq = round(random(1, 2));
    }
}
