

// const Legend = ({ collerPalette }) => {
//     return (
//         <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
//             {Object.entries(collerPalette).map(([key, color]) => (
//                 <div key={key} style={{ display: "flex", alignItems: "center", marginRight: "15px", marginBottom: "5px" }}>
//                     <div
//                         style={{
//                             width: "12px",
//                             height: "12px",
//                             backgroundColor: color,
//                             marginRight: "6px",
//                             borderRadius: "2px"
//                         }}
//                     />
//                     <span style={{ fontSize: "12px", color: "#333" }}>{key}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Legend;


import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Legend = ({collerPalette}) => {
  const legendRef = useRef(null);

  useEffect(() => {
    const container = d3.select(legendRef.current);
    container.selectAll("*").remove(); // Clear previous renders

    const data = Object.entries(collerPalette);
    const boxSize = 16;
    const itemPadding = 20;
    const fontSize = 14;

    // Temporary SVG for measuring text widths
    const tempSvg = container.append("svg").style("visibility", "hidden");
    const textWidths = data.map(([label]) => {
      return tempSvg.append("text")
        .style("font", `${fontSize}px Arial`)
        .text(label)
        .node()
        .getBBox().width;
    });
    tempSvg.remove();

    const totalWidth = textWidths.reduce((sum, width) => sum + boxSize + 8 + width + itemPadding, 0);

    const svg = container.append("svg")
      .attr("width", totalWidth)
      .attr("height", 30); // Single row

    let x = 0;
    const legend = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        const groupX = x;
        x += boxSize + 8 + textWidths[i] + itemPadding;
        return `translate(${groupX}, 5)`;
      });

    // Colored squares
    legend.append("rect")
      .attr("width", boxSize)
      .attr("height", boxSize)
      .attr("fill", d => d[1])
      .attr("rx", 3)
      .attr("ry", 3);

    // Labels
    legend.append("text")
      .attr("x", boxSize + 8)
      .attr("y", boxSize / 2)
      .attr("dy", "0.35em")
      .style("font-family", "Roboto")
      .style("font-size", `${fontSize}px`)
      .text(d => d[0]);

  }, [collerPalette]);

  return <div ref={legendRef} />;
};

export default Legend;
