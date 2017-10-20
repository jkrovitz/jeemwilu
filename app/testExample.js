var boxSz = 25;
var numSpheres = 20;
var x = [];
var y = [];
var z = [];
var t = 0.0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);

  for (var i = 0; i < numSpheres; i++) {
    x[i] = random(-boxSz, boxSz);
    y[i] = random(-boxSz, boxSz);
    z[i] = random(-boxSz, boxSz);
  }
  // println(x);
  // println(y);
  // println(z);
}

function draw() {
  background(35, 25, 90);
  //translate(0,0,-100);
  rotateY(frameCount * 0.01);

  stroke(255);
  //front
  line(-boxSz, -boxSz, boxSz, boxSz, -boxSz, boxSz);
  line(-boxSz, boxSz, boxSz, boxSz, boxSz, boxSz);
  line(-boxSz, -boxSz, boxSz, -boxSz, boxSz, boxSz);
  line(boxSz, -boxSz, boxSz, boxSz, boxSz, boxSz);


  //back
  line(-boxSz, -boxSz, -boxSz, boxSz, -boxSz, -boxSz);
  line(-boxSz, boxSz, -boxSz, boxSz, boxSz, -boxSz);
  line(-boxSz, -boxSz, -boxSz, -boxSz, boxSz, -boxSz);
  line(boxSz, -boxSz, -boxSz, boxSz, boxSz, -boxSz);


  //left top
  line(-boxSz, -boxSz, boxSz, -boxSz, -boxSz, -boxSz);
  //left bottom
  line(-boxSz, boxSz, -boxSz, -boxSz, boxSz, boxSz);
  //right top
  line(boxSz, -boxSz, boxSz, boxSz, -boxSz, -boxSz);
  // // right bottom
  line(boxSz, boxSz, -boxSz, boxSz, boxSz, boxSz);

  for (var i = 0; i < numSpheres; i++) {
    push();
    translate(x[i], y[i], z[i]);
    sphere(boxSz / 50, 8);
    pop();
  }

}