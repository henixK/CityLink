import * as d3 from 'd3';

export function overall(cityData) {
    const overallContainer = document.querySelector("#overall-container");
    const { width: overallContainerWidth, height: overallContainerHeight } = overallContainer.getBoundingClientRect();
    const radius = 30;
    const mainColorOverall = ["#FF5555", "#FFC979", "#7BCFAE"]; // 1 red, 2 green, 3 green

    const svg = d3
        .select("#overall-container")
        .append("svg")
        .attr("viewBox", `0 0 ${overallContainerWidth} ${overallContainerHeight}`);

    const margin = { top: 20, bottom: 20, left: 50, right: 60 };

    // Group element for positioning
    svg.append("g").attr("transform", `translate(${margin.left + overallContainerWidth / 2}, ${overallContainerHeight / 2})`);

    // Create a circle element
    var circle = svg.append("circle")
        .attr("cx", overallContainerWidth / 2)
        .attr("cy", overallContainerHeight / 2)
        .attr("r", 100)
        .style("fill", () => {
            // Set the fill color based on the overall score
            if (cityData.categories.teleport_city_score <= 33) {
                return mainColorOverall[0]; // Red
            } else if (cityData.categories.teleport_city_score > 33 && cityData.categories.teleport_city_score <= 66) {
                return mainColorOverall[1]; // Yellow
            } else {
                return mainColorOverall[2]; // Green
            }
        });

    // Add the "OVERALL" label
    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 - 55)
        .attr("text-anchor", "middle")
        .text(`OVERALL`)
        .attr("font-weight", "700")
        .attr("font-size", "1em")
        .style("fill", "#FFFFFF");

    // Add the "SCORE" label
    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 - 40)
        .attr("text-anchor", "middle")
        .text(`SCORE`)
        .attr("font-weight", "700")
        .attr("font-size", "1em")
        .style("fill", "#FFFFFF");

    // Add the overall score value
    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 + 30)
        .attr("text-anchor", "middle")
        .text(`${Math.ceil(cityData.categories.teleport_city_score)}`)
        .attr("font-size", "4.5em")
        .attr("font-weight", "700")
        .style("fill", "#FFFFFF");

    // Add the "out of 100" label
    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 + 60)
        .attr("text-anchor", "middle")
        .text(`out of 100`)
        .style("fill", "#FFFFFF");
}
