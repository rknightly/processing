class Neuron {
  PVector pos;
  ArrayList<Neuron> connections = new ArrayList<Neuron>();
  boolean activated = false;
  float threshhold = 10;
  float currentCharge = 0;
  int timer = 0;
  
  Neuron(PVector p, float t) {
    pos = p;
    threshhold = t;
  }
  
  void makeConnections(Neuron[] neurons) {
    for (Neuron n : neurons) {
      if (pos.dist(n.pos) < 10) {
        connections.add(n);
      }
    }
  }
  
  void activate() {
    activated = true;
    currentCharge = 1;
    timer = 1;
  }
  
  void deactivate() {
    activated = false;
    currentCharge = 0;
  }
  
  void update() {
    float sumCharge = 0;
    for (Neuron n : connections) {
      sumCharge += n.currentCharge;
    }
    if (timer == 0) {
      if (sumCharge >= threshhold) {
        activate();
      }
    } else {
      timer--;
    }
  }
  
  void draw() {
    if (activated) {
      fill(255, 220);
    } else {
      fill(100, 220);
    }
    
    pushMatrix();
    translate(pos.x, pos.y);
    noStroke();
    ellipse(0, 0, 2, 2);
    popMatrix();
    
    //for (Neuron n : connections) {
    //  if (activated) {
    //    stroke(255, 100);
    //  } else {
    //    stroke(100, 100);
    //  }
      
    //  strokeWeight(1);
    //  line(pos.x, pos.y, n.pos.x, n.pos.y); 
    //}
    
  }
}