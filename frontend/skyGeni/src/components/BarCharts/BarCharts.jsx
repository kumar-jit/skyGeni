import React from "react";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { formatCurrency } from "../../utils/currencyFormater";
const BarChart = ({data, collerPalette, widthP, heightP}) => {
    const ref = useRef();
    const stackedData = data;
    const width =  widthP || 800;
    const height = heightP || 400;
    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Clear previous drawings

        const margin = { top: 30, right: 20, bottom: 50, left: 70 };

        //tooltip for showing data on hover
        const tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("border", "1px solid #ccc")
            .style("padding", "8px 10px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("font-size", "12px")
            .style("font-family", "Roboto")
            .style("color", "#333")
            .style("box-shadow", "0 2px 6px rgba(0,0,0,0.15)");

        // Set up the scales
        const x = d3
            .scaleBand()
            .domain(stackedData.map((d) => d.quarter)) // Use quarter as x-axis
            .range([margin.left, width - margin.right]) 
            .padding(0.5);

        // Set up the y-axis scale
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(stackedData, (d) => d.total)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const formatDollar = d3.format("~s");

        // Draw horizontal lines for better scale perception
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(
                d3
                    .axisLeft(y)
                    .tickSize(-(width - margin.left - margin.right))
                    .tickFormat("")
            )
            .selectAll("line")
            .style("stroke", "#ddd");

        // Stack bar groups by quarter
        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .join("g")
            .attr("transform", (d) => `translate(${x(d.quarter)},0)`)
            .style("font-family", "Roboto")
            .each(function (d) {
                const g = d3.select(this);
                let yOffset = y(0);

                // Each team bar segment
                d.yAxisData?.forEach((entry, i) => {
                    const barHeight = y(0) - y(entry.acv);
                    yOffset -= barHeight;

                    // Each team bar segment
                    g.append("rect")
                        .attr("y", yOffset)
                        .attr("height", barHeight)
                        .attr("width", x.bandwidth())
                        .attr("fill", collerPalette[entry.name]).on("mouseover", () => {
                            tooltip.transition().duration(200).style("opacity", 1);
                        })
                        .on("mousemove", (event) => {
                            tooltip
                                .html(`         
                                    <strong>${entry.name}</strong><br/>
                                    ACV: ${formatCurrency(entry.acv)}<br/>
                                    Percentage: ${entry.persentage}%<br/>
                                `)  // Use template literals for multiline tooltip
                                .style("left", (event.pageX + 10) + "px")
                                .style("top", (event.pageY - 28) + "px");
                        })
                        .on("mouseout", () => {
                            tooltip.transition().duration(300).style("opacity", 0); 
                        });

                    // Label inside segment
                    if (barHeight > 14)
                    g.append("text")
                        .attr("x", x.bandwidth() / 2)
                        .attr("y", yOffset + barHeight / 2)
                        .attr("text-anchor", "middle")
                        .attr("dy", "0.35em")
                        .style("fill", "white")
                        .style("font-size", "10px")
                        .text(`${formatCurrency(entry.acv)} \n (${entry.persentage.toFixed(0)}%)`);
                });

                // Total label
                g.append("text")
                    .attr("x", x.bandwidth() / 2)
                    .attr("y", yOffset - 10)
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("fill", "#333")
                    .text(`${formatCurrency(d.total)}`);
            });

        // Draw x-axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));
        
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickFormat((d) => `$${formatDollar(d)}`));

    }, [data]);

    return <svg ref={ref} width={width} height={height}></svg>;
};

export default BarChart;
