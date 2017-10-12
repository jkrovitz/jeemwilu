
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


//var myCircle = new Path.Circle(new Point(200, 70), 50);
//myCircle.fillColor = 'green'; 

//var rectangle = new Rectangle(new Point(20, 50), new Point(100, 100));
//var path = new Path.Rectangle(rectangle);
//path.fillColor = '#red';

//var rectangle = new Rectangle(new Point(45, 20), new Point(90, 60));
//var path = new Path.Rectangle(rectangle);
//path.fillColor = 'blue';
//
//var rectangle = new Rectangle(new Point(20, 50), new Point(70, 100));
//var path = new Path.Rectangle(rectangle);
//path.fillColor = 'orange';

//
//// Create a rectangle shaped path with its top left point at
//// {x: 75, y: 75} and a size of {width: 75, height: 75}
//var path = new Path.Rectangle({
//	point: [75, 75],
//	size: [25, 25],
//	strokeColor: 'green'
//});
//
//function onFrame(event) {
//	// Each frame, rotate the path by 3 degrees:
//	path.rotate(3);
//}
//
//var path = new Path.Rectangle(new Point(50, 50), new Size(100, 50));
//path.style = {
//	fillColor: 'white',
//	strokeColor: 'black'
//};
//
//// Create a copy of the path and set its stroke color to red:
//var copy = path.clone();
//copy.strokeColor = 'red';
//
//// Rotate the copy by 45 degrees:
//copy.rotate(45);



//// Create a circle shaped path at the center of the view:
//    var path = new Path.Circle({
//    center: view.center,
//    radius: 25,
//    fillColor: 'black'
//    });

//tool.onMouseUp = function(event) {
//    // Create a new circle shaped path with a radius of 10
//    // at the position of the mouse (event.point):
//    var path = new Path.Circle({
//        center: event.point,
//        radius: 10,
//        fillColor: 'black'
//    });
//}

var path;

// Only execute onMouseDrag when the mouse
// has moved at least 10 points:
tool.minDistance = 10;

//tool.onMouseDown = function(event) {
//    // Create a new path every time the mouse is clicked
//    path = new Path();
//    path.add(event.point);
//    path.strokeColor = 'black';
//}

//tool.onMouseDrag = function(event) {
//    // Add a point to the path every time the mouse is dragged
//    path.add(event.point);
//}

//var circlePath = new Path.Circle(new Point(50, 50), 25);
//circlePath.fillColor = 'black'

var path = new Path.Rectangle(new Point(50, 50), new Size(100, 50));
path.style = {
	fillColor: 'blue',
	strokeColor: 'black'
};

//// Create a copy of the path and set its stroke color to red:
//var copy = path.clone();
//copy.strokeColor = 'red';

function onMouseMove(event) {
	//circlePath.position = event.point;
    path.rotate(20); 
}



//var point1 = new Point(150, 150);
//  var point2 = new Point(250, 150);
//  path.add(point1);
//  path.add(point2);
//
//  var handle1 = new Path.Circle({
//    center    : point1,
//    radius    : 7,
//    fillColor : 'green'
//  });
//
//  var handle2 = new Path.Circle({
//    center    : point2,
//    radius    : 7,
//    fillColor : 'blue'
//  });
//
//  var group = new Group(path, handle1, handle2);
//  group.pivot = point1;
//
//  handle1.onMouseDrag = function(event) {
//    group.position = group.position.subtract(handle1.position).add(event.point);
//  };
//
//  handle2.onMouseDrag = function(event) {
//    group.rotate(event.point.angle - handle2.position.angle)
//  };
