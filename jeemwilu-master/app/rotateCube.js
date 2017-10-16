/*** Some of this code has been obtained and modified from https://jsfiddle.net/MadLittleMods/n6u6asza/ and https://codepen.io/jonnyboniface/pen/ALoPbL***/

var three = THREE;

var scene = new three.Scene();
scene.background = new THREE.Color( 0xFFFFFF );
var camera = new three.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
//var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
//scene.add( camera );

//distance zoomed out/in
camera.position.z = 50;
//camera.position.x = 15;


var renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//define the cube
var geometry = new three.BoxGeometry(25,25,25);

//define embedded ellipsoid
var geometry2 = new three.SphereGeometry(5,16,20);
geometry2.applyMatrix( new THREE.Matrix4().makeScale( 1.0, 1.5, 3.0 ) );

//define freestanding ellipsoid
//var geometry3 = new three.SphereGeometry(5, 16, 20);
//geometry3.applyMatrix( new three.Matrix4().makeScale( 2.0, 3.0, 6.0));

var material = new three.MeshFaceMaterial([
    new three.MeshBasicMaterial({
        color: 0x000000, 
        wireframe: true 
    }),
    new three.MeshBasicMaterial({
        color: 0x000000, 
        wireframe: true 
    }),
    new three.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true 
    }),
    new three.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true 
    }),
    new three.MeshBasicMaterial({
       color: 0x000000,
        wireframe: true 
    }),
    new three.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true 
    }),
        new three.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true 
    })
    
]);

var material2 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});

//add cube
var cube = new three.Mesh(geometry, material);
cube.rotation.x = Math.PI/4;
cube.rotation.y = Math.PI/4;
scene.add(cube);

//add embedded ellipsoid
var ellipsoid1 = new three.Mesh(geometry2,material2);
scene.add(ellipsoid1);

//add free ellipsoid
//var ellipsoid2 = new three.Mesh(geometry3,material2);
//ellipsoid2.position.set(50,0,0);
//scene.add(ellipsoid2);


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

$(document).on('mouseup', function(e) {
    isDragging = false;
});



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

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}

