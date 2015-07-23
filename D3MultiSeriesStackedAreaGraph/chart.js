var App = App || {};

(function() {

	var margin = { top: 50, right: 50, bottom: 50, left: 50 };
	var width  = 1000 - margin.left - margin.right;
	var height = 500  - margin.top  - margin.bottom;

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
		
		update: function(events) {
			var uniqueEvents = this._getUniqueEventNames(events);
			console.log('uniqueEvents: ', uniqueEvents);
			
			var series = this._buildSeries(events, uniqueEvents);
			
			var xScale = this._getXScale(events, width);
			
			this._stackSeries(xScale, series);
			
			var svg = d3.select('.content').select("svg")
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			this._drawXAxis(xScale, svg);

			var yScale = this._getYScale(series, height);
			
			this._drawYAxis(yScale, svg);
			
			var colorScale = this._createColorScale(uniqueEvents);
			
			this._drawAreas(series, xScale, yScale, colorScale, svg);

			this._drawLegend(uniqueEvents, colorScale, svg);
		},
		
		_getUniqueEventNames: function (events) {
			return events
				.map(function(x) { return x.name; })
				.filter(function(x, i, self) { return self.indexOf(x) === i; });
		},
		
		_getXScale: function(events, width) {
			var xMin = d3.min(events, function (d) { return d.timestamp; });
			var xMax = d3.max(events, function (d) { return d.timestamp; });
			return d3.time.scale()
				.rangeRound([0, width])
				.domain([xMin, xMax]);
		},
		
		_getYScale: function(series, height) {
			var yMax = d3.max(series, function (c) { return d3.max(c.occurrences, function (d) { return d.y0 + d.y; }); });
			return d3.scale.linear()
				.rangeRound([height, 0])
				.domain([0, yMax]);
		},
		
		_buildSeries: function(events, uniqueEvents) {
			var series = {};
			uniqueEvents.forEach(function (name) {
				var seriesValues = {name: name, occurrences:[]};
				series[name] = seriesValues;
			});
			
			// For each unique timestamp store the number of occurrences for each event.
			// All events have to have a value for every timestamp so they can be stacked.
			var countsByTimeAndEventName = {};
			events.forEach(function (d) {
				var key = d.timestamp.toISOString();
				
				// If this is a new timestamp create zeroed counters for each event name
				if (!countsByTimeAndEventName.hasOwnProperty(key)) {
					countsByTimeAndEventName[key] = { timestamp: d.timestamp, eventCounts: {} };
					uniqueEvents.forEach(function(name) { 
						countsByTimeAndEventName[key].eventCounts[name] = 0; 
					});
				}
				
				countsByTimeAndEventName[key].eventCounts[d.name] += d.count;
			});
			
			console.log(countsByTimeAndEventName);
				
			// For each event name store an array of timestamp/occurance pairs.
			for (var timeKey in countsByTimeAndEventName) {
				var d = countsByTimeAndEventName[timeKey];
				uniqueEvents.map(function (name) {
					series[name].occurrences.push({ timestamp: d.timestamp, count: d.eventCounts[name] });
				});
			}
			
			// Convert to array
			var seriesArr = [];
			for (var eventName in series) {
				seriesArr.push(series[eventName]);
			}
			
			return seriesArr;
		},
		
		_stackSeries: function(xScale, seriesToUpdate) {
			var stack = d3.layout.stack()
				.offset("zero")
				.values(function (d) { return d.occurrences; })
				.x(function (d) { return xScale(d.timestamp) })
				.y(function (d) { return d.count; });
			
			stack(seriesToUpdate);
			console.log('After stacking: ', seriesToUpdate);
			
			return seriesToUpdate;
		},
		
		_createColorScale: function(uniqueEvents) {
			// Create a color for each unique event.
			var possibleColors = [];
			var incSize = 255 / (uniqueEvents.length - 1);
			for (var i = 0; i < uniqueEvents.length; ++i) {
				possibleColors.push(d3.rgb(0, incSize * i, 255).toString());
			}
			
			return d3.scale.ordinal()
				.range(possibleColors)
				.domain(uniqueEvents);
		},
		
		_createAreaFunc: function(xScale, yScale) {
			return d3.svg.area()
				.interpolate("linear")
				.x(function (d) { return xScale(d.timestamp) })
				.y0(function (d) { return yScale(d.y0); })
				.y1(function (d) { return yScale(d.y0 + d.y); });
		},
		
		_drawXAxis: function(xScale, svg) {
			var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(d3.time.hour)
				.tickFormat(d3.time.format('%H:00'))
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
				.style("text-anchor", "end")
				.text("Number of occurrences");	
		},
		
		_drawAreas: function(series, xScale, yScale, colorScale, svg) {
			var area = this._createAreaFunc(xScale, yScale);
		
			var selection = svg.selectAll(".series")
				.data(series)
				.enter()
				.append("g")
				.attr("class", "series");

			selection.append("path")
			  .attr("class", "streamPath")
			  .attr("d", function (d) { return area(d.occurrences); })
			  .style("fill", function (d) { return colorScale(d.name); })
			  .style("stroke", "grey");	
		},
		
		_drawLegend: function(uniqueEvents, colorScale, svg) {
			var legend = svg.selectAll(".legend")
				.data(uniqueEvents.slice().reverse())
				.enter()
				.append("g")
				.attr("class", "legend")
				.attr("transform", function (d, i) { return "translate(55," + i * 20 + ")"; });

			legend.append("rect")
				.attr("x", width - 50)
				.attr("width", margin.left - 5)
				.attr("height", 20)
				.style("fill", colorScale)
				.style("stroke", "grey");

			legend.append("text")
				.attr("x", width - 12)
				.attr("y", 10)
				.attr("dy", ".35em")
				.style("text-anchor", "end")
				.style("fill", 'white')
				.text(function (d) { return d; });
		}
	}

	return ({
		create: this.create,
		update: this.update,
	})
	
})();

App.EventData = [{
    name: "Event A",
	count: 3,
    timestamp: new Date(2015, 07, 15, 10, 00, 00)
}, {
    name: "Event B",
	count: 5,
    timestamp: new Date(2015, 07, 15, 10, 00, 00)
}, {
    name: "Event C",
	count: 8,
    timestamp: new Date(2015, 07, 15, 10, 00, 00)
}, {
    name: "Event A",
	count: 6,
    timestamp: new Date(2015, 07, 15, 10, 30, 00)
}, {
    name: "Event B",
	count: 5,
    timestamp: new Date(2015, 07, 15, 10, 30, 00)
}, {
    name: "Event C",
	count: 1,
    timestamp: new Date(2015, 07, 15, 10, 30, 00)
}, {
    name: "Event E",
	count: 2,
    timestamp: new Date(2015, 07, 15, 10, 30, 00)
}, {
    name: "Event A",
	count: 2,
    timestamp: new Date(2015, 07, 15, 11, 00, 00)
}, {
    name: "Event D",
	count: 2,
    timestamp: new Date(2015, 07, 15, 11, 00, 00)
}, {
    name: "Event C",
	count: 10,
    timestamp: new Date(2015, 07, 15, 11, 30, 10)
}, {
    name: "Event B",
	count: 2,
    timestamp: new Date(2015, 07, 15, 11, 30, 10)
}, {
    name: "Event A",
	count: 3,
    timestamp: new Date(2015, 07, 15, 11, 30, 10)
}, {
    name: "Event B",
	count: 10,
    timestamp: new Date(2015, 07, 15, 12, 00, 10)	
}, {
    name: "Event C",
	count: 7,
    timestamp: new Date(2015, 07, 15, 12, 00, 10)	
}, {
    name: "Event A",
	count: 1,
    timestamp: new Date(2015, 07, 15, 12, 00, 10)	
}, {
    name: "Event A",
	count: 3,
    timestamp: new Date(2015, 07, 15, 12, 30, 10)		
}, {
    name: "Event D",
	count: 10,
    timestamp: new Date(2015, 07, 15, 12, 30, 10)	
}, {
    name: "Event B",
	count: 7,
    timestamp: new Date(2015, 07, 15, 12, 30, 10)	
}, {
    name: "Event C",
	count: 6,
    timestamp: new Date(2015, 07, 15, 12, 30, 10)	
}];