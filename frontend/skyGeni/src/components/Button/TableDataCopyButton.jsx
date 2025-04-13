import { Box, Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from "react";


import { handleCopy } from "../../utils/handleTableDataCopy";

export function TableDataCopyButton({ tableData }) {
    const [showCopied, setShowCopied] = useState(false); // State to manage the copy button text

    // Function to handle the copy button click
    const handleCopyClick = () => {
        const mesg = handleCopy(tableData);
        if (mesg.success) {
            setShowCopied(true);
            setTimeout(() => {
                setShowCopied(false);
            }, 2000); // Reset after 2 seconds
        } else {
            console.error(mesg.message); // Log the error message
        }
    }
    return (
        <Box display="flex" justifyContent="flex-end" mb={1}>
            <Button variant="text" size="small" onClick={() => handleCopyClick()}>
                {showCopied ? "Copied!" : <ContentCopyIcon fontSize="small" />} 
            </Button>
        </Box>
    );
}
