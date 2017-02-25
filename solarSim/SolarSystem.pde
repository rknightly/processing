class SolarSystem {
  int planetCount;
  int moonCount;
  
  PImage[] planetTextures;
  PImage[] moonTextures;
  
  Body sun;
  
  Body[] planets;
  Star[] stars;
  
  SolarSystem(int pc, int mc, PImage[] pt, PImage[]mt) {
    planetCount = pc;
    moonCount = mc;
    
    planetTextures = pt;
    moonTextures = mt;
   
    sun = new Body(50, 0, 0, sunTexture);
  }
  
  void spawnPlanets() {
    sun.spawnPlanets(planetCount, planetTextures);
  }
  
  void spawnMoons() {
    sun.spawnMoons(moonCount, moonTextures);
  }
  
  void spawnStars(int count) {
    stars = new Star[count];
    
    for(int i=0; i<count; i++) {
      PVector randomDirection = PVector.random3D();
      float randomDistance = random(500, 1500);
      
      stars[i] = new Star(randomDirection.mult(randomDistance));
    } 
  }
  
  void update() {
    sun.orbit();
  }
  
  void show() {
    sun.show();
    
    for (int i=0; i<stars.length; i++) {
      stars[i].show(); 
    }
  }
}