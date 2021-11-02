
// SVG Size
var width = 700,
	height = 500;

var genre = [];


// Load CSV file
var rowconverter = function(d){
	if (!genre.includes(d.genre)){
	genre.push(d.genre)
	} return{
		name: d.name,
		streams: parseInt (d.streams_in_mils),
		songs: parseInt (d.songs),
		songsplus: parseInt (d.songs_with_mil_plus_streams),
		genre: d.genre
	};
}
d3.csv("data/spotify_data.csv", rowconverter, function(data){
	console.log(data)
	// Analyze the dataset in the web console

	let preparedData = prepareData(data);

	createVisualization(preparedData);
});

var prepareData = function(data) {
	return data

	// Step 1: Analyze and prepare the data
	// Use the web console to get a better idea of the dataset
	// Convert numeric values to numbers.
	// Make sure the genre array has the name of each genre

}
console.log(genre)
var createVisualization = function(data) {
	console.log(data)
	// Step 2: Append a new SVG area with D3
	// The ID of the target div container in the html file is #chart-area
	// Use the margin convention with 50 px of bottom margin and 30 px of margin on other sides!
var margin = {top: 30, right: 30, bottom: 50, left: 30};
var width = 700 - margin.right - margin.left
	height = 500 - margin.top - margin. bottom
var svg=d3.select("#chart-area").append("svg")
	.attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	// Step 3: Create linear scales by using the D3 scale functions
	// You will need an songs scale (x-axis) and a scale function for the streams (y-axis).
	// Call them numSongsScale and streamsScale.
	// Use d3.min() and d3.max() for the input domain
	// Use the variables height and width for the output range
	let padding = 20;
	let numSongsScale=d3.scaleLinear()
		.domain(d3.extent(data, function(d) {
			return d.songs;
			}))
		.range([padding, width - padding]);
	let streamsScale=d3.scaleLinear()
		.domain(d3.extent(data, function(d) {
			return d.streams;
		}))
		.range([padding, height - padding]);


	// Step 4: Try the scale functions
	// You can call the functions with example values and print the result to the web console.


	// Step 5: Map the countries to SVG circles
	// Use select(), data(), enter() and append()
	// Instead of setting the x- and y-values directly,
	// you have to use your scale functions to convert the data values to pixel measures
data.sort(function(x,y) {
	return d3.descending(x.songsplus, y.songsplus);
})
	console.log(data)
	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
	svg.selectAll("circle")
		.attr("cx", function(d) {
			return numSongsScale(d.songs +7)
		})
		.attr("cy", function(d){
			return streamsScale(d.streams)
		})
		.attr("stroke", "gray")


	// Step 6: Use your scales (songs and streams) to create D3 axis functions

let xAxis = d3.axisBottom(numSongsScale)

	let yAxis = d3.axisLeft(streamsScale)
	// Step 7: Append the x- and y-axis to your scatterplot
	// Add the axes to a group element that you add to the SVG drawing area.
	// Use translate() to change the axis position
svg.append("g")
	.attr('class', 'axis xAxis')
	.attr("transform", "translate(20, 440)")
	.call(xAxis);
svg.append("g")
		.attr('class', 'axis yAxis')
		.attr("transform", "translate(20,20)")
		.call(yAxis);


	// Step 8: Refine the domain of the scales
	// Notice that some of the circles are positioned on the outer edges of the svg area
	// You can include buffer values to widen the domain and to prevent circles and axes from overlapping


	// Step 9: Label your axes

svg.append("text")
	.attr("class", "x label")
	.attr("text-anchor", "end")
	.attr("x", width)
	.attr("y", height)
	.text("Number of Songs")
	//
svg.append("text")
	.attr("class", "y label")
	.attr("text-anchor", "end")
	.attr("y", 6)
	.attr("dy", 15)
	.attr("transform", "rotate(-90)")
	.text("Number of Streams (in millions)")
	// Step 10: Add a scale function for the circle radius
	// Create a linear scale function dependent on the number of million plus streamed songs
	// The radius should be between 4 - 30px.
	// Then use the scale function to specify a dynamic radius

let radiusScale = d3.scaleLinear()
	.domain(d3.extent(data, function(d) {
		return d.songsplus;
	}))
	.range([4 , 30]);
svg.selectAll("circle")
	.attr("r", function(d) {
		return radiusScale(d.songsplus)
	})
	// Step 11: Change the drawing order
	// Larger circles should not overlap or cover smaller circles.
	// Sort the artists by streams before drawing them.



	// Step 12: Color the circles depending on their genres
	// Use a D3 color scale
let linearColor = d3.scaleOrdinal()
	.domain(d3.extent(data, function(d) {
		return d.genre;
	}))
	.range(["#F08080", "#9FE2BF", "#6495ED", "#CCCCFF", "#40E0D0", "#F7DC6F", "#800080", "#00FF00", "#808080"])
svg.selectAll("circle")
	.attr("fill", function(d) {
		return linearColor(d.genre)
	})

}
