import { TableRow, TableCell } from "@mui/material";

export default function TableGroupHeader({ colHeaders, altHeaderColors = [], columnHeading,sx }) {
    return (
        <TableRow sx={{ fontWeight: "bold", fontSize: "0.5rem" }}>
            <TableCell sx={{...sx}}>{columnHeading}</TableCell>
            {colHeaders?.map((header, index) => {
                const bgColor = altHeaderColors[index % altHeaderColors.length]; // loop if not enough colors
                return (
                    <TableCell
                        align="center"
                        key={header}
                        colSpan={3}
                        sx={{ backgroundColor: bgColor, color: "#fff", ...sx}}
                    >
                        {header}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}
