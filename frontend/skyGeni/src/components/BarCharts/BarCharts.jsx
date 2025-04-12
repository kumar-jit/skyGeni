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

        const x = d3
            .scaleBand()
            .domain(stackedData.map((d) => d.quarter))
            .range([margin.left, width - margin.right])
            .padding(0.5);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(stackedData, (d) => d.total)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const color = d3.scaleOrdinal(d3.schemeTableau10);
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
            .each(function (d) {
                const g = d3.select(this);
                let yOffset = y(0);

                d.yAxisData?.forEach((entry, i) => {
                    const barHeight = y(0) - y(entry.acv);
                    yOffset -= barHeight;

                    // Each team bar segment
                    g.append("rect")
                        .attr("y", yOffset)
                        .attr("height", barHeight)
                        .attr("width", x.bandwidth())
                        .attr("fill", collerPalette[entry.name]);

                    // Label inside segment
                    g.append("text")
                        .attr("x", x.bandwidth() / 2)
                        .attr("y", yOffset + barHeight / 2)
                        .attr("text-anchor", "middle")
                        .attr("dy", "0.35em")
                        .style("fill", "white")
                        .style("font-size", "10px")
                        .text(
                            () => {
                                
                        
                                return `${formatCurrency(entry.acv)} \n (${entry.persentage.toFixed(0)}%)`;
                            }
                        );
                });

                // Total label
                g.append("text")
                    .attr("x", x.bandwidth() / 2)
                    .attr("y", yOffset - 10)
                    .attr("text-anchor", "middle")
                    .style("font-size", "12px")
                    .style("fill", "#333")
                    .text(
                        () => {
                            return `${formatCurrency(d.total)}`;
                        }
                    );
            });

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).tickFormat((d) => `$${formatDollar(d)}`));

        // Legend for Teams
        const legend = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${height})`);
        Object.keys(collerPalette).forEach((name, i) => {
            legend
                .append("rect")
                .attr("x", i * 140)
                .attr("y", 10)
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", collerPalette[name]);

            legend
                .append("text")
                .attr("x", i * 140 + 20)
                .attr("y", 22)
                .text(name)
                .style("font-size", "12px");
        }   );
    }, [data]);

    return <svg ref={ref} width={width} height={height}></svg>;
};

export default BarChart;
