import * as d3 from 'd3';

export const formatCurrency = (value) => {
    const number = value / 1000; // Convert to thousands
    const formattedNumber = d3.format(",")(Math.round(number)); // Add commas
    return `$${formattedNumber}k`; // Add dollar symbol and 'k' for thousands
}