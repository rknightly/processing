import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

Network net;

PeasyCam cam;

void setup() {
  size(800, 400, P3D);
  net = new Network(400, 200);
  
  cam = new PeasyCam(this, 500);
}

void draw() {
  background(0);
  net.update();
  net.draw();
}

void mousePressed() {
  impulse();
}

void impulse() {
  net.activateRandom(1);
}