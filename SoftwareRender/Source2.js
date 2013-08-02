// Returns the correct HTML5 rendering loop
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || // IE 10 / Chrome
          window.webkitRequestAnimationFrame || // Safari
          window.mozRequestAnimationFrame		// Firefox
})();

var canvas;
var device;
var mesh;
var meshes = [];
var camera;

function initExample2() {
	// Clear device if it is already in use.
	if (device !== undefined) {
		device.clear();
	}

	// Create device
	canvas = document.getElementById("frontBuffer");
	device = new SoftEngineV2.Device(canvas);
	
	// Create camera
	camera = new SoftEngineV2.Camera();
	
	// Set camera position
    camera.Position = new BABYLON.Vector3(0, 0, 15);
    camera.Target = new BABYLON.Vector3(0, 0, 0);
	
	// Create 3d object
    mesh = new SoftEngineV2.Mesh("Cube", 8);
    meshes.push(mesh);
	
	// Set mesh vertices
	// Note: Coordinates start in the center of the object	
    mesh.Vertices[0] = new BABYLON.Vector3(-1, 1, 1);
    mesh.Vertices[1] = new BABYLON.Vector3(1, 1, 1);
    mesh.Vertices[2] = new BABYLON.Vector3(-1, -1, 1);
    mesh.Vertices[3] = new BABYLON.Vector3(-1, -1, -1);
    mesh.Vertices[4] = new BABYLON.Vector3(-1, 1, -1);
    mesh.Vertices[5] = new BABYLON.Vector3(1, 1, -1);
    mesh.Vertices[6] = new BABYLON.Vector3(1, -1, 1);
    mesh.Vertices[7] = new BABYLON.Vector3(1, -1, -1);
		
	// Pass animation loop as function to call when it's time to update for the next repaint.
	var requestID = requestAnimFrame(step);
	console.log(requestID);
}

// Animation/Rendering loop handler
// Each tick (optimally every 16ms) a call is made to the handler registered to the rendering loop.
function step() {
	if (runAnimation.value) {
		// Clear the screen and set all pixes to black.
		device.clear();
		
		// Change the position and rotation values of meshes each frame
		mesh.Rotation.x += 0.01;
		mesh.Rotation.y += 0.01;
		
		// Perform matrix operations and render them to the back buffer
		device.render(camera, meshes);
		
		// Display on screen by flushing from back buffer to the front buffer.
		device.present();
		
		// Shedule the next animation step
		requestAnimFrame(step);
	}
}