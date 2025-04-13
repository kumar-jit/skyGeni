import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

import TableGroupHeader from "../TableParts/TableGroupHeader";
import TableSubHeader from "../TableParts/TableSubHeaders";
import TableRowContent from "../TableParts/TableRowContent";

export default function ChartDetailInfoTable({tableData}) {
    let fontsDetails = {
        fontWeight: "bold",
        fontSize: "0.7rem"
    }

    // Check if tableData is null or empty
    if (!tableData || Object.keys(tableData).length == 0) return null; 

    // prepare subHeaders for the table
    const subHeaders = [{key : tableData.tableName, value : tableData.tableName}]
    tableData.colHeaders?.forEach((header) => {
        subHeaders.push({key : header + "_opps", value : "# of Opps"});        
        subHeaders.push({key : header + "_acv", value : "ACV" + (header === "Total" ? " ↓" : "")});
        subHeaders.push({key : header + "_percent", value : "% of Total"});
    });

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    borderCollapse: "collapse",
                    "& td, & th": {
                        border: "1px solid #ccc",
                        padding: "2px 6px",
                    },
    
                }}
                aria-label="tight bordered table"
            >
                <TableHead>
                    <TableGroupHeader
                        colHeaders={tableData.colHeaders}
                        altHeaderColors={["#4471c4", "#5b9bd5"]}
                        sx={{...fontsDetails}}
                        columnHeading="Closed Fiscal Year"
                    />
                    <TableSubHeader
                        subHeaders={subHeaders}
                        sx={{...fontsDetails}}
                    />
                </TableHead>
                <TableBody>
                    {tableData.tableContent?.map((row) => (
                        <TableRowContent
                            key={row.rowName}
                            row={row}
                            boldFontFields={["Total"]}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
