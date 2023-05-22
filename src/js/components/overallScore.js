import * as d3 from 'd3';

export function overall(cityData) {
    const overallContainer = document.querySelector("#overall-container");
    const { width: overallContainerWidth, height: overallContainerHeight } = overallContainer.getBoundingClientRect();
    const radius = 30;
    const mainColorOverall = ["#FF5555", "#FFC979", "#7BCFAE"]; //1 rosso  2 verde, 3 verde

    const svg = d3
        .select("#overall-container")
        .append("svg")
        .attr("viewBox", `0 0 ${overallContainerWidth} ${overallContainerHeight}`);

    const margin = { top: 20, bottom: 20, left: 50, right: 60 };

    svg.append("g").attr("transform", `translate(${margin.left + overallContainerWidth / 2}, ${overallContainerHeight / 2})`);

    var circle = svg.append("circle")
        .attr("cx", overallContainerWidth / 2)
        .attr("cy", overallContainerHeight / 2)
        .attr("r", 100)
        .style("fill", () => {
            if (cityData.categories.teleport_city_score <= 33) {
                return mainColorOverall[0];
            } else if (cityData.categories.teleport_city_score > 33 && cityData.categories.teleport_city_score <= 66) {
                return mainColorOverall[1];
            } else {
                return mainColorOverall[2];
            }
        });

    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 - 55)
        .attr("text-anchor", "middle")
        .text(`OVERALL`)
        .attr("font-weight", "700")
        .attr("font-size", "1em")
        .style("fill", "#FFFFFF");

    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 - 40)
        .attr("text-anchor", "middle")
        .text(`SCORE`)
        .attr("font-weight", "700")
        .attr("font-size", "1em")
        .style("fill", "#FFFFFF");


    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 + 30)
        .attr("text-anchor", "middle")
        .text(`${Math.ceil(cityData.categories.teleport_city_score)}`)
        .attr("font-size", "4.5em") // Set the font size directly
        .attr("font-weight", "700")
        .style("fill", "#FFFFFF");

    svg.append("text")
        .attr("x", overallContainerWidth / 2)
        .attr("y", overallContainerHeight / 2 + 60)
        .attr("text-anchor", "middle")
        .text(`out of 100`)
        .style("fill", "#FFFFFF");
}
