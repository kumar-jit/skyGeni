import { TableRow, TableCell } from "@mui/material";

export default function TableSubHeader({ subHeaders, sx }) {
    return (
        <TableRow>
            {subHeaders.map((header) => (
                <TableCell key={header.key} align="center" sx={{ ...sx }}>
                    {header.value}
                </TableCell>
            ))}
        </TableRow>
    );
}
