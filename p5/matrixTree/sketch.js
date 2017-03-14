var tree = [];
var leaves = [];
var count = 0;

var symbolSize = 20;
var growthDelay = 10;
var maxBranchLevels = 9;
var branchLevels = 0;

var initialBranchLength = 250;

var treeDoneGrowing = false;

function setup() {
    // Make the canvas take up the entire screeen
    createCanvas(window.innerWidth, window.innerHeight);

    // Initialize with a first branch
    var a = createVector(width/2, height);
    var b = createVector(width/2, height-initialBranchLength);
    var root = new Branch(a, b);
    root.makeSymbols();
    tree[0] = root;
    branchLevels += 1;
}

function newBranches() {
    tree.forEach(function(branch) {
        if (!branch.hasChildren) {
            tree.push(branch.branchA());
            tree.push(branch.branchB());

            branch.hasChildren = true;
        }
    });
    count++;

    // Add 'leaves' at the 6th branch level
    // if (count === 6) {
    //     tree.forEach(function(branch) {
    //         if (!branch.finished) {
    //             var leaf = branch.end.copy();
    //             leaves.push(leaf);
    //         }
    //     });
    //     console.log(leaves.length);
    // }

    branchLevels += 1;
}

function draw() {
    background(51);

    // Draw the branches
    tree.forEach(function(branch) {
        branch.update();
        branch.show();
    });

    // Draw the leaves
    leaves.forEach(function(leaf) {
        fill(255, 0, 100, 100);
        noStroke();
        ellipse(leaf.x, leaf.y, 8, 8);
    });

    // Add new branches if necessary
    if (branchesFinished()) {
        if (branchLevels < maxBranchLevels) {
            newBranches();
        } else {
            if (!treeDoneGrowing) {
                tree.forEach(function(branch) {
                    if(!branch.hasChildren) {
                        branch.whitenLast();
                    }
                });
                console.log("ran");
            }
            treeDoneGrowing = true;
            // Whiten the last branches

        }
    }

    // Add new streams if necessary
    if(treeDoneGrowing) {
        if(round(random(0, 10)) == 1) {
            addRandomStream();
        }
    }
}

function branchesFinished() {
    var finished = false;

    // Only check last one because finished branches will be in end
    if(tree[tree.length-1].doneGrowing) {
        finished = true;
    }
    return finished;
}

function addRandomStream() {
    // Add stream to a random branch
    var randBranch = tree[round(random(0, tree.length-1))];
    randBranch.addStream();
}
