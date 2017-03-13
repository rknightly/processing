import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

SolarSystem system;

PeasyCam cam;

PImage sunTexture;
PImage[] planetTextures = new PImage[9];
PImage[] moonTextures = new PImage[2];

void loadTextures() {
 sunTexture = loadImage("sun.jpg");
 
 planetTextures[0] = loadImage("mercury.jpg");
 planetTextures[1] = loadImage("venus.jpg");
 planetTextures[2] = loadImage("earth.jpg");
 planetTextures[3] = loadImage("mars.jpg");
 planetTextures[4] = loadImage("jupiter.jpg");
 planetTextures[5] = loadImage("saturn.jpg");
 planetTextures[6] = loadImage("uranus.jpg");
 planetTextures[7] = loadImage("neptune.jpg");
 planetTextures[8] = loadImage("pluto.jpg");
 
 moonTextures[0] = loadImage("moon1.jpg");
 moonTextures[1] = loadImage("moon2.jpg");
}  
  
void setup() {
 size(1200, 800, P3D); 
 loadTextures();
 
 cam = new PeasyCam(this, 500);
 
 system = new SolarSystem(9, 2, planetTextures, moonTextures);
 system.spawnPlanets();
 system.spawnMoons();
 system.spawnStars(100);
}

void draw() {
  background(0);
  
  ambientLight(255, 255, 255);
  pointLight(255, 255, 255, 0, 0, 0);
  
  
  //sun.orbit();
  //sun.show();
  system.update();
  system.show();
}