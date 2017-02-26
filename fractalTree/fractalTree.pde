float decay = 0.7;
float camAngle = 0;

void setup(){
  size(800, 600, P3D);
  
}

void draw() {
  background(0);
  
  translate(width/2, height * 3/4);
  rotateY(camAngle);
  
  
  float branchAngle = map(mouseX, 0, width, 0, TWO_PI);
  branch(100, 3, branchAngle);
  
  
  camAngle += 0.01;
}

void branch(float branchLength, float branchWidth, float theta) {
  if (branchLength > 10) {
    float newBranchLength = branchLength * decay;
    float newBranchWidth = branchWidth * decay;
    float newTheta = theta;
    
    stroke(255);
    strokeWeight(branchWidth);
    
    pushMatrix();
    line(0, 0, 0, -branchLength);
    translate(0, -branchLength);
    rotate(theta);
    branch(newBranchLength, newBranchWidth, newTheta);
    popMatrix();
  
    pushMatrix();
    line(0, 0, 0, -branchLength);
    translate(0, -branchLength);
    rotate(-theta);
    branch(newBranchLength, newBranchWidth, newTheta);
    popMatrix();
    
    pushMatrix();
    line(0, 0, 0, -branchLength);
    translate(0, -branchLength);
    rotateX(theta);
    branch(newBranchLength, newBranchWidth, newTheta);
    popMatrix();
    
    pushMatrix();
    line(0, 0, 0, -branchLength);
    translate(0, -branchLength);
    rotateX(-theta);
    branch(newBranchLength, newBranchWidth, newTheta);
    popMatrix();
  }
  
  //popMatrix();
  
}