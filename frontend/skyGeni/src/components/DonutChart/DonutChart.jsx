import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { formatCurrency } from "../../utils/currencyFormater";
const DonutChart = ({
    donutChartData,
    collerPalette,
    width = 500,
    height = 430,
}) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!donutChartData?.data || donutChartData.data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const radius = Math.min(width, height) / 2;
        const chartGroup = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);
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

        // Set up the pie chart
        const pie = d3
            .pie()
            .value((d) => d.acv)
            .sort(null);
        const arc = d3
            .arc()
            .innerRadius(radius * 0.3)
            .outerRadius(radius * 0.55);
        const outerArc = d3
            .arc()
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.75);
        const arcs = pie(donutChartData.data);

        //custom colors
        const color = (d) => collerPalette[d.name] || "#999";

        // Draw the arcs
        chartGroup
            .selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => color(d.data))
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .on("mouseover", function (event, d) {
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip.html(`
                            <strong>${d.data.name}</strong><br/>
                            ACV: ${formatCurrency(d.data.acv)}<br/>
                            ${d.data.percentage}%`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style("opacity", 0);
            });

        const placedLabels = [];

        // Draw the labels
        chartGroup
            .selectAll("text")
            .data(arcs)
            .enter()
            .append("text")
            .attr("dy", "0.35em")
            .attr("transform", (d) => {
                const pos = outerArc.centroid(d);
                pos[0] += (d.endAngle + d.startAngle) / 2 > Math.PI ? -15 : 15;
                d.labelPos = pos;
                return `translate(${pos})`;
            })
            .style("font-size", "12px")
            .style("font-family", "Roboto")
            .style("fill", "#333")
            .style("text-anchor", (d) =>
                (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start"
            )
            .text((d) => {
                const posY = d.labelPos[1].toFixed(3);
                const posX = d.labelPos[0].toFixed(3);
                // checking for overlap
                // if overlap, return first two characters of the name with ".."
                const checkOverlap = function (posX, posY) {
                    for (let i = 0; i < placedLabels.length; i++) {
                        if (
                            Math.abs(placedLabels[i].posY - posY) < 60 &&
                            Math.abs(placedLabels[i].posX - posX) < 30
                        )
                            return true;
                    }
                    return false;
                };
                // check for overlap and push the label position to the array
                let isOverlap = checkOverlap(posX, posY);
                placedLabels.push({
                    posY: posY,
                    posX: posX,
                });
                // if overlap, return first two characters of the name with ".."
                // else return the name
                let text = `${formatCurrency(d.data.acv)}
                (${d.data.percentage}%)`;
                return isOverlap ? text.charAt(1) + ".." : text;
            })
            .on("mouseover", function (event, d) {
                tooltip.transition().duration(200).style("opacity", 1);
                tooltip.html(`
                        <strong>${d.data.name}</strong><br/>
                        ACV: ${formatCurrency(d.data.acv)}<br/>
                        ${d.data.percentage}%`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
                tooltip.transition().duration(200).style("opacity", 0);
            });

        // Draw the lines connecting the labels to the arcs
        chartGroup
            .selectAll("polyline")
            .data(arcs)
            .enter()
            .append("polyline")
            .attr("points", (d) => {
                const posA = arc.centroid(d);
                const posB = outerArc.centroid(d);
                const posC = [...d.labelPos];
                return [posA, posB, posC];
            })
            .style("fill", "none")
            .style("stroke", "#999")
            .style("stroke-width", 1.2);

        // Draw the center text
        chartGroup
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.2em")
            .style("font-size", "18px")
            .style("font-family", "Roboto")
            .style("font-weight", "bold")
            .text("Total");
        // Draw the center value
        chartGroup
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.2em")
            .style("font-size", "16px")
            .style("font-family", "Roboto")
            .style("fill", "#555")
            .text(`${formatCurrency(donutChartData.totalAcv)}`);

        return () => tooltip.remove();
    }, [donutChartData, width, height]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default DonutChart;
