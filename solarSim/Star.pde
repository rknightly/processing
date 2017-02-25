class Star {
  PVector position;
  
  PShape dot;
  
  Star(PVector p) {
    position = p;
    
    fill(202, 215, 255);
    dot = createShape(SPHERE, 1);
  }
  
  void show() {
    pushMatrix();
    
    translate(position.x, position.y, position.z);
    shape(dot);
    
    
    popMatrix();
  }
}