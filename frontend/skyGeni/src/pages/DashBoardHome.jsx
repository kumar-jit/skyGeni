import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState, useMemo, useCallback } from "react";
import { connect } from "react-redux";

import CustomTabPanel from "../components/CustomTabPanel/CustomTabPanel";
import PageSkeleton from "../components/PageSkeleton/PageSkeleton";

import {
    loadInitialDataThunk,
    chartsDataLoadThunk,
} from "../redux/reducers/dashBoardReducer";

// Accessible props for tab panels
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function DashBoardHome({
    tabs,
    inittialDataLoad,
    barChartData,
    doughnutChartData,
    tableData,
    collerPalette,
    chartsDataLoad,
}) {
    const [value, setValue] = useState(0);
    const [width] = useState({
        barChart: 800,
        card: 400,
        donutChart: 550,
    });
    const [height] = useState({
        barChart: 400,
        card: 400,
        donutChart: 400,
    });

    // Load tabs initially
    useEffect(() => {
        inittialDataLoad();
    }, [inittialDataLoad]);

    // Fetch chart data when the active tab changes
    useEffect(() => {
        if (tabs?.[value]) {
            const selectedTabKey = tabs[value].path;
            chartsDataLoad(selectedTabKey);
        }
    }, [value, tabs, chartsDataLoad]);

    // Memoized tab change handler
    const handleChange = useCallback((event, newValue) => {
        setValue(newValue);
    }, []);

    // Memoized tabs rendering
    const tabHeaders = useMemo(() => (
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Dashboard Tabs"
        >
            {tabs?.map((tab, index) => (
                <Tab
                    key={tab.key}
                    label={tab.name}
                    {...a11yProps(index)}
                />
            ))}
        </Tabs>
    ), [tabs, value, handleChange]);

    // Memoized tab panels
    const tabPanels = useMemo(() => (
        tabs?.map((tab, index) => (
            <CustomTabPanel
                key={tab.key}
                value={value}
                index={index}
                path={tab.path}
            >
                <PageSkeleton
                    barChartData={barChartData}
                    doughnutChartData={doughnutChartData}
                    tableData={tableData}
                    collerPalette={collerPalette}
                    width={width}
                    height={height}
                    heading={tab.name}
                />
            </CustomTabPanel>
        ))
    ), [tabs, value, barChartData, doughnutChartData, tableData, collerPalette, width, height]);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {tabHeaders}
            </Box>
            {tabPanels}
        </Box>
    );
}

const mapStateToProps = (state) => ({
    tabs: state.dashBoardReducer?.tabs,
    barChartData: state.dashBoardReducer?.barChartData,
    collerPalette: state.dashBoardReducer.collerPalette,
    doughnutChartData: state.dashBoardReducer.doughnutChartData,
    tableData: state.dashBoardReducer.tableData,
});

const mapDispatchToProps = (dispatch) => ({
    inittialDataLoad: () => dispatch(loadInitialDataThunk()),
    chartsDataLoad: (path) => dispatch(chartsDataLoadThunk(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardHome);
