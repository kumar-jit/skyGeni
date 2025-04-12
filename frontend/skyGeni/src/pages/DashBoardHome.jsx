import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import CustomerType from "./CustomerType";
import CustomTabPanel from "../components/CustomTabPanel/CustomTabPanel";
import AccountIndus from "./AccountIndus";
import AcvRange from "./AcvRange";
import Team from "./Team";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function DashBoardHome() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Dashboard Tabs"
                >
                    <Tab label="Customer Types" {...a11yProps(0)} />
                    <Tab label="Teams" {...a11yProps(1)} />
                    <Tab label="Acv Rang" {...a11yProps(2)} />
                    <Tab label="Account Industry" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CustomerType />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Team />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <AcvRange />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <AccountIndus />
            </CustomTabPanel>
        </Box>
    );
}

export default DashBoardHome;
