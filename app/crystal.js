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

console.log(document, document.body)
document.body.appendChild(renderer.domElement);

//light
var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, -500, 0 );
scene.add( light );



//--------------------Crystal Shapes--------------------//

var hexagonalPrismGeometry = new THREE.Geometry();
hexagonalPrismGeometry.vertices.push( //Make all of the vertices! Triangles from center, with bases rotating counterclockwise
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
hexagonalPrismGeometry.faces.push( 
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

var crystalShapes = {
    hexagonalPrism: {
        geometry: hexagonalPrismGeometry
    },
    trigonalPrism: {
        geometry: new three.BoxGeometry(15,15,15)  // fake for now
    },
    cubicPrism: {
        geometry: new three.BoxGeometry(15,15,15)
    }
};

//--------------------Shared Objects--------------------//


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
var cross_section_height = 10;
var heightColor = new three.LineBasicMaterial({color: 0x00FF00});
var heightLine = new three.Geometry();
var heightLineRender = new THREE.Line(heightLine, heightColor);

//Declare variables for width axis
var cross_section_width = 10;
var widthColor = new three.LineBasicMaterial({color: 0xff0000});
var widthLine = new three.Geometry();
var widthLineRender = new three.Line(widthLine, widthColor);

function addCrossSectionAxes(){
heightLine.vertices.push(new THREE.Vector3(70, 0, 0));
heightLine.vertices.push(new THREE.Vector3(70, cross_section_height, 0));
scene.add(heightLineRender);
widthLine.vertices.push(new three.Vector3(70,0,0));
widthLine.vertices.push(new three.Vector3(70+cross_section_width,0,0));
scene.add(widthLineRender);
} 
 
addCrossSectionAxes(); 


/***Add ellipsoids. ***/
var embeddedEllipsoidMesh = new THREE.Mesh(ellipsoid,ellipsoidMaterial)
var freeStandingEllipsoidMesh = new three.Mesh(ellipsoid,ellipsoidMaterial);
scene.add(embeddedEllipsoidMesh); 

freeStandingEllipsoidMesh.position.set(35,0,0);
scene.add(freeStandingEllipsoidMesh);

function AddEmbededCrossSection(){
//add inner-ellipsoid cross-section for freestanding ellipse
var crossSectionInEllipsoidWMesh = new three.Mesh(crossSectionInEllipsoid,crossSectionMaterial);
crossSectionInEllipsoidWMesh.position.set(35,0,0);
scene.add(crossSectionInEllipsoidWMesh);
//rotate 250 deg = 4.36332 radians
crossSectionInEllipsoidWMesh.rotation.x = 4.36332;
}
AddEmbededCrossSection(); 

/***add crystal***/
var crystalShape;
var x_angle_rotated_from_start = 0;
var y_angle_rotated_from_start = 0;

function changeShape(shape) {
    if(crystalShape)
        scene.remove(crystalShape);
    if(embeddedEllipsoidMesh)
        scene.remove(embeddedEllipsoidMesh);
    if(freeStandingEllipsoidMesh)
        scene.remove(freeStandingEllipsoidMesh);

    crystalShape = new three.Mesh(shape.geometry, crystalMaterial);
    crystalShape.rotation.x = Math.PI/2;
//    ellipsoid.rotation.x = Math.PI/2;
    freeStandingEllipsoidMesh.rotation.set(0,0,0);
    embeddedEllipsoidMesh.rotation.set(0,0,0);
    scene.add(crystalShape);
    scene.add(embeddedEllipsoidMesh);
    scene.add(freeStandingEllipsoidMesh);

    var geo = new THREE.EdgesGeometry( crystalShape.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

    
    crystalShape.add( wireframe );
    
    //cross Section Reset
    cross_section_width = 10;
    cross_section_height = 10;
    x_angle_rotated_from_start = 0;
    y_angle_rotated_from_start = 0;
    crossSectionAxisUpdates();
    redraw_cross_section();
}

changeShape(crystalShapes.hexagonalPrism);


//--------------------Updating and User Interface--------------------//

var crystalSelect = document.getElementById('chooseCrystalStructure');
crystalSelect.onchange = function() {
    changeShape(crystalShapes[crystalSelect.value]);
}

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

var current_cross_section_depth = 15;//imaginary value for calculating

function rotateCrystal(deltaMove) {
    var deltaRotationQuaternion = new three.Quaternion()
        .setFromEuler(new three.Euler(
            toRadians(deltaMove.y),
            toRadians(deltaMove.x),
            0,
            'XYZ'
        ));
    //And now we tell the shapes which things move        
    crystalShape.quaternion.multiplyQuaternions(deltaRotationQuaternion, crystalShape.quaternion);
    embeddedEllipsoidMesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, embeddedEllipsoidMesh.quaternion);
    freeStandingEllipsoidMesh.quaternion.multiplyQuaternions(deltaRotationQuaternion, freeStandingEllipsoidMesh.quaternion);

    //----------------------------------------------------------------------------------------------------------------------------------------
    //      This next section, UNFINISHED, changes the x and y axes of the cross section as the mouse moves.
    //   There is still some sort of bug in here, where occasionally the cross section isn't lining up with what it should be. Needs more work.

    console.log("height: "+ cross_section_height);
    console.log("width: " + cross_section_width);
    console.log("depth: " + current_cross_section_depth);
    //Print out the rotation from start in degrees.
    console.log(x_angle_rotated_from_start*360/(2*Math.PI));
    console.log(y_angle_rotated_from_start*360/(2*Math.PI));
    console.log();
    
    //This section deals with an up/down drag
        x_angle_rotated_from_start = (x_angle_rotated_from_start + deltaRotationQuaternion.x*2) % (2*Math.PI); // The delta quaternion needs multiplied by 2 for some reason and I don't know why but it works so don't question it.
        if (x_angle_rotated_from_start<0) x_angle_rotated_from_start = x_angle_rotated_from_start + (2*Math.PI);
        current_cross_section_depth = ((10*30)* Math.sqrt(Math.pow(10,2)*(Math.pow(Math.cos(x_angle_rotated_from_start),2))+Math.pow(30,2)*(Math.pow(Math.sin(x_angle_rotated_from_start),2))))/(Math.pow(10,2)*(Math.pow(Math.cos(x_angle_rotated_from_start),2))+Math.pow(30,2)*(Math.pow(Math.sin(x_angle_rotated_from_start),2)));
        
       cross_section_height = ((10*30)* Math.sqrt(Math.pow(30,2)*(Math.pow(Math.cos(x_angle_rotated_from_start),2))+Math.pow(10,2)*(Math.pow(Math.sin(x_angle_rotated_from_start),2))))/(Math.pow(30,2)*(Math.pow(Math.cos(x_angle_rotated_from_start),2))+Math.pow(10,2)*(Math.pow(Math.sin(x_angle_rotated_from_start),2)));

    //This deals with a side/side drag
        y_angle_rotated_from_start = (y_angle_rotated_from_start + deltaRotationQuaternion.y*2) % (2*Math.PI);
        if (y_angle_rotated_from_start<0) y_angle_rotated_from_start = y_angle_rotated_from_start + (2*Math.PI);
    
        cross_section_width = ((10*cross_section_height)* Math.sqrt(Math.pow(cross_section_height,2)*(Math.pow(Math.cos(y_angle_rotated_from_start),2))+Math.pow(10,2)*(Math.pow(Math.sin(y_angle_rotated_from_start),2))))/(Math.pow(cross_section_height,2)*(Math.pow(Math.cos(y_angle_rotated_from_start),2))+Math.pow(10,2)*(Math.pow(Math.sin(y_angle_rotated_from_start),2)));
        
        cross_section_height = ((10*cross_section_height)* Math.sqrt(Math.pow(10,2)*(Math.pow(Math.cos(y_angle_rotated_from_start),2))+Math.pow(cross_section_height,2)*(Math.pow(Math.sin(y_angle_rotated_from_start),2))))/(Math.pow(10,2)*(Math.pow(Math.cos(y_angle_rotated_from_start),2))+Math.pow(cross_section_height,2)*(Math.pow(Math.sin(y_angle_rotated_from_start),2)));
	
    crossSectionAxisUpdates(); 
    redraw_cross_section();
    //-----------------------------------------------------------------------------------------------------------------------------------------------
}

//Now we update the cross section to match the axis lines
//Note: This works but warrants a look later to see how well coded it is. It could be prettier;
function redraw_cross_section(){
    scene.remove(theFreeStandingCrossSection);
    ellipse = new THREE.EllipseCurve(0, 0, cross_section_width, cross_section_height, 0, 2.0 * Math.PI, false); 
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
    widthLine.vertices[1].x = 70+cross_section_width;
    widthLineRender.geometry.verticesNeedUpdate = true;
    heightLine.vertices[1].y = cross_section_height;
	heightLineRender.geometry.verticesNeedUpdate = true;
}


function crossSectionAxisUpdatesOff(){
    //Here we just update the lines drawing positions to match
    widthLine.vertices[1].x = 70+cross_section_width;
    widthLineRender.geometry.verticesNeedUpdate = false;
    heightLine.vertices[1].y = cross_section_height;
	heightLineRender.geometry.verticesNeedUpdate = false;
}


function doNotRotateFreeStandingCrossSection(){
	cross_section_height=0; 
	cross_section_width=0; 
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
