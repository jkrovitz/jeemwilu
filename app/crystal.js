var rect;
var side2; 
var side3; 
tool.minDistance = 5;

var rect = new Path.Rectangle(new Point(50, 50), new Size(50, 50));
rect.style = {
	fillColor: 'blue',
};

function onMouseMove(event) {
    rect.rotate(20);    
}



