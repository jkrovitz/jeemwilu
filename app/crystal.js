// Create a Paper.js Path to draw a line into it:
//var myPath = new Path();
//myPath.strokeColor = 'magenta';
//myPath.add(new Point(5, 50)); 
//myPath.add(new Point(6, 30)); 
// Give the stroke a color
//var start = new Point(1, 100);


// Move to start and draw a line from there
//myPath.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
//myPath.lineTo(start + [ 100, -50 ]);


var myCircle = new Path.Circle(new Point(200, 70), 50);
myCircle.strokeColor = 'black';
myCircle.fillColor='#28487f'; 
myCircle.selected = true;


//var rectangle = new Rectangle(new Point(20, 50), new Point(100, 100));
//var path = new Path.Rectangle(rectangle);
//path.fillColor = '#e9e9ff';
//path.selected = true;

var rectangle = new Rectangle(new Point(20, 50), new Point(70, 100));
var path = new Path.Rectangle(rectangle);
path.fillColor = '#28487f';
path.selected = true;