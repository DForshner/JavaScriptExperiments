var SoftEngineV1;

(function (SoftEngineV1) {

	// Creates Camera
    var Camera = (function () {
        function Camera() {
            this.Position = BABYLON.Vector3.Zero();
            this.Target = BABYLON.Vector3.Zero();
        }
        return Camera;
    })();
    SoftEngineV1.Camera = Camera;
	
	// Creates a new mesh (3d object)
    var Mesh = (function () {
        function Mesh(name, verticesCount) {
            this.name = name;
            this.Vertices = new Array(verticesCount);
            this.Rotation = BABYLON.Vector3.Zero();
            this.Position = BABYLON.Vector3.Zero();
        }
        return Mesh;
    })();
    SoftEngineV1.Mesh = Mesh;
	
	// Creates display device
    var Device = (function () {
	
        function Device(canvas) {
		    // Note: the back buffer size is equal to the number of pixels to draw
            // on screen (width*height) * 4 (R,G,B & Alpha values). 
            this.workingCanvas = canvas;
            this.workingWidth = canvas.width;
            this.workingHeight = canvas.height;
            this.workingContext = this.workingCanvas.getContext("2d");
        }
		
		// Clear the back buffer with a specific color
        Device.prototype.clear = function () {
		
			// Clearing with black color by default
            this.workingContext.clearRect(0, 0, this.workingWidth, this.workingHeight);
			
			// Get the associated image data to clear out back buffer
            this.backbuffer = this.workingContext.getImageData(0, 0, this.workingWidth, this.workingHeight);
        };
		
		// Flush the back buffer into the front buffer. 
        Device.prototype.present = function () {
            this.workingContext.putImageData(this.backbuffer, 0, 0);
        };
		
		// Called to put a pixel into backbuffer
        Device.prototype.putPixel = function (x, y, color) {
			this.backbufferdata = this.backbuffer.data;
			
            // The back buffer is a 1D array that has four elements per pixel
			// Starting Element = x + y * (total screen width * 4 colors);
			// Note: >> 0 truncates the decimal
			var index = ((x >> 0) + (y >> 0) * this.workingWidth) * 4;
            
			// RGBA color space is used by the HTML5 canvas
			this.backbufferdata[index] = color.r * 255;
            this.backbufferdata[index + 1] = color.g * 255;
            this.backbufferdata[index + 2] = color.b * 255;
            this.backbufferdata[index + 3] = color.a * 255;
        };
		
		// Transforms 3D points into 2D points using transformation matrix.
        Device.prototype.project = function (coord, transMat) {
            var point = BABYLON.Vector3.TransformCoordinates(coord, transMat);
			
			// Transformed coordinates use a coordinate system that starts from the center of the screen.
			// The canvas starts from (0,0) on the upper left so adjust transform coordinates to canvas
			// coordinates.
			// Note: >> 0 truncates the decimal
            var x = point.x * this.workingWidth + this.workingWidth / 2.0 >> 0;
            var y = -point.y * this.workingHeight + this.workingHeight / 2.0 >> 0;
            
			return (new BABYLON.Vector2(x, y));
        };
		
		// Draws point on screen
        Device.prototype.drawPoint = function (point) {
			// Check if point is visible on the screen (Clipping)
            if (point.x >= 0 && point.y >= 0 && point.x < this.workingWidth && point.y < this.workingHeight) {
                this.putPixel(point.x, point.y, new BABYLON.Color4(1, 1, 0, 1));
            }
        };
		
		// Computes each vetrex projection during each frame
        Device.prototype.render = function (camera, meshes) {
            
			// Build view matrix based on camera
			var viewMatrix = BABYLON.Matrix.LookAtLH(camera.Position, camera.Target, BABYLON.Vector3.Up());
            
			// Build projection matrix based on camera
			var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(0.78, this.workingWidth / this.workingHeight, 0.01, 1.0);
            
			// Iterate through each mesh
			for(var index = 0; index < meshes.length; index++) {
			
                var currentMesh = meshes[index];
                
				// Build world matrix using current rotation and translation values.
				// Rotation occurs around axis so always perform it before translation.
				var worldMatrix = BABYLON.Matrix.RotationYawPitchRoll(currentMesh.Rotation.y, currentMesh.Rotation.x, currentMesh.Rotation.z)
					.multiply(BABYLON.Matrix.Translation(currentMesh.Position.x, currentMesh.Position.y, currentMesh.Position.z));
                
				// Perform final transformation
				// Transform Matrix = World Matrix * View Matrix * Projection Matrix
				var transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix);
				
				// Project each vertex from the 3D to 2D.
				for(var indexVertices = 0; indexVertices < currentMesh.Vertices.length; indexVertices++) {
                    
					// Project 3D point into 2D space.
					var projectedPoint = this.project(currentMesh.Vertices[indexVertices], transformMatrix);
					
					// Draw 2D point on screen
                    this.drawPoint(projectedPoint);
                }
            }
        };
		
        return Device;
    })();
    SoftEngineV1.Device = Device;   
	
})(SoftEngineV1 || (SoftEngineV1 = {}));