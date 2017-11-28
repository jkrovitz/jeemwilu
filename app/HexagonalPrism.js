/*** Some of this code has been obtained and modified from https://jsfiddle.net/MadLittleMods/n6u6asza/ and https://codepen.io/jonnyboniface/pen/ALoPbL***/

//*******COMMENT INFO*********
// // + *** = section heading
// // = explanation of subsection code line


var three = THREE;

//***Camera Settings
var scene = new three.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
//Aspect Ratio can be resised, this ratio or objects will look strange
var canvasWidth = 1700; 
var canvasHeight = 900;
var viewSize = 100;
var aspectRatio=canvasWidth/canvasHeight;
var camera = new THREE.OrthographicCamera(-aspectRatio*viewSize / 2, aspectRatio*viewSize / 2, viewSize / 2, -viewSize / 2, -1000, 1000);
scene.add( camera );





//distance zoomed out/in
camera.position.z = 50;
camera.position.x = 35;

//rendering
var renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//light
var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, -500, 0 );
scene.add( light );



//***Object Declarations***//


//***Hexagonal Prism***//
var geometry = new THREE.Geometry();

geometry.vertices.push( //Make all of the vertices! Triangles from center, with bases rotating counterclockwise
    new THREE.Vector3( 0, 0, 15 ),
	new THREE.Vector3( 10,  0, 15 ),
	new THREE.Vector3( 5, 8.66, 15 ),
	new THREE.Vector3( -5, 8.66, 15 ),
    new THREE.Vector3( -10, 0, 15 ),
	new THREE.Vector3( -5, -8.66, 15 ),
	new THREE.Vector3(  5, -8.66, 15 ),
    new THREE.Vector3( 0, 0, -15 ),
	new THREE.Vector3( 10,  0, -15 ),
	new THREE.Vector3( 5, 8.66, -15 ),
	new THREE.Vector3( -5, 8.66, -15 ),
    new THREE.Vector3( -10, 0, -15 ),
	new THREE.Vector3( -5, -8.66, -15 ),
	new THREE.Vector3(  5, -8.66, -15 )  
);
geometry.faces.push( 
    new THREE.Face3( 0, 1, 2 ), //Top hex
    new THREE.Face3( 0, 2, 3 ),
    new THREE.Face3( 0, 3, 4 ),
    new THREE.Face3( 0, 4, 5 ),
    new THREE.Face3( 0, 5, 6 ),
    new THREE.Face3( 0, 6, 1 ),
    new THREE.Face3( 7, 8, 9 ), //Bottom hex 
    new THREE.Face3( 7, 9, 10 ),
    new THREE.Face3( 7, 10, 11 ),
    new THREE.Face3( 7, 11, 12 ),
    new THREE.Face3( 7, 12, 13 ),
    new THREE.Face3( 7, 13, 8 ),
    new THREE.Face3(1,2,9), //siding
    new THREE.Face3(9,8,1),
    new THREE.Face3(2,3,10),
    new THREE.Face3(10,9,2),
    new THREE.Face3(3,4,11),
    new THREE.Face3(11,10,3),
    new THREE.Face3(4,5,12),
    new THREE.Face3(12,11,4),
    new THREE.Face3(5,6,13),
    new THREE.Face3(13,12,5),
    new THREE.Face3(6,1,8),
    new THREE.Face3(8,13,6),
);



/* define embedded ellipsoid */
//normal sphere
var geometry2 = new THREE.SphereGeometry(5,20,20); 

geometry2.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.5, 1.0 ) );

//define cross-section within embedded ellipsoid
var innerCrossSection = new three.CircleGeometry(5,60);


/*define freestanding ellipsoid */

var geometry3 = new three.SphereGeometry(5,20,20);
geometry3.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.5, 1.0 ) );
//define cross-section within freestanding ellipsoid
var innerCrossSection2 = new three.CircleGeometry(5,60);

//define free-standing cross section
var geometry4 = new three.CircleGeometry(10, 60);


//Surface materials for our shapes
var material = new three.MeshFaceMaterial([
    new three.MeshFaceMaterial({
        color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
    }),
]);

var material2 = new THREE.MeshBasicMaterial({
    color:0x000000, transparent:true, opacity:0.1, side: THREE.DoubleSide
});

var material3 = new THREE.MeshBasicMaterial({
    color:0x333333 
});

material3.side = THREE.DoubleSide;




/* Now we draw all of these relevant shapes*/


var crystal_shape = new three.Mesh(geometry, material);
//crystal_shape.rotation.x = 4.36332;
crystal_shape.rotation.x = Math.PI/2;
scene.add(crystal_shape);

var geo = new THREE.EdgesGeometry( crystal_shape.geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
var wireframe = new THREE.LineSegments( geo, mat );
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

crystal_shape.add( wireframe );


//add free-standing cross section
var ellipse_material = new THREE.LineBasicMaterial({color:0x000000, opacity:1});
var ellipse = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2.0 * Math.PI, false);
var ellipsePath = new THREE.CurvePath();
ellipsePath.add(ellipse);
var ellipseGeometry = ellipsePath.createPointsGeometry(100);
ellipseGeometry.computeTangents();
var the_cross_section = new THREE.Line(ellipseGeometry, ellipse_material);
the_cross_section.position.set(70,0,0);
scene.add(the_cross_section);


//Declare variables for free standing cross section height line
var current_cross_section_height = 10;
var heightColor = new three.LineBasicMaterial({color: 0x00FF00});
var heightLine = new three.Geometry();
var heightLineRender = new THREE.Line(heightLine, heightColor);

function addHeightLineToFreeStandingCrossSection(){
heightLine.vertices.push(new THREE.Vector3(70, 0, 0));
heightLine.vertices.push(new THREE.Vector3(70, current_cross_section_height, 0));
scene.add(heightLineRender);
}
addHeightLineToFreeStandingCrossSection(); 

//Declare variables for free standing cross section width line
var current_cross_section_width = 10;
var widthColor = new three.LineBasicMaterial({color: 0xff0000});
var widthLine = new three.Geometry();
var widthLineRender = new three.Line(widthLine, widthColor);

function addWidthLineToFreeStandingCrossSection(){
widthLine.vertices.push(new three.Vector3(70,0,0));
widthLine.vertices.push(new three.Vector3(70+current_cross_section_height,0,0));
scene.add(widthLineRender);
}
addWidthLineToFreeStandingCrossSection(); 


//Declare ellipsoids. 
var ellipsoidInHexagonalPrism = new THREE.Mesh(geometry2,material2)
var freeStandingEllipsoid = new three.Mesh(geometry3,material2);

function addEllipsoidInHexagonalPrism(){
scene.add(ellipsoidInHexagonalPrism);
}
addEllipsoidInHexagonalPrism(); 


function addFreeStandingEllipsoid(){
freeStandingEllipsoid.position.set(35,0,0);
scene.add(freeStandingEllipsoid);
}
addFreeStandingEllipsoid(); 

function crossSectionInEllipHexPrismRender(){
//add inner-ellipsoid cross section
var crossSectionInEllipHexPrism = new three.Mesh(innerCrossSection,material3);
scene.add(crossSectionInEllipHexPrism);
//rotate 250 deg = 4.36332 radians
crossSectionInEllipHexPrism.rotation.x = 4.36332;
}
crossSectionInEllipHexPrismRender(); 

function crossSectionInEllipsoidRender(){
//add inner-ellipsoid cross-section for freestanding ellipse
var crossSectionInEllipsoid = new three.Mesh(innerCrossSection2,material3);
crossSectionInEllipsoid.position.set(35,0,0);
scene.add(crossSectionInEllipsoid);
//rotate 250 deg = 4.36332 radians
crossSectionInEllipsoid.rotation.x = 4.36332;
}
crossSectionInEllipsoidRender(); 

var wirematerial = new THREE.MeshBasicMaterial( { 
    color: 0x0000000, wireframe: true, polygonOffset: true,     
    polygonOffsetFactor: 1.0, polygonOffsetUnits: 1.0 } ) ;

ellipsoidInHexagonalPrism.add( wirematerial)



/*Now we regester user input */

var x_angle_rotated_from_start = 0;
var y_angle_rotated_from_start = 0;


var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
//How to tell when the movement is done
$(document).on('mouseup', function(e) {
    isDragging = false;
});
$(renderer.domElement).on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };

    if(isDragging) {
        rotateCrystal(deltaMove);
    }
});

function rotateCrystal(deltaMove) {
    var deltaRotationQuaternion = new three.Quaternion()
        .setFromEuler(new three.Euler(
            toRadians(deltaMove.y),
            toRadians(deltaMove.x),
            0,
            'XYZ'
        ));
    //And now we tell the shapes which things move        
    crystal_shape.quaternion.multiplyQuaternions(deltaRotationQuaternion, crystal_shape.quaternion);
    ellipsoidInHexagonalPrism.quaternion.multiplyQuaternions(deltaRotationQuaternion, ellipsoidInHexagonalPrism.quaternion);
    freeStandingEllipsoid.quaternion.multiplyQuaternions(deltaRotationQuaternion, freeStandingEllipsoid.quaternion);

    //      This next section, UNFINISHED, changes the x and y axes of the cross section as the mouse moves.

    //This equation needs to go twice as fast somehow, but seems to work otherwise. Right now rotating 180 degrees shows a cross section after 90 degrees, etc.
    current_cross_section_height = 75*(Math.sqrt(25*Math.pow(Math.cos(deltaRotationQuaternion.x+x_angle_rotated_from_start),2) + 56.25*Math.pow(Math.sin(deltaRotationQuaternion.x+x_angle_rotated_from_start),2)))/(2*(25*Math.pow(Math.cos(deltaRotationQuaternion.x+x_angle_rotated_from_start),2) + 56.25*Math.pow(Math.sin(deltaRotationQuaternion.x+x_angle_rotated_from_start),2)));
    x_angle_rotated_from_start = (x_angle_rotated_from_start + deltaRotationQuaternion.x) % (2*Math.PI);
    //The next thing needs to interact with the cross section height somehow.
    current_cross_section_width = 75*(Math.sqrt(25*Math.pow(Math.sin(deltaRotationQuaternion.y+y_angle_rotated_from_start),2) + 56.25*Math.pow(Math.cos(deltaRotationQuaternion.y+y_angle_rotated_from_start),2)))/(2*(25*Math.pow(Math.sin(deltaRotationQuaternion.y+y_angle_rotated_from_start),2) + 56.25*Math.pow(Math.cos(deltaRotationQuaternion.y+y_angle_rotated_from_start),2)));
    y_angle_rotated_from_start = (y_angle_rotated_from_start + deltaRotationQuaternion.y) % (2*Math.PI);
    
	CrossSectionAxisUpdates(); 
    heightLineRender.geometry.verticesNeedUpdate = true;

    //Now we update the cross section to match the axis lines
    //Note: This works but warrants a look later to see how well coded it is. It could be prettier;
    
    scene.remove(the_cross_section);
    ellipse = new THREE.EllipseCurve(0, 0, current_cross_section_width, current_cross_section_height, 0, 2.0 * Math.PI, false); 
    ellipsePath = new THREE.CurvePath();
    ellipsePath.add(ellipse);
    ellipseGeometry = ellipsePath.createPointsGeometry(100);
    ellipseGeometry.computeTangents();
    the_cross_section = new THREE.Line(ellipseGeometry, ellipse_material);
    the_cross_section.position.set(70,0,0);
    scene.add(the_cross_section);

    
}

function CrossSectionAxisUpdates(){
    //Here we just update the lines drawing positions to match
    widthLine.vertices[1].x = 70+current_cross_section_width;
    widthLineRender.geometry.verticesNeedUpdate = true;
    heightLine.vertices[1].y = current_cross_section_height;
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;

function update(dt, t) {
    //Given a certain length of time after the user stops dragging, we turn off input
    setTimeout(function() {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;
        update(dt, totalGameTime);
        lastFrameTime = currTime;
    }, 0);
}
update(0, totalGameTime);

function render() {
    renderer.render(scene, camera);   
    requestAnimFrame(render);
}

render();


//Cute lil helper function
function toRadians(angle) {
	return angle * (Math.PI / 180);
}