export const handleCopy = (tableData) => {
    if (!tableData || !tableData.colHeaders || !tableData.tableContent) return;
  
    // Dynamic header generation
    const headers = [tableData.tableName || "Row"];
    tableData.colHeaders.forEach(header => {
      headers.push(`${header} # of Opps`, `${header} ACV`, `${header} % of Total`);
    });
  
    // Dynamic row generation
    const rows = tableData.tableContent.map(row => {
      const rowData = [row.rowName];
      tableData.colHeaders.forEach(header => {
        const opps = row[`${header}_Opps`] ?? "";
        const acv = row[`${header}_ACV`] ?? "";
        const percent = row[`${header}_PercenOfTotal`] ?? "";
  
        rowData.push(
          opps,
          acv !== "" ? `$${Number(acv).toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "",
          percent !== "" ? `${percent}%` : ""
        );
      });
      return rowData;
    });
  
    // Combine headers and rows into TSV (tab-separated)
    const tsvContent = [headers, ...rows].map(r => r.join("\t")).join("\n");

    let mesg = {
        success: true,
        message: "Table copied to clipboard!",
    }
  
    // Copy to clipboard
    navigator.clipboard.writeText(tsvContent).catch(err => {
        mesg.success = false;
        mesg.message = "Failed to copy table to clipboard.";
    });
    return mesg;
  };
  