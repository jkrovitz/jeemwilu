/*** Some of this code has been obtained and modified from https://jsfiddle.net/MadLittleMods/n6u6asza/ and https://codepen.io/jonnyboniface/pen/ALoPbL***/
var three = THREE;


//--------------------Camera Settings--------------------
var scene = new three.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var viewSize = 100;
var aspect=window.innerWidth*2/window.innerHeight;
var camera = new THREE.OrthographicCamera(.5 * viewSize * aspect / - 2, .5 * viewSize * aspect / 2, viewSize / 2, viewSize / - 2 , -1000, 1000);
scene.add( camera );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize( event ) {
    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT * 2;
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    camera.aspect =  aspect;
    camera.left   = - 0.5 * viewSize * aspect / 2;
    camera.right  =   0.5 * viewSize * aspect / 2;
    camera.top    =   viewSize / 2;
    camera.bottom = - viewSize / 2;
    camera.updateProjectionMatrix();
    }

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



//--------------------Object Declarations--------------------//


//***Hexagonal Prism***//
var hexagonalPrism = new THREE.Geometry();

hexagonalPrism.vertices.push( //Make all of the vertices! Triangles from center, with bases rotating counterclockwise
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
hexagonalPrism.faces.push( 
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


//***ellipsoids***//
var ellipsoid = new THREE.SphereGeometry(5,20,20); 
ellipsoid.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.5, 1.0 ) );

//define cross-section within freestanding ellipsoid
var crossSectionInEllipsoid = new three.CircleGeometry(5,60);


//***shape materials definitions***//

var crystalMaterial = new three.MeshFaceMaterial([
    new three.MeshFaceMaterial({//Crystal wireframe material
        color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
    }),
]);


var ellipsoidMaterial = new THREE.MeshBasicMaterial({//ellipsoid semi-transparent grey material
    color:0x000000, transparent:true, opacity:0.1, side: THREE.DoubleSide
});

var crossSectionMaterial = new THREE.MeshBasicMaterial({//cross section dark grey material
    color:0x333333 
});

crossSectionMaterial.side = THREE.DoubleSide;



//--------------------Adding shapes to the scene --------------------//

/***add crystal***/
var hexagonalPrismShape = new three.Mesh(hexagonalPrism, crystalMaterial);
hexagonalPrismShape.rotation.x = Math.PI/2;
scene.add(hexagonalPrismShape);

var geo = new THREE.EdgesGeometry( hexagonalPrismShape.geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
var wireframe = new THREE.LineSegments( geo, mat );
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

hexagonalPrismShape.add( wireframe );


/***add free-standing cross section***/
var ellipse_material = new THREE.LineBasicMaterial({color:0x000000, opacity:1});
var ellipse = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2.0 * Math.PI, false);
var ellipsePath = new THREE.CurvePath();
ellipsePath.add(ellipse);
var ellipseGeometry = ellipsePath.createPointsGeometry(100);
var theFreeStandingCrossSection = new THREE.Line(ellipseGeometry, ellipse_material);

ellipseGeometry.computeTangents();
theFreeStandingCrossSection.position.set(70,0,0);
scene.add(theFreeStandingCrossSection);
 
/*Add Cross Section Axes*/

//Declare variables for height axis
var current_cross_section_height = 10;
var heightColor = new three.LineBasicMaterial({color: 0x00FF00});
var heightLine = new three.Geometry();
var heightLineRender = new THREE.Line(heightLine, heightColor);

//Declare variables for width axis
var current_cross_section_width = 10;
var widthColor = new three.LineBasicMaterial({color: 0xff0000});
var widthLine = new three.Geometry();
var widthLineRender = new three.Line(widthLine, widthColor);

function addCrossSectionAxes(){
heightLine.vertices.push(new THREE.Vector3(70, 0, 0));
heightLine.vertices.push(new THREE.Vector3(70, current_cross_section_height, 0));
scene.add(heightLineRender);
widthLine.vertices.push(new three.Vector3(70,0,0));
widthLine.vertices.push(new three.Vector3(70+current_cross_section_height,0,0));
scene.add(widthLineRender);
} 
 
addCrossSectionAxes(); 


/***Add ellipsoids. ***/
var ellipsoidMesh = new THREE.Mesh(ellipsoid,ellipsoidMaterial)
var freeStandingEllipsoid = new three.Mesh(ellipsoid,ellipsoidMaterial);
scene.add(ellipsoidMesh); 

freeStandingEllipsoid.position.set(35,0,0);
scene.add(freeStandingEllipsoid);

function AddEmbededCrossSection(){
//add inner-ellipsoid cross-section for freestanding ellipse
var crossSectionInEllipsoidWMesh = new three.Mesh(crossSectionInEllipsoid,crossSectionMaterial);
crossSectionInEllipsoidWMesh.position.set(35,0,0);
scene.add(crossSectionInEllipsoidWMesh);
//rotate 250 deg = 4.36332 radians
crossSectionInEllipsoidWMesh.rotation.x = 4.36332;
}
AddEmbededCrossSection(); 


//NOTE: not sure what this code is for. Commenting out for now bc it seems useless -Will
//var wirematerial = new THREE.MeshBasicMaterial( { 
//    color: 0x0000000, wireframe: true, polygonOffset: true,     
//    polygonOffsetFactor: 1.0, polygonOffsetUnits: 1.0 } ) ;
//
//ellipsoidMesh.add( wirematerial)



//--------------------Updating and User Interface--------------------//

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

var current_cross_section_height; 
var current_cross_section_width; 
var current_cross_section_depth;//imaginary value for calculating

function rotateCrystal(deltaMove) {
    var deltaRotationQuaternion = new three.Quaternion()
        .setFromEuler(new three.Euler(
            toRadians(deltaMove.y),
            toRadians(deltaMove.x),
            0,
            'XYZ'
        ));
    //And now we tell the shapes which things move        
    hexagonalPrismShape.quaternion.multiplyQuaternions(deltaRotationQuaternion, hexagonalPrismShape.quaternion);
    ellipsoidMesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, ellipsoidMesh.quaternion);
    freeStandingEllipsoid.quaternion.multiplyQuaternions(deltaRotationQuaternion, freeStandingEllipsoid.quaternion);

    //      This next section, UNFINISHED, changes the x and y axes of the cross section as the mouse moves. I think up/down needs work but side/side is ok.

//    console.log(deltaRotationQuaternion.x);
//    console.log(deltaRotationQuaternion.y);
//    console.log("");
    
    //This section deals with an up/down drag
    
    if (deltaRotationQuaternion.x != 0){//BROKEN!!! I THINK. Add cross section depth variable and recalc new cross section?
        current_cross_section_height = 75*(Math.sqrt(25*Math.pow(Math.cos(deltaRotationQuaternion.x+x_angle_rotated_from_start),2) + 56.25*Math.pow(Math.sin(deltaRotationQuaternion.x+x_angle_rotated_from_start),2)))/(2*(25*Math.pow(Math.cos(deltaRotationQuaternion.x+x_angle_rotated_from_start),2) + 56.25*Math.pow(Math.sin(deltaRotationQuaternion.x+x_angle_rotated_from_start),2)));
        x_angle_rotated_from_start = (x_angle_rotated_from_start + deltaRotationQuaternion.x*2) % (2*Math.PI); // The delta quaternion needs multiplied by 2 for some reason and I don't know why but it works so don't question it.
    }
    //This deals with a side/side drag
    if (deltaRotationQuaternion.y != 0){//Calc new width axis
        current_cross_section_width = ((current_cross_section_width*current_cross_section_height)* Math.sqrt(Math.pow(current_cross_section_height,2)*(Math.pow(Math.cos(deltaRotationQuaternion.y+y_angle_rotated_from_start),2))+Math.pow(current_cross_section_width,2)*(Math.pow(Math.sin(deltaRotationQuaternion.y+y_angle_rotated_from_start),2))))/(Math.pow(current_cross_section_height,2)*(Math.pow(Math.cos(deltaRotationQuaternion.y+y_angle_rotated_from_start),2))+Math.pow(current_cross_section_width,2)*(Math.pow(Math.sin(deltaRotationQuaternion.y+y_angle_rotated_from_start),2)));
        
        //next, calc new height axis
        current_cross_section_height = ((current_cross_section_width*current_cross_section_height)* Math.sqrt(Math.pow(current_cross_section_width,2)*(Math.pow(Math.cos(deltaRotationQuaternion.y+y_angle_rotated_from_start),2))+Math.pow(current_cross_section_height,2)*(Math.pow(Math.sin(deltaRotationQuaternion.y+y_angle_rotated_from_start),2))))/(Math.pow(current_cross_section_width,2)*(Math.pow(Math.cos(deltaRotationQuaternion.y+y_angle_rotated_from_start),2))+Math.pow(current_cross_section_height,2)*(Math.pow(Math.sin(deltaRotationQuaternion.y+y_angle_rotated_from_start),2)));
        
        y_angle_rotated_from_start = (y_angle_rotated_from_start + deltaRotationQuaternion.y*2) % (2*Math.PI);
    }
	crossSectionAxisUpdates(); 
    

    //Now we update the cross section to match the axis lines
    //Note: This works but warrants a look later to see how well coded it is. It could be prettier;
    
    scene.remove(theFreeStandingCrossSection);
    ellipse = new THREE.EllipseCurve(0, 0, current_cross_section_width, current_cross_section_height, 0, 2.0 * Math.PI, false); 
    ellipsePath = new THREE.CurvePath();
    ellipsePath.add(ellipse);
    ellipseGeometry = ellipsePath.createPointsGeometry(100);
    ellipseGeometry.computeTangents();
    theFreeStandingCrossSection = new THREE.Line(ellipseGeometry, ellipse_material);
   theFreeStandingCrossSection.position.set(70,0,0);
    
	
	scene.add(theFreeStandingCrossSection);

    
}

function crossSectionAxisUpdates(){
    //Here we just update the lines drawing positions to match
    widthLine.vertices[1].x = 70+current_cross_section_width;
    widthLineRender.geometry.verticesNeedUpdate = true;
    heightLine.vertices[1].y = current_cross_section_height;
	heightLineRender.geometry.verticesNeedUpdate = true;
}


function crossSectionAxisUpdatesOff(){
    //Here we just update the lines drawing positions to match
    widthLine.vertices[1].x = 70+current_cross_section_width;
    widthLineRender.geometry.verticesNeedUpdate = false;
    heightLine.vertices[1].y = current_cross_section_height;
	heightLineRender.geometry.verticesNeedUpdate = false;
}


function doNotRotateFreeStandingCrossSection(){
	current_cross_section_height=0; 
	current_cross_section_width=0; 
}

function removeFreeStandingCrossSection(){
scene.remove(widthLineRender); 
scene.remove(heightLineRender); 
scene.remove(theFreeStandingCrossSection); 
	crossSectionAxisUpdatesOff(); 
doNotRotateFreeStandingCrossSection(); 
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