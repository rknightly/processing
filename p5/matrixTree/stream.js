function Stream(x, y) {
    this.symbols = [];
    this.totalSymbols = round(random(1, 16));
    this.decaySpeed = 0.2;
    this.fallFreq = 1;
    this.x = x
    this.y = y;

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
    }

    this.render = function() {
        for(var i=this.symbols.length-1; i>=0; i--){
            var symbol = this.symbols[i];

            symbol.update();

            symbol.alpha = map(i,
                            this.symbols.length - this.totalSymbols,
                            this.symbols.length,
                            0,
                            255);

            symbol.show();
            if (symbol.shouldChange()) {
                symbol.setToRandomSymbol();
            }

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
