class Body {
  float radius;
  float angle;
  float distance;
  float orbitSpeed;
  PVector v;

  Body[] satellites;
  
  PShape globe;
  
  Body(float r, float d, float o, PImage img) {
    //v = PVector.random3D();
    v = new PVector(0, 0, 1);
    radius = r;
    distance = d;
    v.mult(distance);
    angle = random(TWO_PI);
    orbitSpeed = o;
    
    noStroke();
    noFill();
    //fill(255, 0, 123);
    globe = createShape(SPHERE, radius);
    globe.setTexture(img);
  }
  
  void orbit() {
    angle = angle + orbitSpeed;
    if (satellites != null) {
      for (int i = 0; i < satellites.length; i++) {
        satellites[i].orbit();
      }
    }
  }
  
  void spawnSatellites(int total, PImage[] textures, float maxD, float maxR) {
    satellites = new Body[total];
    for (int i = 0; i < satellites.length; i++) {
      float r = radius * random(0.1, maxR);
      float d = (maxD * i + 1) * random((radius + r), 1.2 * (radius + r));
      float o = 1/d;
      satellites[i] = new Body(r, d, o, textures[i % textures.length]);
    }
  }
  
  void spawnPlanets(int planetCount, PImage[] planetTextures) {
    spawnSatellites(planetCount, planetTextures, 0.5, 0.3);
  }
  
  void spawnMoons(int moonsPerSatellite, PImage[] textures) {
    for (int i = 0; i < satellites.length; i++) {
      satellites[i].spawnSatellites(moonsPerSatellite, textures, 0.01, 0.02); 
    }
  }
  
  void show() {
    pushMatrix();
    
    noStroke();
    
    PVector v2 = new PVector(1,0,1);
    PVector p = v.cross(v2);
    rotate(angle, p.x, p.y, p.z);
    
    //stroke(255);
    //line(0, 0, 0, v.x, v.y, v.z);
    //line(0, 0, 0, p.x, p.y, p.z);
    //noStroke();
    
    translate(v.x, v.y, v.z);

    shape(globe);
    
    //sphere(radius);
    //ellipse(0, 0, radius*2, radius*2);
    if (satellites != null) { 
      for (int i = 0; i < satellites.length; i++) {
        satellites[i].show();
      }
    }
    
    popMatrix(); // Undo translations
  }
}