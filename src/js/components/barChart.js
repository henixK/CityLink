import * as d3 from 'd3';

export function barChart(cityData) {
    const container = document.querySelector("#score-container");
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();


    // Rimuovi SVG e contenuto precedenti
    d3.selectAll("svg").remove();

    const svg = d3
        .select("#score-container")
        .append("svg")
        .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`);


    const strokeWidth = 1.5;
    const margin = { top: 20, bottom: 20, left: 50, right: 60 };
    const height = 600 - margin.top - margin.bottom - (strokeWidth * 2);
    const chartWidth = containerWidth - margin.left - margin.right;
    const chart = svg.append("g").attr("transform", `translate(${margin.left + chartWidth / 1.8}, ${70})`);


    // Definizione della scala X (per i valori)
    const x = d3.scaleLinear()
        .range([0, chartWidth / 2])
        .domain([0, Math.ceil(d3.max(cityData.categories.categories, d => d.score_out_of_10))]);


    // Definizione della scala Y (per le categorie)
    const y = d3.scaleBand()
        .range([height, 0])
        .padding(0.5)
        .domain(cityData.categories.categories.map(d => d.name));

    // Aggiunta delle etichette per le categorie
    chart.selectAll(".category-label")
        .data(cityData.categories.categories)
        .enter()
        .append("text")
        .attr("class", "category-label")
        .attr("x", -10)
        .attr("y", d => y(d.name) + y.bandwidth() / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(d => d.name)
        .style("fill", "#667076")
        .attr("class", "lg:text-base", "text-xl");

    // Creazione delle barre
    chart.selectAll(".bar")
        .data(cityData.categories.categories)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.name))
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("fill", "#8C9EF4")
        .attr("rx", 10)
        .attr("ry", 10)
        .transition()
        .duration(2000)
        .attr("width", d => x(d.score_out_of_10))
        .on("end", function (d) {
            chart.selectAll(".score-label")
                .data(cityData.categories.categories)
                .enter()
                .append("text")
                .attr("class", "score-label text-[#667076]")
                .attr("x", d => x(d.score_out_of_10) + 5)
                .attr("y", d => y(d.name) + y.bandwidth() / 2)
                .attr("dy", ".35em")
                .text(d => (Math.ceil(d.score_out_of_10)))
                .style("fill", "#667076")
                .attr("class", "lg:text-base", "text-xl")
        });
}
