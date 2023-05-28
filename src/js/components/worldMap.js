import * as d3 from 'd3';

export function worldMap(cityData) {
    const Mapcontainer = document.querySelector("#world-container");
    const { width: mapContainerWidth, height: mapContainerHeight } = Mapcontainer.getBoundingClientRect();
    const latitude = cityData.latitude;
    const longitude = cityData.longitude;
    const coordinates = [longitude, latitude];

    // Create an SVG element to contain the map
    const svg = d3.select("#world-container")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${mapContainerWidth} ${mapContainerHeight}`);

    // Set different projection translations for mobile and desktop
    let projectionTranslate = [mapContainerWidth / 2, mapContainerHeight / 1.6];

    // Create a projection to convert lat/long coordinates to x/y coordinates
    const projection = d3.geoNaturalEarth1()
        .scale(135)
        .translate(projectionTranslate);

    // Create a path generator to draw the map
    const path = d3.geoPath()
        .projection(projection);

    // Load the world map data using d3.json()
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {

        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
            .attr("fill", "#E0EAF0")
            .attr("d", d3.geoPath()
                .projection(projection)
            );

        // Remove previous circle
        d3.selectAll(".fixed-circle").remove();
        d3.selectAll(".radar-circle").remove();

        // Create the initial fixed circle
        const fixedCircle = svg.append("g")
            .append("circle")
            .attr("class", "fixed-circle")
            .attr("cx", projection(coordinates)[0])
            .attr("cy", projection(coordinates)[1])
            .attr("r", 4)
            .style("fill", "#FA9746");

        // Create the radar circle
        const radarCircle = svg.append("g")
            .append("circle")
            .attr("class", "radar-circle")
            .attr("cx", projection(coordinates)[0])
            .attr("cy", projection(coordinates)[1])
            .attr("r", 0) 
            .style("stroke", "#FA9746")
            .style("stroke-width", 2)
            .style("fill", "none")
            .style("opacity", 0.5);

        // Function to animate the radar circle
        function animateRadar() {
            radarCircle
                .attr("r", 0) 
                .style("opacity", 0.5)
                .transition()
                .duration(2000) 
                .ease(d3.easeLinear)
                .attr("r", 15) 
                .style("opacity", 0) 
                .on("end", animateRadar); 
        }

        // Start the radar animation
        animateRadar();
    });
}
