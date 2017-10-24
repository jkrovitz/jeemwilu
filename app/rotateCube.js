/*** Some of this code has been obtained and modified from https://jsfiddle.net/MadLittleMods/n6u6asza/ and https://codepen.io/jonnyboniface/pen/ALoPbL***/

//*******COMMENT INFO*********
// // + *** = section heading
// // = explanation of subsection code line

var three = THREE;


//***Camera Settings
var scene = new three.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var canvasWidth = 100;
var canvasHeight = 100;
var viewSize = 200;
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
light.position.set( 50, 50, 50 );
scene.add( light );



//***object definitions

//Cube
var geometry = new three.BoxGeometry(25, 25, 25);

//Hexagonal prism
//var geometry = new THREE.Geometry();
//
//geometry.vertices.push(
//    new THREE.Vector3( 0, 0, 0 ),
//	new THREE.Vector3( -10,  0, 0 ),
//	new THREE.Vector3( -5, 8.66, 0 ),
//	new THREE.Vector3(  5, 8.66, 0 ),
//    new THREE.Vector3(  10, 0, 0 ),
//	new THREE.Vector3( -5, -8.66, 0 ),
//	new THREE.Vector3(  5, -8.66, 0 ),
//    
//);
//
//geometry.faces.push( 
//    new THREE.Face3( 0, 1, 2 ), 
//    new THREE.Face3( 0, 2, 3 ),
//    new THREE.Face3( 0, 3, 4 ),
//    new THREE.Face3( 0, 1, 5 ),
//    new THREE.Face3( 0, 5, 6 ),
//    new THREE.Face3( 0, 4, 6 )
//
//);
//
//geometry.computeBoundingSphere();

//define embedded ellipse
var geometry2 = new THREE.SphereGeometry(5,20,20);
//geometry2.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.0, 1.0 ) );

//define cross-section within embedded ellipse
var innerCrossSection = new three.CircleGeometry(5,60);



//define freestanding ellipsoid
var geometry3 = new three.SphereGeometry(6,20,20);
//geometry3.applyMatrix( new THREE.Matrix4().makeScale( 2.0, 2.0, 2.0 ) );
//define cross-section within freestanding ellipsoid
var innerCrossSection2 = new three.CircleGeometry(6,60);


//define free-standing cross section
var geometry4 = new three.CircleGeometry(10, 60);


var material = new three.MeshFaceMaterial([
    new three.MeshFaceMaterial({
        color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
    }),
    new three.MeshFaceMaterial({
     color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
    }),
    new three.MeshFaceMaterial({
       color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
        
    }),
    new three.MeshFaceMaterial({
         color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
    }),
    new three.MeshFaceMaterial({
       color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
    }),
    new three.MeshFaceMaterial({
          color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide
        
    })
]);

var material2 = new THREE.MeshBasicMaterial({
    color:0x000000, transparent:true, opacity:0.1, side: THREE.DoubleSide
});

var material3 = new THREE.MeshBasicMaterial({
    color:0x333333 
});

material3.side = THREE.DoubleSide;

/* */

var crystal_shape = new three.Mesh(geometry, material);
crystal_shape.rotation.x = Math.PI/4;
crystal_shape.rotation.y = Math.PI/4;
scene.add(crystal_shape);

var geo = new THREE.EdgesGeometry( crystal_shape.geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
var wireframe = new THREE.LineSegments( geo, mat );
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

crystal_shape.add( wireframe );


//add embedded ellipsoid
var ellipsoid1 = new THREE.Mesh(geometry2,material2)
scene.add(ellipsoid1);

//var geo1 = new THREE.SGeometry(ellipsoid1.geometry2); 

//add free-standing cross section
var circle = new three.Mesh(geometry4,material3);
circle.position.set(70,0,0);
scene.add(circle);

//cross section height line
var heightColor = new three.LineBasicMaterial({color: 0x00FF00});
var heightLine = new three.Geometry();
heightLine.vertices.push(new THREE.Vector3(70, 0, 0));
heightLine.vertices.push(new THREE.Vector3(70, 10, 0));
var heightLineRender = new THREE.Line(heightLine, heightColor);
scene.add(heightLineRender);
//cross section width line
var widthColor = new three.LineBasicMaterial({color: 0xff0000});
var widthLine = new three.Geometry();
widthLine.vertices.push(new three.Vector3(70,0,0));
widthLine.vertices.push(new three.Vector3(80,0,0));
var widthLineRender = new three.Line(widthLine, widthColor);
scene.add(widthLineRender);



//add free ellipsoid
var ellipsoid2 = new three.Mesh(geometry3,material2);
ellipsoid2.position.set(35,0,0);
scene.add(ellipsoid2);

//add inner-ellipsoid cross section
var innerCrossSectionRender = new three.Mesh(innerCrossSection,material3);
scene.add(innerCrossSectionRender);
//rotate 250 deg = 4.36332 radians
innerCrossSectionRender.rotation.x = 4.36332;

//add inner-ellipsoid cross-section for freestanding ellipse
var innerCrossSectionRender2 = new three.Mesh(innerCrossSection2,material3);
innerCrossSectionRender2.position.set(35,0,0);
scene.add(innerCrossSectionRender2);
//rotate 250 deg = 4.36332 radians
innerCrossSectionRender2.rotation.x = 4.36332;





//var geometry5 = new three.SphereGeometry(3, 5, 5, 0, Math.PI * 2, 0, Math.PI * 2);
//var material5 = new three.MeshNormalMaterial();
//var aSphere = new three.Mesh(geometry5, material5);
//scene.add(aSphere);



    var wirematerial = new THREE.MeshBasicMaterial( { 
        color: 0x0000000, wireframe: true, polygonOffset: true,     
        polygonOffsetFactor: 1.0, polygonOffsetUnits: 1.0 } ) ;

ellipsoid1.add( wirematerial)



var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
})
.on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new three.Quaternion()
            .setFromEuler(new three.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        crystal_shape.quaternion.multiplyQuaternions(deltaRotationQuaternion, crystal_shape.quaternion);
        
        ellipsoid1.quaternion.multiplyQuaternions(deltaRotationQuaternion, ellipsoid1.quaternion);
        
        ellipsoid2.quaternion.multiplyQuaternions(deltaRotationQuaternion, ellipsoid2.quaternion);
        
//        innerCrossSectionRender.quaternion.multiplyQuaternions(deltaRotationQuaternion, innerCrossSectionRender.quaternion);
        
//        circle.quaternion.multiplyQuaternions(deltaRotationQuaternion, circle.quaternion);
        
        
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});
/* */

$(document).on('mouseup', function(e) {
    isDragging = false;
});



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

    
    setTimeout(function() {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;
        
        update(dt, totalGameTime);
    
        lastFrameTime = currTime;
    }, 0);
}




function render() {
    renderer.render(scene, camera);

    
    
    requestAnimFrame(render);
}

render();
update(0, totalGameTime);



function toRadians(angle) {
	return angle * (Math.PI / 180);
}
