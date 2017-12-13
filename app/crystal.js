/*** Some of this code has been obtained and modified from https://jsfiddle.net/MadLittleMods/n6u6asza/ and https://codepen.io/jonnyboniface/pen/ALoPbL***/
var three = THREE;


//--------------------Camera Settings--------------------//
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

heightLine.vertices.push(new THREE.Vector3(70, 0, 0));
heightLine.vertices.push(new THREE.Vector3(70, cross_section_height, 0));
widthLine.vertices.push(new three.Vector3(70,0,0));
widthLine.vertices.push(new three.Vector3(70+cross_section_width,0,0));

/***add free-standing cross section***/
var ellipse_material = new THREE.LineBasicMaterial({color:0x000000, opacity:1});
var ellipse = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2.0 * Math.PI, false);
var ellipsePath = new THREE.CurvePath();
ellipsePath.add(ellipse);
var ellipseGeometry = ellipsePath.createPointsGeometry(100);
var freeStandingCrossSection = new THREE.Line(ellipseGeometry, ellipse_material);

/***Add ellipsoids. ***/

var embeddedEllipsoidMesh = new THREE.Mesh(ellipsoid,ellipsoidMaterial);
var freeStandingEllipsoidMesh = new three.Mesh(ellipsoid,ellipsoidMaterial);
scene.add(embeddedEllipsoidMesh); 
freeStandingEllipsoidMesh.position.set(35,0,0);
scene.add(freeStandingEllipsoidMesh);

/***Add embeded cross-section***/
var Embededellipse = new THREE.EllipseCurve(0, 0, 5, 5, 0, 2.0 * Math.PI, false);
var EmbededellipsePath = new THREE.CurvePath();
EmbededellipsePath.add(Embededellipse);
var EmbededellipseGeometry = EmbededellipsePath.createPointsGeometry(100);
var embededCrossSectionWMesh = new three.Line(EmbededellipseGeometry,crossSectionMaterial);
embededCrossSectionWMesh.position.set(35,0,0);


/***add crystal***/
var crystalShape;

function changeShape(shape) {
    if(crystalShape)
        scene.remove(crystalShape);
    if(embeddedEllipsoidMesh)
        scene.remove(embeddedEllipsoidMesh);
    if(freeStandingEllipsoidMesh)
        scene.remove(freeStandingEllipsoidMesh);
	
    
	if(myonoffswitch.checked)
	document.getElementById("myonoffswitch").checked = false;
	removeWidthAndHeightLineRender(); 
	scene.remove(freeStandingCrossSection);
	scene.remove(embededCrossSectionWMesh); 
	
	
    
//    if(shape == "cubicPrism") {
//        var ellipsoid = new THREE.SphereGeometry(5,20,20); 
//    }
    
    crystalShape = new three.Mesh(shape.geometry, crystalMaterial);
    crystalShape.rotation.x = Math.PI/2;
    //freeStandingEllipsoidMesh.rotation.set(0,0,0);
    //embeddedEllipsoidMesh.rotation.set(0,0,0);
    
    scene.add(crystalShape);
    scene.add(embeddedEllipsoidMesh);
    scene.add(freeStandingEllipsoidMesh);
    var geo = new THREE.EdgesGeometry( crystalShape.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

    
    crystalShape.add( wireframe );
    
	
	
	//********I don't think we need this code chunk anymore.********
    //cross Section Reset
//    cross_section_width = 10;
//    cross_section_height = 10;
//    crossSectionAxisUpdatesOff();
    //redraw_cross_section();
}

changeShape(crystalShapes.hexagonalPrism);



//--------------------Updating and User Interface--------------------//

var crystal_lateral_offest_from_start = 0;

var hexagonalSelect = document.getElementById('hexagonalPrism');
var cubicSelect = document.getElementById('cubicPrism');

function addWidthAndHeightLineRender(){
	scene.add(widthLineRender); 
	scene.add(heightLineRender); 
}


	
function removeWidthAndHeightLineRender(){
	scene.remove(widthLineRender); 
	scene.remove(heightLineRender); 
}

hexagonalSelect.onclick = function() {
    changeShape(crystalShapes.hexagonalPrism);
//	removeWidthAndHeightLineRender();  
}

cubicSelect.onclick = function() {
    changeShape(crystalShapes.cubicPrism);
//	removeWidthAndHeightLineRender(); 
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


    /***Function to update the cross sections***/
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

   if(myonoffswitch.checked){
		document.getElementById("myonoffswitch").checked = true;
		scene.add(freeStandingCrossSection); 
        addCrossSections(); 
        cross_section_width=cross_section_width+10;
        cross_section_height=cross_section_height+10;

        var sqr = (x) => x * x;

        // (xu,yu,zu): basis of ellipsoid’s local coordinate space
        // (Note: it’s possible that I have the rotation backwards here; you
        // may need to invert the rotation to get the orientation right.)

        var rotation = crystalShape.quaternion,
            xu = (new three.Vector3(1, 0, 0)).applyQuaternion(rotation),
            yu = (new three.Vector3(0, 1, 0)).applyQuaternion(rotation),
            zu = (new three.Vector3(0, 0, 1)).applyQuaternion(rotation);

        // ellipsoid shape
        var A = sqr(1 / 5),
            B = sqr(1 / 5),
            C = sqr(1 / 7.5);

        // cross section ellipse

        // These are the coeffecients of the equation that describes
        // the cross section ellipse, a x^2 + b z^2 + c xz = 1.

        var a = A * sqr(xu.x) + B * sqr(yu.x) + C * sqr(zu.x),
            b = A * sqr(xu.z) + B * sqr(yu.z) + C * sqr(zu.z),
            c = A * xu.x * xu.z + B * yu.x * yu.z + C * zu.x * zu.z;

        cross_section_width  = 2 * Math.sqrt(2 / (a + b + Math.sqrt(sqr(a-b) + sqr(2*c))));
        cross_section_height = 2 * Math.sqrt(2 / (a + b - Math.sqrt(sqr(a-b) + sqr(2*c))));


        // You should be able to compute the rotation of the cross section
        // from (a,b,c), possibly from c alone, but my investigations stopped here.
        // That equation is the normal quadratic form for an ellipse, so Google
        // should be able to help. (Beware: sometimes that eq has b & c swapped.)
        
       //Spin embedded cross section
        crystal_lateral_offest_from_start = (crystal_lateral_offest_from_start+2*deltaRotationQuaternion.y) % (2*Math.PI);
        redraw_cross_section();	
	}

    else{
		removeCrossSections(); 
		crossSectionAxisUpdatesOff(); 	
	}
}


function addCrossSections(){
	//add inner-ellipsoid cross-section for freestanding ellipse
	scene.add(embededCrossSectionWMesh);
	embededCrossSectionWMesh.rotation.x = Math.PI/2;
	
	//Add freeStandingCrossSection. 
	addWidthAndHeightLineRender(); 
	freeStandingCrossSection.position.set(70,0,0);
	scene.add(freeStandingCrossSection);	
}

function removeCrossSections(){
	//Removes the cross section embedded in the free standing ellipse 
	scene.remove(embededCrossSectionWMesh); 
	
	//Removes the free standing cross section
	removeWidthAndHeightLineRender(); 
	scene.remove(freeStandingCrossSection); 
	crossSectionAxisUpdatesOff(); 
}

/*** update the cross sections to match the axis lines***/
function redraw_cross_section(){
	crossSectionAxisUpdates(); 
    scene.remove(freeStandingCrossSection);
    ellipse = new THREE.EllipseCurve(0, 0, cross_section_width, cross_section_height, 0, 2.0 * Math.PI, false); 
    ellipsePath = new THREE.CurvePath();
    ellipsePath.add(ellipse);
    ellipseGeometry = ellipsePath.createPointsGeometry(100);
    freeStandingCrossSection = new THREE.Line(ellipseGeometry, ellipse_material);
    freeStandingCrossSection.position.set(70,0,0);
	scene.add(freeStandingCrossSection);
    
    scene.remove(embededCrossSectionWMesh);
    Embededellipse = new THREE.EllipseCurve(0, 0, cross_section_width/2, cross_section_height/2, 0, 2.0 * Math.PI, false);
    EmbededellipsePath = new THREE.CurvePath();
    EmbededellipsePath.add(Embededellipse);
    EmbededellipseGeometry = EmbededellipsePath.createPointsGeometry(100);
    embededCrossSectionWMesh = new three.Line(EmbededellipseGeometry,crossSectionMaterial);
    embededCrossSectionWMesh.position.set(35,0,0);
    
    //rotate embeded cross section
    embededCrossSectionWMesh.rotation.x = Math.PI/2;
    embededCrossSectionWMesh.rotation.z = crystal_lateral_offest_from_start;
    scene.add(embededCrossSectionWMesh)
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
    widthLine.vertices[1].x = 0; 
    widthLineRender.geometry.verticesNeedUpdate = false;
    heightLine.vertices[1].y = 0;
	heightLineRender.geometry.verticesNeedUpdate = false;
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
