var rect;
//var side2; 
//var side3; 
tool.minDistance = 5;

var rect = new Path.Rectangle(new Point(50, 50), new Size(50, 50));
rect.style = {
	fillColor: 'green',
};

var side2 = new Path.Rectangle(new Point(100, 20), new Size(50, 50));
side2.style = {
	fillColor: 'blue',
};
//
//var side3 = new Path.Rectangle(new Point(100, 50), new Size(50, 50));
//side3.style = {
//	fillColor: 'green',
//};

// Create a Paper.js Path to draw a line into it:
var hexagon = new Path();
// Color our path black
hexagon.strokeColor = 'black';

// How many points do we want our object to have
var points = 6;
// How large should it be
var radius = 20;
// 0 to 2PI is a circle, so divide that by the number of points
// in our object and that's how many radians we should put a new
// point in order to draw the shape
var angle = ((2 * Math.PI) / points);

// For as many vertices in the shape, add a point
for(i = 0; i <= points; i++) {

  // Add a new point to the object
  hexagon.add(new Point(
    // Radius * Math.cos(number of radians of the point) is the x position
    radius * Math.cos(angle * i), 
    // And the same thing with Math.sin for the y position of the point
    radius * Math.sin(angle * i)
  ));
}

// Offset the shape so it's fully displayed on the canvas
hexagon.position.x += 50;
hexagon.position.y += 30;



function onMouseMove(event) {
    rect.rotate(20); 
    hexagon.rotate(20);
    side2.rotate(40);
    //side3.rotate(20);

}

