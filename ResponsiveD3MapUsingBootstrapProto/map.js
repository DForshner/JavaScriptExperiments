var app = {};

app.config = {

	width: 960,
	
	height: 500,
	
	aspect: 0.5,
	
	pointsOfInterest: [
		{ name: "Grand Canyon", lat: 36.1000, long: -112.1000, color: "green" },
		{ name: "Statue of Liberty", lat: 40.6892, long: -74.0444, color: "green" },
		{ name: "Alcatraz Island", lat: 37.8267, long: -122.4233, color: "green" },
	]
}

app.render = {

	clearMap: function() {
		d3.select('.map-content').select("svg").remove();
	},

	drawMap: function() {
	
		// Determine the width of the containing element and scale to fit.
		var width = $(".map-content").width();
		var height = width * app.config.aspect;
		
		var pointsOfInterest = app.config.pointsOfInterest;

		var projection = d3.geo.albersUsa()
			.scale(width)
			.translate([width / 2, height / 2]);

		var path = d3.geo.path()
			.projection(projection);

		var svg = d3.select(".map-content")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		// Draw map of US
		d3.json("us.json", function(error, us) {
		
			// Draw country
			svg.insert("path", ".graticule")
				.datum(topojson.feature(us, us.objects.land))
				.style("fill", "darkblue")
				.attr("class", "land")
				.attr("d", path);

			// Draw state outlines
			svg.insert("path", ".graticule")
				.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
				.attr("class", "state-boundary")
				.attr("d", path);
				
			// Draw points of interest
			svg.selectAll("circles")
				.data(pointsOfInterest)
				.enter()
				.append("circle")
				.attr("r",8)
				.attr("fill", function(d) { return d.color; })
				// Use the projection to convert long/lat coordinates into xy coordiantes on the map.
				.attr("transform", function(d) {return "translate(" + projection([d.long, d.lat]) + ")";})
				.on("mouseover", function() { d3.select(this).style('fill', 'white'); })
				.on("mouseout", function() { d3.select(this).style('fill', 'green'); });

			// Add labels to points of interest
			svg.selectAll("labels")
				.data(pointsOfInterest)
				.enter()
				.append("text")
				.attr("text-anchor", "middle")
				.attr("fill", function(d) { return d.color; })
				.attr("font-family", "sans-serif")
				.attr("font-size", "1.1em")
				// Use the projection to convert long/lat coordinates into xy coordiantes on the map.
				.attr("transform", function(d) {return "translate(" + projection([d.long, d.lat]) + ")";})
				.text(function(d) { return d.name; })
				.attr("y", 25);
		});
	},
	
	init: function() {
		this.drawMap();
			
		// Re-render map whenever the screen is resized.
		var self = this;
		window.addEventListener('resize', function() {
			console.log("Window resized");
			self.clearMap();
			self.drawMap();	
		});
	}
}

window.addEventListener("load", function() {
	console.log("DOM Ready");
	app.render.init();
});