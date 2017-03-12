class Network {
  int nodeCount;
  Neuron[] neurons;
  float size;
  float maxCoord;
  
  
  Network(int n, float s) {
    nodeCount = n;
    size = s;
    maxCoord = size / 2;
    
    makeNeurons();
    makeConnections();
    
  }
  
  void makeNeurons() {
    neurons = new Neuron[nodeCount];
    for (int i=0; i<nodeCount; i++) {
      //PVector dir = PVector.random3D();
      //float dist = random(size);
      
      //PVector pos = dir.mult(dist);
      PVector pos = new PVector(random(-size, size), random(-size, size), random(-size, size));
      neurons[i] = new Neuron(pos, random(0, 10));
    }
  }
  
  void activateRandom(int n) {
    for (int i=0; i<n; i++) {
       neurons[int(random(neurons.length))].activate();
    }
  }
  
  void makeConnections() {
    for (Neuron n : neurons) {
       n.makeConnections(neurons); 
    }
  }
  
  void update() {
    for (Neuron n : neurons) {
      n.update(); 
    }
    for (Neuron n : neurons) {
      if (n.timer == 0) {
        n.deactivate(); 
      }
    }
  }
  
  void draw() {
     for (Neuron n : neurons) {
       n.draw(); 
     }
  }
}