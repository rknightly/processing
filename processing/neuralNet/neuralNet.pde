import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

Network net;

void setup() {
  size(1200, 800);
  net = new Network(50000, 300);
}

void draw() {
  background(0);
  net.update();
  net.draw();
  println(frameRate);
}

void mousePressed() {
  if (mouseButton == LEFT) {
    impulse();
  } else {
    net.deactivateAll();
  }
}

void impulse() {
  net.activateRandom(1);
}