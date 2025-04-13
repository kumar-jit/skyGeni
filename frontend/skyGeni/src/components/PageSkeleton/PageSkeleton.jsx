import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import BarChartCard from "../cards/BarChartCard";

import DonutChartCard from "../cards/DonutChartCard";
import Legend from "../Legend/Legend";
import DonutChart from "../DonutChart/DonutChart";
import ChartDetailInfoTable from "../Table/ChartDetailInfoTable";
import { TableDataCopyButton } from "../Button/TableDataCopyButton";

const PageSkeleton = (props) => {
    const {
        barChartData,
        collerPalette,
        doughnutChartData,
        tableData,
        width,
        height,
        heading,
    } = props;

    return (
        <Card>
            <CardContent>
                {/* Card Header */}
                <Typography align="center" variant="h6" fontWeight="550">
                    <span>{`Won ACV mix by ${heading}`}</span>
                </Typography>
                {/* Card Content */}
                <Grid container spacing={2} justifyContent="center">
                    {/* Bar Chart Card */}
                    <Grid
                        display="flex"
                        justifyContent="start"
                        size={{ md: 7 }}
                    >
                        <BarChartCard
                            barChartData={barChartData}
                            collerPalette={collerPalette}
                            width={width.barChart}
                            height={height.barChart}
                        />
                    </Grid>
                    {/* Donut Chart Card */}
                    <Grid
                        display="flex"
                        justifyContent="center"
                        alignItems="start"
                        size={{ md: 5 }}
                    >
                        <DonutChart
                            donutChartData={doughnutChartData}
                            collerPalette={collerPalette}
                            height={height.donutChart}
                            width={width.donutChart}
                        />
                    </Grid>
                    {/* Legend */}
                    <Grid
                        display="flex"
                        justifyContent="start"
                        alignItems="start"
                        size={{ md: 12 }}
                    >
                        <Legend collerPalette={collerPalette}></Legend>
                    </Grid>
                    {/* Table and copy button */}
                    <Grid
                        display="flex"
                        alignContent="center"
                        size={{ md: 10 }}
                    >
                        <Stack alignContent={"end"} width="100%">
                            <TableDataCopyButton tableData={tableData} />
                            <ChartDetailInfoTable tableData={tableData} />
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PageSkeleton;
