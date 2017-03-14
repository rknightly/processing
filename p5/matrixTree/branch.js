function Branch(begin, end) {
    this.begin = begin;
    this.end = end;
    this.vector = p5.Vector.sub(this.end, this.begin);

    this.symbols = [];
    this.symbolsShowing = 0;
    this.doneGrowing = false;

    this.streams = [];

    this.makeSymbols = function() {
        if (this.symbols.length > 0) {
            return;
        }
        /* Vector of length of character size in direction of branch.
        This is to be multiplied out to place the characters in the correct location*/
        var symbolVector = this.vector.copy().normalize().mult(symbolSize);
        symbolCount = 0;
        // Place characters along the character vector until it reaches the end of the branch
        while(symbolSize * symbolCount < this.vector.mag()) {
            var symbolPos = symbolVector.copy().mult(symbolCount).add(this.begin);

            var symbol = new Symbol(symbolPos.x, symbolPos.y, symbolCount);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);

            symbolCount += 1;
        }
    }

    this.showNewSymbol = function() {
        if (this.symbolsShowing < this.symbols.length) {
            this.symbolsShowing ++;
            // Make the second to last symbol not 'first' again
            if(this.symbolsShowing > 1) {
                this.symbols[this.symbolsShowing-2].first = false;
            }
        } else {
            this.doneGrowing = true;
            // Unwhiten symbols at end of a branch
            this.symbols[this.symbolsShowing-1].first = false;
        }

    }

    this.show = function() {
        stroke(255);

        // Change the symbols appropriately
        for(var i=0; i<this.symbolsShowing; i++) {
            if (this.symbols[i].shouldChange()) {
                this.symbols[i].setToRandomSymbol();
            }
            this.symbols[i].show();
        }

        this.streams.forEach(function(stream) {
            stream.render();
        });
    }

    this.branchA = function() {
        // return a child branch to the left
        var dir = this.vector.copy();
        dir.rotate(PI / 6);
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);

        var b = new Branch(this.end, newEnd);
        b.makeSymbols();
        return b;
    }

    this.branchB = function() {
        // return a child branch to the left
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(-PI / 4);
        dir.mult(0.67);
        var newEnd = p5.Vector.add(this.end, dir);

        var b = new Branch(this.end, newEnd);
        b.makeSymbols();
        return b;
    }

    this.update = function() {
        // Show new symbols if appropriate
        if (!this.doneGrowing && frameCount % 5 == 0) {
            this.showNewSymbol();
        }
        this.streams.forEach(function(stream) {
            stream.update();
        });

    }

    this.addStream = function() {
        // choose starting location for stream from one of the symbols
        var chosenSymbol = this.symbols[round(random(0, this.symbols.length-1))];
        var stream = new Stream(chosenSymbol.x, chosenSymbol.y);
        this.streams.push(stream);
    }
}
