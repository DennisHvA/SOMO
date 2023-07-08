import '../styles/style.css'

// fetch('https://opensheet.elk.sh/1ruaa1MeV_-utrSGHXwmI_JoY_64e90BBS_UswFq9vmE/rates')
// 	.then(res => res.json())
// 	.then(data => {

// 		console.log(data)
// });

// GRAPH
const india = [
	{group: "Dividends", value: 7.5},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 10}
];
 
const italy = [
	{group: "Dividends", value: 15},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 10}
];
 
const macau = [
	{group: "Dividends", value: 10},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 10}
];
 
const mauritius = [
	{group: "Dividends", value: 8},
	{group: "Interests", value: 8},
	{group: "Royalties", value: 5}
];
 
const southafrica = [
	{group: "Dividends", value: 8},
	{group: "Interests", value: 8},
	{group: "Royalties", value: 5}
];
 
const uae = [
	{group: "Dividends", value: 0},
	{group: "Interests", value: 0},
	{group: "Royalties", value: 0}
];
 
const vietnam = [
	{group: "Dividends", value: 10},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 10}
];
 
const portugal = [
	{group: "Dividends", value: 10},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 0}
];
 
const botswana = [
	{group: "Dividends", value: 0},
	{group: "Interests", value: 10},
	{group: "Royalties", value: 10}
];

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width2 = 300 - margin.left - margin.right,
    height2 = 400 - margin.top - margin.bottom;

var svg2 = d3.select("#ratesgraphic")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
	.range([ 0, width2 ])
	.domain(india.map(function(d) { return d.group; }))

svg2.append("g")
	.attr("class", "x-axis")
	.attr("transform", "translate(0," + (height2 + 20) + ")")
	.call(d3.axisBottom(x).tickSize(0).tickFormat(""));

var y = d3.scaleLinear()
	.domain([0, 20])
	.range([ height2, 0]);

svg2.append("g")
	.attr("class", "y-axis")
	.call(d3.axisLeft(y).tickSize(0).tickFormat(function(d) { return d + "%"; }));

function update(data) {

  	var u = svg2.selectAll("rect")
    .data(data)

	u.enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height2 - y(d.value); })
      .attr("fill", function(d, i) {
		if (i === 0) {
			return "#e4bc00";
		}
		if (i === 1) {
			return "#29e4d2";
		}
		if (i === 2) {
		  return "#93956f";
		}
	  });
	
	svg2.select(".x-axis-label").remove();

 	svg2.append("text")
    .attr("class", "x-axis-label")
    .attr("x", width2 / 2)
    .attr("y", height2 + 50)
    .attr("text-anchor", "middle")
    .text(data === india ? "India" : data === italy ? "Italy" : data === macau ? "Macau" : data === mauritius ? "Mauritius" : data === southafrica ? "South Africa" : data === uae ? "UAE" : data === vietnam ? "Vietnam" : data === portugal ? "Portugal" : data === botswana ? "Botswana" : "");
}

update(india)

document.getElementById("italy").addEventListener("click", () => {
	update(italy)
})

document.getElementById("macau").addEventListener("click", () => {
	update(macau)
})

document.getElementById("mauritius").addEventListener("click", () => {
	update(mauritius)
})

document.getElementById("southafrica").addEventListener("click", () => {
	update(southafrica)
})

document.getElementById("uae").addEventListener("click", () => {
	update(uae)
})

document.getElementById("vietnam").addEventListener("click", () => {
	update(vietnam)
})

document.getElementById("portugal").addEventListener("click", () => {
	update(portugal)
})

document.getElementById("botswana").addEventListener("click", () => {
	update(botswana)
})


// MAP 1
const width = 700
const height = 400

const svg = d3.select("#map").attr('width', width).attr('height', height)

const projection = d3.geoNaturalEarth1()
	.scale(width / 1.6 / Math.PI)
	.translate([width / 2.2, height / 1.55])

const dtacountries = ["Portugal", "Mauritius", "Italy", "United Arab Emirates", "South Africa", "Macao", "India", "Vietnam"]
const forcecountries = ["Botswana", "Ethiopia"]
const negotiationscountrys = ["Netherlands", "Turkey", "Seychelles"]

d3.json("../data/map.json").then( function(data) {

	const Tooltip = d3.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("position", "absolute")
	.style("opacity", 0)
	.style("color", "white")
	.style("background-color", "black")
	.style("padding", "1em")
	.style("border", "2px black solid")
	.style("font-weight", "bold")

	function mouseOver(e,d) {

		if(dtacountries.includes(d.properties.name)) {
				Tooltip.style("opacity", 1)
				d3.select(this)
					.style("fill", "white")
				d3.select(".tooltip")
				.html(`<h5>${d.properties.name}</h5><h6>Total loss as result of DTA: $${d.properties.total}</h6>`)
			}
		if(forcecountries.includes(d.properties.name) || negotiationscountrys.includes(d.properties.name) || d.properties.name == "Mozambique") {
				Tooltip.style("opacity", 1)
				d3.select(this)
					.style("fill", "white")
				d3.select(".tooltip")
				.html(`<h5>${d.properties.name}</h5>`)
			}
	}

	function mouseMove (e) {
		d3.select(".tooltip")
			.style("left", e.pageX + 15 + "px")
			.style("top", e.pageY + 15 + "px")
	}

	function mouseOut (e, d) {
		if(dtacountries.includes(d.properties.name)) {
			d3.select(this)
				.style("fill", "#29e4d2")
		}
		if(forcecountries.includes(d.properties.name)) {
			d3.select(this)
				.style("fill", "#e4bc00")
		} 
		if(negotiationscountrys.includes(d.properties.name)) {
			d3.select(this)
				.style("fill", "#a5af49")
		}
		if(d.properties.name == "Mozambique") {
			d3.select(this)
				.style("fill", "black")
		}
		d3.select(".tooltip")
			.style("opacity", 0)
	}

	function handleZoom(e) {
		d3.select('#map g')
		  .attr('transform', e.transform);
	}
	  
	let zoom = d3.zoom()
		.on('zoom', handleZoom)
		.scaleExtent([1, 3])
		.translateExtent([[0, 0], [width, height]]);

	svg.append("g")
		.selectAll("path")
		.data(data.features)
		.join("path")
			.attr("d", d3.geoPath()
			.projection(projection)
			)
			.attr("fill", function (d) {
				if(dtacountries.includes(d.properties.name)) {
					return "#29e4d2"
				} 
				if(forcecountries.includes(d.properties.name)) {
					return "#e4bc00"
				}
				if(negotiationscountrys.includes(d.properties.name)) {
					return "#a5af49"
				}
				if(d.properties.name == "Mozambique") {
					return "black"
				}
				else {
				return "#93956f"
			}
		})
		.style("stroke", "white")
		.style("stroke-width", 0.5)
		.on("mouseover touchstart", mouseOver )
		.on("mousemove", mouseMove)
		.on("mouseout", mouseOut)

		d3.select('#map')
        .call(zoom)
        .attr("viewBox", "0 0 " + width + " " + height )
        .attr("preserveAspectRatio", "xMinYMin");
})