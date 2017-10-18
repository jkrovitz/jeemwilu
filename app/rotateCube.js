/*** Some of this code has been obtained and modified from https://jsfiddle.net/MadLittleMods/n6u6asza/ and https://codepen.io/jonnyboniface/pen/ALoPbL***/

var three = THREE;

var scene = new three.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var canvasWidth = 100;
var canvasHeight = 100;
var viewSize = 150;
var aspectRatio=canvasWidth/canvasHeight;
var camera = new THREE.OrthographicCamera(-aspectRatio*viewSize / 2, aspectRatio*viewSize / 2, viewSize / 2, -viewSize / 2, -1000, 1000);
scene.add( camera );

//var camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

//distance zoomed out/in
camera.position.z = 50;
camera.position.x = 35;

var renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



var geometry = new three.BoxGeometry(25, 25, 25);

//define embedded ellipse
var geometry2 = new THREE.SphereGeometry(5,8,8);
geometry2.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 2.0, 1.0 ) );

//define freestanding ellipsoid
var geometry3 = new three.SphereGeometry(5,8,8);
geometry3.applyMatrix( new THREE.Matrix4().makeScale( 2.0, 4.0, 2.0 ) );

//define cross section
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
    color:0x00000000, transparent:true, opacity:0.9, side: THREE.DoubleSide
});

/* */

var cube = new three.Mesh(geometry, material);
cube.rotation.x = Math.PI/4;
cube.rotation.y = Math.PI/4;
scene.add(cube);

var geo = new THREE.EdgesGeometry( cube.geometry );
var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
var wireframe = new THREE.LineSegments( geo, mat );
wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd

cube.add( wireframe );


//add embedded ellipsoid
var ellipsoid1 = new THREE.Mesh(geometry2,material2);
scene.add(ellipsoid1);

//add free ellipsoid
var ellipsoid2 = new three.Mesh(geometry3,material2);
ellipsoid2.position.set(35,0,0);
scene.add(ellipsoid2);

//add cross section
var circle = new three.Mesh(geometry4,material2);
circle.position.set(70,0,0);
scene.add(circle);

//var geo2 = new THREE.SphereGeometry( ellipsoid1.geometry );
//var mat2 = new THREE.MeshNormalMaterial( { color: 0x000000, linewidth: 4 } );
//var wireframe2 = new THREE.LineSegments( geo2, mat2 );
//wireframe2.renderOrder = 1; // make sure wireframes are rendered 2nd
// var material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ) ;
    var wirematerial = new THREE.MeshBasicMaterial( { 
        color: 0x0000000, wireframe: true, polygonOffset: true,     
        polygonOffsetFactor: 1.0, polygonOffsetUnits: 1.0 } ) ;

ellipsoid1.add( wirematerial)


/* */
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
        
        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
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
    //console.log(dt, t);
    
    //camera.position.z += 1 * dt;
    //cube.rotation.x += 1 * dt;
    //cube.rotation.y += 1 * dt;
    
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
