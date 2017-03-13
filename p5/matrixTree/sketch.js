var tree = [];
var leaves = [];
var count = 0;

var symbolSize = 16;
var growthDelay = 10;
var maxBranchLevels = 7;
var branchLevels = 0;

function setup() {
    createCanvas(400, 400);

    // Initialize with a first branch
    var a = createVector(width/2, height);
    var b = createVector(width/2, height-100);
    var root = new Branch(a, b);
    root.makeSymbols();
    tree[0] = root;
    branchLevels += 1;
}

function mousePressed() {
    newBranches();
}

function newBranches() {
    tree.forEach(function(branch) {
        if (!branch.finished) {
            tree.push(branch.branchA());
            tree.push(branch.branchB());

            branch.finished = true;
        }
    });
    count++;

    // Add 'leaves' at the 6th branch level
    if (count === 6) {
        tree.forEach(function(branch) {
            if (!branch.finished) {
                var leaf = branch.end.copy();
                leaves.push(leaf);
            }
        });
        console.log(leaves.length);
    }

    branchLevels += 1;
}

function keyPressed() {
    tree.forEach(function(branch) {
        branch.makeSymbols();
    });

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
