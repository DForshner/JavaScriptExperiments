
app.display = (function() {
    var dom = app.dom,
        $ = dom.$,
        canvas, ctx,
        firstRun = true;
		
	var tileSize = 16;
	var scale = 1;
		    
	function setup() {
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        dom.addClass(canvas, "board");
        canvas.width = 800; //cols * jewelSize;
        canvas.height = 900; //rows * jewelSize;

        var boardElement = $("#viewer-screen")[0];
        boardElement.appendChild(canvas);
    }
	
	var strokeSizeLookup = {
		1 : 3,
		2 : 3,
		3 : 5,
	};
	
	function drawText(text, x, y) {
		if (!text || !x || !y) { 
			throw "Argument Exception";
		};
		
		ctx.save();
		ctx.strokeStyle = "#373737";
        ctx.lineWidth = strokeSizeLookup[scale];
        ctx.strokeText(text, x, y);
        ctx.fillStyle = "black";
        ctx.fillText(text, x, y);
        ctx.restore();
	}

	function drawTile(tileId, tileSet, setW, gridW, cellId) {
		var s = scale;
		var x = getX(tileId + 1, (setW / s)) * tileSize;
		var y = Math.floor(tileId / (setW / s)) * tileSize;
		var dx = (cellId + 1, gridW) * tileSize;
		var dy = Math.floor(cellId / gridW) * tileSize;
		
		//drawScaledImage(tileSet, x, y, tileSize, tileSize, dx, dy);
		drawImage(tileSet);
	}
	
	function drawScaledImage(image, x, y, w, h, dx, dy) {
		var s = scale;
		ctx.drawImage(image, 
			x * s, // x-coord to start clipping
			y * s, // y-coord to start clipping
			w * s, // width of clipped image
			h * s, // height of clipped image
			dx * s, // x coordinate
			dy * s, // y coordinate
			w * s, // width of image to use (stretch/reduce)
			h * s); // height of image ot use (stretch/reduce)
	}
	
	function drawImage(image) {
		console.log("Draw!")
		ctx.drawImage(image, 0, 0);
	}
	
	function loadTileSet(filepath) {
		var promise = new Promise(function(resolve, reject) {
			var tileset = new Image();
				
			console.log("Loading tileset: ", filepath);
			tileset.src = filepath;
		
			tileset.onload = function () {
				if(tileset.width % tileSize > 0) {
					//reject(Error("Tileset size should be multiple of " + tileSize));
				}
				console.log("Tileset loaded");
				resolve(tileset);
			};		
		});
		
		return promise;
	}
	
	function getX(id, w) {
		if (id == 0) {
			return 0;
		}
		return (id % w == 0) ? w - 1 : (id % w) - 1;
	}
	
    function initialize() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
		
		var tileSet = loadTileSet("images/3/goblin.png");
		tileSet.then(function (result) {
			drawTile(1, result, tileSize, 3, 3);
		}, function (err) {
			console.log(err);
		});
    }
	
	return {
        initialize : initialize,
		drawText : drawText
    }
})();