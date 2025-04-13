import { TableRow, TableCell } from "@mui/material";

import { tableTextFormater } from "../../utils/tableTextFormater";

export default function TableRowContent({ row, boldFontFields = [] }) {
    return (
        <TableRow key={row.rowName}>
            {Object.entries(row).map(([key, value]) => {
                return (
                    <TableCell key={key+row.rowName} align={key === "rowName" ? "left" : "right"} sx={{ fontWeight: boldFontFields.includes(row.rowName) ? "bold" : "normal" }}>
                        {tableTextFormater(key, value)}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}
