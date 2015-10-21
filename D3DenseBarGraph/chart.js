var App = App || {};

(function() {

	var margin = { top: 50, right: 50, bottom: 50, left: 50 };
	var width  = 1000 - margin.left - margin.right;
	var height = 500  - margin.top  - margin.bottom;
	var overlap = 1;

	App.Graph = {
	
		clear: function() {
			d3.select('.content').select("svg").remove();
		},
	
		create: function() {
			var svg = d3.select(".content")
				.append("svg")
				.attr("width",  width  + margin.left + margin.right)
				.attr("height", height + margin.top  + margin.bottom);
		},
		
		update: function(series) {
			var svg = d3.select('.content').select("svg")
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
			var xScale = this._getXScale(series, width);
			this._drawXAxis(xScale, svg);

			var yScale = this._getYScale(height);
			this._drawYAxis(yScale, svg);
			
			this._drawBars(series, xScale, yScale, svg);
		},
		
		_getXScale: function(events) {
			var xMin = d3.min(events, function (d) { return d.timestamp; });
			var xMax = d3.max(events, function (d) { return d.timestamp; });
			return d3.time.scale()
				.rangeRound([0, width])
				.domain([xMin, xMax]);
		},
		
		_getYScale: function(height) {
			return d3.scale.linear()
				.rangeRound([height, 0])
				.domain([0, 100]); // [0-100] %
		},
		
		_drawXAxis: function(xScale, svg) {
			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(d3.time.minute, 30) // 30 min intervals
				.tickSize(5)
				.tickPadding(5);
			
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.attr('stroke', 'black')
				.attr('stroke-width', 1)
				.attr('fill', 'none')
				.call(xAxis);	
		},
		
		_drawYAxis: function(yScale, svg) {
			var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient("left");
		
			svg.append("g")
				.attr("class", "y axis")
				.attr('stroke', 'black')
				.attr('stroke-width', 1)
				.attr('fill', 'none')
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end");
		},
		
		_drawBars: function(series, xScale, yScale, svg) {
			var barWidth = width / (series.length - 1) + overlap;
			
			var bars = svg.selectAll(".bar")
				.data(series)
				.enter()
				.append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return xScale(d.timestamp); })
				.attr("y", function(d) { return yScale(d.value); })
				.attr("height", function(d) { return height - yScale(d.value); })
				.attr("width", barWidth);
		}

	}

	return ({
		create: this.create,
		update: this.update,
	})
	
})();

// Generate 8 hours of per min time series data
App.generateTimeSeriesData = function() {
	var totalTimeSpan = 8 * 60 * 60 * 1000; // 8 hr * 60 min/hr * 60 sec/min * 1000 ms/min
	var pointTimeSpan = 60 * 1000; // 60 sec/min * 1000 ms/sec
	
	var end = new Date().getTime();
	var start = new Date(end - totalTimeSpan).getTime();
	
	var points = [];
	for (var i = start; i <= end; i += pointTimeSpan) {
		points.push({ value: i % 99, timestamp: new Date(i) }); // Saw tooth pattern w/ values [0-98]
	}
	
	return points;
}